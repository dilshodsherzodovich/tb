import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  Chip,
} from '@mui/material';
import { formatDate } from 'src/utils/format-time';
import { error, success } from 'src/theme/palette';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { confirmUsersAttendance } from 'src/api/instruction';
import { useCookies } from 'react-cookie';
import { LoadingButton } from '@mui/lab';
import BlurLoader from 'src/components/loader/BlurLoader';

function ConfirmationTable({ users, loading }) {
  const dispatch = useDispatch();

  const { id } = useParams();

  const [cookies] = useCookies();

  const { confirmingUsers } = useSelector((state) => state.instructions);

  const activeInstructionsConfirmingUsers = useMemo(
    () => confirmingUsers?.find((item) => item?.id === id)?.users,
    [confirmingUsers, id]
  );

  const attendtedUsers = useMemo(() => users?.filter((item) => item?.attendance), [users]);

  const handleConfirmUser = (user_id) => {
    dispatch(confirmUsersAttendance({ token: cookies?.access, id, data: { user_id } }));
  };

  return (
    <TableContainer sx={{ position: 'relative' }}>
      {loading ? <BlurLoader /> : null}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>T/R</TableCell>
            <TableCell>Ism va familiyasi</TableCell>
            <TableCell>Kirish vaqti</TableCell>
            <TableCell>Holati</TableCell>
            <TableCell width={50}>Amallar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {attendtedUsers?.map((item, index) => (
            <TableRow key={item}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                {item?.user?.first_name} {item?.user?.last_name}
              </TableCell>
              <TableCell>{formatDate(new Date())}</TableCell>
              <TableCell>
                <Chip
                  variant="outlined"
                  sx={{
                    border: 'none',
                    background: item?.confirmations ? success.lighter : error.lighter,
                  }}
                  label={item?.confirmations ? 'Tasdiqlangan' : 'Tasdiqlanmagan'}
                  color={item?.confirmations ? 'success' : 'error'}
                />
              </TableCell>
              <TableCell>
                {!item?.confirmations ? (
                  <LoadingButton
                    loading={activeInstructionsConfirmingUsers?.includes(item?.user?.id)}
                    onClick={() => handleConfirmUser(item?.user?.id)}
                    variant="contained"
                    color="info"
                    size="small"
                  >
                    Tasdiqlash
                  </LoadingButton>
                ) : null}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ConfirmationTable;
