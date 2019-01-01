const express = require('express');
const router = express.Router();
const Helpers = require('../../../Helpers/Helpers');

const LoanPaymentDetailsController = require('../../Controller/BasicData/LoanPaymentDetailsController');

router.get('/list', Helpers.isLoggedIn, LoanPaymentDetailsController.getLoanPaymentDetailsData);

module.exports = router;