import { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';
import EmissionData from '../types/EmissionsData';

export const useFetchEmissionsByYear = (year: number) => {
    const [emissionsDataByYear, setEmissionsDataByYear] = useState<EmissionData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/GetEmissionsByYear/${year}`);
                setEmissionsDataByYear(response.data);
            } catch (err) {
                setError('Failed to fetch emissions by year: ' + err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [year]);

    return { emissionsDataByYear, loading, error };
};
