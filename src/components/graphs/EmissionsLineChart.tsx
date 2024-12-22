import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useFetchCountries } from '../../hooks/useFetchCountries';
import { useFetchEmissionsByCountry } from '../../hooks/useFetchEmissionsByCountry';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Country from '../../types/Country';

const EmissionsLineChart: React.FC = () => {

    const { countryData } = useFetchCountries();

    const [selectedCountry, setSelectedCountry] = useState<string>('');

    const handleChange = (event: SelectChangeEvent) => {
      setSelectedCountry(event.target.value);
    };

    const { countryEmissionsData } = useFetchEmissionsByCountry(selectedCountry !== '' ? Number(selectedCountry) : 1);

    useEffect(() => {
      if (countryData) {
        // set default to United States
        if (countryData.length === 6) {
          setSelectedCountry(countryData[5].id.toString());
        }
      }
    }, [countryData]);

    return (
      <div>
        <h2>Emissions over time for: {countryData.find(c => c.id == Number(selectedCountry))?.name}</h2>
        <FormControl fullWidth>
          <InputLabel id="country-select-label">Country</InputLabel>
          <Select
            labelId="country-select-label"
            id="country-select"
            value={selectedCountry}
            label="Country"
            onChange={handleChange}
          >
            {countryData.map((country: Country) => (
              <MenuItem key={country.id} value={country.id}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <LineChart 
          width={600}
          height={300} 
          data={countryEmissionsData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis 
              label={{
                value: 'CO2 Emissions (Mt CO2e)',
                angle: -90,
                position: 'insideLeft',
                offset: -10,
                style: { textAnchor: 'middle', fill: '#666' }
              }}
            />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="emissionsValue" stroke="#022D5B" />
        </LineChart>
      </div>
    );
};

export default EmissionsLineChart;
