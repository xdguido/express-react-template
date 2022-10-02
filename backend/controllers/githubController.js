const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const githubService = require('../lib/githubService');
const User = require('../models/User');

const generateJWT = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const urlGithub = (req, res) => {
    res.send(githubService.getGithubAuthURL());
};

const loginGithub = asyncHandler(async (req, res) => {
    const { code } = req.body;

    // eslint-disable-next-line camelcase
    const { access_token } = await githubService.getTokens(code);
    const data = await githubService.fetchUser(access_token);

    if (data && !data.verified) {
        res.status(401);
        throw new Error('User not verified');
    }

    const userExists = await User.findOne({ email: data.email });

    if (userExists) {
        return res.status(201).json({
            token: generateJWT(userExists._id),
            name: userExists.name,
            image_url: userExists.image_url
        });
    }

    const user = await User.create({
        email: data.email,
        name: data.name,
        image_url: data.avatar_url,
        verified_email: data.verified
    });

    if (user) {
        return res.status(201).json({
            token: generateJWT(user._id),
            name: user.name,
            image_url: user.image_url
        });
    }

    res.status(500);
    throw new Error('Error creating user');
});

module.exports = { loginGithub, urlGithub };
