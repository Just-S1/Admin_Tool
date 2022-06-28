/* eslint-disable */

import React, { useEffect, useState } from 'react';
// material
import {
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
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
// ----------------------------------------------------------------------

export default function SystemUser() {
  const { themeStretch } = useSettings();
  const accessToken = window.localStorage.getItem('accessToken');

  const [data, setData] = useState([]);
  const getData = async () => {
    const { data } = await axios.get(process.env.REACT_APP_HOST_API_KEY.concat('/api/v1/users/'), { headers: { Authorization: `Bearer ${accessToken}` } });
    setData(data);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <Page title="MOEYs | System Users">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Button sx={{float: 'right'}}>Add User</Button>
      </Container>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">First Name</TableCell>
                <TableCell align="center">Last Name</TableCell>
                <TableCell align="center">Gender</TableCell>
                <TableCell align="center">Date of Birth</TableCell>
                <TableCell align="center">Phone Number</TableCell>
                <TableCell align="center">ID Card</TableCell>
                <TableCell align="center">Edit/Delete</TableCell>
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
                  <TableCell align="center" sx={{}}>
                    <Button>Edit</Button>
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
