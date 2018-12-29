exports.login = ( req, res, next ) => {
    res.render('login.ejs');
};

exports.loginSuccess = ( req, res, next ) => {
    res.send(`Success!! Your request body: <br />  ${req.body}`);
};

exports.loginFail = ( req, res, next ) => {
    res.send(`Fail :( Your request body: <br />  ${req.body}`);
};

exports.logout = function(req, res) {
    req.session.destroy(function(err) {
        res.redirect('/home');
    });
}

// exports.authorizationCheck = ( req, res, next ) => {
//     res.send(`Hello. Your login is ${req.body.login} ans password is ${req.body.password}`);
// };