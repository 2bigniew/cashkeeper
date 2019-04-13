const express = require('express');
const router = express.Router();
const passport = require('passport');
const Helpers = require('../../../Helpers/Helpers');

const UserController = require('../../Controller/User/UserController');
const errorHandler = require('../../Middleware/error');

router.get('/info', 
	passport.authenticate('cashkeeper-token-get', { session: false }),
	errorHandler.catchAsyncErrors(UserController.getUserBasicData));

module.exports = router;