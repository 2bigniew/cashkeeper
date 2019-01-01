const express = require('express');
const router = express.Router();
const Helpers = require('../../../Helpers/Helpers');

const BorrowDetailsController = require('../../Controller/BasicData/BorrowDetailsController');

router.get('/list', Helpers.isLoggedIn, BorrowDetailsController.getBorrowsDetailsData);

module.exports = router;