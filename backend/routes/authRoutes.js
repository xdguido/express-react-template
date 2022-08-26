const router = require("express").Router();
const {
  registerUser,
  loginUser,
  confirmEmail,
} = require("../controllers/authController");
const { loginGoogle, urlGoogle } = require("../controllers/googleController");
const User = require("../models/User");

router.post("/", registerUser);
router.post("/login", loginUser);

router.get("/confirmation/:token", confirmEmail);
router.get("/recovery", sendRecovery);
router.put("/reset-password", resetPassword);

router.get("/google/url", urlGoogle);
router.get("/google/callback", loginGoogle);

module.exports = router;
