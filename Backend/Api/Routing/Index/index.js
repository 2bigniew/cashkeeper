const express = require('express');
const router = express.Router();

const HomepageController = require('../../Controller/Index/HomepageController');
const errorHandler = require('../../Middleware/error');

router.get('/', errorHandler.catchAsyncErrors(HomepageController.home));

module.exports = router;