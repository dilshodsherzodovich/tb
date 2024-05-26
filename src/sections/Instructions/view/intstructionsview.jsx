import { Box } from '@mui/material';
import InstructionsTable from '../instructionsTable';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { getAllInstructions } from 'src/api/instruction';

export default function InstructionsView() {
  const dispatch = useDispatch();

  const [cookies] = useCookies();

  useEffect(() => {
    dispatch(getAllInstructions({ token: cookies?.access }));

    // eslint-disable-next-line
  }, []);
  return (
    <Box component="section">
      <InstructionsTable />
    </Box>
  );
}
