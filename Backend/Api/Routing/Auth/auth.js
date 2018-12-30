const express = require('express');
const router = express.Router();
const passport   = require('passport');
const Helpers = require('../../../Helpers/Helpers');

const AuthController = require('../../Controller/Auth/AuthController');

router.get('/login', Helpers.isLoggedIn, AuthController.login);

router.get('/login-success', AuthController.loginSuccess);

router.get('/login-fail', AuthController.loginFail);

router.post('/authorization-login', passport.authenticate('local-log-in', {
    successRedirect: '/login-success',
    failureRedirect: '/login-fail'
}));

router.get('/create-user', Helpers.isLoggedIn, AuthController.createUser);

router.get('/create-user-success', AuthController.createUserSuccess);

router.get('/create-user-fail', AuthController.createUserFail);

router.post('/authorization-create-user', passport.authenticate('local-create-user', {
    successRedirect: '/create-user-success',
    failureRedirect: '/create-user-fail'
}));

router.get('/logout',AuthController.logout);

module.exports = router;