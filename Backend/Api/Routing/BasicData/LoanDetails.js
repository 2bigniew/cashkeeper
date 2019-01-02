const express = require('express');
const router = express.Router();
const Helpers = require('../../../Helpers/Helpers');

const LoanDetailsController = require('../../Controller/LoanDetails/LoanDetailsController');
const errorHandler = require('../../Middleware/error');

router.get('/list', Helpers.isLoggedIn, errorHandler.catchAsyncErrors(LoanDetailsController.getLoanDetailsData));

module.exports = router;