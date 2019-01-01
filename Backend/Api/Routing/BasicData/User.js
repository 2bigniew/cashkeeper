const express = require('express');
const router = express.Router();
const passport = require('passport');
const Helpers = require('../../../Helpers/Helpers');

const UserController = require('../../Controller/BasicData/UserController');

router.get('/info', Helpers.isLoggedIn, UserController.getUserBasicData);

module.exports = router;