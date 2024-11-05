import React, { useState } from 'react';
import { useFetchEmissionsByYear } from '../../hooks/useFetchEmissionsByYear';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const EmissionsBarChart: React.FC = () => {

    const [selectedYear, setSelectedYear] = useState<string>('2022');

    const handleChange = (event: SelectChangeEvent) => {
      setSelectedYear(event.target.value);
    };

    const { emissionsDataByYear } = useFetchEmissionsByYear(Number(selectedYear));

    const yearOptions = (start: number, stop: number) =>
      Array.from(
        { length: (stop - start) /  1 },
        (_value, index) => start + index
      ).reverse();

    return (
      <div>
        <h2>Emissions by country for year: {selectedYear}</h2>
        <FormControl fullWidth>
          <InputLabel id="year-select-label">Year</InputLabel>
          <Select
            labelId="year-select-label"
            id="year-select"
            value={selectedYear}
            label="Year"
            onChange={handleChange}
          >
            {yearOptions(1960, 2023).map((year) => (
              <MenuItem value={year}>{year}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <BarChart
          width={500}
          height={300}
          data={emissionsDataByYear}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="countryName" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="emissionsValue" fill="#022D5B" activeBar={<Rectangle fill="#48A2C9" stroke="#022D5B" />} />
        </BarChart>
      </div>
    );
};

export default EmissionsBarChart;
