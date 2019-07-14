class RouteError extends Error {
    constructor(errorsCount, fileName, lineNumber, ...params) {
        super(...params);

        params.forEach( el => {
            el.status ? this.status = el.status : this.status = 500
        });

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, RouteError);
          }

        this.errorsCount = errorsCount;
        this.fileName = fileName;
        this.lineNumber = lineNumber;
        this.name = 'RouteError';
    }  
}

module.exports = RouteError;