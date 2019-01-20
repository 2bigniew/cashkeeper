const express = require('express');
const router = express.Router();
const Helpers = require('../../../Helpers/Helpers');

const BorrowPaymentDetailsController = require('../../Controller/BorrowPaymentDetails/BorrowPaymentDetailsController');
const BorrowPaymentDetailsCreateController = require('../../Controller/BorrowPaymentDetails/BorrowPaymentDetailsCreateController');
const BorrowPaymentDetailsUpdateController = require('../../Controller/BorrowPaymentDetails/BorrowPaymentDetailsUpdateController');
const BorrowPaymentDetailsDeleteController = require('../../Controller/BorrowPaymentDetails/BorrowPaymentDetailsDeleteController');
const errorHandler = require('../../Middleware/error');

// BorrowPaymentDetailsController
router.get('/list', Helpers.isLoggedIn, errorHandler.catchAsyncErrors(BorrowPaymentDetailsController.getBorrowPaymentDetailsData));
router.get('/list-by-date', Helpers.isLoggedIn, errorHandler.catchAsyncErrors(BorrowPaymentDetailsController.getBorrowPaymentDetailsByDate));
router.get('/sum-by-id', Helpers.isLoggedIn, errorHandler.catchAsyncErrors(BorrowPaymentDetailsController.getSumById));
router.get('/sum', Helpers.isLoggedIn, errorHandler.catchAsyncErrors(BorrowPaymentDetailsController.getSumOfAll));

// BorrowPaymentDetailsCreateController
router.get('/create/form', Helpers.isLoggedIn, BorrowPaymentDetailsCreateController.crateNewPaymentForm);
router.post('/create', Helpers.isLoggedIn, errorHandler.catchAsyncErrors(BorrowPaymentDetailsCreateController.createNewPayment));

// BorrowPaymentDetailsUpdateController
router.put('/update', Helpers.isLoggedIn, errorHandler.catchAsyncErrors(BorrowPaymentDetailsUpdateController.updateBorrowPaymentDetails))

// BorrowPaymentDetailsDeleteController
router.delete('/delete', Helpers.isLoggedIn, errorHandler.catchAsyncErrors(BorrowPaymentDetailsDeleteController.deleteBorrowPaymentDetails));

module.exports = router;