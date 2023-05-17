const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const convertDetailsSchema = new Schema(
	{
		user_id: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		name: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: true,
		},
		total_convert: {
			type: Number,
			default: 0,
		},
		total_wb_convert: {
			type: Number,
			default: 0,
		},
		total_bb_convert: {
			type: Number,
			default: 0,
		},
		total_count: {
			type: Number,
			default: 0,
		},
		last_convert: {
			type: Number,
			default: 0,
		},
		last_convert_date: {
			type: Date,
			default: Date.now,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('ConvertDetails', convertDetailsSchema);
