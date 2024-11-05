import { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';
import Country from '../types/Country';

export const useFetchCountries = () => {
  const [countryData, setCountryData] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
      const fetchCountriesData = async () => {
          setLoading(true);
          try {
              const response = await axios.get('/GetCountries');
              setCountryData(response.data);
          } catch (err) {
              setError('Failed to fetch countries data: ' + err);
          } finally {
              setLoading(false);
          }
      };

      fetchCountriesData();
  }, []);

  return { countryData, loading, error };
};