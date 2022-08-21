const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", require("./routes/authRoutes"));

//Generate JWT
const generateJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

app.use(errorHandler);

app.listen(port, () => {
  `server start on port ${port}`;
});
