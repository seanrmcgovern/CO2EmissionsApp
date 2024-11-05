import { useState } from 'react';
import axios from '../api/axiosConfig';
import EmissionData from '../types/EmissionsData';

export const useFetchEmissionsByYearRangeAndCountry = () => {
    const [emissionsData, setEmissionsData] = useState<EmissionData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchEmissionsData = async (minYear: number, maxYear: number, countryId: number) => {
        try {
            const response = await axios.get(`/GetEmissionsByYearRangeAndCountry/${minYear}/${maxYear}/${countryId}`);
            setEmissionsData(response.data);
        } catch (err) {
            setError('Failed to fetch emissions by year range and country: ' + err);
        } finally {
            setLoading(false);
        }
    };

    return { emissionsData, loading, error, fetchEmissionsData };
};