import React, { useEffect, useState } from 'react';
import EmissionsTable from './tables/EmissionsTable';
import { useFetchCountries } from '../hooks/useFetchCountries';
import { useFetchEmissionsByYearRangeAndCountry } from '../hooks/useFetchEmissionsByYearRangeAndCountry';
import { useFetchAllEmissions } from '../hooks/useFetchAllEmissions';
import Country from '../types/Country';
import { Button, Select, SelectChangeEvent, MenuItem, InputLabel, FormControl, Slider, Box } from '@mui/material';
import EmissionData from '../types/EmissionsData';

const TableContainer: React.FC = () => {
  const { countryData } = useFetchCountries();
  const { emissionsData, fetchEmissionsData } = useFetchEmissionsByYearRangeAndCountry();

  const { data } = useFetchAllEmissions();
  const [tableData, setTableData] = useState<EmissionData[]>([]); // useFetchAllEmissions().data

  const [selectedCountry, setSelectedCountry] = useState<string>("6");

  const minYear = 1960;
  const maxYear = 2022;
  const [yearRange, setYearRange] = useState<number[]>([minYear, maxYear]);

  const handleCountryChange = (event: SelectChangeEvent) => {
    setSelectedCountry(event.target.value);
  };

  const handleYearRangeChange = (_event: Event, newRange: number | number[]) => {
    setYearRange(newRange as number[]);
  };

  const handleSubmit = () => {
    fetchEmissionsData(yearRange[0], yearRange[1], Number(selectedCountry));
  };

  useEffect(() => {
    setTableData(emissionsData);
  }, [emissionsData]);

  useEffect(() => {
    // give the table all the emissions data initially
    if (data) {
        setTableData(data);
    }
  }, [data]);

  return (
    <div>
      <Box component="form" display="flex" flexDirection="column" gap={2}>
        <FormControl fullWidth>
          <InputLabel id="country-select-label">Country</InputLabel>
          <Select
            labelId="country-select-label"
            value={selectedCountry}
            onChange={handleCountryChange}
            label="Country"
          >
            <MenuItem value="">
              <em>All Countries</em>
            </MenuItem>
            {countryData.map((country: Country) => (
              <MenuItem value={country.id}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box>
          <InputLabel id="year-range-label">Year Range</InputLabel>
          <Slider
            value={yearRange}
            onChange={handleYearRangeChange}
            valueLabelDisplay="auto"
            min={minYear}
            max={maxYear}
            step={1}
            marks
          />
        </Box>

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Filter
        </Button>
        <br></br>
      </Box>
      <EmissionsTable data={tableData}/>
    </div>
  );
};

export default TableContainer;
