const express = require('express');
const router = express.Router();
const Helpers = require('../../../Helpers/Helpers');

const BorrowDetailsController = require('../../Controller/BasicData/BorrowDetailsController');
const errorHandler = require('../../Middleware/error');

router.get('/list', Helpers.isLoggedIn, errorHandler.catchAsyncErrors(BorrowDetailsController.getBorrowsDetailsData));

module.exports = router;