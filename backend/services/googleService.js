const axios = require('axios');

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, NODE_ENV, HOST } = process.env;
const redirectURI =
    NODE_ENV === 'production' ? `${HOST}/oauth/google` : 'http://localhost:3000/oauth/google';

function getGoogleAuthURL() {
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const options = {
        redirect_uri: redirectURI,
        client_id: GOOGLE_CLIENT_ID,
        access_type: 'offline',
        response_type: 'code',
        prompt: 'consent',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ].join(' ')
    };
    const usp = new URLSearchParams(options);

    return `${rootUrl}?${usp.toString()}`;
}

async function getTokens(code) {
    // Uses the code to get tokens that can be used to fetch the user's profile
    const url = 'https://oauth2.googleapis.com/token';
    const values = {
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: redirectURI,
        grant_type: 'authorization_code'
    };

    const usp = new URLSearchParams(values);

    const res = await axios.post(url, usp.toString(), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    return res.data;
}

async function fetchUser(idToken, accessToken) {
    // Fetch the user's profile with the access token and bearer
    const res = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`,
        {
            headers: {
                Authorization: `Bearer ${idToken}`
            }
        }
    );

    return res.data;
}

const googleService = { getGoogleAuthURL, getTokens, fetchUser };
module.exports = googleService;
