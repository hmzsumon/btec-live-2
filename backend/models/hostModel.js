const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hostSchema = new Schema(
	{
		id: {
			type: String,
			required: true,
		},
		nick_name: {
			type: String,
		},
		ticket: {
			type: Number,
			default: 0,
		},
		coin: {
			type: Number,
			default: 0,
		},
		receive_coin: {
			type: Number,
			default: 0,
		},
		total_use_coin: {
			type: Number,
			default: 0,
		},
		family_id: {
			type: String,
		},
		avatar_url: {
			type: String,
		},
		nid_image_url_1: {
			type: String,
		},
		nid_image_url_2: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Host', hostSchema);
