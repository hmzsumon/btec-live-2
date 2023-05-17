const express = require('express');
const router = express.Router();

const {
	getTables,
	getTable,
	getSalary,
	getUsersByFamilyId,
	createNewHost,
} = require('../controllers/tableController');

router.route('/tables').get(getTables);

router.route('/table/:id').get(getTable);

// get salary info
router.route('/salary').get(getSalary);

// get users by family id
router.route('/family/users').get(getUsersByFamilyId);

// create new host
router.route('/host').post(createNewHost);

module.exports = router;
