exports.login = ( req, res, next ) => {
    console.log(req.session);
    res.render('login.ejs');
};

exports.loginSuccess = ( req, res, next ) => {
    console.log(req.session);
    res.send(`Success!! Your request body: <br />  ${req.body}`);
};

exports.loginFail = ( req, res, next ) => {
    console.log(req.body);
    res.send(`Fail :( Your request body: <br />  ${req.body}`);
};

// exports.authorizationCheck = ( req, res, next ) => {
//     res.send(`Hello. Your login is ${req.body.login} ans password is ${req.body.password}`);
// };