/* eslint-disable no-nested-ternary */
import { Container, Typography } from '@mui/material';

import { useSelector } from 'react-redux';
import AttendanceTable from './attendanceTable';
import VideoInstruction from './videoinstruction';

function FinshedInstruction() {
  const { detail, detailLoading } = useSelector((state) => state.instructions);

  return (
    <Container maxWidth="xl">
      <Typography my={2} variant="h5">
        Qatnashgan ishchilar
      </Typography>
      <AttendanceTable finished loading={detailLoading} users={detail?.participants} />
      <Typography my={2} mt={6} variant="h5">
        Video darslik
      </Typography>
      <VideoInstruction video={detail?.video} loading={detailLoading} />
    </Container>
  );
}

export default FinshedInstruction;
