const passport   = require('passport');
const Helpers = require('../../../Helpers/Helpers');
const RouteError = require('../../../Helpers/Classes/RouteError');
const jwt = require('jsonwebtoken');

exports.createUser = ( req, res, next ) => {
    res.render('createUser.ejs');
};

exports.createUserSuccess = ( req, res, next ) => {
    req.flash('user-message', `Tworzenie konta uzytkownika zakonczone sukcesem`);
    res.redirect(`/home`);
};

exports.createUserFail = ( req, res, next ) => {
    res.redirect(`/home`);
};

exports.login = ( req, res, next ) => {
    res.render('login.ejs');
};

// pousuwać niepotrzebne routy
// zmienić sprawdzanie autoryzacji, z przekierowania na przesłanie jsona
// wyrzucić przekierowanie z logouta

exports.localCreateAcccount = ( req, res, next ) => {
    passport.authenticate('local-create-user', (err, user, info) => {
        const fileName = Helpers.getOnlyFileName(__filename);
        if ( err ) {
            throw new RouteError(1, fileName, 27, 'Somthing went wrong while try to authenticate');
        } else if ( info ) {
            res.status(200);
            res.json(info);
        } else {
            req.login(user, { session: false }, ( err2 ) => {
                if (err2) {
                   throw new RouteError(1, fileName, 34, 'Somthing went wrong while try to authenticate'); 
                } else {
                    const token = jwt.sign(user, process.env.SECRET);
                    res.status(200);
                    res.json({ user, token }); 
                }
            });
        }
    })( req, res, next );
}

exports.localLogIn = ( req, res, next ) => {
    passport.authenticate('local-log-in', (err, user, info) => {
        const fileName = Helpers.getOnlyFileName(__filename);
        if( err ) {
            throw new RouteError(1, fileName, 27, 'Somthing went wrong while try to authenticate');
        } else if (info) {
            res.status(200);
            res.json(info);
        } else {
            req.login(user, { session: false }, ( err2 ) => {
                console.log(req.session);
                console.log('+++++++++++++++++++++++++++++++++++++++++');
                if (err2) {
                    throw new RouteError(1, fileName, 34, 'Somthing went wrong while try to authenticate');
                } else {
                    const token = jwt.sign(user, process.env.SECRET);
                    res.status(200);
                    res.json({ user, token }); 
                }
            });
        }
    })( req, res, next );
};

exports.loginSuccess = ( req, res, next ) => {
    /*let userId;
    if (process.env.NODE_ENV === 'test') {
        userId = 23;
    } else {
        userId = req.session.passport.user;
    };
    
    req.flash('user-message', `Pomyslne logowanie`);
    */
    console.log('----------------------------------------------');
   // console.log(res);
    console.log('----------------------------------------------');
    console.log(req.session);

    /*
    const data = {
	userId: userId
    }

    res.status(200);*/
    res.send('dziala');
};

exports.loginFail = ( req, res, next ) => {
    console.log('----------------------------------------------');
    console.log(req);
    console.log('----------------------------------------------');

};

exports.logout = function(req, res) {
    req.session.destroy(function(err) {
        // res.redirect('/home');
        res.status(200);
        res.json({
            msg: 'Nastąpiło poprawne wylogowanie z systemu.'
        });
    });
}

// exports.authorizationCheck = ( req, res, next ) => {
//     res.send(`Hello. Your login is ${req.body.login} ans password is ${req.body.password}`);
// };
