const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// @desc Register user
// @route POST /auth
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter a name, email and password");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("Email already registered");
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create user
  const user = await User.create({
    email,
    name,
    password: hashedPassword,
  });

  if (user) {
    try {
      jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" },
        (err, emailToken) => {
          if (err) {
            throw new Error(err);
          }
          const url = `http://localhost:5000/api/auth/confirmation/${emailToken}`;

          transporter.sendMail({
            from: "login@asd.com",
            to: user.email,
            subject: "Confirm your email",
            html: `Please click this link to confirm your email: <a href="${url}">Confirm Email</a>`,
          });
        }
      );

      res.status(201).send("Confirm your email");
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Confirm email
// @route GET /auth/confirmation/:token
// @access Public
const confirmEmail = asyncHandler(async (req, res) => {
  try {
    const user = jwt.verify(req.params.token, process.env.JWT_SECRET);
    await User.findByIdAndUpdate({ _id: user.id }, { verified_email: true });
    res.status(201).send("Email confirmed");
  } catch (err) {
    res.status(400);
    console.error(err);
    throw new Error("Invalid email token");
  }
});

// @desc Login user
// @route POST /auth/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      display_name: user.name,
      email: user.email,
      token: generateJWT(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

//Generate JWT
const generateJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

module.exports = { registerUser, loginUser, confirmEmail };
