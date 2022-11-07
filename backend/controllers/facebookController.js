const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const facebookService = require('../services/facebookService');
const User = require('../models/User');
const ErrorException = require('../error/errorException');
const ErrorCode = require('../error/errorCode');

const { JWT_SECRET_ACCESS, JWT_SECRET_REFRESH } = process.env;

const generateJWT = (value, secret, time) => {
    return jwt.sign({ id: value }, secret, { expiresIn: time });
};

const urlFacebook = (req, res) => {
    res.send(facebookService.getFacebookAuthURL());
};

const loginFacebook = asyncHandler(async (req, res) => {
    const { code, persist } = req.body;

    // eslint-disable-next-line camelcase
    const { access_token } = await facebookService.getTokens(code);
    const data = await facebookService.fetchUser(access_token);

    // if (data && !data.verified) {
    //     res.status(401);
    //     throw new Error('User not verified');
    // }

    const userExists = await User.findOne({ email: data.email });

    if (userExists) {
        if (persist) {
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
        res.status(201).json({
            accessToken: generateJWT(userExists._id, JWT_SECRET_ACCESS, '30s'),
            email: userExists.email,
            name: userExists.name,
            image_url: userExists.image_url,
            persist: true
        });
        return;
    }

    const user = await User.create({
        email: data.email,
        name: data.name,
        image_url: data.picture.data.url,
        verified_email: true
    });

    if (user) {
        if (persist) {
            res.cookie('jwt', generateJWT(user._id, JWT_SECRET_REFRESH, '30d'), {
                httpOnly: true,
                sameSite: 'None',
                secure: true,
                maxAge: 720 * 60 * 60 * 1000
            });
        } else {
            res.cookie('jwt', generateJWT(user._id, JWT_SECRET_REFRESH, '1d'), {
                httpOnly: true,
                sameSite: 'None',
                secure: true,
                maxAge: 24 * 60 * 60 * 1000
            });
        }
        res.status(201).json({
            accessToken: generateJWT(user._id, JWT_SECRET_ACCESS, '30s'),
            email: user.email,
            name: user.name,
            image_url: user.image_url,
            persist: true
        });
        return;
    }

    throw new ErrorException(ErrorCode.AsyncError, 'Error creating user');
});

module.exports = { loginFacebook, urlFacebook };
