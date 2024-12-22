import React, { useState } from 'react';
import { useFetchEmissionsByYear } from '../../hooks/useFetchEmissionsByYear';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { PieChart, Pie, Cell } from 'recharts';

interface LabelProps {
  countryName: string;
  emissionsValue: number;
}

const EmissionsPieChart: React.FC = () => {

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

    const COLORS = ['#009440', '#d92610', '#01164b', '#ff8042', "#ffb7c5", "#2089d4"];
    const renderCustomLabel = ({ countryName, emissionsValue }: LabelProps): string => `${countryName}: ${Math.round(emissionsValue)} tons`;

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
              <MenuItem key={year} value={year}>{year}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <PieChart width={400} height={400}>
          <Pie data={emissionsDataByYear} dataKey="emissionsValue" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" labelLine={false} label={renderCustomLabel} >
            {emissionsDataByYear.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} fontSize={15} />
            ))}
          </Pie>
        </PieChart>
      </div>
    );
};

export default EmissionsPieChart;
