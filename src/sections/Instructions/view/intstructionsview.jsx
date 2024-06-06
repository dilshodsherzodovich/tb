import { Autocomplete, Button, Container, Stack, TextField, Typography } from '@mui/material';
import InstructionsTable from '../instructionsTable';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { getAllInstructions, startNewInstruction } from 'src/api/instruction';
import { useNavigate, useParams } from 'react-router-dom';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { isoToCustomFormat } from 'src/utils/formatCurrentDate';
import { LoadingButton } from '@mui/lab';
import { clearCreateRes } from 'src/redux/slices/instruction.slice';

export default function InstructionsView() {
  const dispatch = useDispatch();

  const [cookies] = useCookies();

  const [status, setStatus] = useState(undefined);

  const [date, setDate] = useState();

  const { id } = useParams();

  const navigate = useNavigate();

  const { categories, createRes, creating } = useSelector((state) => state.instructions);

  useEffect(() => {
    dispatch(
      getAllInstructions({
        token: cookies?.access,
        categoryId: id,
        status,
        date: isoToCustomFormat(date),
      })
    );

    // eslint-disable-next-line
  }, [id, status, date]);

  useEffect(() => {
    if (!createRes?.id) return;
    navigate(`/instructions/${createRes?.id}`);
    dispatch(clearCreateRes());

    // eslint-disable-next-line
  }, [createRes]);

  const allCategories = useMemo(() => {
    const categoriesList = [];
    categories?.forEach((item) => {
      if (item?.children?.length) {
        item?.children?.forEach((child) => {
          categoriesList.push(child);
        });
      } else {
        categoriesList.push(item);
      }
    });
    return categoriesList;
  }, [categories]);

  const activeCategory = useMemo(
    () => allCategories?.find((item) => item?.id === +id),
    [allCategories, id]
  );

  const handleStartNewInstruction = () => {
    dispatch(
      startNewInstruction({
        token: cookies?.access,
        data: {
          category: activeCategory?.id,
          instruction: activeCategory?.instructions?.find((_, index) => index === 0),
        },
      })
    );
  };

  return (
    <Container maxWidth="xl">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" my={2}>
          Instruksiyalar
        </Typography>
        <Stack direction="row" alignItems="center" gap={1}>
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
            sx={{ width: 250 }}
            renderInput={(params) => <TextField {...params} placeholder="Holati" />}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer sx={{ margin: 0, padding: 0, width: 250 }} components={['DatePicker']}>
              <DatePicker
                value={date}
                onChange={(value) => setDate(value)}
                slotProps={{ textField: { size: 'small' } }}
              />
            </DemoContainer>
          </LocalizationProvider>
          <LoadingButton
            disabled={!categories?.length > 0}
            onClick={handleStartNewInstruction}
            color="info"
            loading={creating}
            variant="contained"
          >
            {`Qo'shish`}
          </LoadingButton>
        </Stack>
      </Stack>
      <InstructionsTable />
    </Container>
  );
}
