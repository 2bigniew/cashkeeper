const express = require('express');
const router = express.Router();

const MoneyQuotesController = require('../../Controller/BasicData/MoneyQuotesController');

router.get('/', MoneyQuotesController.getQuotes);

module.exports = router;