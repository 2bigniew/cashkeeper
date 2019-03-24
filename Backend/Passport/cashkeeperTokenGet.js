const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const passport = require('passport');

module.exports = function(passport, user) {
 
    const User = user;
    passport.use('cashkeeper-token-get', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromUrlQueryParameter('user_token'),
        secretOrKey: process.env.SECRET
    }, (jwtPayload, cb) => {
        console.log(jwtPayload);
        console.log('------------------');
        console.log(cb);
        return User.findByPk(jwtPayload.user_id)
            .then( user => {
                return cb(null, user);
            })
            .catch( err => {
                return cb(err);
            })
    }));
}