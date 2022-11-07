const ErrorCode = require('./errorCode');

class ErrorException extends Error {
    status;

    metaData = null;

    constructor(code, metaData) {
        super(code);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = code;
        this.status = 500;
        this.metaData = metaData;
        switch (code) {
            case ErrorCode.InvalidCredentials:
                this.status = 400;
                break;
            case ErrorCode.InvalidEmail:
                this.status = 400;
                break;
            case ErrorCode.Unauthenticated:
                this.status = 401;
                break;
            case ErrorCode.UnverifiedAccount:
                this.status = 401;
                break;
            case ErrorCode.Forbidden:
                this.status = 403;
                break;
            case ErrorCode.NotFound:
                this.status = 404;
                break;
            case ErrorCode.AsyncError:
                this.status = 500;
                break;
            default:
                this.status = 500;
                break;
        }
    }
}

module.exports = ErrorException;
