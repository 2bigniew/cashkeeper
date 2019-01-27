exports.notFound = (req, res, next) => {
    const err = new Error('Page not found');
    err.status = 404;
    next(err);
}

exports.catchAsyncErrors = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(err => next(err));
    }
}

exports.catchErrors = (err, req, res, next) => {
    res.status( err.status || 500 );
    const myError = {};

    myError.status = err.status || 500;
    myError.message = err.message;
    myError.name = err.name;

    for (prop in err) {
        myError[prop] = err[prop];
    }
    
    res.json(myError);
}