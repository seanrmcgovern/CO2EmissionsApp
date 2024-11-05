import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import EmissionData from '../../types/EmissionsData';

interface EmissionsTableProps {
  data: EmissionData[];
}

const EmissionsTable: React.FC<EmissionsTableProps> = ({ data }) => {

    console.log({data});

    return (
        <TableContainer component={Paper}>
            <Table sx={{ maxHeight: 400, width: '100%' }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Country Code</TableCell>
                        <TableCell>Country Name</TableCell>
                        <TableCell>Year</TableCell>
                        <TableCell>CO2 Emissions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row: EmissionData) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.countryCode}</TableCell>
                            <TableCell>{row.countryName}</TableCell>
                            <TableCell>{row.year}</TableCell>
                            <TableCell>{row.emissionsValue}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default EmissionsTable;
