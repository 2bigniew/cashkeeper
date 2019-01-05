const express = require('express');
const router = express.Router();
const Helpers = require('../../../Helpers/Helpers');

const LoanPaymentDetailsController = require('../../Controller/LoanPaymentDetails/LoanPaymentDetailsController');
const errorHandler = require('../../Middleware/error');

router.get('/list', Helpers.isLoggedIn, errorHandler.catchAsyncErrors(LoanPaymentDetailsController.getLoanPaymentDetailsData));

module.exports = router;