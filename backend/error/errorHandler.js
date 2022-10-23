const ErrorCode = require('./errorCode');
const ErrorException = require('./errorException');

const { NODE_ENV } = process.env;

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
    if (err instanceof ErrorException) {
        res.status(err.status).send(err);
    } else {
        console.error('Unknown Error occured:', err);
        const statusCode = res.statusCode || 500;
        res.status(statusCode).send({
            name: ErrorCode.UnknownError,
            status: statusCode,
            stack: NODE_ENV === 'production' ? null : err.stack
        });
    }
};

module.exports = { errorHandler };
