const router = require("express").Router();
const { registerUser, loginUser } = require("../controllers/authController");
const { loginGoogle, urlGoogle } = require("../controllers/googleController");

router.post("/", registerUser);
router.post("/login", loginUser);

// Getting login URL
router.get("/google/url", urlGoogle);

// Getting the user from Google with the code
router.get("/google/callback", loginGoogle);

module.exports = router;
