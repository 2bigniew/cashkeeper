const express = require('express');
const router = express.Router();
const Helpers = require('../../../Helpers/Helpers');
const errorHandler = require('../../Middleware/error');

const BorrowDetailsController = require('../../Controller/BorrowDetails/BorrowDetailsController');

router.get('/list', Helpers.isLoggedIn, errorHandler.catchAsyncErrors(BorrowDetailsController.getBorrowsDetailsData));
router.get('/find/form', Helpers.isLoggedIn, BorrowDetailsController.getBorrowsForPartnerForm);
router.get('/find', Helpers.isLoggedIn, errorHandler.catchAsyncErrors(BorrowDetailsController.getBorrowsForPartner));
router.get('/find-by-date/form', Helpers.isLoggedIn, BorrowDetailsController.getBorrowsForPartnerByDateForm);
router.get('/find-by-date', Helpers.isLoggedIn, errorHandler.catchAsyncErrors(BorrowDetailsController.getBorrowsForPartnerByDate));

// lista dla wybranych partnerow oraz z wybranego przedzialu dat

// lista sumy wszystkich

// dodawanie nowej pozyczki

// edytowanie pozyczki



module.exports = router;