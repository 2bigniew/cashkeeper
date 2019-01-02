const express = require('express');
const router = express.Router();
const Helpers = require('../../../Helpers/Helpers');

const BorrowPaymentDetailsController = require('../../Controller/BorrowPaymentDetails/BorrowPaymentDetailsController');
const errorHandler = require('../../Middleware/error');

router.get('/list', Helpers.isLoggedIn, errorHandler.catchAsyncErrors(BorrowPaymentDetailsController.getBorrowPaymentDetailsData));

module.exports = router;