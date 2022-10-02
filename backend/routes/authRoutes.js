const router = require('express').Router();
const {
    registerUser,
    loginUser,
    confirmEmail,
    sendRecovery,
    resetPassword
} = require('../controllers/authController');
const { loginGoogle, urlGoogle } = require('../controllers/googleController');
const { loginFacebook, urlFacebook } = require('../controllers/facebookController');
const { loginGithub, urlGithub } = require('../controllers/githubController');

router.post('/', registerUser);
router.post('/login', loginUser);

router.get('/confirmation/:token', confirmEmail);
router.get('/recovery', sendRecovery);
router.put('/reset-password', resetPassword);

router.get('/google/url', urlGoogle);
router.post('/google/callback', loginGoogle);

router.get('/facebook/url', urlFacebook);
router.post('/facebook/callback', loginFacebook);

router.get('/github/url', urlGithub);
router.post('/github/callback', loginGithub);

module.exports = router;
