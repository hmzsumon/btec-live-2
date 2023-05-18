const ErrorHander = require('../utils/errorhander');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken');
const { sendEmail } = require('../utils/sendEmail');
const crypto = require('crypto');
const cloudinary = require('cloudinary');
const { v4: uuidv4 } = require('uuid');

const Company = require('../models/companyModel');
const companyId = process.env.COMPANY_ID;
const Family = require('../models/familyModel');
const Table = require('../models/tableModel');
const Host = require('../models/hostModel');

//======================================
//seed user => /api/v1/seed/user
//======================================

exports.seedUser = catchAsyncErrors(async (req, res, next) => {
	const families = await Family.find();
	if (!families) {
		return next(new ErrorHander('No families found', 404));
	}
	const familyData = families[2].data;
	for (let i = 0; i < familyData.length; i++) {
		const f_user = familyData[i];
		const user = await User.create({
			name: f_user.name,
			user_id: f_user.user_id,
			id: f_user.id,
			password: '112200',
		});
		// console.log(user);
	}

	res.status(200).json({
		success: true,
		message: 'User created successfully',
	});
});

// create a admin user
exports.createAdminUser = catchAsyncErrors(async (req, res, next) => {
	const user = await User.create({
		name: 'Admin',
		user_id: 'admin',
		password: 'B112200@',
		isAdmin: true,
	});

	res.status(200).json({
		success: true,
		message: 'Admin User created successfully',
	});
});

//======================================
// Register a user => /api/v1/register
//======================================

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
	let referral_id = null;

	if (req.query.referral_id === 'undefined') {
		referral_id = process.env.DEFAULT_REFERRAL_ID;
	} else {
		referral_id = req.query.referral_id;
	}

	// console.log('dd', referral_id);
	// console.log(req.query);

	// find sponsor
	const sponsor = await User.findById(referral_id);
	if (!sponsor) {
		return next(new ErrorHander('Invalid referral id', 400));
	}

	// find company
	const company = await Company.findById(companyId);
	if (!company) {
		return next(new ErrorHander('Company not found', 400));
	}

	// let random_num = Math.floor(Math.random() * 10000000);
	const random_num = uuidv4().toString().replace(/-/g, '');
	const customer_id = `1x${random_num}`;

	const { name, email, password, phone } = req.body;

	// unique phone number validation
	const ex_user_phone = await User.findOne({ phone });
	if (ex_user_phone) {
		return next(new ErrorHander('Phone number already exists', 400));
	}

	// 6 digit verification code
	const verify_code = Math.floor(100000 + Math.random() * 900000);

	const user = await User.create({
		name,
		email,
		phone,
		password,
		customer_id,
		sponsor: {
			sponsor_id: sponsor._id,
			sponsor_name: sponsor.name,
		},
		verify_code,
	});

	const luckyAmount = Math.floor(Math.random() * 10) + 1;
	// create a lucky Box
	await LuckyBox.create({
		user_id: user._id,
		name: user.name,
		phone: user.phone,
		lucky_amount: luckyAmount,
		box_type: 'register',
	});

	// create withdraw details
	await WithdrawDetails.create({
		user_id: user._id,
		name: user.name,
	});

	// create deposit details
	await DepositDetails.create({
		user_id: user._id,
		name: user.name,
	});

	// create lottery details
	await LotteryDetails.create({
		user_id: user._id,
		name: user.name,
	});

	// update company
	company.users.total_users += 1;
	company.users.new_users += 1;
	await company.save();

	// updae sponsor members
	sponsor.members.push(user._id);
	await sponsor.save();

	// send verify code to user email
	sendEmail({
		email: user.email,
		subject: '1xLuck24 Verification Code',
		message: `Dear ${user.name},\n\nYour verification code is ${verify_code}.\n\nThanks,\n1xLuck24 Team`,
	});

	res.status(201).json({
		success: true,
		message: 'User registered successfully',
		user,
	});
});

