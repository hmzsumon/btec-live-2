const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
	createShareCard,
	getShareCards,
	buyShareCard,
	getUserShareCardDetails,
} = require('../controllers/shareCardController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const upload = multer({});

// create share card
router
	.route('/new/card')
	.post(isAuthenticatedUser, authorizeRoles('admin'), createShareCard);

// get share card
router.route('/share/cards').get(getShareCards);

// buy share card
router
	.route('/share/card-buy/:id')
	.post(isAuthenticatedUser, authorizeRoles('user'), buyShareCard);

// get user share card details
router
	.route('/share/card-details')
	.get(isAuthenticatedUser, getUserShareCardDetails);
module.exports = router;
