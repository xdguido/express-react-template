const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const googleAuth = require('../lib/googleAuth');
const User = require('../models/User');

const generateJWT = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const urlGoogle = (req, res) => {
    res.send(googleAuth.getGoogleAuthURL());
};

const loginGoogle = asyncHandler(async (req, res) => {
    const { code } = req.body;

    // eslint-disable-next-line camelcase
    const { id_token, access_token } = await googleAuth.getTokens(code);
    const data = await googleAuth.fetchUser(id_token, access_token);

    if (!data.verified_email) {
        res.status(401);
        throw new Error('User not verified');
    }

    const userExists = await User.findOne({ email: data.email });

    if (userExists) {
        return res.status(201).json({
            token: generateJWT(userExists._id),
            name: userExists.name
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
            name: user.name
        });
    }

    res.status(500);
    throw new Error('Error creating user');
});

module.exports = { loginGoogle, urlGoogle };
