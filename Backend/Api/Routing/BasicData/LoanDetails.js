const express = require('express');
const router = express.Router();
const Helpers = require('../../../Helpers/Helpers');
const errorHandler = require('../../Middleware/error');

const LoanDetailsController = require('../../Controller/LoanDetails/LoanDetailsController');
const LoanDetailsCreateController = require('../../Controller/LoanDetails/LoanDetailsCreateController');
const LoanDetailsUpdateController = require('../../Controller/LoanDetails/LoanDetailsUpdateController');
const LoanDetailsDeleteController = require('../../Controller/LoanDetails/LoanDetailsDeleteController');

// LoanDetailsController
router.get('/list', Helpers.isLoggedIn, errorHandler.catchAsyncErrors(LoanDetailsController.getLoanDetailsData));
router.get('/find/form', Helpers.isLoggedIn, LoanDetailsController.getLoansForPartnerForm);
router.get('/find', Helpers.isLoggedIn, errorHandler.catchAsyncErrors(LoanDetailsController.getLoansForPartner));
router.get('/find-by-date/form', Helpers.isLoggedIn, LoanDetailsController.getLoansForPartnerByDateForm);
router.get('/find-by-date', Helpers.isLoggedIn, errorHandler.catchAsyncErrors(LoanDetailsController.getLoansForPartnerByDate));
router.get('/find/sum', Helpers.isLoggedIn, errorHandler.catchAsyncErrors(LoanDetailsController.getSumOfAll));

// LoanDetailsCreateController
router.get('/create/form', Helpers.isLoggedIn, LoanDetailsCreateController.createLoanForm);
router.post('/create', Helpers.isLoggedIn, errorHandler.catchAsyncErrors(LoanDetailsCreateController.createLoan));

// LoanDetailsUpdateController
router.post('/complete', Helpers.isLoggedIn, errorHandler.catchAsyncErrors(LoanDetailsUpdateController.updateLoan));

// LoanDetailsDeleteController
router.get('/delete', Helpers.isLoggedIn, errorHandler.catchAsyncErrors(LoanDetailsDeleteController.deleteLoan));


module.exports = router;
