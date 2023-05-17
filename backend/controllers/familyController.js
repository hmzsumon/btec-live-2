const ErrorHander = require('../utils/errorhander');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Family = require('../models/familyModel');
const Table = require('../models/tableModel');
const Host = require('../models/hostModel');

// get all families list
exports.getFamilies = catchAsyncErrors(async (req, res, next) => {
	const families = await Family.find();
	if (!families) {
		return next(new ErrorHander('No families found', 404));
	}

	const familyData = families[2].data;
	const familyUser = [];
	for (let i = 0; i < familyData.length; i++) {
		const user = familyData[i];
		// console.log('====================================');
		// console.log('id:', user.id);
		// console.log('user_id:', user.user_id);
		// console.log('name:', user.name);
		// console.log('====================================');
		familyUser.push({
			id: user.id,
			user_id: user.user_id,
			name: user.name,
		});
	}

	res.status(200).json({
		success: true,
		familyUser,
	});
});

// create new family
exports.newFamily = catchAsyncErrors(async (req, res, next) => {
	const neewFamily = {
		name: 'test',
		type: 'test',
		data: [],
		database: 'test',
	};
	const family = await Family.create(neewFamily);

	res.status(201).json({
		success: true,
		family,
	});
});

// get family salary info by family id
exports.getFamilySalaryInfo = catchAsyncErrors(async (req, res, next) => {
	const familyId = req.params.id;
	const families = await Family.find();
	if (!families) {
		return next(new ErrorHander('No families found', 404));
	}

	// get all host
	const hosts = await Host.find();
	if (!hosts) {
		return next(new ErrorHander('Host not found with this ID', 404));
	}

	const familyData = families[2].data;
	const singleFamily = familyData.filter((family) => family.id === familyId);

	//find family users by family id
	const familyUsers = hosts.filter((user) => user.family_id === familyId);
	// get users by ticket >= 250000
	const successUsers = familyUsers.filter(
		(user) => Number(user.receive_coin) >= 50000
	);

	let users = [];
	for (let i = 0; i < successUsers.length; i++) {
		const user = successUsers[i];
		const numTicket = Number(user.ticket);
		let netAmount = 0;
		let base_pay = 0;
		let merchant_pay = 0;
		let salary_amount = 0;
		let day_bonus = 0;
		let grosSalary = 0;
		let extra = 0;
		let extra_bonus = 0;
		let merchant_extra = 0;
		let merchant_total = 0;

		if (numTicket >= 50000 && numTicket < 249999) {
			// console.log(numTicket);
			netAmount = numTicket * 0.5;
			salary_amount = netAmount * 0.02;
			base_pay = salary_amount;
			grosSalary = base_pay;
		} else if (numTicket >= 250000 && numTicket < 449999) {
			netAmount = 250000 - 250000 * 0.16;
			extra = numTicket - 250000;
			salary_amount = netAmount * 0.02;
			base_pay = salary_amount * 0.405;
			day_bonus = salary_amount * 0.49;
			extra_bonus = extra * 0.5 * 0.02;
			grosSalary = base_pay + day_bonus + extra_bonus;
			merchant_extra = extra * 0.2 * 0.02;
			merchant_pay = salary_amount * 0.105;
			merchant_total = merchant_pay + merchant_extra;
		} else if (numTicket > 450000 && numTicket < 649999) {
			netAmount = 450000 - 450000 * 0.16;
			extra = numTicket - 450000;
			salary_amount = netAmount * 0.02;
			base_pay = salary_amount * 0.405;
			day_bonus = salary_amount * 0.49;
			extra_bonus = extra * 0.5 * 0.02;
			merchant_pay = salary_amount * 0.105;
			merchant_extra = extra * 0.2 * 0.02;
			merchant_total = merchant_pay + merchant_extra;
			grosSalary = base_pay + day_bonus + extra_bonus;
		} else if (numTicket > 6500000 && numTicket < 949999) {
			netAmount = 6500000 - 6500000 * 0.16;
			extra = numTicket - 6500000;
			salary_amount = netAmount * 0.02;
			base_pay = salary_amount * 0.405;
			day_bonus = salary_amount * 0.49;
			extra_bonus = extra * 0.5 * 0.02;
			merchant_pay = salary_amount * 0.105;
			merchant_extra = extra * 0.2 * 0.02;
			merchant_total = merchant_pay + merchant_extra;
			grosSalary = base_pay + day_bonus;
		} else if (numTicket > 950000 && numTicket < 1249999) {
			netAmount = 950000 - 950000 * 0.16;
			extra = numTicket - 950000;
			salary_amount = netAmount * 0.02;
			base_pay = salary_amount * 0.405;
			day_bonus = salary_amount * 0.49;
			extra_bonus = extra * 0.5 * 0.02;
			merchant_pay = salary_amount * 0.105;
			merchant_extra = extra * 0.2 * 0.02;
			merchant_total = merchant_pay + merchant_extra;
			grosSalary = base_pay + day_bonus + extra_bonus;
		} else if (numTicket > 1250000 && numTicket < 1749999) {
			netAmount = 1250000 - 1250000 * 0.15;
			extra = numTicket - 1250000;
			salary_amount = netAmount * 0.02;
			base_pay = salary_amount * 0.4;
			day_bonus = salary_amount * 0.49;
			extra_bonus = extra * 0.5 * 0.02;
			merchant_pay = salary_amount * 0.11;
			merchant_extra = extra * 0.2 * 0.02;
			merchant_total = merchant_pay + merchant_extra;
			grosSalary = base_pay + day_bonus + extra_bonus;
		} else if (numTicket > 1750000 && numTicket < 2249999) {
			netAmount = 1750000 - 1750000 * 0.15;
			extra = numTicket - 1750000;
			salary_amount = netAmount * 0.02;
			base_pay = salary_amount * 0.4;
			day_bonus = salary_amount * 0.49;
			extra_bonus = extra * 0.5 * 0.02;
			merchant_pay = salary_amount * 0.11;
			merchant_extra = extra * 0.2 * 0.02;
			merchant_total = merchant_pay + merchant_extra;
			grosSalary = base_pay + day_bonus + extra_bonus;
		} else if (numTicket > 2250000 && numTicket < 2849999) {
			netAmount = 2250000 - 2250000 * 0.15;
			extra = numTicket - 2250000;
			salary_amount = netAmount * 0.02;
			base_pay = salary_amount * 0.4;
			day_bonus = salary_amount * 0.49;
			extra_bonus = extra * 0.5 * 0.02;
			merchant_pay = salary_amount * 0.11;
			merchant_extra = extra * 0.2 * 0.02;
			merchant_total = merchant_pay + merchant_extra;
			grosSalary = base_pay + day_bonus + extra_bonus;
		} else if (numTicket > 2850000 && numTicket < 3499999) {
			netAmount = 2850000 - 2850000 * 0.15;
			extra = numTicket - 2850000;
			salary_amount = netAmount * 0.02;
			base_pay = salary_amount * 0.4;
			day_bonus = salary_amount * 0.49;
			extra_bonus = extra * 0.5 * 0.02;

			merchant_pay = salary_amount * 0.11;
			merchant_extra = extra * 0.2 * 0.02;
			merchant_total = merchant_pay + merchant_extra;
			grosSalary = base_pay + day_bonus + extra_bonus;
		} else if (numTicket > 3500000 && numTicket < 4499999) {
			netAmount = 3500000 - 3500000 * 0.14;
			extra = numTicket - 3500000;
			salary_amount = netAmount * 0.02;
			base_pay = salary_amount * 0.395;
			day_bonus = salary_amount * 0.48;
			extra_bonus = extra * 0.5 * 0.02;
			merchant_pay = salary_amount * 0.115;
			merchant_extra = extra * 0.2 * 0.02;
			merchant_total = merchant_pay + merchant_extra;
			grosSalary = base_pay + day_bonus + extra_bonus;
		} else if (numTicket > 4500000 && numTicket < 5499999) {
			// console.log('here');
			netAmount = 4500000 - 4500000 * 0.14;
			extra = numTicket - 4500000;
			salary_amount = netAmount * 0.02;
			base_pay = salary_amount * 0.395;
			day_bonus = salary_amount * 0.48;
			extra_bonus = extra * 0.5 * 0.02;
			merchant_pay = salary_amount * 0.115;
			merchant_extra = extra * 0.2 * 0.02;
			merchant_total = merchant_pay + merchant_extra;
			grosSalary = base_pay + day_bonus + extra_bonus;
		} else if (numTicket > 5500000 && numTicket < 6999999) {
			netAmount = 5500000 - 5500000 * 0.14;
			extra = numTicket - 5500000;
			salary_amount = netAmount * 0.02;
			base_pay = salary_amount * 0.395;
			day_bonus = salary_amount * 0.48;
			extra_bonus = extra * 0.5 * 0.02;
			merchant_pay = salary_amount * 0.115;
			merchant_extra = extra * 0.2 * 0.02;
			merchant_total = merchant_pay + merchant_extra;
			grosSalary = base_pay + day_bonus + extra_bonus;
		} else if (numTicket > 7000000 && numTicket < 8499999) {
			netAmount = 7000000 - 7000000 * 0.13;
			extra = numTicket - 7000000;
			salary_amount = netAmount * 0.02;
			base_pay = salary_amount * 0.39;
			day_bonus = salary_amount * 0.47;
			extra_bonus = extra * 0.5 * 0.02;

			merchant_pay = salary_amount * 0.14;
			merchant_extra = extra * 0.2 * 0.02;
			merchant_total = merchant_pay + merchant_extra;
			grosSalary = base_pay + day_bonus + extra_bonus;
		} else if (numTicket > 8500000 && numTicket < 109999999) {
			netAmount = 8500000 - 8500000 * 0.13;
			extra = numTicket - 8500000;
			salary_amount = netAmount * 0.02;
			base_pay = salary_amount * 0.39;
			day_bonus = salary_amount * 0.47;
			extra_bonus = extra * 0.5 * 0.02;
			merchant_pay = salary_amount * 0.14;
			merchant_extra = extra * 0.2 * 0.02;
			merchant_total = merchant_pay + merchant_extra;
			grosSalary = base_pay + day_bonus + extra_bonus;
		} else if (numTicket > 11000000 && numTicket < 13499999) {
			netAmount = 11000000 - 11000000 * 0.13;
			extra = numTicket - 11000000;
			salary_amount = netAmount * 0.02;
			base_pay = salary_amount * 0.39;
			day_bonus = salary_amount * 0.47;
			extra_bonus = extra * 0.5 * 0.02;
			merchant_pay = salary_amount * 0.14;
			merchant_extra = extra * 0.2 * 0.02;
			merchant_total = merchant_pay + merchant_extra;
			grosSalary = base_pay + day_bonus + extra_bonus;
		} else if (numTicket > 13500000 && numTicket < 16999999) {
			netAmount = 13500000 - 13500000 * 0.13;
			extra = numTicket - 13500000;
			salary_amount = netAmount * 0.02;
			base_pay = salary_amount * 0.39;
			day_bonus = salary_amount * 0.47;
			extra_bonus = extra * 0.5 * 0.02;
			merchant_pay = salary_amount * 0.14;
			merchant_extra = extra * 0.2 * 0.02;
			merchant_total = merchant_pay + merchant_extra;
			grosSalary = base_pay + day_bonus + extra_bonus;
		} else if (numTicket > 17000000 && numTicket < 19999999) {
			netAmount = 17000000 - 17000000 * 0.12;
			extra = numTicket - 17000000;
			salary_amount = netAmount * 0.02;
			base_pay = salary_amount * 0.4;
			day_bonus = salary_amount * 0.45;
			extra_bonus = extra * 0.5 * 0.02;
			merchant_pay = salary_amount * 0.15;
			merchant_extra = extra * 0.2 * 0.02;
			merchant_total = merchant_pay + merchant_extra;
			grosSalary = base_pay + day_bonus + extra_bonus;
		} else if (numTicket > 20000000 && numTicket < 24999999) {
			netAmount = 20000000 - 20000000 * 0.12;
			extra = numTicket - 20000000;
			salary_amount = netAmount * 0.02;
			base_pay = salary_amount * 0.4;
			day_bonus = salary_amount * 0.45;
			extra_bonus = extra * 0.5 * 0.02;
			merchant_pay = salary_amount * 0.15;
			merchant_extra = extra * 0.2 * 0.02;
			merchant_total = merchant_pay + merchant_extra;
			grosSalary = base_pay + day_bonus + extra_bonus;
		} else if (numTicket > 25000000 && numTicket < 34999999) {
			netAmount = 25000000 - 25000000 * 0.12;
			extra = numTicket - 25000000;
			salary_amount = netAmount * 0.02;
			base_pay = salary_amount * 0.4;
			day_bonus = salary_amount * 0.45;
			extra_bonus = extra * 0.5 * 0.02;
			merchant_pay = salary_amount * 0.15;
			merchant_extra = extra * 0.2 * 0.02;
			merchant_total = merchant_pay + merchant_extra;
			grosSalary = base_pay + day_bonus + extra_bonus;
		} else if (numTicket > 35000000 && numTicket < 49999999) {
			netAmount = 35000000 - 35000000 * 0.11;
			extra = numTicket - 35000000;
			salary_amount = netAmount * 0.02;
			base_pay = salary_amount * 0.4;
			day_bonus = salary_amount * 0.45;
			extra_bonus = extra * 0.5 * 0.02;
			merchant_pay = salary_amount * 0.15;
			merchant_extra = extra * 0.2 * 0.02;
			merchant_total = merchant_pay + merchant_extra;
			grosSalary = base_pay + day_bonus + extra_bonus;
		} else if (numTicket > 50000000 && numTicket < 99999999) {
			netAmount = 50000000 - 50000000 * 0.11;
			extra = numTicket - 50000000;
			salary_amount = netAmount * 0.02;
			base_pay = salary_amount * 0.4;
			day_bonus = salary_amount * 0.45;
			extra_bonus = extra * 0.5 * 0.02;
			merchant_pay = salary_amount * 0.15;
			merchant_extra = extra * 0.2 * 0.02;
			merchant_total = merchant_pay + merchant_extra;
			grosSalary = base_pay + day_bonus + extra_bonus;
		} else if (numTicket > 100000000 && numTicket < 199999999) {
			netAmount = 100000000 - 100000000 * 0.1;
			extra = numTicket - 100000000;
			salary_amount = netAmount * 0.02;
			base_pay = salary_amount * 0.39;
			day_bonus = salary_amount * 0.44;
			extra_bonus = extra * 0.5 * 0.02;
			merchant_pay = salary_amount * 0.17;
			merchant_extra = extra * 0.2 * 0.02;
			merchant_total = merchant_pay + merchant_extra;
			grosSalary = base_pay + day_bonus + extra_bonus;
		} else if (numTicket > 200000000) {
			netAmount = 200000000 - 200000000 * 0.1;
			extra = numTicket - 200000000;
			salary_amount = netAmount * 0.02;
			base_pay = salary_amount * 0.39;
			day_bonus = salary_amount * 0.44;
			extra_bonus = extra * 0.5 * 0.02;
			merchant_pay = salary_amount * 0.17;
			merchant_extra = extra * 0.2 * 0.02;
			merchant_total = merchant_pay + merchant_extra;
			grosSalary = base_pay + day_bonus + extra_bonus;
		}

		// console.log('===========================');
		// console.log('ID: ', user.id);
		// console.log('Ticket: ', user.ticket);
		// console.log('Salary: ', salary);
		// console.log('Gros Salary: ', grosSalary);
		// console.log('===========================');

		users.push({
			id: user.id,
			nickname: user.nick_name,
			coin: Number(user.ticket),
			salary_amount: Number(salary_amount).toFixed(0),
			base_pay: Number(base_pay).toFixed(0),
			day_bonus: Number(day_bonus).toFixed(0),
			merchant_pay: Number(merchant_pay).toFixed(0),
			grosSalary: Number(grosSalary).toFixed(0),
			extra: Number(extra).toFixed(0),
			extra_bonus: Number(extra_bonus).toFixed(0),
			merchant_extra: Number(merchant_extra).toFixed(0),
			merchant_total: Number(merchant_total).toFixed(0),
		});
	}

	//get total merchant pay
	const totalMerchantPay = users.reduce((acc, user) => {
		return acc + Number(user.merchant_total);
	}, 0);

	//get total coins
	const totalCoins = users.reduce((acc, user) => {
		return acc + Number(user.coin);
	}, 0);

	//get total gross salary
	const totalGrossSalary = users.reduce((acc, user) => {
		return acc + Number(user.grosSalary);
	}, 0);

	res.status(200).json({
		success: true,
		users,
		singleFamily: singleFamily[0],
		totalMerchantPay,
		totalCoins,
		totalGrossSalary,
		totalHost: familyUsers.length,
	});
});
