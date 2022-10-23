const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const facebookService = require('../services/facebookService');
const User = require('../models/User');
const ErrorException = require('../error/errorException');
const ErrorCode = require('../error/errorCode');

const generateJWT = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const urlFacebook = (req, res) => {
    res.send(facebookService.getFacebookAuthURL());
};

const loginFacebook = asyncHandler(async (req, res) => {
    const { code } = req.body;

    // eslint-disable-next-line camelcase
    const { access_token } = await facebookService.getTokens(code);
    const data = await facebookService.fetchUser(access_token);

    // if (data && !data.verified) {
    //     res.status(401);
    //     throw new Error('User not verified');
    // }

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
        image_url: data.picture.data.url,
        verified_email: true
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

module.exports = { loginFacebook, urlFacebook };
