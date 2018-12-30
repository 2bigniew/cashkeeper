exports.createUser = ( req, res, next ) => {
    res.render('createUser.ejs');
};

exports.createUserSuccess = ( req, res, next ) => {
    res.send(`Success!! User created`);
};

exports.createUserFail = ( req, res, next ) => {
    res.send(`Fail :( Try create user again`);
};

exports.login = ( req, res, next ) => {
    res.render('login.ejs');
};

exports.loginSuccess = ( req, res, next ) => {
    // console.log(req.session);
    res.send(`Success!! Hello`);
};

exports.loginFail = ( req, res, next ) => {
    res.send(`Fail :( try login again`);
};

exports.logout = function(req, res) {
    req.session.destroy(function(err) {
        res.redirect('/home');
    });
}

// exports.authorizationCheck = ( req, res, next ) => {
//     res.send(`Hello. Your login is ${req.body.login} ans password is ${req.body.password}`);
// };