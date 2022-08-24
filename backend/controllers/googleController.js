const googleAuth = require("../lib/googleAuth");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const urlGoogle = (req, res) => {
  res.send(googleAuth.getGoogleAuthURL());
};

const loginGoogle = async (req, res, next) => {
  const code = req.query.code;

  try {
    const { id_token, access_token } = await googleAuth.getTokens(code);
    const data = await googleAuth.fetchUser(id_token, access_token);

    if (!data.verified_email) {
      res.status(401);
      throw new Error("User not verified");
    }

    let userExists = await User.findOne({ email: data.email });

    if (userExists) {
      return res.status(201).json({
        token: generateJWT(userExists._id),
      });
    }

    const user = await User.create({
      email: data.email,
      name: data.name,
      image_url: data.picture,
      verified_email: data.verified_email,
    });

    if (user) {
      res.status(201).json({
        token: generateJWT(user._id),
      });
    } else {
      res.status(404);
      throw new Error("Error creating user");
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const generateJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

module.exports = { loginGoogle, urlGoogle };
