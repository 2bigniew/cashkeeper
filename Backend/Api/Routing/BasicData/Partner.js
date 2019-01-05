const express = require('express');
const router = express.Router();
const passport = require('passport');
const Helpers = require('../../../Helpers/Helpers');

const PartnerCotroller = require('../../Controller/Partner/PartnerController');
const PartnerCreateController = require('../../Controller/Partner/PartnerCreateController');
const errorHandler = require('../../Middleware/error');

router.get('/list', Helpers.isLoggedIn, errorHandler.catchAsyncErrors(PartnerCotroller.getPartnersBasicData));
router.get('/:lastname', Helpers.isLoggedIn, errorHandler.catchAsyncErrors(PartnerCotroller.getPartnerDataByLastname));
router.post('/create-partner', Helpers.isLoggedIn, errorHandler.catchAsyncErrors(PartnerCreateController.createPartnerAccount));
// router.put('update-partner);
// router.delete('delete-partner');

module.exports = router;