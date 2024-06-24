import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  Chip,
  Button,
} from '@mui/material';
import { error, success } from 'src/theme/palette';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addNewAttendance, confirmUsersAttendance } from 'src/api/instruction';
import { useCookies } from 'react-cookie';
import { LoadingButton } from '@mui/lab';
import BlurLoader from 'src/components/loader/BlurLoader';
import { faceRecognition } from 'src/api/auth';
import { isString } from 'lodash';
import { toast } from 'react-toastify';
import { clearLastUser } from 'src/redux/slices/instruction.slice';

function AttendanceTable({ finished, users, loading }) {
  const dispatch = useDispatch();

  const { id } = useParams();

  const [cookies] = useCookies();

  const { confirmingUsers, lastUser } = useSelector((state) => state.instructions);

  const activeInstructionsConfirmingUsers = useMemo(
    () => confirmingUsers?.find((item) => item?.id === id)?.users,
    [confirmingUsers, id]
  );

  useEffect(() => {
    if (finished) return;
    if (isString(lastUser)) {
      toast.warning(lastUser);
    }
    setTimeout(() => {
      dispatch(faceRecognition({ token: cookies?.access }));
    }, 500);

    if (finished || !lastUser?.id) return;
    if (users?.map((item) => item?.users?.id)?.includes(lastUser?.id)) {
      toast.info("Siz allaqachon ro'yxatdan borsiz");
      return;
    }
    dispatch(
      addNewAttendance({
        token: cookies?.access,
        data: [
          {
            user_attendance: true,
            confirmations: false,
            participants: id,
            users: lastUser?.id,
          },
        ],
      })
    );

    // eslint-disable-next-line
  }, [lastUser]);

  useEffect(() => {
    return () => {
      dispatch(clearLastUser());
      const promise = dispatch(faceRecognition());
      promise.abort();
    };
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
                {item?.users?.first_name || item?.user?.username} {item?.users?.last_name}
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
