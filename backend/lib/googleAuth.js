const axios = require('axios');

const { GOOGLE_CLIENT_ID } = process.env;
const { GOOGLE_CLIENT_SECRET } = process.env;
const redirectURI = 'http://localhost:5000/api/auth/google/callback';

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

    try {
        const res = await axios.post(url, usp.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return res.data;
    } catch (error) {
        if (error.response) {
            console.error(error.response.data);
        }
        throw new Error(`Failed to get token: ${error.message}`);
    }
}

async function fetchUser(idToken, accessToken) {
    // Fetch the user's profile with the access token and bearer
    try {
        const res = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`,
            {
                headers: {
                    Authorization: `Bearer ${idToken}`
                }
            }
        );

        // dev log
        console.log(res.data);

        return res.data;
    } catch (error) {
        if (error.response) {
            console.error(error.response.data);
        }
        throw new Error(`Failed to fetch user: ${error.message}`);
    }
}

const googleAuth = { getGoogleAuthURL, getTokens, fetchUser };
module.exports = googleAuth;
