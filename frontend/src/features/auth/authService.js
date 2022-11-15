import axios from '../../api/axios';

const API_URL = 'api/auth/';

// register user
const register = async (userData) => {
    const res = await axios.post(API_URL, userData);
    if (res.status === 201) {
        return res.data;
    }
    throw new Error();
};

// login user
const login = async (userData) => {
    const res = await axios.post(API_URL + 'login', userData);
    if (res.data?.remind) {
        localStorage.setItem('persist', res.data.remind);
    }
    if (res.status === 200) {
        return res.data;
    }
    throw new Error();
};

// google login
const loginGoogle = async (code) => {
    const res = await axios.post(API_URL + 'google/callback', code);
    if (res.data?.remind) {
        localStorage.setItem('persist', res.data.remind);
    }
    if (res.status === 201) {
        return res.data;
    }
    throw new Error();
};

// facebook login
const loginFacebook = async (code) => {
    const res = await axios.post(API_URL + 'facebook/callback', code);
    if (res.data?.remind) {
        localStorage.setItem('persist', res.data.remind);
    }
    if (res.status === 201) {
        return res.data;
    }
    throw new Error();
};

// github login
const loginGithub = async (code) => {
    const res = await axios.post(API_URL + 'github/callback', code);
    if (res.data?.remind) {
        localStorage.setItem('persist', res.data.remind);
    }
    if (res.status === 201) {
        return res.data;
    }
    throw new Error();
};

// reset password
const resetPassword = async (userData) => {
    const res = await axios.put(API_URL + 'reset-password', userData);
    if (res.status === 200) {
        return res.data;
    }
    throw new Error();
};

const authService = {
    register,
    login,
    loginGoogle,
    loginFacebook,
    loginGithub,
    resetPassword
};
export default authService;
