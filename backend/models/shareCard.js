const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shareCardSchema = new Schema(
	{
		card_no: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		user_id: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		name: {
			type: String,
		},
		phone: {
			type: String,
		},
		profit: {
			type: String,
			default: '0/0%',
		},
		total_profit: {
			type: Number,
			default: 0,
		},

		buy_date: {
			type: Date,
		},
		expire_date: {
			type: Date,
		},
		renewal_date: {
			type: Date,
		},
		draw_profit: {
			draw_no: {
				type: String,
			},
			amount: {
				type: Number,
			},
		},
		is_sold: {
			type: Boolean,
			default: false,
		},
		is_active: {
			type: Boolean,
			default: false,
		},
		status: {
			type: String,
			enum: ['pending', 'active', 'sold', 'expired'],
			default: 'pending',
		},
	},
	{ strict: false }
);

module.exports = mongoose.model('ShareCard', shareCardSchema);
