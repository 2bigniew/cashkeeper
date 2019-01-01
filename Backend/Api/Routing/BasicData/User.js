const express = require('express');
const router = express.Router();
const passport = require('passport');
const Helpers = require('../../../Helpers/Helpers');

const UserController = require('../../Controller/BasicData/UserController');
const errorHandler = require('../../Middleware/error');

router.get('/info', Helpers.isLoggedIn, errorHandler.catchAsyncErrors(UserController.getUserBasicData));

module.exports = router;