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

exports.loginSuccess = ( req, res, next ) => {
    req.flash('user-message', `Pomyslne logowanie`);
    res.redirect('/home');
};

exports.loginFail = ( req, res, next ) => {
    res.redirect('/home');
};

exports.logout = function(req, res) {
    req.session.destroy(function(err) {
        res.redirect('/home');
    });
}

// exports.authorizationCheck = ( req, res, next ) => {
//     res.send(`Hello. Your login is ${req.body.login} ans password is ${req.body.password}`);
// };