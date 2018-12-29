const crypto = require('crypto');

module.exports = function(passport, user) {

    const LocalStrategy = require('passport-local').Strategy;

    passport.use('local-log-in', new LocalStrategy({
        usernameField: 'login',
        passwordField: 'password',
        passReqToCallback: true 
    },

    function(req, login, password, done) {
        const User = user;
        const isValidPassword = (userpass, dbpass) => userpass === dbpass;

        User.findOne({
            where: {
                login: login
            }
        }).then(user => {
            if (!user) {
                return done(null, false, {
                    message: 'User does not exist'
                });
            }

            if(!isValidPassword(password, user.password)) {
                return done(null, false, {
                    message: 'Incorrect password.'
                });
            }

            const userInfo = user.get();
            return done(null, userInfo);

        }).catch((err) => {
            console.log("Error:", err);
            return done(null, false, {
                message: 'Something went wrong with your Signin'
            });
 
        });
    }
))
}