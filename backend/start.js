const connectDB = require('./config/db');
const app = require('./server');

const { PORT } = process.env;
const port = PORT || 5000;

connectDB();
app.listen(port);
