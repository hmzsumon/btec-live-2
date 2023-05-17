const Deposit = require('../models/depositModel');
const User = require('../models/userModel');
const ErrorHander = require('../utils/errorhander');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const createTransaction = require('../utils/tnx');
const DepositDetails = require('../models/depositDetails');
const { sendEmail } = require('../utils/sendEmail');
const cloudinary = require('cloudinary');
const Company = require('../models/companyModel');
const companyId = process.env.COMPANY_ID;

// Create a new deposit
exports.createDeposit = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.user.id);
	if (!user) {
		return next(new ErrorHander('User not found', 404));
	}

	// find DepositDetails
	const depositDetails = await DepositDetails.findOne({ user_id: req.user.id });
	if (!depositDetails) {
		// create new DepositDetails
		await DepositDetails.create({
			user_id: req.user.id,
			name: user.name,
			is_new: false,
		});
	}

	// find company
	const company = await Company.findById(companyId);
	if (!company) {
		return next(new ErrorHander('Company not found', 400));
	}

	// console.log(req.body);
	const {
		amount,
		sMethod,
		transactionId,
		method_name,
		send_account,
		receive_account,
		type,
	} = req.body;

	// convert amount to number
	const numAmount = Number(amount);

	// // unique transactionId
	const isTransactionIdExist = await Deposit.findOne({ transactionId });
	if (isTransactionIdExist) {
		return next(new ErrorHander('Transaction ID already exist', 400));
	}

	const result = await cloudinary.v2.uploader.upload(req.file.path, {
		folder: 'deposit-documents',
	});

	const newDeposit = await Deposit.create({
		user_id: req.user.id,
		name: user.name,
		phone: user.phone,
		amount: numAmount,
		method: {
			name: method_name,
			send_account: send_account,
			receive_account: receive_account,
			type: type,
		},
		transactionId,
		screen_shot: {
			public_id: result.public_id,
			url: result.secure_url,
		},
	});

	// update deposit details
	if (user.is_newUser) {
		depositDetails.is_new = true;
		await depositDetails.save();
	}

	// update company balance
	company.deposit.new_deposit_amount += numAmount;
	company.deposit.new_deposit_count += 1;
	await company.save();

	// send email to user
	sendEmail({
		email: user.email,
		subject: 'Deposit Request',
		message: `Dear ${user.name},\n\nYour deposit request of ${amount} has been received. We will confirm your deposit within 24 hours.\n\nThank you for choosing ${company.name}.`,
	});

	// send email to admin
	sendEmail({
		email: company.email,
		subject: 'New Deposit Request',
		message: `Dear Admin,\n\nA new deposit request of ${amount} has been received from ${user.name}.\n\nThank you for choosing ${company.name}.`,
	});
	res.status(201).json({
		success: true,
		message: 'Deposit request received successfully',
		deposit: newDeposit,
	});
});

// Get all deposits
exports.getAllDeposits = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.user.id);
	if (!user) {
		return next(new ErrorHander('User not found', 404));
	}

	if (!user.role === 'manager' || !user.role === 'admin') {
		return next(
			new ErrorHander('You are not authorized to access this route', 403)
		);
	}
	const deposits = await Deposit.find();

	res.status(200).json({
		success: true,
		deposits,
	});
});

// Get a single deposit
exports.getSingleDeposit = catchAsyncErrors(async (req, res, next) => {
	const deposit = await Deposit.findById(req.params.id);
	if (!deposit) {
		return next(new ErrorHander('No deposit found with that ID', 404));
	}
	res.status(200).json({
		success: true,
		deposit,
	});
});

// Update a single deposit
exports.updateDeposit = catchAsyncErrors(async (req, res, next) => {
	const deposit = await Deposit.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});
	if (!deposit) {
		return next(new ErrorHander('No deposit found with that ID', 404));
	}
	res.status(200).json({
		success: true,
		deposit,
	});
});

// get logged in user's deposits
exports.getUserDeposits = catchAsyncErrors(async (req, res, next) => {
	const deposits = await Deposit.find({ user_id: req.user._id });
	res.status(200).json({
		success: true,
		deposits,
	});
});

// delete a single deposit
exports.deleteDeposit = catchAsyncErrors(async (req, res, next) => {
	const deposit = await Deposit.findByIdAndDelete(req.params.id);
	if (!deposit) {
		return next(new ErrorHander('No deposit found with that ID', 404));
	}
	res.status(204).json({
		success: true,
	});
});

