const ErrorHander = require('../utils/errorhander');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Table = require('../models/tableModel');
const Host = require('../models/hostModel');
const { loadUser } = require('../utils/userModel');

// find all tables
exports.getTables = catchAsyncErrors(async (req, res, next) => {
	const tables = await Table.find();
	// console.log('call');
	res.status(200).json({
		success: true,
		tables,
	});
});

// find table by id
exports.getTable = catchAsyncErrors(async (req, res, next) => {
	const table = await Table.findById(req.params.id);

	if (!table) {
		return next(new ErrorHander('Table not found with this ID', 404));
	}

	const { name, type, data, database } = table;

	let users = [];
	for (let i = 0; i < data.length; i++) {
		const user = data[i];
		users.push({
			id: user.id,
			nickname: user.nick_name,
			coin: Number(user.ticket),
		});
	}

	res.status(200).json({
		success: true,
		users,
	});
});

// get users salary info
exports.getSalary = catchAsyncErrors(async (req, res, next) => {
	// get all host
	const hosts = await Host.find();
	if (!hosts) {
		return next(new ErrorHander('Host not found with this ID', 404));
	}

	let users = [];
	for (let i = 0; i < hosts.length; i++) {
		const user = hosts[i];
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

		if (numTicket >= 50000 && numTicket <= 249999) {
			netAmount = numTicket * 0.5;
			salary_amount = netAmount * 0.02;
			base_pay = salary_amount;
			grosSalary = base_pay;
		} else if (numTicket >= 250000 && numTicket <= 449999) {
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
		} else if (numTicket >= 450000 && numTicket <= 649999) {
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
		} else if (numTicket >= 6500000 && numTicket < 949999) {
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
		} else if (numTicket >= 950000 && numTicket < 1249999) {
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
		} else if (numTicket >= 1250000 && numTicket < 1749999) {
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
		} else if (numTicket >= 1750000 && numTicket < 2249999) {
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
		} else if (numTicket >= 2250000 && numTicket < 2849999) {
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
		} else if (numTicket >= 2850000 && numTicket < 3499999) {
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
		} else if (numTicket >= 3500000 && numTicket < 4499999) {
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
		} else if (numTicket >= 4500000 && numTicket < 5499999) {
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
		} else if (numTicket >= 5500000 && numTicket < 6999999) {
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
		} else if (numTicket >= 7000000 && numTicket < 8499999) {
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
		} else if (numTicket >= 8500000 && numTicket < 109999999) {
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
		} else if (numTicket >= 11000000 && numTicket < 13499999) {
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
		} else if (numTicket >= 13500000 && numTicket < 16999999) {
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
		} else if (numTicket >= 17000000 && numTicket < 19999999) {
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
		} else if (numTicket >= 20000000 && numTicket < 24999999) {
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
		} else if (numTicket >= 25000000 && numTicket < 34999999) {
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
		} else if (numTicket >= 35000000 && numTicket < 49999999) {
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
		} else if (numTicket >= 50000000 && numTicket < 99999999) {
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
		} else if (numTicket >= 100000000 && numTicket < 199999999) {
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
		} else if (numTicket >= 200000000) {
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

	res.status(200).json({
		success: true,
		users,
		totalUsers: hosts.length,
	});
});

// get users by family_id
exports.getUsersByFamilyId = catchAsyncErrors(async (req, res, next) => {
	const tables = await Table.find();

	if (!tables) {
		return next(new ErrorHander('Tables not found with this ID', 404));
	}
	const userData = tables[2].data;

	const family_id = 76;

	let familyUsers = [];

	for (let i = 0; i < userData.length; i++) {
		const user = userData[i];

		if (user.family_id == family_id) {
			// console.log(user.id);
			familyUsers.push(user);
		}
	}

	// console.log(familyUsers.length);

	res.status(200).json({
		success: true,
	});
});

// create new Host
exports.createNewHost = catchAsyncErrors(async (req, res, next) => {
	const data = loadUser();
	const dataUsers = data[2].data;
	let users = [];

	for (let i = 0; i < dataUsers.length; i++) {
		const user = dataUsers[i];
		// create new host
		const newHost = await Host.create({
			id: user.id,
			ticket: user.ticket,
			nick_name: user.nick_name,
			coin: user.diamonds,
			receive_coin: user.ticket,
			total_use_coin: user.use_diamonds,
			family_id: user.family_id,
			avatar_url: user.identify_hold_image,
			nid_image_url_1: user.identify_positive_image,
			nid_image_url_2: user.identify_negative_image,
		});
		users.push(newHost);
	}

	// console.log(dataUsers.length);

	res.status(201).json({
		success: true,
		users,
	});
});

// top 10 host by receive coin
exports.top10HostByReceiveCoin = catchAsyncErrors(async (req, res, next) => {
	const hosts = await Host.find().sort({ receive_coin: -1 }).limit(10);

	res.status(200).json({
		success: true,
		top10Host: hosts,
	});
});

// convert all host nick_name to text
exports.convertAllHostNickNameToText = catchAsyncErrors(
	async (req, res, next) => {
		const hosts = await Host.find();
		console.log(hosts.length);
		for (let i = 0; i < hosts.length; i++) {
			const host = hosts[i];
			const nickName = host.nick_name.replace(/\[/g, '').replace(/\]/g, '');
			const emoji = nickName.replace(/EMOJI:/g, '');
			const emojiText = emoji.replace(/:/g, '');
			// find host by _id
			const hostById = await Host.findById(host._id);
			hostById.nick_name = emojiText;
			await hostById.save();
		}

		res.status(200).json({
			success: true,
			users,
		});
	}
);

// remove duplicate host by id
exports.removeDuplicateHostById = catchAsyncErrors(async (req, res, next) => {
	// find duplicate host by id
	const hosts = await Host.find();

	for (let i = 0; i < hosts.length; i++) {
		const host = hosts[i];
		const hostById = await Host.findById(host._id);
		if (hostById.id == host.id && hostById._id != host._id) {
			await Host.findByIdAndDelete(host._id);
		}
	}

	res.status(200).json({
		success: true,
		massage: 'Remove duplicate host by id',
	});
});
