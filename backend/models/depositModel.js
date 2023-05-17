const mongoose = require('mongoose');

const depositSchema = new mongoose.Schema(
	{
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		name: {
			type: String,
		},
		phone: {
			type: String,
		},
		amount: {
			type: Number,
			required: [true, 'Amount is required'],
		},

		method: {
			name: {
				type: String,
				required: [true, 'Method name is required'],
			},
			send_account: {
				type: String,
				required: [true, 'Method number is required'],
			},
			receive_account: {
				type: String,
			},
			type: {
				type: String,
				enum: ['personal', 'agent'],
			},
			paidAt: {
				type: Date,
				default: Date.now,
			},
		},
		transactionId: {
			type: String,
		},
		status: {
			type: String,
			enum: ['pending', 'approved', 'rejected'],
			default: 'pending',
		},
		approvedAt: {
			type: Date,
		},
		approved_by: {
			type: String,
		},
		// rejected
		rejectedAt: {
			type: Date,
		},
		reason: {
			type: String,
		},
		rejected_by: {
			type: String,
		},
		update_by: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Update',
		},
		is_rejected: {
			type: Boolean,
			default: false,
		},
		is_approved: {
			type: Boolean,
			default: false,
		},
		comment: {
			type: String,
			default: 'No comment',
		},
		screen_shot: {
			public_id: {
				type: String,
			},
			url: {
				type: String,
			},
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Deposit', depositSchema);
