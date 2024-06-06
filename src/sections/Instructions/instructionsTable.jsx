import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  Chip,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom/dist';
import BlurLoader from 'src/components/loader/BlurLoader';
import { success, warning } from 'src/theme/palette';
import { formatDate } from 'src/utils/format-time';

export default function InstructionsTable() {
  const { instrctions, instructionsLoading } = useSelector((state) => state.instructions);

  return (
    <TableContainer sx={{ position: 'relative' }}>
      {instructionsLoading ? <BlurLoader /> : null}
      <Table tableLayout="auto">
        <TableHead>
          <TableRow>
            <TableCell>T/R</TableCell>
            <TableCell>Yaratilgan vaqti</TableCell>
            <TableCell>Holati</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {instrctions?.map((item, index) => (
            <TableRow key={item?.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <Link to={`/instructions/${item?.id}`} style={{ textDecoration: 'none' }}>
                  {formatDate(item?.created_at)}
                </Link>
              </TableCell>

              <TableCell>
                <Chip
                  variant="outlined"
                  sx={{
                    border: 'none',
                    background: item?.completed ? success.lighter : warning?.lighter,
                  }}
                  label={item?.completed ? 'Tugallangan' : 'Tugallanmagan'}
                  color={item?.completed ? 'success' : 'warning'}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
