const express = require('express');
const path = require('path');
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

// serve frontend
if (process.env.NODE_ENV === 'production') {
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

app.listen(port);
