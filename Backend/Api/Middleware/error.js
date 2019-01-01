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
    res.render('error', {
        message: err.message,
        status: err.status || 500,
    })
}