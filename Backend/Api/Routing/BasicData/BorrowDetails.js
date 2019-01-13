const express = require('express');
const router = express.Router();
const Helpers = require('../../../Helpers/Helpers');
const errorHandler = require('../../Middleware/error');

const BorrowDetailsController = require('../../Controller/BorrowDetails/BorrowDetailsController');
const BorrowDetailsCreateController = require('../../Controller/BorrowDetails/BorrowDetailsCreateController');
const BorrowDetailsUpdateController = require('../../Controller/BorrowDetails/BorrowDetailsUpdateController');
const BorrowDetailsDeleteController = require('../../Controller/BorrowDetails/BorrowDetailsDeleteController');

// BorrowDetailsController
router.get('/list', Helpers.isLoggedIn, errorHandler.catchAsyncErrors(BorrowDetailsController.getBorrowsDetailsData));
router.get('/find/form', Helpers.isLoggedIn, BorrowDetailsController.getBorrowsForPartnerForm);
router.get('/find', Helpers.isLoggedIn, errorHandler.catchAsyncErrors(BorrowDetailsController.getBorrowsForPartner));
router.get('/find-by-date/form', Helpers.isLoggedIn, BorrowDetailsController.getBorrowsForPartnerByDateForm);
router.get('/find-by-date', Helpers.isLoggedIn, errorHandler.catchAsyncErrors(BorrowDetailsController.getBorrowsForPartnerByDate));
router.get('/find/sum', Helpers.isLoggedIn, errorHandler.catchAsyncErrors(BorrowDetailsController.getSumOfAll));

// BorrowDetailsCreateController
router.get('/create/form', Helpers.isLoggedIn, BorrowDetailsCreateController.createBorrowForm);
router.post('/create', Helpers.isLoggedIn, errorHandler.catchAsyncErrors(BorrowDetailsCreateController.createBorrow));

// BorrowDetailsUpdateController
router.post('/complete', Helpers.isLoggedIn, errorHandler.catchAsyncErrors(BorrowDetailsUpdateController.updateBorrow));

// BorrowDetailsDeleteController
router.get('/delete', Helpers.isLoggedIn, errorHandler.catchAsyncErrors(BorrowDetailsDeleteController.deleteBorrow));

// lista sumy wszystkich

module.exports = router;