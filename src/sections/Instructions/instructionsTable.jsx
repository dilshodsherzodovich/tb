import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  Container,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom/dist';
import { users } from 'src/_mock/user';
import { formatDate } from 'src/utils/format-time';

export default function InstructionsTable() {
  const { instrctions, instructionsLoading } = useSelector((state) => state.instructions);

  return (
    <TableContainer>
      <Table tableLayout="auto">
        <TableHead>
          <TableRow>
            <TableCell>T/R</TableCell>
            <TableCell>Nomi</TableCell>
            <TableCell>Yaratilgan vaqti</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {instrctions?.map((item, index) => (
            <TableRow key={item?.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <Link to={`/instructions/${item?.id}`} style={{ textDecoration: 'none' }}>
                  {item?.name}
                </Link>
              </TableCell>
              <TableCell>{formatDate(new Date())}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
