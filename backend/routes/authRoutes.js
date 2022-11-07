const router = require('express').Router();
const rateLimit = require('express-rate-limit');
const {
    registerUser,
    loginUser,
    confirmEmail,
    sendRecovery,
    resetPassword,
    handleRefreshToken
} = require('../controllers/authController');
const { loginGoogle, urlGoogle } = require('../controllers/googleController');
const { loginFacebook, urlFacebook } = require('../controllers/facebookController');
const { loginGithub, urlGithub } = require('../controllers/githubController');
const ErrorException = require('../error/errorException');
const ErrorCode = require('../error/errorCode');

const apiLimiter = rateLimit({
    windowsMs: 1000,
    max: 5,
    handler: () => {
        throw new ErrorException(
            ErrorCode.RequestLimit,
            'Too many requests, please try again later'
        );
    }
});

router.post('/', apiLimiter, registerUser);
router.post('/login', apiLimiter, loginUser);
router.get('/refresh', handleRefreshToken);

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
