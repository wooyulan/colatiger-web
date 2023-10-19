import axios from 'axios';
import { getStorage} from "@/utils/storage";


export const service = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + getStorage("token")
    },
    timeout: 0,
});

export default service;