//======================================
// Login user => /api/v1/login
//======================================

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
	const { user_id, password } = req.body;

	if (!user_id || !password) {
		return next(new ErrorHander('Please enter phone number and password', 400));
	}

	const user = await User.findOne({ user_id }).select('+password');

	if (!user) {
		return next(new ErrorHander('Invalid ID or password', 401));
	}

	const isPasswordMatched = await user.comparePassword(password);

	if (!isPasswordMatched) {
		return next(new ErrorHander('Invalid ID or password', 401));
	}

	sendToken(user, 200, res);
});

//======================================
// admin login => /api/v1/admin/login
//======================================

exports.adminLogin = catchAsyncErrors(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return next(new ErrorHander('Please enter email and password', 400));
	}

	const user = await User.findOne({ email }).select('+password');

	if (!user) {
		return next(new ErrorHander('Invalid email or password', 401));
	}

	// check if user is admin
	if (user.role !== 'admin') {
		return next(new ErrorHander("You're not an admin", 401));
	}

	const isPasswordMatched = await user.comparePassword(password);

	if (!isPasswordMatched) {
		return next(new ErrorHander('Invalid email or password', 401));
	}

	sendToken(user, 200, res);
});

//======================================
// Logout User
//======================================
exports.logout = catchAsyncErrors(async (req, res, next) => {
	res.cookie('token', null, {
		expires: new Date(Date.now()),
		httpOnly: true,
	});

	res.status(200).json({
		success: true,
		message: 'Logged Out',
	});
});

// Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findOne({ email: req.body.email });

	if (!user) {
		return next(new ErrorHander('User not found', 404));
	}

	// Get ResetPassword Token
	const resetToken = user.getResetPasswordToken();

	await user.save({ validateBeforeSave: false });

	const resetPasswordUrl = `${req.protocol}://${req.get(
		'host'
	)}/password/reset/${resetToken}`;

	const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

	try {
		await sendEmail({
			email: user.email,
			subject: 'Password Recovery',
			message,
		});

		res.status(200).json({
			success: true,
			message: `Email sent to ${user.email} successfully`,
		});
	} catch (error) {
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;

		await user.save({ validateBeforeSave: false });

		return next(new ErrorHander(error.message, 500));
	}
});

// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
	// creating token hash
	const resetPasswordToken = crypto
		.createHash('sha256')
		.update(req.body.token)
		.digest('hex');

	const user = await User.findOne({
		resetPasswordToken,
		resetPasswordExpire: { $gt: Date.now() },
	});

	if (!user) {
		return next(
			new ErrorHander(
				'Reset Password Token is invalid or has been expired',
				400
			)
		);
	}

	if (req.body.password !== req.body.confirmPassword) {
		return next(new ErrorHander('Password does not password', 400));
	}

	user.password = req.body.password;
	user.resetPasswordToken = undefined;
	user.resetPasswordExpire = undefined;

	await user.save();

	sendToken(user, 200, res);
});

// Get User Detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.user.id);
	res.status(200).json({
		success: true,
		user,
	});
});

// update User password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.user.id).select('+password');

	const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

	if (!isPasswordMatched) {
		return next(new ErrorHander('Old password is incorrect', 400));
	}

	if (req.body.newPassword !== req.body.confirmPassword) {
		return next(new ErrorHander('password does not match', 400));
	}

	user.password = req.body.newPassword;

	await user.save();

	sendToken(user, 200, res);
});

// update User Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
	const newUserData = {
		name: req.body.name,
		email: req.body.email,
	};

	if (req.body.avatar !== '') {
		const user = await User.findById(req.user.id);

		const imageId = user.avatar.public_id;

		await cloudinary.v2.uploader.destroy(imageId);

		const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
			folder: 'avatars',
			width: 150,
			crop: 'scale',
		});

		newUserData.avatar = {
			public_id: myCloud.public_id,
			url: myCloud.secure_url,
		};
	}

	const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});

	res.status(200).json({
		success: true,
	});
});

