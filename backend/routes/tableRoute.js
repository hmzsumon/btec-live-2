const express = require('express');
const router = express.Router();

const {
	getTables,
	getTable,
	getSalary,
	getUsersByFamilyId,
	createNewHost,
	top10HostByReceiveCoin,
	convertAllHostNickNameToText,
	removeDuplicateHostById,
	updateAllHostFamilyId,
} = require('../controllers/tableController');

router.route('/tables').get(getTables);

router.route('/table/:id').get(getTable);

// get salary info
router.route('/salary').get(getSalary);

// get users by family id
router.route('/family/users').get(getUsersByFamilyId);

// create new host
router.route('/host').post(createNewHost);

// get top 10 host by receive coin
router.route('/top10').get(top10HostByReceiveCoin);

// convert all host nickname to text
router.route('/convert').put(convertAllHostNickNameToText);

// remove duplicate host by id
router.route('/remove').delete(removeDuplicateHostById);

// update all host family id
router.route('/update/host').put(updateAllHostFamilyId);

module.exports = router;
