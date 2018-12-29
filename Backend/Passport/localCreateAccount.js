const crypto = require('crypto');

module.exports = function(passport, user) {
 
    const User = user;
    const LocalStrategy = require('passport-local').Strategy;
        
    passport.serializeUser(function(user, done) {
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

    passport.use('local-create-account', new LocalStrategy({
        usernameField: 'login',
        passwordField: 'password',
        passReqToCallback: true
    },

    function(req, login, password, done) {
        const hashPassword = crypto.createHmac('sha256', process.env.SECRET)
            .update(password)
            .digest('hex');

        User.findOne({
            where: {
                login: login
            }
        }).then(user => {
            if (user) {
                return done(null, false, {
                    message: 'That email is already taken' // napisac przekierowanie i wiadomosc we flashu 
                })
            } else {
                const userPassword = hashPassword;
                const data = {
                    login: login,
                    password: userPassword,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    is_deleted: false,
                    created_at: '2018-12-28 19:24:57',
                    bank_account: req.body.bank_account,
                };

                User.create(data).then(function(newUser) {
                        console.log(newUser);
                    if (!newUser) {
                        return done(null, false);
                    }

                    if (newUser) {
                        return done(null, newUser);
                    }
                });    
            }
        })
    }
))
}