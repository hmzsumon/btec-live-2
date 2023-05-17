const Deposit = require('../models/depositModel');
const User = require('../models/userModel');
const ErrorHander = require('../utils/errorhander');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const createTransaction = require('../utils/tnx');
const DepositDetails = require('../models/depositDetails');
const ShareCardDetails = require('../models/shareCardDetails');
const { sendEmail } = require('../utils/sendEmail');
const cloudinary = require('cloudinary');
const Company = require('../models/companyModel');
const companyId = process.env.COMPANY_ID;
const ShareCard = require('../models/shareCard');
const { v4: uuidv4 } = require('uuid');

// Create Share Card
exports.createShareCard = catchAsyncErrors(async (req, res, next) => {
	const price = 1000;
	const qty = 10000;

	// create share card
	for (let i = 0; i < qty; i++) {
		// create 16 digit unique only number
		const card_no = uuidv4()
			.toString()
			.replace(/[^0-9]/g, '')
			.substring(0, 16);

		await ShareCard.create({
			card_no,
			price,
		});
	}

	res.status(200).json({
		success: true,
	});
});

// Get Share Card
exports.getShareCards = catchAsyncErrors(async (req, res, next) => {
	const { limit, skip } = req.query;

	const shareCards = await ShareCard.find({
		is_sold: false,
		is_active: false,
	})
		.skip(parseInt(skip))
		.limit(parseInt(limit));

	res.status(200).json({
		success: true,
		length: shareCards.length,
		shareCards,
	});
});

// buy a share card
exports.buyShareCard = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.user.id);
	if (!user) {
		return next(new ErrorHander('User not found', 404));
	}

	// find share card by id
	const shareCard = await ShareCard.findById(req.params.id);
	if (!shareCard) {
		return next(new ErrorHander('Share card not found', 404));
	}

	// card is already sold
	if (shareCard.is_sold) {
		return next(new ErrorHander('Share card is already sold', 404));
	}

	// check if user has enough balance
	if (user.m_balance < shareCard.price) {
		return next(new ErrorHander('Insufficient balance', 404));
	}

	const shareCardDetails = await ShareCardDetails.findOne({
		user_id: req.user.id,
	});

	if (!shareCardDetails) {
		// create share card details
		await ShareCardDetails.create({
			user_id: req.user.id,
			name: user.name,
			phone: user.phone,
			email: user.email,
		});
		return next(new ErrorHander('Share card details not found', 901));
	}

	// find sponsor
	const sponsor = await User.findById(user.sponsor.sponsor_id);
	if (!sponsor) {
		return next(new ErrorHander('Sponsor not found', 404));
	}

	// check if sponsor is_share_card is true
	if (!sponsor.is_share_card) {
		return next(new ErrorHander('Sponsor has not share card', 404));
	}

	// find sponsor share card details
	const sponsorShareCardDetails = await ShareCardDetails.findOne({
		user_id: sponsor._id,
	});

	if (!sponsorShareCardDetails) {
		return next(new ErrorHander('Sponsor share card details not found', 404));
	}

	// find company
	const company = await Company.findById(companyId);
	if (!company) {
		return next(new ErrorHander('Company not found', 404));
	}

	// expire date 1 year
	let expireDate = new Date();
	expireDate.setFullYear(expireDate.getFullYear() + 1);

	//update user balance
	user.m_balance -= shareCard.price;
	createTransaction(
		user._id,
		'cashOut',
		shareCard.price,
		'Share Card Purchase',
		`Share Card Purchase - ${shareCard.price} CR`
	);
	user.is_share_card = true;
	await user.save();

	// update share card
	shareCard.is_sold = true;
	shareCard.is_active = true;
	shareCard.user_id = req.user.id;
	shareCard.name = user.name;
	shareCard.phone = user.phone;
	shareCard.buy_date = Date.now();
	shareCard.expire_date = expireDate;
	await shareCard.save();

	// update sponsor
	sponsor.share_card_bonus += shareCard.price * 0.5;
	sponsor.w_balance += shareCard.price * 0.5;
	createTransaction(
		sponsor._id,
		'cashIn',
		shareCard.price * 0.5,
		'Share Card Bonus',
		`Share Card Bonus - ${shareCard.price * 0.5} CR of ${user.name}`
	);
	await sponsor.save();

	// update sponsor share card details
	sponsorShareCardDetails.total_sold_card_qty += 1;
	sponsorShareCardDetails.total_sold_card_amount += shareCard.price;
	sponsorShareCardDetails.total_sold_bonus += shareCard.price * 0.5;
	await sponsorShareCardDetails.save();

	// update card details
	shareCardDetails.total_card_qty += 1;
	shareCardDetails.total_card_amount += shareCard.price;
	shareCardDetails.share_cards.push(shareCard._id);
	await shareCardDetails.save();

	// update company
	company.share_card.total_sold_qty += 1;
	company.share_card.total_sold_amount += shareCard.price;
	company.share_card.today_sold_qty += 1;
	company.share_card.today_sold_amount += shareCard.price;
	company.share_card.card_sponsor_bonus += shareCard.price * 0.5;
	company.income.total_income += shareCard.price * 0.5;
	company.cost.total_cost += shareCard.price * 0.5;
	await company.save();

	sendEmail({
		email: user.email,
		subject: 'Share Card Purchase',
		message: `Dear ${
			user.name
		},\n\nYour share card purchase is successful.\n\nYour share card number is ${
			shareCard.card_no
		}.\n\nYour share card will expire on ${expireDate.toDateString()}.\n\nThank you for being with us.\n\nRegards,\n${
			company.name
		}`,
	});

	sendEmail({
		email: sponsor.email,
		subject: 'Share Card Bonus',
		message: `Dear ${sponsor.name},\n\nYou have received share card bonus of ${
			shareCard.price * 0.5
		} CR from ${user.name}.\n\nThank you for being with us.\n\nRegards,\n${
			company.name
		}`,
	});

	res.status(200).json({
		success: true,
	});
});

// get user share card details
exports.getUserShareCardDetails = catchAsyncErrors(async (req, res, next) => {
	const shareCardDetails = await ShareCardDetails.findOne({
		user_id: req.user.id,
	});

	if (!shareCardDetails) {
		return next(new ErrorHander('Share card details not found', 404));
	}

	// find cards
	const shareCards = await ShareCard.find({
		_id: shareCardDetails.share_cards,
	});
	if (shareCards.length === 0) {
		return next(new ErrorHander('Share cards not found', 404));
	}

	res.status(200).json({
		success: true,
		shareCardDetails,
		shareCards,
	});
});
