import { Autocomplete, Container, Stack, TextField, Typography } from '@mui/material';
import InstructionsTable from '../instructionsTable';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { getAllInstructions } from 'src/api/instruction';

export default function InstructionsView() {
  const dispatch = useDispatch();

  const [cookies] = useCookies();

  const [status, setStatus] = useState(undefined);

  useEffect(() => {
    dispatch(getAllInstructions({ token: cookies?.access, status }));

    // eslint-disable-next-line
  }, [status]);

  return (
    <Container maxWidth="xl">
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h5" my={2}>
          Instruksiyalar
        </Typography>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          size="small"
          getOptionLabel={(option) => option.label}
          onChange={(_, value) => setStatus(value?.value)}
          options={[
            { label: 'Tuggalangan', value: true },
            { label: 'Tugallanmagan', value: false },
          ]}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} placeholder="Holati" />}
        />
      </Stack>
      <InstructionsTable />
    </Container>
  );
}
