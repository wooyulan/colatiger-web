import axios from 'axios';

export const service = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 0,
});


export default service;