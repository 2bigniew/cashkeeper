const crypto = require('crypto');
const Helpers = require('../Helpers/Helpers');
const UserInfo = require('../Database/Models/UserInfo')

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

    passport.use('local-create-user', new LocalStrategy({
        usernameField: 'login',
        passwordField: 'password',
        passReqToCallback: true
    },

    async (req, login, password, done) => {
        const hashPassword = crypto.createHmac('sha256', process.env.SECRET)
            .update(password)
            .digest('hex');
            
        try {
            const user = await User.findOne({
                where: {
                    login: login
                }
            });

            if (user) {
                req.flash('user-message', 'That login is already taken');
                return done(null, false, {
                    message: 'Wybrany login jest zajęty' // napisac przekierowanie i wiadomosc we flashu 
                })
            } else {
                const userPassword = hashPassword;
                const data = {
                    login: login,
                    password: userPassword,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    is_deleted: false,
                    created_at: Helpers.getTimestamp(),
                    bank_account: req.body.bank_account,
                };

                const newUser = await User.create(data);
     
                    if (!newUser) {
                        return done(null, false, {
                            message: 'Nie udało się utworzyć konta użytkownika'
                        });
                    }

                    if (newUser) {
                        const userData =  {
                            street: req.body.street ? req.body.street : null,
                            number: req.body.number ? req.body.number : null, 
                            local: req.body.local ? req.body.local : null,
                            city: req.body.city ? req.body.city : null,
                            country: req.body.country ? req.body.country : null,
                            mobile: req.body.mobile ? req.body.mobile : null,
                            email: req.body.email ? req.body.email : null,
                            user_id: newUser.user_id,
                        };
                        const userInfo = UserInfo.create(userData);
                        req.flash('user-login', newUser.login)
                        return done(null, newUser);
                    }   
            }
        } catch (err) {
            req.flash('user-message', 'Something went wrong :(');
            return done(null, false, {
                message: 'Something went wrong :('
            });
        }
    }
))
}