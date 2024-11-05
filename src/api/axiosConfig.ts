import axios from 'axios';

const API_KEY = import.meta.env.VITE_CO2_EMISSIONS_API_KEY;

const axiosInstance = axios.create({
    baseURL: 'https://co2-emissions-api-fwc3fmf0h8f9ekew.canadacentral-01.azurewebsites.net/api/Emissions',
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
    }
});

export default axiosInstance;
