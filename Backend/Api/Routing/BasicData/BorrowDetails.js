const express = require('express');
const router = express.Router();
const Helpers = require('../../../Helpers/Helpers');
const errorHandler = require('../../Middleware/error');

const BorrowDetailsController = require('../../Controller/BorrowDetails/BorrowDetailsController');

router.get('/list', Helpers.isLoggedIn, errorHandler.catchAsyncErrors(BorrowDetailsController.getBorrowsDetailsData));

router.get('/find', Helpers.isLoggedIn, errorHandler.catchAsyncErrors(BorrowDetailsController.getBorrowsForPartner));

// lista dla wybranych partnerow oraz z wybranego przedzialu dat

// lista sumy wszystkich

// dodawanie nowej pozyczki

// edytowanie pozyczki



module.exports = router;