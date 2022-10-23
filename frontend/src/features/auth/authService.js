import axios from 'axios';

const API_URL = 'api/auth/';

// register user
const register = async (userData) => {
    const res = await axios.post(API_URL, userData);

    return res.data;
};

// login user
const login = async (userData) => {
    const res = await axios.post(API_URL + 'login', userData);

    if (res.data && res.status === 201) {
        localStorage.setItem('user', JSON.stringify(res.data));
        return res.data;
    } else {
        throw new Error();
    }
};

// google login
const loginGoogle = async (code) => {
    const res = await axios.post(API_URL + 'google/callback', { code });

    if (res.data && res.status === 201) {
        localStorage.setItem('user', JSON.stringify(res.data));
    }

    return res.data;
};

// facebook login
const loginFacebook = async (code) => {
    const res = await axios.post(API_URL + 'facebook/callback', { code });

    if (res.data && res.status === 201) {
        localStorage.setItem('user', JSON.stringify(res.data));
    }

    return res.data;
};

// github login
const loginGithub = async (code) => {
    const res = await axios.post(API_URL + 'github/callback', { code });

    if (res.data && res.status === 201) {
        localStorage.setItem('user', JSON.stringify(res.data));
    }

    return res.data;
};

// logout user
const logout = () => {
    localStorage.removeItem('user');
};

// reset password
const resetPassword = async (userData) => {
    const res = await axios.put(API_URL + 'reset-password', userData);
    return res.data;
};

const authService = {
    register,
    login,
    logout,
    loginGoogle,
    loginFacebook,
    loginGithub,
    resetPassword
};
export default authService;
