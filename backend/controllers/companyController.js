const ErrorHander = require('../utils/errorhander');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const User = require('../models/userModel');
const Company = require('../models/companyModel');
const companyId = process.env.COMPANY_ID;

// create company
exports.createCompany = catchAsyncErrors(async (req, res, next) => {
	await Company.create({
		name: '1xLuck24',
		email: 'onexluck24@gmail.com',
		phone: '+13369157846',
		address: '26th Street,New York, NY',
		city: 'New York',
		state: 'NY',
		zipCode: '10001',

		about: 'Online Lottery platform',
		website: '',
		companyLogo: '',
	});
	res.status(201).json({
		success: true,
		message: 'Company created successfully',
	});
});

// get company
exports.getCompanyAdmin = catchAsyncErrors(async (req, res, next) => {
	const company = await Company.findById(companyId);
	if (!company) {
		return next(new ErrorHander('Company not found', 404));
	}
	res.status(200).json({
		success: true,
		company,
	});
});

// clear dailyWork todayWorkUsers
exports.clearDailyWorkTodayWorkUsers = catchAsyncErrors(
	async (req, res, next) => {
		const company = await Company.findById(companyId);
		if (!company) {
			return next(new ErrorHander('No company found', 404));
		}

		company.update({ $set: { 'dailyWork.todayWorkUsers': [] } });
		res.status(200).json({
			success: true,
			message: 'Company updated',
		});
	}
);

// reset company
exports.restCompany = catchAsyncErrors(async (req, res, next) => {
	const company = await Company.findById(companyId);
	if (!company) {
		return next(new ErrorHander('Company not found', 400));
	}

	company.users.total_users = 0;
	company.users.new_users = 0;
	company.users.email_verified_users = 0;
	company.users.total_active_users = 0;
	company.users.logged_in_users = 0;
	company.users.total_send_money_users = 0;

	company.lottery.totalSellCount = 0;
	company.lottery.totalSellAmount = 0;
	company.lottery.toDaySellCount = 0;
	company.lottery.toDaySellAmount = 0;
	company.lottery.lotteryProfit = 0;
	company.lottery.todayProfit = 0;
	company.lottery.totalDraw = 0;

	company.convert.totalConvert = 0;
	company.convert.totalConvertCount = 0;
	company.convert.todayConvert = 0;
	company.convert.todayConvertCount = 0;

	company.withdraw.totalWithdraw = 0;
	company.withdraw.totalWithdrawCount = 0;
	company.withdraw.todayWithdraw = 0;
	company.withdraw.total_w_charge = 0;
	company.withdraw.total_w_balance = 0;
	company.withdraw.todayWithdrawCount = 0;
	company.withdraw.new_withdraw = 0;
	company.withdraw.pending_withdraw_count = 0;
	company.withdraw.pending_withdraw_amount = 0;
	company.withdraw.todayWithdrawCount = 0;

	// cost
	company.cost.total_cost = 0;
	company.cost.today_cost = 0;
	company.cost.lottery_cost = 0;
	company.cost.lottery_cost_count = 0;
	company.cost.lucky_box_cost = 0;
	company.cost.signup_bonus_cost = 0;
	company.cost.referral_bonus_cost = 0;

	//income
	company.income.total_income = 0;
	company.income.today_income = 0;
	company.income.lottery_income = 0;
	company.income.withdraw_charge = 0;
	company.income.convert_charge = 0;

	// deposit
	company.deposit.totalDepositCount = 0;
	company.deposit.totalDepositAmount = 0;
	company.deposit.todayDepositCount = 0;
	company.deposit.todayDepositAmount = 0;
	company.deposit.total_d_bonus = 0;
	company.deposit.new_deposit_amount = 0;
	company.deposit.new_deposit_count = 0;
	company.deposit.rejectedDepositAmount = 0;
	company.deposit.rejectedDepositCount = 0;
	company.deposit.d_rejected_ids = [];

	await company.save();

	res.status(200).json({
		success: true,
		message: 'All properties updated',
	});
});
