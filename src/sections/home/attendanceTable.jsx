import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  Container,
} from '@mui/material';
import { users } from 'src/_mock/user';
import React, { useEffect } from 'react';
import { formatDate } from 'src/utils/format-time';

function AttendanceTable() {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>T/R</TableCell>
            <TableCell>Ism va familiyasi</TableCell>
            <TableCell>Kirish vaqti</TableCell>
            <TableCell>Bolimi</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.map((item, index) => (
            <TableRow key={item?.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item?.name}</TableCell>
              <TableCell>{formatDate(new Date())}</TableCell>
              <TableCell>{item?.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AttendanceTable;
