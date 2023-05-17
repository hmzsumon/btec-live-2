const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const familySchema = new Schema({
	name: {
		type: String,
	},
	type: {
		type: String,
	},
	data: [],
	database: {
		type: String,
	},
});

module.exports = mongoose.model('Family', familySchema);
