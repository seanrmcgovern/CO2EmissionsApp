import { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';
import EmissionsIndicator from '../types/EmissionsIndicator';

export const useFetchCountries = () => {
  const [data, setData] = useState<EmissionsIndicator[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
      const fetchEmissionsIndicatorData = async () => {
          setLoading(true);
          try {
              const response = await axios.get('/GetIndicators');
              setData(response.data);
          } catch (err) {
              setError('Failed to fetch emissions indicator data: ' + err);
          } finally {
              setLoading(false);
          }
      };

      fetchEmissionsIndicatorData();
  }, []);

  return { data, loading, error };
};