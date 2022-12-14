const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const googleService = require('../services/googleService');
const User = require('../models/User');
const ErrorException = require('../error/errorException');
const ErrorCode = require('../error/errorCode');

const { JWT_SECRET_ACCESS, JWT_SECRET_REFRESH } = process.env;

const generateJWT = (value, secret, time) => {
    return jwt.sign({ id: value }, secret, { expiresIn: time });
};

const urlGoogle = (req, res) => {
    res.send(googleService.getGoogleAuthURL());
};

const loginGoogle = asyncHandler(async (req, res) => {
    const { code, remind } = req.body;

    // eslint-disable-next-line camelcase
    const { id_token, access_token } = await googleService.getTokens(code);
    const data = await googleService.fetchUser(id_token, access_token);

    if (!data?.verified_email) {
        throw new ErrorException(ErrorCode.UnverifiedAccount);
    }

    const userExists = await User.findOne({ email: data.email });

    if (userExists) {
        if (remind) {
            res.cookie('jwt', generateJWT(userExists._id, JWT_SECRET_REFRESH, '30d'), {
                httpOnly: true,
                sameSite: 'None',
                secure: true,
                maxAge: 720 * 60 * 60 * 1000
            });
        } else {
            res.cookie('jwt', generateJWT(userExists._id, JWT_SECRET_REFRESH, '1d'), {
                httpOnly: true,
                sameSite: 'None',
                secure: true,
                maxAge: 24 * 60 * 60 * 1000
            });
        }
        return res.status(201).json({
            accessToken: generateJWT(userExists._id, JWT_SECRET_ACCESS, '30s'),
            email: userExists.email,
            name: userExists.name,
            image_url: userExists.image_url,
            remind
        });
    }

    const user = await User.create({
        email: data.email,
        name: data.name,
        image_url: data.picture,
        verified_email: data.verified_email
    });

    if (user) {
        if (remind) {
            res.cookie('jwt', generateJWT(userExists._id, JWT_SECRET_REFRESH, '30d'), {
                httpOnly: true,
                sameSite: 'None',
                secure: true,
                maxAge: 720 * 60 * 60 * 1000
            });
        } else {
            res.cookie('jwt', generateJWT(userExists._id, JWT_SECRET_REFRESH, '1d'), {
                httpOnly: true,
                sameSite: 'None',
                secure: true,
                maxAge: 24 * 60 * 60 * 1000
            });
        }
        return res.status(201).json({
            accessToken: generateJWT(userExists._id, JWT_SECRET_ACCESS, '30s'),
            email: userExists.email,
            name: userExists.name,
            image_url: userExists.image_url,
            remind
        });
    }

    throw new ErrorException(ErrorCode.AsyncError, 'Error creating user');
});

module.exports = { loginGoogle, urlGoogle };
