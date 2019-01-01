const express = require('express');
const router = express.Router();
const Helpers = require('../../../Helpers/Helpers');

const BorrowPaymentDetailsController = require('../../Controller/BasicData/BorrowPaymentDetailsController');

router.get('/list', Helpers.isLoggedIn, BorrowPaymentDetailsController.getBorrowPaymentDetailsData);

module.exports = router;