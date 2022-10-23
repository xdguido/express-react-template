const express = require('express');
const path = require('path');
// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config();
// eslint-disable-next-line no-unused-vars
const colors = require('colors');
const rateLimit = require('express-rate-limit');
const { errorHandler } = require('./error/errorHandler');
const ErrorException = require('./error/errorException');
const ErrorCode = require('./error/errorCode');

const { NODE_ENV } = process.env;

const app = express();

const apiLimiter = rateLimit({
    windowsMs: 1000,
    max: 5,
    handler: () => {
        throw new ErrorException(
            ErrorCode.RequestLimit,
            'Too many requests, please try again later'
        );
    }
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/auth', apiLimiter, require('./routes/authRoutes'));

// serve frontend
if (NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../', 'frontend', 'dist', 'index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.send('Please set to production environment');
    });
}

app.use(errorHandler);

module.exports = app;
