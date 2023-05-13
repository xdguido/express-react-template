const express = require('express');
const path = require('path');
// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config();
// eslint-disable-next-line no-unused-vars
const colors = require('colors');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const { errorHandler } = require('./error/errorHandler');
const credentials = require('./middleware/credentials');

const { NODE_ENV } = process.env;

const app = express();

if (NODE_ENV === 'development') {
    app.use(logger);
}
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/auth', require('./routes/authRoutes'));

// serve frontend
// if (NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '../frontend/dist')));
//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, '../', 'frontend', 'dist', 'index.html'));
//     });
// } else {
//     app.get('/', (req, res) => {
//         res.send('Please set to production environment');
//     });
// }

app.use(errorHandler);

module.exports = app;
