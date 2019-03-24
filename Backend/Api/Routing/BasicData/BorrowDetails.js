const express = require('express');
const router = express.Router();
const Helpers = require('../../../Helpers/Helpers');
const errorHandler = require('../../Middleware/error');
const passport = require('passport');

const BorrowDetailsController = require('../../Controller/BorrowDetails/BorrowDetailsController');
const BorrowDetailsCreateController = require('../../Controller/BorrowDetails/BorrowDetailsCreateController');
const BorrowDetailsUpdateController = require('../../Controller/BorrowDetails/BorrowDetailsUpdateController');
const BorrowDetailsDeleteController = require('../../Controller/BorrowDetails/BorrowDetailsDeleteController');

// BorrowDetailsController
router.get('/list', 
	passport.authenticate('cashkeeper-token-get', { session: false }), 
	errorHandler.catchAsyncErrors(BorrowDetailsController.getBorrowsDetailsData));
// router.get('/find/form', Helpers.isLoggedIn, BorrowDetailsController.getBorrowsForPartnerForm);
router.get('/find', 
	passport.authenticate('cashkeeper-token-get', { session: false }), 
	errorHandler.catchAsyncErrors(BorrowDetailsController.getBorrowsForPartner));
// router.get('/find-by-date/form', Helpers.isLoggedIn, BorrowDetailsController.getBorrowsForPartnerByDateForm);
router.get('/find-by-date', 
	passport.authenticate('cashkeeper-token-get', { session: false }), 
	errorHandler.catchAsyncErrors(BorrowDetailsController.getBorrowsForPartnerByDate));
router.get('/find/sum', 
	passport.authenticate('cashkeeper-token-get', { session: false }), 
	errorHandler.catchAsyncErrors(BorrowDetailsController.getSumOfAll));

// BorrowDetailsCreateController
// router.get('/create/form', Helpers.isLoggedIn, BorrowDetailsCreateController.createBorrowForm);
router.post('/create', 
	passport.authenticate('cashkeeper-token-post', { session: false }), 
	errorHandler.catchAsyncErrors(BorrowDetailsCreateController.createBorrow));

// BorrowDetailsUpdateController
router.put('/complete', 
	passport.authenticate('cashkeeper-token-post', { session: false }), 
	errorHandler.catchAsyncErrors(BorrowDetailsUpdateController.updateBorrow));

// BorrowDetailsDeleteController
router.delete('/delete', 
	passport.authenticate('cashkeeper-token-post', { session: false }), 
	errorHandler.catchAsyncErrors(BorrowDetailsDeleteController.deleteBorrow));

module.exports = router;