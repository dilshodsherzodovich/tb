import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  Container,
  Chip,
} from '@mui/material';
import { common } from '@mui/material/colors';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom/dist';
import { users } from 'src/_mock/user';
import BlurLoader from 'src/components/loader/BlurLoader';
import { error, info, success, warning } from 'src/theme/palette';
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
            <TableCell>Nomi</TableCell>
            <TableCell>Video</TableCell>
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
                  {item?.name}
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  to={item?.video}
                  target="_blank"
                  style={{ color: common?.main, textDecoration: 'none' }}
                >
                  {item?.video?.split('/')?.reverse()[0]}
                </Link>
              </TableCell>
              <TableCell>{formatDate(new Date())}</TableCell>

              <TableCell>
                <Chip
                  variant="outlined"
                  sx={{
                    border: 'none',
                    background: item?.status ? success.lighter : warning?.lighter,
                  }}
                  label={item?.status ? 'Tugallangan' : 'Tugallanmagan'}
                  color={item?.status ? 'success' : 'warning'}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
