const express = require('express');
const router = express.Router();
const {
	getFamilies,
	newFamily,
	getFamilySalaryInfo,
	updateUserSalary,
} = require('../controllers/familyController');

router.route('/admin/agents').get(getFamilies);

router.route('/family/new').post(newFamily);

router.route('/family/salary/:id').get(getFamilySalaryInfo);

// update user salary
router.route('/update/family/salary').put(updateUserSalary);

module.exports = router;
