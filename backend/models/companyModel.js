const { toolresults_v1beta3 } = require('googleapis');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
		},
		email: {
			type: String,
			trim: true,
		},
		phone: {
			type: String,
			trim: true,
		},
		website: {
			type: String,
			trim: true,
		},
		currency: {
			type: String,
			default: 'BDT',
		},
		address: {
			type: String,
			trim: true,
		},

		city: {
			type: String,
			trim: true,
		},

		state: {
			type: String,
			trim: true,
		},

		zip: {
			type: String,
			trim: true,
		},

		country: {
			type: String,
			default: 'USA',
		},

		// about
		about: {
			type: String,
			trim: true,
		},
		// company logo
		companyLogo: {
			type: String,
			trim: true,
		},

		//users
		users: {
			total_users: {
				type: Number,
				default: 0,
			},
			new_users: {
				type: Number,
				default: 0,
			},
			email_verified_users: {
				type: Number,
				default: 0,
			},
			total_active_users: {
				type: Number,
				default: 0,
			},

			logged_in_users: {
				type: Number,
				default: 0,
			},

			total_send_money_users: {
				type: Number,
				default: 0,
			},
		},

		// lottery options
		lottery: {
			isLottery: {
				type: Boolean,
				default: true,
			},
			totalSellCount: {
				type: Number,
				default: 0,
			},
			totalSellAmount: {
				type: Number,
				default: 0,
			},
			toDaySellCount: {
				type: Number,
				default: 0,
			},
			toDaySellAmount: {
				type: Number,
				default: 0,
			},
			lotteryProfit: {
				type: Number,
				default: 0,
			},
			todayProfit: {
				type: Number,
				default: 0,
			},
		},

		//draw options

		isDraw: {
			type: Boolean,
			default: true,
		},
		totalDrawCount: {
			type: Number,
			default: 0,
		},
		active_draw_id: {
			type: String,
			default: '',
		},
		active_draw_title: {
			type: String,
			default: '',
		},
		active_draw_number: {
			type: Number,
			default: 0,
		},
		active_draw_profit: {
			type: Number,
			default: 0,
		},

		// ticket options
		total_tickets: {
			type: Number,
			default: 0,
		},

		is_draw_active: {
			type: Boolean,
			default: true,
		},

		// convert options
		convert: {
			isConvert: {
				type: Boolean,
				default: true,
			},
			totalConvert: {
				type: Number,
				default: 0,
			},
			totalConvertCount: {
				type: Number,
				default: 0,
			},
			todayConvert: {
				type: Number,
				default: 0,
			},
			todayConvertCount: {
				type: Number,
				default: 0,
			},
		},

		// withdraw options
		withdraw: {
			is_withdraw: {
				type: Boolean,
				default: true,
			},

			totalWithdraw: {
				type: Number,
				default: 0,
			},

			totalWithdrawCount: {
				type: Number,
				default: 0,
			},

			todayWithdraw: {
				type: Number,
				default: 0,
			},

			total_w_charge: {
				type: Number,
				default: 0,
			},

			total_w_balance: {
				type: Number,
				default: 0,
			},

			new_withdraw: {
				type: Number,
				default: 0,
			},

			pending_withdraw_count: {
				type: Number,
				default: 0,
			},
			pending_withdraw_amount: {
				type: Number,
				default: 0,
			},

			todayWithdrawCount: {
				type: Number,
				default: 0,
			},

			total_c_w_amount: {
				type: Number,
				default: 0,
			},
		},

		// total cost
		cost: {
			total_cost: {
				type: Number,
				default: 0,
			},
			today_cost: {
				type: Number,
				default: 0,
			},
			lottery_cost: {
				type: Number,
				default: 0,
			},
			lucky_box_cost: {
				type: Number,
				default: 0,
			},
			signup_bonus_cost: {
				type: Number,
				default: 0,
			},
			referral_bonus_cost: {
				type: Number,
				default: 0,
			},
		},
		income: {
			total_income: {
				type: Number,
				default: 0,
			},
			today_income: {
				type: Number,
				default: 0,
			},
			lottery_income: {
				type: Number,
				default: 0,
			},
			withdraw_charge: {
				type: Number,
				default: 0,
			},
			convert_charge: {
				type: Number,
				default: 0,
			},
		},

		// deposit options
		deposit: {
			totalDepositCount: {
				type: Number,
				default: 0,
			},
			totalDepositAmount: {
				type: Number,
				default: 0,
			},
			todayDepositCount: {
				type: Number,
				default: 0,
			},
			todayDepositAmount: {
				type: Number,
				default: 0,
			},
			total_d_bonus: {
				type: Number,
				default: 0,
			},
			new_deposit_amount: {
				type: Number,
				default: 0,
			},
			new_deposit_count: {
				type: Number,
				default: 0,
			},
			rejectedDepositAmount: {
				type: Number,
				default: 0,
			},
			rejectedDepositCount: {
				type: Number,
				default: 0,
			},
			d_rejected_ids: [],
		},

		//verify options
		verify: {
			pending: {
				type: Number,
				default: 0,
			},
			verified: {
				type: Number,
				default: 0,
			},
			rejected: {
				type: Number,
				default: 0,
			},
			new_verify: {
				type: Number,
				default: 0,
			},
		},

		// share card options
		share_card: {
			card_quantity: {
				type: Number,
				default: 0,
			},
			total_sold_qty: {
				type: Number,
				default: 0,
			},

			total_sold_amount: {
				type: Number,
				default: 0,
			},
			today_sold_qty: {
				type: Number,
				default: 0,
			},

			today_sold_amount: {
				type: Number,
				default: 0,
			},
			card_sponsor_bonus: {
				type: Number,
				default: 0,
			},
			card_profit: {
				type: Number,
				default: 0,
			},
		},
		notifications: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Notification',
			},
		],
	},
	{ timestamps: true }
);

const Company = mongoose.model('Company', companySchema);
module.exports = Company;
