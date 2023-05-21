const express = require('express');
const multer = require('multer');
const {
	seedUser,
	loginUser,
	createAdminUser,
	logout,
	updateAllUserIsNew,
	updateALLUser,
	getTop5Users,
	resetPasswordAdmin,
} = require('../controllers/userController');

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const User = require('../models/userModel');

const router = express.Router();

const upload = multer({});

router.route('/seed/users').get(seedUser);

router.route('/login').post(upload.none(), loginUser);

router.route('/createAdmin').post(createAdminUser);

// logout
router.route('/logout').put(logout);

// update all user is_new to false
router.route('/updateAllUserIsNew').put(updateAllUserIsNew);

// update all user is_new to false
router.route('/updateAllUser').put(updateALLUser);

// get top 5 users
router.route('/top5').get(getTop5Users);

// reset password admin
router
	.route('/reset-password')
	.put(
		upload.none(),
		isAuthenticatedUser,
		authorizeRoles('admin'),
		resetPasswordAdmin
	);

module.exports = router;
