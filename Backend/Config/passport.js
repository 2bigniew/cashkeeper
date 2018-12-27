module.exports = function(passport, user) {
 
    const User = user;
    const LocalStrategy = require('passport-local').Strategy;
 
    passport.use('local-create-account', new LocalStrategy({
        usernameField: 'login',
        passwordField: 'password',
        passReqToCallback: true
    },

    function(req, login, password, done) {
        // const generateHash = function(password) {
 
        //     return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);

        // };

        // dlaczego przy create automatycznie nadaje user_id jako NULL ???

        User.findOne({
            where: {
                login: login
            }
        }).then(user => {
            if (user) {
                return done(null, false, {
                    message: 'That email is already taken'
                })
            } else {
                const userPassword = password;
                const data = {
                    login: login,
                    password: userPassword,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    is_deleted: false,
                    created_at: new Date(),
                    bank_account: req.body.bank_account,
                };
                
                User.create(data).then(function(newUser, created) {
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