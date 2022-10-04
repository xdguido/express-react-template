const axios = require('axios');

const { FACEBOOK_CLIENT_ID } = process.env;
const { FACEBOOK_CLIENT_SECRET } = process.env;
const redirectURI = 'http://localhost:3000/facebook';

function getFacebookAuthURL() {
    const rootUrl = 'https://www.facebook.com/v15.0/dialog/oauth';
    const options = {
        redirect_uri: redirectURI,
        client_id: FACEBOOK_CLIENT_ID,
        access_type: 'offline',
        response_type: 'code',
        prompt: 'consent',
        scope: ['public_profile', 'email'].join(' ')
    };
    const usp = new URLSearchParams(options);

    return `${rootUrl}?${usp.toString()}`;
}

async function getTokens(code) {
    // Uses the code to get tokens that can be used to fetch the user's profile
    const url = 'https://graph.facebook.com/v15.0/oauth/access_token';
    const values = {
        code,
        client_id: FACEBOOK_CLIENT_ID,
        client_secret: FACEBOOK_CLIENT_SECRET,
        redirect_uri: redirectURI
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

async function fetchUser(accessToken) {
    // Fetch the user's profile with the access token and bearer
    try {
        const res = await axios.get(
            `https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,email,picture`
        );

        return res.data;
    } catch (error) {
        if (error.response) {
            console.error(error.response.data);
        }
        throw new Error(`Failed to fetch user: ${error.message}`);
    }
}

const facebookService = { getFacebookAuthURL, getTokens, fetchUser };
module.exports = facebookService;