// cancel a single deposit
exports.cancelDeposit = catchAsyncErrors(async (req, res, next) => {
	const deposit = await Deposit.findById(req.params.id);
	if (!deposit) {
		return next(new ErrorHander('No deposit found with that ID', 404));
	}
	deposit.status = 'cancelled';
	deposit.cancelledAt = Date.now();
	await deposit.save();
	res.status(200).json({
		success: true,
	});
});

// delete all pending deposits
exports.deleteAllPendingDeposits = catchAsyncErrors(async (req, res, next) => {
	const pendingDeposits = await Deposit.find({ status: 'pending' });
	if (pendingDeposits.length === 0) {
		return next(new ErrorHander('No pending deposits found', 404));
	}
	for (let i = 0; i < pendingDeposits.length; i++) {
		await pendingDeposits[i].remove();
	}
	res.status(200).json({
		success: true,
	});
});

// approve a single deposit
exports.approveDeposit = catchAsyncErrors(async (req, res, next) => {
	// find admin
	const admin = await User.findById(req.user.id);
	if (!admin) {
		return next(new ErrorHander('No admin found with that ID', 404));
	}
	// check if admin or manager is authorized
	if (!admin.role === 'admin' || !admin.role === 'manager') {
		return next(
			new ErrorHander('You are not authorized to approve deposits', 403)
		);
	}
	// find deposit
	const deposit = await Deposit.findById(req.params.id);
	if (!deposit) {
		return next(new ErrorHander('No deposit found with that ID', 404));
	}

	// find user
	const user = await User.findById(deposit.user_id);
	if (!user) {
		return next(new ErrorHander('No user found with that ID', 404));
	}

	// find sponsor sponsor.sponsor_id
	let sponsorId = user.sponsor.sponsor_id
		? user.sponsor.sponsor_id
		: process.env.DEFAULT_REFERRAL_ID;
	const sponsor = await User.findById(sponsorId);
	if (!sponsor) {
		return next(new ErrorHander('No sponsor found with that ID', 404));
	}

	// find DepositDetails
	const depositDetails = await DepositDetails.findOne({ user_id: user._id });
	if (!depositDetails) {
		return next(new ErrorHander('Deposit details not found', 404));
	}

	// find company
	const company = await Company.findById(companyId);
	if (!company) {
		return next(new ErrorHander('Company not found', 400));
	}

	//update deposit details
	deposit.status = 'approved';
	deposit.approvedAt = Date.now();
	deposit.approved_by = admin.name;
	deposit.approvedAt = Date.now();
	deposit.is_approved = true;
	deposit.comment = 'Approved by admin';
	deposit.update_by = admin._id;
	await deposit.save();

	// update user
	user.m_balance += deposit.amount;
	createTransaction(
		user._id,
		'cashIn',
		deposit.amount,
		'deposit',
		'Approved Deposit'
	);

	if (user.is_newUser) {
		depositDetails.first_deposit_amount += deposit.amount;
		depositDetails.first_deposit_date = Date.now();
		depositDetails.s_bonus += deposit.amount * 0.1;
		depositDetails.is_new = false;

		company.cost.referral_bonus_cost += deposit.amount * 0.1;
		company.cost.total_cost += deposit.amount * 0.1;
		company.cost.today_cost += deposit.amount * 0.1;
		company.users.total_active_users += 1;
		company.users.new_users -= 1;
		company.deposit.total_d_bonus += deposit.amount * 0.1;

		// update sponsor
		sponsor.sponsor_bonus += deposit.amount * 0.1;
		sponsor.b_balance += deposit.amount * 0.1;
		createTransaction(
			sponsor._id,
			'cashIn',
			deposit.amount * 0.1,
			'sponsor_bonus',
			`Sponsor bonus for ${user.name} first deposit`
		);
		// update user
		user.is_newUser = false;
		user.is_active = true;
	} else {
		sponsor.sponsor_bonus += deposit.amount * 0.05;
		sponsor.b_balance += deposit.amount * 0.05;
		createTransaction(
			sponsor._id,
			'cashIn',
			deposit.amount * 0.05,
			'sponsor_bonus',
			`Sponsor bonus for ${user.name} first deposit`
		);

		company.cost.referral_bonus_cost += deposit.amount * 0.05;
		company.cost.total_cost += deposit.amount * 0.05;
		company.cost.today_cost += deposit.amount * 0.05;
		company.deposit.total_d_bonus += deposit.amount * 0.05;

		depositDetails.s_bonus += deposit.amount * 0.05;
	}
	// amount > 500
	if (deposit.amount > 499) {
		user.b_balance += 100;
		createTransaction(user._id, 'cashIn', 100, 'bonus', 'Deposit bonus');
		depositDetails.bonus += 100;
		company.cost.total_cost += 100;
		company.cost.today_cost += 100;
	}
	// update deposit details
	depositDetails.total_deposit += deposit.amount;
	depositDetails.last_deposit_amount += deposit.amount;
	depositDetails.last_deposit_date = Date.now();
	await depositDetails.save();

	await sponsor.save();
	await user.save();

	// update company balance
	company.deposit.new_deposit_amount -= deposit.amount;
	company.deposit.new_deposit_count -= 1;
	company.deposit.totalDepositAmount += deposit.amount;
	company.deposit.totalDepositCount += 1;
	company.deposit.todayDepositCount += 1;
	company.deposit.todayDepositAmount += deposit.amount;
	await company.save();

	// send email to user
	sendEmail({
		email: user.email,
		subject: 'Deposit Approved',
		message: `Dear ${user.name},\n\nYour deposit of ${deposit.amount} has been approved.\n\nThank you for choosing ${company.name}.`,
	});

	// send email to sponsor
	sendEmail({
		email: sponsor.email,
		subject: 'Sponsor Bonus',
		message: `Dear ${sponsor.name},\n\nYou have received a sponsor bonus of ${
			deposit.amount * 0.1
		} for ${user.name} first deposit.\n\nThank you for choosing ${
			company.name
		}.`,
	});

	// send email to admin
	sendEmail({
		email: company.email,
		subject: 'Deposit Approved',
		message: `Dear ${admin.name},\n\n${user.name} deposit of ${deposit.amount} has been approved.\n\nThank you for choosing ${company.name}.`,
	});
	res.status(200).json({
		success: true,
		message: 'Deposit approved',
	});
});

