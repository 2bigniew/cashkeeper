const express = require('express');
const router = express.Router();
const passport   = require('passport');
const Helpers = require('../../../Helpers/Helpers');

const AuthController = require('../../Controller/Auth/AuthController');

router.get('/login', Helpers.shouldShowLoginOrCreateAccout, AuthController.login);

router.get('/login-success', AuthController.loginSuccess);

router.get('/login-fail', AuthController.loginFail);

// https://stackoverflow.com/questions/28277094/req-session-passport-and-req-user-empty-serializeuser-and-deserializeuser-are-n
router.post('/authorization-login', AuthController.localLogIn); 

router.post('/authorization-create-account', AuthController.localCreateAcccount);

router.get('/create-user', Helpers.shouldShowLoginOrCreateAccout, AuthController.createUser);

router.get('/create-user-success', AuthController.createUserSuccess);

router.get('/create-user-fail', AuthController.createUserFail);

router.post('/authorization-create-user', passport.authenticate('local-create-user', {
    successRedirect: '/api/auth/create-user-success',
    failureRedirect: '/api/auth/create-user-fail'
}));

router.get('/logout',AuthController.logout);

module.exports = router;
