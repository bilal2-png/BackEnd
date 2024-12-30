//Basic apierror handling ki config. no need to understand this code.
class ApiError extends Error {
    constructor(
        statusCode,
        message = 'Something went wrong',
        errors = [],
        statck = ""
    ) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        this.data = null;
        this.message = message;
        this.success = false;

        if (stack) {
            this.stack = statck;
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export {ApiError}