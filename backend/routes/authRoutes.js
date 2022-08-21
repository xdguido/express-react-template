const router = require("express").Router();
const googleAuth = require("../lib/googleAuth");

// Getting login URL
router.get("/google/url", (req, res) => {
  return res.send(googleAuth.getGoogleAuthURL());
});

// Getting the user from Google with the code
router.get("/google/callback", async (req, res, next) => {
  const code = req.query.code;
  try {
    const { id_token, access_token } = await googleAuth.getTokens(code);
    const user = await googleAuth.fetchUser(id_token, access_token);
    res.redirect("http://localhost:3000");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
