const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const ErrorException = require('../error/errorException');
const ErrorCode = require('../error/errorCode');

const protect = asyncHandler(async (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // get token from headers
            const token = req.headers.authorization.split(' ')[1];

            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET_ACCESS);

            // get user from the token
            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (err) {
            throw new ErrorException(ErrorCode.Unauthenticated);
        }
    }
});

module.exports = { protect };
