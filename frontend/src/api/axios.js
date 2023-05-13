import axios from 'axios';

const baseUrl = import.meta.env.PROD ? import.meta.env.VITE_API_URL : 'http://localhost:5000/';

export default axios.create({
    baseURL: baseUrl
});

export const axiosPrivate = axios.create({
    baseURL: baseUrl,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});
