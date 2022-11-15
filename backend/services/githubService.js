const axios = require('axios');

const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, NODE_ENV, HOST } = process.env;
const redirectURI =
    NODE_ENV === 'production' ? `${HOST}/oauth/github` : 'http://localhost:3000/oauth/github';

function getGithubAuthURL() {
    const rootUrl = 'https://github.com/login/oauth/authorize';
    const options = {
        redirect_uri: redirectURI,
        client_id: GITHUB_CLIENT_ID,
        scope: 'user'
    };
    const usp = new URLSearchParams(options);

    return `${rootUrl}?${usp.toString()}`;
}

async function getTokens(code) {
    // Uses the code to get tokens that can be used to fetch the user's profile
    const url = 'https://github.com/login/oauth/access_token';
    const values = {
        code,
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        redirect_uri: redirectURI
    };

    const usp = new URLSearchParams(values);

    const res = await axios.post(url, usp.toString(), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json'
        }
    });
    return res.data;
}

async function fetchUser(accessToken) {
    // Fetch the user's profile with the access token and bearer
    const res = await axios.get('https://api.github.com/user', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    const res1 = await axios.get('https://api.github.com/user/emails', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    const res2 = { ...res.data, ...res1.data[0] };
    return res2;
}

const githubService = { getGithubAuthURL, getTokens, fetchUser };
module.exports = githubService;
