const crypto = require('crypto');

module.exports = function(passport, user) {

    const LocalStrategy = require('passport-local').Strategy;

    passport.serializeUser(function(user, done) {
        console.log(user);
        done(null, user.user_id);
    });

    passport.deserializeUser(function(id, done) {
        User.findByPk(id).then(function(user) {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    });

    passport.use('local-log-in', new LocalStrategy({
        usernameField: 'login',
        passwordField: 'password',
        passReqToCallback: true 
    },

    async (req, login, password, done) => {
        const User = user;
        const isValidPassword = (userpass, dbpass) => userpass === dbpass;

        try {
            const user = await User.findOne({
                where: {
                    login: login
                }
            });

            const hashPassword = crypto.createHmac('sha256', process.env.SECRET)
                .update(password)
                .digest('hex');

            if (!user) {
                const flashMessage = req.flash('user-message', 'User does not exist');
                return done(null, false, {
                    message: 'User does not exist'
                });
            };

            if(!isValidPassword(hashPassword, user.password)) {
                const flashMessage = req.flash('user-message', 'Incorrect password');
                return done(null, false, {
                    message: 'Incorrect password.'
                });
            };

            const userInfo = user.get();
            req.flash('user-login', user.login)
            return done(null, userInfo);

        } catch(err) {
            return done(null, false, {
                message: 'Something went wrong with your Signin'
            });
        }
    }
))
};