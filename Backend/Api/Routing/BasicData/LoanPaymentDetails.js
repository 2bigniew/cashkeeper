const express = require('express');
const router = express.Router();
const Helpers = require('../../../Helpers/Helpers');
const passport = require('passport');

const LoanPaymentDetailsController = require('../../Controller/LoanPaymentDetails/LoanPaymentDetailsController');
const LoanPaymentDetailsCreateController = require('../../Controller/LoanPaymentDetails/LoanPaymentDetailsCreateController');
const LoanPaymentDetailsUpdateController = require('../../Controller/LoanPaymentDetails/LoanPaymentDetailsUpdateController');
const LoanPaymentDetailsDeleteController = require('../../Controller/LoanPaymentDetails/LoanPaymentDetailsDeleteController');
const errorHandler = require('../../Middleware/error');

router.get('/list', 
	passport.authenticate('cashkeeper-token-get', { session: false }), 
	errorHandler.catchAsyncErrors(LoanPaymentDetailsController.getLoanPaymentDetailsData));
router.get('/list-by-date', 
	passport.authenticate('cashkeeper-token-get', { session: false }), 
	errorHandler.catchAsyncErrors(LoanPaymentDetailsController.getLoanPaymentDetailsByDate));
router.get('/sum-by-id', 
	passport.authenticate('cashkeeper-token-get', { session: false }), 
	errorHandler.catchAsyncErrors(LoanPaymentDetailsController.getSumById));
router.get('/sum', 
	passport.authenticate('cashkeeper-token-get', { session: false }), 
	errorHandler.catchAsyncErrors(LoanPaymentDetailsController.getSumOfAll));

// LoanPaymentDetailsCreateController
// router.get('/create/form', Helpers.isLoggedIn, LoanPaymentDetailsCreateController.crateNewPaymentForm);
router.post('/create', 
	passport.authenticate('cashkeeper-token-post', { session: false }), 
	errorHandler.catchAsyncErrors(LoanPaymentDetailsCreateController.createNewPayment));

// LoanPaymentDetailsUpdateController
router.put('/update', 
	passport.authenticate('cashkeeper-token-post', { session: false }), 
	errorHandler.catchAsyncErrors(LoanPaymentDetailsUpdateController.updateLoanPaymentDetails))

// LoanPaymentDetailsDeleteController
router.delete('/delete', 
	passport.authenticate('cashkeeper-token-post', { session: false }), 
	errorHandler.catchAsyncErrors(LoanPaymentDetailsDeleteController.deleteLoanPaymentDetails));

module.exports = router;