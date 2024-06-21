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
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { confirmUsersAttendance } from 'src/api/instruction';
import { useCookies } from 'react-cookie';
import { LoadingButton } from '@mui/lab';
import BlurLoader from 'src/components/loader/BlurLoader';
import { faceRecognition } from 'src/api/auth';
import { toast } from 'react-toastify';
import { clearLastUser } from 'src/redux/slices/instruction.slice';

function ConfirmationTable({ users, loading }) {
  const dispatch = useDispatch();

  const { id } = useParams();

  const [cookies] = useCookies();

  const { confirmingUsers, lastUser } = useSelector((state) => state.instructions);

  const [checkingUser, setCheckingUser] = useState(null);

  const activeInstructionsConfirmingUsers = useMemo(
    () => confirmingUsers?.find((item) => item?.id === id)?.users,
    [confirmingUsers, id]
  );

  useEffect(() => {
    console.log(checkingUser, lastUser);
    if (!lastUser?.id || !checkingUser?.users) return;
    if (checkingUser?.users?.id !== lastUser?.id) {
      toast?.warning("Bu foydalanuvchi siz emassiz, iltimos o'zingizni ma'lumotingizni tasdiqlang");
      setCheckingUser(null);
      dispatch(clearLastUser());
    } else {
      handleConfirmUser(checkingUser?.id);
      setCheckingUser(null);
      dispatch(clearLastUser());
    }
  }, [checkingUser, lastUser]);

  const attendtedUsers = useMemo(() => users?.filter((item) => item?.user_attendance), [users]);

  const handleConfirmUser = (attendace_id) => {
    dispatch(
      confirmUsersAttendance({
        token: cookies?.access,
        id: attendace_id,
        data: { confirmations: true },
      })
    );
  };

  const handleRequestFaceRecognition = () => {
    dispatch(faceRecognition({ token: cookies?.access }));
  };

  // handleConfirmUser(item?.id)

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
                {item?.users?.first_name} {item?.users?.last_name}
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
                    loading={activeInstructionsConfirmingUsers?.includes(item?.users?.id)}
                    onClick={() => {
                      setCheckingUser(item);
                      handleRequestFaceRecognition();
                    }}
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
