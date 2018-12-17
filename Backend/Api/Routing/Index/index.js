const express = require('express');
const router = express.Router();

const HomepageController = require('../../Controller/Index/HomepageController');

router.get('/', HomepageController.home);

module.exports = router;