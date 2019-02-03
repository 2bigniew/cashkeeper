const express = require('express');
const router = express.Router();
const Helpers = require('../../../Helpers/Helpers');

const LoanPaymentDetailsController = require('../../Controller/LoanPaymentDetails/LoanPaymentDetailsController');
const LoanPaymentDetailsCreateController = require('../../Controller/LoanPaymentDetails/LoanPaymentDetailsCreateController');
const LoanPaymentDetailsUpdateController = require('../../Controller/LoanPaymentDetails/LoanPaymentDetailsUpdateController');
const LoanPaymentDetailsDeleteController = require('../../Controller/LoanPaymentDetails/LoanPaymentDetailsDeleteController');
const errorHandler = require('../../Middleware/error');

router.get('/list', Helpers.isLoggedIn, errorHandler.catchAsyncErrors(LoanPaymentDetailsController.getLoanPaymentDetailsData));
router.get('/list-by-date', Helpers.isLoggedIn, errorHandler.catchAsyncErrors(LoanPaymentDetailsController.getLoanPaymentDetailsByDate));
router.get('/sum-by-id', Helpers.isLoggedIn, errorHandler.catchAsyncErrors(LoanPaymentDetailsController.getSumById));
router.get('/sum', Helpers.isLoggedIn, errorHandler.catchAsyncErrors(LoanPaymentDetailsController.getSumOfAll));

// LoanPaymentDetailsCreateController
router.get('/create/form', Helpers.isLoggedIn, LoanPaymentDetailsCreateController.crateNewPaymentForm);
router.post('/create', Helpers.isLoggedIn, errorHandler.catchAsyncErrors(LoanPaymentDetailsCreateController.createNewPayment));

// LoanPaymentDetailsUpdateController
router.put('/update', Helpers.isLoggedIn, errorHandler.catchAsyncErrors(LoanPaymentDetailsUpdateController.updateLoanPaymentDetails))

// LoanPaymentDetailsDeleteController
router.delete('/delete', Helpers.isLoggedIn, errorHandler.catchAsyncErrors(LoanPaymentDetailsDeleteController.deleteLoanPaymentDetails));

module.exports = router;