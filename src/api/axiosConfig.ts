import axios from 'axios';

const API_KEY = import.meta.env.VITE_CO2_EMISSIONS_API_KEY;
const API_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
    }
});

export default axiosInstance;
