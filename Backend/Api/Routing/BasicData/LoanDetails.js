const express = require('express');
const router = express.Router();
const Helpers = require('../../../Helpers/Helpers');

const LoanDetailsController = require('../../Controller/BasicData/LoanDetailsController');

router.get('/list', Helpers.isLoggedIn, LoanDetailsController.getLoanDetailsData);

module.exports = router;