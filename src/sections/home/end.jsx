import { LoadingButton } from '@mui/lab';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearCloseRes } from 'src/redux/slices/instruction.slice';

export function End({ goBack, finishInstruction }) {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { closeRes, closing } = useSelector((state) => state.instructions);

  useEffect(() => {
    if (!closeRes?.id) return;
    dispatch(clearCloseRes());
    toast.success('Instruksiya muvaffaqiyatli tugatildi');
    navigate('/');

    // eslint-disable-next-line
  }, [closeRes]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h4" my={2}>
        Haqiqatdan ham yakunlamoqchimisiz
      </Typography>

      <Stack direction="row" gap={2}>
        <Button onClick={goBack} variant="outlined">
          Ortga
        </Button>
        <LoadingButton
          loading={closing}
          color="error"
          onClick={finishInstruction}
          variant="contained"
        >
          Yakunlash
        </LoadingButton>
      </Stack>
    </Box>
  );
}