// reject a single deposit
exports.rejectDeposit = catchAsyncErrors(async (req, res, next) => {
	// find admin
	const admin = await User.findById(req.user.id);
	if (!admin) {
		return next(new ErrorHander('No admin found with that ID', 404));
	}
	// find deposit
	// console.log(req.body);
	const deposit = await Deposit.findById(req.body.id);
	if (!deposit) {
		return next(new ErrorHander('No deposit found with that ID', 404));
	}

	// find user
	const user = await User.findById(deposit.user_id);
	if (!user) {
		return next(new ErrorHander('No user found with that ID', 404));
	}

	// find DepositDetails
	const depositDetails = await DepositDetails.findOne({ user_id: user._id });
	if (!depositDetails) {
		return next(new ErrorHander('Deposit details not found', 404));
	}

	// find company
	const company = await Company.findById(companyId);
	if (!company) {
		return next(new ErrorHander('Company not found', 400));
	}

	//update deposit
	deposit.status = 'rejected';
	deposit.is_rejected = true;
	deposit.reason = req.body.reason;
	deposit.comment = req.body.reason;
	deposit.rejectedAt = Date.now();
	deposit.rejected_by = admin.name;
	deposit.update.update_by = admin._id;
	await deposit.save();

	// update deposit details
	depositDetails.rejected_amount += deposit.amount;
	depositDetails.rejected_count += 1;
	await depositDetails.save();

	// update company balance
	company.deposit.new_deposit_amount -= deposit.amount;
	company.deposit.new_deposit_count -= 1;
	company.deposit.rejectedDepositAmount += deposit.amount;
	company.deposit.rejectedDepositCount += 1;
	company.deposit.d_rejected_ids.push(deposit._id);
	await company.save();

	// send email to user
	sendEmail({
		email: user.email,
		subject: 'Deposit Rejected',
		message: `Dear ${user.name},\n\nYour deposit of ${deposit.amount} has been rejected.\n\nReason: ${req.body.reason}\n\nThank you for choosing ${company.name}.`,
	});

	// send email to admin
	sendEmail({
		email: company.email,
		subject: 'Deposit Rejected',
		message: `Dear ${admin.name},\n\n${user.name} deposit of ${deposit.amount} has been rejected.\n\nReason: ${req.body.reason}\n\nThank you for choosing ${company.name}.`,
	});

	res.status(200).json({
		success: true,
		message: 'Deposit rejected',
	});
});
