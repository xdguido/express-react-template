const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const googleService = require('../services/googleService');
const User = require('../models/User');
const ErrorException = require('../error/errorException');
const ErrorCode = require('../error/errorCode');

const generateJWT = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const urlGoogle = (req, res) => {
    res.send(googleService.getGoogleAuthURL());
};

const loginGoogle = asyncHandler(async (req, res) => {
    const { code } = req.body;

    // eslint-disable-next-line camelcase
    const { id_token, access_token } = await googleService.getTokens(code);
    const data = await googleService.fetchUser(id_token, access_token);

    if (data && !data.verified_email) {
        throw new ErrorException(ErrorCode.UnverifiedAccount);
    }

    const userExists = await User.findOne({ email: data.email });

    if (userExists) {
        return res.status(201).json({
            token: generateJWT(userExists._id),
            email: userExists.email,
            name: userExists.name,
            image_url: userExists.image_url
        });
    }

    const user = await User.create({
        email: data.email,
        name: data.name,
        image_url: data.picture,
        verified_email: data.verified_email
    });

    if (user) {
        return res.status(201).json({
            token: generateJWT(user._id),
            email: user.email,
            name: user.name,
            image_url: user.image_url
        });
    }

    throw new ErrorException(ErrorCode.AsyncError, 'Error creating user');
});

module.exports = { loginGoogle, urlGoogle };
