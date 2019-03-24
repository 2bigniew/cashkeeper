const express = require('express');
const router = express.Router();
const passport = require('passport');
const Helpers = require('../../../Helpers/Helpers');

const PartnerCotroller = require('../../Controller/Partner/PartnerController');
const PartnerCreateController = require('../../Controller/Partner/PartnerCreateController');
const PartnerUpdateController = require('../../Controller/Partner/PartnerUpdateController');
const PartnerDeleteController = require('../../Controller/Partner/PartnerDeleteController');
const errorHandler = require('../../Middleware/error');

// PartnerCotroller
router.get('/list', 
	passport.authenticate('cashkeeper-token-get', { session: false }), 
	errorHandler.catchAsyncErrors(PartnerCotroller.getPartnersBasicData));

router.get('/:lastname', 
	passport.authenticate('cashkeeper-token-get', { session: false }), 
	errorHandler.catchAsyncErrors(PartnerCotroller.getPartnerDataByLastname));

// PartnerCreateController
// router.get('/create/form', Helpers.isLoggedIn, PartnerCreateController.createPartnerAccountForm);
router.post('/create', 
	passport.authenticate('cashkeeper-token-post', { session: false }), 
	errorHandler.catchAsyncErrors(PartnerCreateController.createPartnerAccount));

// PartnerUpdateController
// router.get('/info/form', Helpers.isLoggedIn, PartnerUpdateController.getPartnerAccountForm);
router.post('/info', 
	passport.authenticate('cashkeeper-token-post', { session: false }), 
	errorHandler.catchAsyncErrors(PartnerUpdateController.getPartnerInfo));
//router.get('/update/form', Helpers.isLoggedIn, PartnerUpdateController.updatePartnerAccountForm);
router.put('/update', 
	passport.authenticate('cashkeeper-token-post', { session: false }),
	errorHandler.catchAsyncErrors(PartnerUpdateController.updatePatnerInfo));

//PartnerDeleteController
// router.get('/delete/form', Helpers.isLoggedIn, PartnerDeleteController.deletePartnerForm);
router.delete('/delete', 
	passport.authenticate('cashkeeper-token-post', { session: false }), 
	errorHandler.catchAsyncErrors(PartnerDeleteController.deletePartner));

module.exports = router;