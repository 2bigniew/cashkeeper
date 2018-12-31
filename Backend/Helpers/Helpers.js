exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()){
        next();
    } else {
        res.redirect('/home');
    }
}

exports.shouldShowLoginOrCreateAccout = (req, res, next) => {
    if (!req.isAuthenticated()){
        next();
    } else {
        res.redirect('/home');
    }
}