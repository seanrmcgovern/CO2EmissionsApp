import { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';
import EmissionData from '../types/EmissionsData';

export const useFetchEmissionsByYearAndCountry = (year: number, countryId: number) => {
    const [data, setData] = useState<EmissionData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEmissionsData = async () => {
            try {
                const response = await axios.get(`/GetEmissionsByYearAndCountry?year=${year}&countryId=${countryId}`);
                setData(response.data);
            } catch (err) {
                setError('Failed to fetch emissions by year and country: ' + err);
            } finally {
                setLoading(false);
            }
        };

        fetchEmissionsData();
    }, [year, countryId]);

    return { data, loading, error };
};
