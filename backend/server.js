const express = require('express');
// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config();
// eslint-disable-next-line no-unused-vars
const colors = require('colors');
const rateLimit = require('express-rate-limit');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

connectDB();
const port = process.env.PORT || 5000;
const app = express();

const apiLimiter = rateLimit({
    windowsMs: 1000,
    max: 5,
    handler: (request, response) => {
        response.status(401);
        throw new Error('Too many requests, please try again later');
    }
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/auth', apiLimiter, require('./routes/authRoutes'));

app.use(errorHandler);

app.listen(port);
