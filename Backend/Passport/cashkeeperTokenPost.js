const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const passport = require('passport');

<<<<<<< HEAD
module.exports = function (passport, user) {
=======
module.exports = function(passport, user) {
>>>>>>> e7222b59ca60091f42a7c038bee7c0e78cce189b
    const User = user;
    passport.use('cashkeeper-token-post', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromBodyField('user_token'),
        secretOrKey: process.env.SECRET
    }, async (jwtPayload, cb) => {
        return await User.findByPk(jwtPayload.user_id)
            .then( user => {
                return cb(null, user);
            })
            .catch( err => {
                return cb(err);
            })
    }));
}