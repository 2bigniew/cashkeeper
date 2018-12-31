const express = require('express');
const router = express.Router();
const passport = require('passport');
const Helpers = require('../../../Helpers/Helpers');

const PartnerCotroller = require('../../Controller/BasicData/PartnerController');

router.get('/list', Helpers.isLoggedIn, PartnerCotroller.getPartnersBasicData);
router.get('/:lastname', Helpers.isLoggedIn, PartnerCotroller.getPartnerDataByLastname);

module.exports = router;