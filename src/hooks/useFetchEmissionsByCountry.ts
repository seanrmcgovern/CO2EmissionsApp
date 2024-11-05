import { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';
import EmissionData from '../types/EmissionsData';

export const useFetchEmissionsByCountry = (countryId: number) => {
    const [countryEmissionsData, setcountryEmissionsData] = useState<EmissionData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEmissionsData = async () => {
            try {
                const response = await axios.get(`/GetEmissionsByCountry/${countryId}`);
                setcountryEmissionsData(response.data.reverse());
            } catch (err) {
                setError('Failed to fetch emissions by country: ' + err);
            } finally {
                setLoading(false);
            }
        };

        fetchEmissionsData();
    }, [countryId]);

    return { countryEmissionsData, loading, error };
};
