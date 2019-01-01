const express = require('express');
const router = express.Router();
const passport = require('passport');
const Helpers = require('../../../Helpers/Helpers');

const PartnerCotroller = require('../../Controller/BasicData/PartnerController');
const errorHandler = require('../../Middleware/error');

router.get('/list', Helpers.isLoggedIn, errorHandler.catchAsyncErrors(PartnerCotroller.getPartnersBasicData));
router.get('/:lastname', Helpers.isLoggedIn, errorHandler.catchAsyncErrors(PartnerCotroller.getPartnerDataByLastname));

module.exports = router;