const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const ErrorCode = require('../error/errorCode');
const ErrorException = require('../error/errorException');
const { isValidEmail, isValidName, isValidPassword } = require('../lib/userValidator');

const {
    NODE_ENV,
    HOST,
    GMAIL_USER,
    GMAIL_PASS,
    JWT_EMAIL_SECRET,
    JWT_PASS_SECRET,
    JWT_SECRET_ACCESS,
    JWT_SECRET_REFRESH
} = process.env;
const BASE_URL = NODE_ENV === 'production' ? HOST : 'http://localhost:5000';

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASS
    }
});

const generateJWT = (value, secret, time) => {
    return jwt.sign({ id: value }, secret, { expiresIn: time });
};

// @desc Provide new Access Token
// @route GET /api/auth/refresh
// @access Private
const handleRefreshToken = asyncHandler(async (req, res) => {
    const { cookies } = req;
    if (!cookies?.jwt) {
        throw new ErrorException(ErrorCode.Unauthenticated);
    }
    const refreshToken = cookies.jwt;
    const decoded = jwt.verify(refreshToken, JWT_SECRET_REFRESH);

    const user = await User.findOne({ _id: decoded.id });
    if (!user) {
        throw new ErrorException(ErrorCode.Forbidden, 'Invalid cookie');
    }

    return res.json({
        name: user.name,
        email: user.email,
        image_url: user.image_url,
        accessToken: generateJWT(user.id, JWT_SECRET_ACCESS, '30s')
    });
});

// @desc Login user
// @route POST /api/auth/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password, remind } = req.body;
    const validEmail = isValidEmail(email);
    const validPassword = isValidPassword(password);

    if (!validEmail || !validPassword) {
        throw new ErrorException(ErrorCode.InvalidCredentials);
    }

    const user = await User.findOne({ email });

    if (user && !user.verified_email) {
        throw new ErrorException(ErrorCode.UnverifiedAccount);
    }

    if (user && (await user.verifyPassword(password))) {
        if (remind) {
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
        res.status(200).json({
            name: user.name,
            email: user.email,
            image_url: user.image_url,
            accessToken: generateJWT(user.id, JWT_SECRET_ACCESS, '30s'),
            remind
        });
        return;
    }

    throw new ErrorException(ErrorCode.InvalidCredentials, 'Email not found');
});

// @desc Register user
// @route POST /api/auth
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const validEmail = isValidEmail(email);
    const validPassword = isValidPassword(password);
    const validName = isValidName(name);

    if (!name || !email || !password) {
        throw new ErrorException(ErrorCode.InvalidCredentials, 'Missing credentials');
    }

    if (!validEmail || !validPassword || !validName) {
        throw new ErrorException(ErrorCode.InvalidCredentials, 'Invalid email, password or name');
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        throw new ErrorException(ErrorCode.InvalidEmail);
    }

    const user = await User.create({
        email,
        name,
        password
    });

    if (user) {
        const token = generateJWT(user._id, JWT_EMAIL_SECRET, '1d');
        const url = `${BASE_URL}/api/auth/confirmation/${token}`;

        transporter.sendMail({
            from: 'login@asd.com',
            to: user.email,
            subject: 'Confirm your email',
            html: `Please click this link to confirm your email: <a href="${url}">Confirm Email</a>`
        });

        res.status(201).send('Confirm your email');
    } else {
        throw new ErrorException(ErrorCode.AsyncError, 'Error creating user');
    }
});

// @desc Confirm email
// @route PUT api/auth/confirmation/:token
// @access Public
const confirmEmail = asyncHandler(async (req, res) => {
    const decode = jwt.verify(req.params.token, JWT_EMAIL_SECRET);
    if (!decode) {
        throw new ErrorException(ErrorCode.InvalidCredentials, 'Invalid token');
    }
    const userUpdate = await User.findByIdAndUpdate({ _id: decode.id }, { verified_email: true });
    if (userUpdate) {
        res.status(200).send('Email successfully verified');
    } else {
        throw new ErrorException(ErrorCode.AsyncError, 'Error updating user');
    }
});

// @desc Send recovery email
// @route GET api/auth/recovery
// @access Public
const sendRecovery = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        throw new ErrorException(ErrorCode.InvalidCredentials, 'Missing email');
    }

    const validEmail = isValidEmail(email);

    if (!validEmail) {
        throw new ErrorException(ErrorCode.InvalidCredentials, 'Invalid email');
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        const token = generateJWT(userExists._id, JWT_PASS_SECRET, '15m');

        const url = `${BASE_URL}/recovery/${token}`;

        transporter.sendMail({
            from: 'login@asd.com',
            to: userExists.email,
            subject: 'Change password',
            html: `Click the link to change your password: <a href="${url}">Change your password</a>`
        });

        res.status(200).send('Check your email for password recovery');
    } else {
        throw new ErrorException(ErrorCode.NotFound);
    }
});

// @desc Resets password
// @route PUT api/auth/reset-password
// @access Private

const resetPassword = asyncHandler(async (req, res) => {
    const { password, token } = req.body;

    if (!password || !token) {
        throw new ErrorException(ErrorCode.InvalidCredentials, 'Missing credentials');
    }

    const validPassword = isValidPassword(password);
    const decoded = jwt.verify(token, JWT_PASS_SECRET);

    if (!validPassword || !decoded) {
        throw new ErrorException(ErrorCode.InvalidCredentials, 'Invalid password or token');
    }

    const user = await User.findOne({ _id: decoded.id });
    Object.assign(user, { password });
    const userUpdated = await user.save();

    if (userUpdated) {
        res.status(200).send('Password has been reset successfully');
    } else {
        throw new ErrorException(ErrorCode.AsyncError, 'Error updating user');
    }
});

module.exports = {
    registerUser,
    loginUser,
    confirmEmail,
    resetPassword,
    sendRecovery,
    handleRefreshToken
};
