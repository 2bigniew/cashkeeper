const express = require('express');
const router = express.Router();
const Helpers = require('../../../Helpers/Helpers');
const errorHandler = require('../../Middleware/error');
const passport = require('passport');

const LoanDetailsController = require('../../Controller/LoanDetails/LoanDetailsController');
const LoanDetailsCreateController = require('../../Controller/LoanDetails/LoanDetailsCreateController');
const LoanDetailsUpdateController = require('../../Controller/LoanDetails/LoanDetailsUpdateController');
const LoanDetailsDeleteController = require('../../Controller/LoanDetails/LoanDetailsDeleteController');

// LoanDetailsController
router.get('/list', 
	passport.authenticate('cashkeeper-token-get', { session: false }), 
	errorHandler.catchAsyncErrors(LoanDetailsController.getLoanDetailsData));
// router.get('/find/form', Helpers.isLoggedIn, LoanDetailsController.getLoansForPartnerForm);
router.get('/find', 
	passport.authenticate('cashkeeper-token-get', { session: false }), 
	errorHandler.catchAsyncErrors(LoanDetailsController.getLoansForPartner));
// router.get('/find-by-date/form', Helpers.isLoggedIn, LoanDetailsController.getLoansForPartnerByDateForm);
router.get('/find-by-date', 
	passport.authenticate('cashkeeper-token-get', { session: false }), 
	errorHandler.catchAsyncErrors(LoanDetailsController.getLoansForPartnerByDate));
router.get('/find/sum', 
	passport.authenticate('cashkeeper-token-get', { session: false }), 
	errorHandler.catchAsyncErrors(LoanDetailsController.getSumOfAll));

// LoanDetailsCreateController
// router.get('/create/form', Helpers.isLoggedIn, LoanDetailsCreateController.createLoanForm);
router.post('/create', 
	passport.authenticate('cashkeeper-token-post', { session: false }), 
	errorHandler.catchAsyncErrors(LoanDetailsCreateController.createLoan));

// LoanDetailsUpdateController
router.put('/complete', 
	passport.authenticate('cashkeeper-token-post', { session: false }), 
	errorHandler.catchAsyncErrors(LoanDetailsUpdateController.updateLoan));

// LoanDetailsDeleteController
router.delete('/delete', 
	passport.authenticate('cashkeeper-token-post', { session: false }), 
	errorHandler.catchAsyncErrors(LoanDetailsDeleteController.deleteLoan));

module.exports = router;