// Get all users(admin)
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
	const users = await User.find();

	let newUsers = [];
	users.forEach((user) => {
		newUsers.push({
			_id: user._id,
			name: user.name,
			phone: user.phone,
			email: user.email,
			role: user.role,
			createdAt: user.createdAt,
			is_active: user.is_active,
			email_verified: user.email_verified,
			balance: {
				m: user.m_balance,
				b: user.b_balance,
				w: user.w_balance,
			},
		});
	});

	res.status(200).json({
		success: true,
		users: newUsers,
	});
});

// Get single user (admin)
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.params.id);

	if (!user) {
		return next(
			new ErrorHander(`User does not exist with Id: ${req.params.id}`)
		);
	}

	res.status(200).json({
		success: true,
		user,
	});
});

// update User Role -- Admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
	const newUserData = {
		name: req.body.name,
		email: req.body.email,
		role: req.body.role,
		active_status: req.body.active_status,
		balance: req.body.balance,
		pxc_balance: req.body.pxc_balance,
	};

	await User.findByIdAndUpdate(req.params.id, newUserData, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});

	res.status(200).json({
		success: true,
	});
});

// Delete User --Admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.params.id);

	if (!user) {
		return next(
			new ErrorHander(`User does not exist with Id: ${req.params.id}`, 400)
		);
	}

	if (user.avatar.public_id) {
		const imageId = user.avatar.public_id;
		await cloudinary.v2.uploader.destroy(imageId);
	}

	await user.remove();

	res.status(200).json({
		success: true,
		message: 'User Deleted Successfully',
	});
});

// find user by phone number
exports.findUserByPhoneNumber = catchAsyncErrors(async (req, res, next) => {
	const user = await User.find({ phone: req.body.phone });

	if (!user) {
		return next(
			new ErrorHander(
				`User does not exist with phone number: ${req.body.phone_number}`,
				400
			)
		);
	}

	res.status(200).json({
		success: true,
		user,
	});
});

// verify email address with code
exports.verifyEmail = catchAsyncErrors(async (req, res, next) => {
	// find company
	const company = await Company.findById(companyId);
	if (!company) {
		return next(new ErrorHander('Company not found', 404));
	}
	const { code, phone } = req.body;
	// console.log(req.body);
	const user = await User.findOne({ phone });
	if (!user) {
		return next(new ErrorHander('User not found', 404));
	}
	if (user.email_verified === true) {
		return next(new ErrorHander('Email already verified', 400));
	}
	if (user.verify_code !== code) {
		return next(new ErrorHander('Invalid code', 400));
	}

	user.email_verified = true;
	user.verify_code = null;
	await user.save();
	// console.log(user.is_newUser);
	company.users.email_verified_users += 1;
	await company.save();

	sendToken(user, 200, res);
});

// resend email verification code
exports.resendEmailVerificationCode = catchAsyncErrors(
	async (req, res, next) => {
		const { phone } = req.query;
		const user = await User.findOne({ phone });
		if (!user) {
			return next(new ErrorHander('User not found', 404));
		}

		const code = Math.floor(100000 + Math.random() * 900000);
		user.verify_code = code;
		await user.save();

		const message = `Your verification code is ${code}`;
		sendEmail({
			email: user.email,
			subject: 'Email Verification Code',
			message,
		});

		res.status(200).json({
			success: true,
			message: 'Email verification code sent successfully',
		});
	}
);

// get logged in user details
exports.loadUser = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.user.id);
	if (!user) {
		return next(new ErrorHander('User not found', 404));
	}

	res.status(200).json({
		success: true,
		user,
	});
});

