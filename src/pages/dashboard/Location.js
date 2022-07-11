/* eslint-disable */

import * as React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useParams, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

function Province() {
  let { url } = useLocation();
  let { id } = useParams();
  let province = find(parseInt(id))
  console.log(province)
  return <h1>{province.name}</h1>
}

export default function Location() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Province />
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Kindergarten" {...a11yProps(0)} />
          <Tab label="Primary" {...a11yProps(1)} />
          <Tab label="Lower Secondary" {...a11yProps(2)} />
          <Tab label="Upper Secondary" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        Kindergarten
      </TabPanel>
      <TabPanel value={value} index={1}>
        Primary (1 - 6)
      </TabPanel>
      <TabPanel value={value} index={2}>
        Lower Secondary (7 - 9)
      </TabPanel>
      <TabPanel value={value} index={3}>
        Upper Secondary (10 - 12)
      </TabPanel>
    </Box>
  );
}
