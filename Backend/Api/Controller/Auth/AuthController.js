const passport   = require('passport');

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

exports.localLogIn = ( req, res, next ) => {
 
    passport.authenticate('local-log-in', (err, user, info) => {
    console.log('----------------------------------------------');
    console.log(user);
    console.log('----------------------------------------------');
    console.log(info);
    req.login(user, (err) => {
      console.log(req.session);
      res.json(user);
    });
  })( req, res, next );

  res.send('działa');
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
        res.redirect('/home');
    });
}

// exports.authorizationCheck = ( req, res, next ) => {
//     res.send(`Hello. Your login is ${req.body.login} ans password is ${req.body.password}`);
// };
