const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const githubService = require('../services/githubService');
const User = require('../models/User');
const ErrorException = require('../error/errorException');
const ErrorCode = require('../error/errorCode');

const { JWT_SECRET_ACCESS, JWT_SECRET_REFRESH } = process.env;

const generateJWT = (value, secret, time) => {
    return jwt.sign({ id: value }, secret, { expiresIn: time });
};

const urlGithub = (req, res) => {
    res.send(githubService.getGithubAuthURL());
};

const loginGithub = asyncHandler(async (req, res) => {
    const { code, persist } = req.body;

    // eslint-disable-next-line camelcase
    const { access_token } = await githubService.getTokens(code);
    const data = await githubService.fetchUser(access_token);

    if (data && !data.verified) {
        throw new ErrorException(ErrorCode.UnverifiedAccount);
    }

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
            image_url: userExists.image_url
        });
        return;
    }

    const user = await User.create({
        email: data.email,
        name: data.name,
        image_url: data.avatar_url,
        verified_email: data.verified
    });

    if (user) {
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

module.exports = { loginGithub, urlGithub };