// get user by phone
exports.getUserByPhone = catchAsyncErrors(async (req, res, next) => {
	const { phone } = req.query;
	// find user
	const user = await User.findOne({ phone });
	if (!user) {
		return next(new ErrorHander('User not found', 404));
	}

	res.status(200).json({
		success: true,
		user,
	});
});

// get logged in user members
exports.getMembers = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.user.id);
	if (!user) {
		return next(new ErrorHander('User not found', 404));
	}

	// find members with sponsor.sponsor_id
	const members = await User.find({ 'sponsor.sponsor_id': user._id });
	if (!members) {
		return next(new ErrorHander('Members not found', 404));
	}
	// console.log(members.length);

	let newMembers = [];
	members.forEach((member) => {
		newMembers.push({
			_id: member._id,
			name: member.name,
			phone: member.phone,
			email: member.email,
			is_active: member.is_active,
			join_date: member.createdAt,
		});
	});

	res.status(200).json({
		success: true,
		members: newMembers,
	});
});

// get single user details for admin
exports.getSingleUserAdmin = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.params.id);
	if (!user) {
		return next(new ErrorHander('User not found', 404));
	}

	// find convert details
	const convertDetails = await ConvertDetails.findOne({
		user_id: user._id,
	});

	// find deposit details
	const depositDetails = await DepositDetails.findOne({ user_id: user._id });

	// find withdraw details
	const withdrawDetails = await WithdrawDetails.findOne({ user_id: user._id });

	// find lottery details
	const lotteryDetails = await LotteryDetails.findOne({ user_id: user._id });

	// find send details
	const sendDetails = await SendDetails.findOne({ user_id: user._id });

	res.status(200).json({
		success: true,
		user,
		convertDetails,
		depositDetails,
		withdrawDetails,
		lotteryDetails,
		sendDetails,
	});
});

// update all user is_new = true
exports.updateAllUserIsNew = catchAsyncErrors(async (req, res, next) => {
	const users = await User.find({ role: 'user' });
	if (!users) {
		return next(new ErrorHander('Users not found', 404));
	}
	// console.log(users.length);

	users.forEach(async (user) => {
		user.is_new = true;
		await user.save();
		// console.log(user.is_new);
	});

	res.status(200).json({
		success: true,
		message: 'All users updated successfully',
	});
});

// update all user info
exports.updateALLUser = catchAsyncErrors(async (req, res, next) => {
	// get all host
	const hosts = await Host.find();
	if (!hosts) {
		return next(new ErrorHander('Hosts not found', 404));
	}
	// get all users with out admin
	const users = await User.find({ role: 'user' });
	if (!users) {
		return next(new ErrorHander('Users not found', 404));
	}

	// update all users receive_coins by host receive_coins
	for (let i = 0; i < users.length; i++) {
		if (!users[i].id) {
			continue;
		}
		const user = await User.findOne({ id: users[i].id });
		if (!user) {
			continue;
		}
		let totalReceiveCoins = 0;
		for (let j = 0; j < hosts.length; j++) {
			if (user.id === hosts[j].family_id) {
				totalReceiveCoins += hosts[j].receive_coin;
			}
		}

		user.receive_coins = totalReceiveCoins;
		await user.save();
		console.log(
			`user ${user.user_id} receive_coins: ${user.receive_coins} totalReceiveCoins: ${totalReceiveCoins}`
		);
	}
	res.status(200).json({
		success: true,
		message: 'All users updated successfully',
	});
});

// find top 5 users by receive_coins
exports.getTop5Users = catchAsyncErrors(async (req, res, next) => {
	const users = await User.find({ role: 'user' })
		.sort({ receive_coins: -1 })
		.limit(5);
	if (!users) {
		return next(new ErrorHander('Users not found', 404));
	}

	// for (let i = 0; i < users.length; i++) {
	// 	let user = users[i];
	// 	console.log(`user ${user.name} receive_coins: ${user.receive_coins}`);
	// }

	res.status(200).json({
		success: true,
		topUsers: users,
	});
});
