const express = require('express');
const router = express.Router();
const Helpers = require('../../../Helpers/Helpers');
const passport = require('passport');

const BorrowPaymentDetailsController = require('../../Controller/BorrowPaymentDetails/BorrowPaymentDetailsController');
const BorrowPaymentDetailsCreateController = require('../../Controller/BorrowPaymentDetails/BorrowPaymentDetailsCreateController');
const BorrowPaymentDetailsUpdateController = require('../../Controller/BorrowPaymentDetails/BorrowPaymentDetailsUpdateController');
const BorrowPaymentDetailsDeleteController = require('../../Controller/BorrowPaymentDetails/BorrowPaymentDetailsDeleteController');
const errorHandler = require('../../Middleware/error');

// BorrowPaymentDetailsController
router.get('/list', 
	passport.authenticate('cashkeeper-token-get', { session: false }), 
	errorHandler.catchAsyncErrors(BorrowPaymentDetailsController.getBorrowPaymentDetailsData));
router.get('/list-by-date', 
	passport.authenticate('cashkeeper-token-get', { session: false }), 
	errorHandler.catchAsyncErrors(BorrowPaymentDetailsController.getBorrowPaymentDetailsByDate));
router.get('/sum-by-id', 
	passport.authenticate('cashkeeper-token-get', { session: false }), 
	errorHandler.catchAsyncErrors(BorrowPaymentDetailsController.getSumById));
router.get('/sum', 
	passport.authenticate('cashkeeper-token-get', { session: false }), 
	errorHandler.catchAsyncErrors(BorrowPaymentDetailsController.getSumOfAll));

// BorrowPaymentDetailsCreateController
// router.get('/create/form', Helpers.isLoggedIn, BorrowPaymentDetailsCreateController.crateNewPaymentForm);
router.post('/create', 
	passport.authenticate('cashkeeper-token-post', { session: false }), 
	errorHandler.catchAsyncErrors(BorrowPaymentDetailsCreateController.createNewPayment));

// BorrowPaymentDetailsUpdateController
router.put('/update', 
	passport.authenticate('cashkeeper-token-post', { session: false }), 
	errorHandler.catchAsyncErrors(BorrowPaymentDetailsUpdateController.updateBorrowPaymentDetails))

// BorrowPaymentDetailsDeleteController
router.delete('/delete', 
	passport.authenticate('cashkeeper-token-post', { session: false }), 
	errorHandler.catchAsyncErrors(BorrowPaymentDetailsDeleteController.deleteBorrowPaymentDetails));

module.exports = router;