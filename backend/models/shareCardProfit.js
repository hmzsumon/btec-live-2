const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shareCardProfitSchema = new Schema(
	{
		profit: {
			type: Number,
		},
		total_cards: {
			type: Number,
		},
		total_profit: {
			type: Number,
		},
		date: {
			type: Date,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('ShareCardProfit', shareCardProfitSchema);
