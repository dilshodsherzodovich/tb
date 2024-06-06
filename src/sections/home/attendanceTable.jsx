import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  Chip,
} from '@mui/material';
import { error, success } from 'src/theme/palette';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addNewAttendance, confirmUsersAttendance } from 'src/api/instruction';
import { useCookies } from 'react-cookie';
import { LoadingButton } from '@mui/lab';
import BlurLoader from 'src/components/loader/BlurLoader';

function AttendanceTable({ finished, users, loading }) {
  const dispatch = useDispatch();

  const { id } = useParams();

  const [cookies] = useCookies();

  const { confirmingUsers } = useSelector((state) => state.instructions);

  const activeInstructionsConfirmingUsers = useMemo(
    () => confirmingUsers?.find((item) => item?.id === id)?.users,
    [confirmingUsers, id]
  );

  const handleConfirmUser = (user_id) => {
    dispatch(confirmUsersAttendance({ token: cookies?.access, id, data: { user_id } }));
  };

  useEffect(() => {
    if (finished) return;
    dispatch(
      addNewAttendance({
        token: cookies?.access,
        data: [
          {
            user_attendance: true,
            confirmations: false,
            participants: id,
            users: 'b38cd208-e072-451a-a741-7128e5924d69',
          },
          {
            user_attendance: true,
            confirmations: false,
            participants: id,
            users: '6f6b9779-6255-48a6-bfdd-cf1e9185a5a2',
          },
        ],
      })
    );

    // eslint-disable-next-line
  }, []);

  return (
    <TableContainer sx={{ position: 'relative' }}>
      {loading ? <BlurLoader /> : null}

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>T/R</TableCell>
            <TableCell>Ism va familiyasi</TableCell>
            <TableCell>Davomat</TableCell>
            {!finished ? <TableCell width={50}>Amallar</TableCell> : <TableCell>Holati</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.map((item, index) => (
            <TableRow key={item}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                {item?.users?.first_name} {item?.users?.last_name}
              </TableCell>
              <TableCell>
                <Chip
                  variant="outlined"
                  sx={{
                    border: 'none',
                    background: item?.user_attendance ? success.lighter : error.lighter,
                  }}
                  label={item?.user_attendance ? 'Qatnashgan' : 'Qatnashmagan'}
                  color={item?.user_attendance ? 'success' : 'error'}
                />
              </TableCell>
              {finished ? (
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
              ) : null}

              {!item?.user_attendance ? (
                <TableCell>
                  <LoadingButton
                    loading={activeInstructionsConfirmingUsers?.includes(item?.user?.id)}
                    onClick={() => handleConfirmUser(item?.user?.id)}
                    variant="contained"
                    color="info"
                    size="small"
                  >
                    Tasdiqlash
                  </LoadingButton>
                </TableCell>
              ) : null}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AttendanceTable;
