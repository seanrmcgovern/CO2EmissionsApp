import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import EmissionsLineChart from './graphs/EmissionsLineChart';
import BarChart from './graphs/BarChart';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const GraphsContainer: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} TabIndicatorProps={{sx: { background:'#022D5B' }}} >
          <Tab label="Line Graph" />
          <Tab label="Bar Graph" />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <EmissionsLineChart />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <BarChart />
      </CustomTabPanel>
    </Box>
  );
};

export default GraphsContainer;
