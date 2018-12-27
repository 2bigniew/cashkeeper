const express = require('express');
const router = express.Router();
const passport   = require('passport');

const AuthController = require('../../Controller/Auth/AuthController');

router.get('/', AuthController.login);

router.get('/login-success', AuthController.loginSuccess);

router.get('/login-fail', AuthController.loginFail);;

router.post('/authorization-check', passport.authenticate('local-create-account', {
    successRedirect: '/login-success',
    failureRedirect: '/login-fail'
}));

module.exports = router;