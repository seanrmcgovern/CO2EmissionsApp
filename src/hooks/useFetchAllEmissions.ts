import { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';
import EmissionData from '../types/EmissionsData';

export const useFetchAllEmissions = () => {
    const [data, setData] = useState<EmissionData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEmissionsData = async () => {
            console.log("fetching all emissions");
            setLoading(true);
            try {
                const response = await axios.get('/GetEmissions');
                setData(response.data);
            } catch (err) {
                setError('Failed to fetch emissions data: ' + err);
            } finally {
                setLoading(false);
            }
        };

        fetchEmissionsData();
    }, []);

    return { data, loading, error };
};
