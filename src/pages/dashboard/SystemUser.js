/* eslint-disable */

import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material
import {
  Typography,
  Box,
  Container,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button
} from '@mui/material';
// hooks
import axios from 'axios';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import FormModal from '../../components/_dashboard/system-user/FormModal';
import UserListToolbar from 'src/components/_dashboard/system-user/UserListToolbar';
// ----------------------------------------------------------------------

export default function SystemUser() {
  const { themeStretch } = useSettings();
  const accessToken = window.localStorage.getItem('accessToken');
  const TABLE_HEAD = [
    '#',
    'Fullname',
    'Fullname (Latin)',
    'Gender',
    'Date of Birth',
    'Phone Number',
    'ID Card',
    'Action'
  ];
  const [data, setData] = useState([]);
  const getData = async () => {
    const { data } = await axios.get(process.env.REACT_APP_HOST_API_KEY.concat('/api/v1/users/'), {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    setData(data);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <Page title="MOEYs | System Users">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Box sx={{ mb: 5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" gutterBottom>
                System User
              </Typography>
            </Box>

            <UserListToolbar />
            <Box sx={{ flexShrink: 0 }}>0
              <FormModal />
            </Box>
          </Box>
        </Box>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {TABLE_HEAD.map((headCell) => {
                  return <TableCell align="center">{headCell}</TableCell>;
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((user) => (
                <TableRow key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="center">{user.id}</TableCell>
                  <TableCell align="center">{user.first_name}</TableCell>
                  <TableCell align="center">{user.last_name}</TableCell>
                  <TableCell align="center">{user.gender}</TableCell>
                  <TableCell align="center">{user.date_of_birth}</TableCell>
                  <TableCell align="center">{user.phone_number}</TableCell>
                  <TableCell align="center">{user.id_card}</TableCell>
                  <TableCell align="center">
                    <Button>Update</Button>
                    <Button>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Page>
  );
}
