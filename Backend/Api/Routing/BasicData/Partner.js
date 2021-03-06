const express = require('express');
const router = express.Router();
const passport = require('passport');
<<<<<<< HEAD
=======
const Helpers = require('../../../Helpers/Helpers');
>>>>>>> e7222b59ca60091f42a7c038bee7c0e78cce189b
const PartnerCotroller = require('../../Controller/Partner/PartnerController');
const PartnerCreateController = require('../../Controller/Partner/PartnerCreateController');
const PartnerUpdateController = require('../../Controller/Partner/PartnerUpdateController');
const PartnerDeleteController = require('../../Controller/Partner/PartnerDeleteController');
const errorHandler = require('../../Middleware/error');

// PartnerCotroller
router.get('/list', 
	passport.authenticate('cashkeeper-token-get', { session: false }), 
	errorHandler.catchAsyncErrors(PartnerCotroller.getPartnersBasicData));

router.get('/getById', 
	passport.authenticate('cashkeeper-token-get', { session: false }), 
	errorHandler.catchAsyncErrors(PartnerCotroller.getSinglePartnerDataById));

router.get('/:lastname', 
	passport.authenticate('cashkeeper-token-get', { session: false }), 
	errorHandler.catchAsyncErrors(PartnerCotroller.getPartnerDataByLastname));

// PartnerCreateController
router.post('/create', 
	passport.authenticate('cashkeeper-token-post', { session: false }), 
	errorHandler.catchAsyncErrors(PartnerCreateController.createPartnerAccount));

// PartnerUpdateController
<<<<<<< HEAD
=======
// router.post('/info', 
// 	passport.authenticate('cashkeeper-token-post', { session: false }), 
// 	errorHandler.catchAsyncErrors(PartnerUpdateController.getPartnerInfo));
>>>>>>> e7222b59ca60091f42a7c038bee7c0e78cce189b
router.put('/update', 
	passport.authenticate('cashkeeper-token-post', { session: false }),
	errorHandler.catchAsyncErrors(PartnerUpdateController.updatePatnerInfo));

//PartnerDeleteController
router.delete('/delete', 
	passport.authenticate('cashkeeper-token-post', { session: false }), 
	errorHandler.catchAsyncErrors(PartnerDeleteController.deletePartner));

module.exports = router;