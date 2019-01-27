class RouteError extends Error {
    constructor(errorsCount, fileName, lineNumber, ...params) {
        super(...params);

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