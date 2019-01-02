const express = require('express');
const router = express.Router();

const MoneyQuotesController = require('../../Controller/MoneyQuotes/MoneyQuotesController');
const errorHandler = require('../../Middleware/error');

router.get('/', errorHandler.catchAsyncErrors(MoneyQuotesController.getQuotes));

module.exports = router;