import {
  Autocomplete,
  Backdrop,
  Button,
  Card,
  CircularProgress,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import InstructionsTable from '../instructionsTable';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { getAllInstructions, getAllWorkShops, startNewInstruction } from 'src/api/instruction';
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

  const [open, setOpen] = useState(false);

  const [workshop, setWorkshop] = useState(null);

  const [formWorkShop, setFormWorkShop] = useState();

  const [date, setDate] = useState();

  const { id } = useParams();

  const navigate = useNavigate();

  const { categories, createRes, creating, workshops } = useSelector((state) => state.instructions);

  useEffect(() => {
    dispatch(
      getAllInstructions({
        token: cookies?.access,
        categoryId: id,
        status,
        date: isoToCustomFormat(date),
        workshop,
      })
    );

    // eslint-disable-next-line
  }, [id, status, date, workshop]);

  useEffect(() => {
    if (!createRes?.id) return;
    navigate(`/instructions/${createRes?.id}`);
    dispatch(clearCreateRes());

    // eslint-disable-next-line
  }, [createRes]);

  useEffect(() => {
    if (cookies?.role !== 'head_master') return;
    dispatch(getAllWorkShops({ token: cookies?.access }));

    // eslint-disable-next-line
  }, []);

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

  const workshopsOptions = useMemo(
    () => workshops?.map((item) => ({ label: item?.name, value: item?.id })),
    [workshops]
  );

  const handleStartNewInstruction = () => {
    const payload = {
      token: cookies?.access,
      data: {
        category: activeCategory?.id,
        instruction: activeCategory?.instructions?.find((_, index) => index === 0),
      },
    };
    if (cookies?.role === 'head_master') payload.workshop_id = formWorkShop;
    dispatch(startNewInstruction(payload));
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
            sx={{ minWidth: 200 }}
            renderInput={(params) => <TextField {...params} placeholder="Holati" />}
          />
          {cookies.role === 'head_master' ? (
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              size="small"
              getOptionLabel={(option) => option.label}
              onChange={(_, value) => setWorkshop(value?.value)}
              options={workshopsOptions}
              sx={{ minWidth: 150 }}
              renderInput={(params) => <TextField {...params} placeholder="Tsex" />}
            />
          ) : null}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              sx={{ margin: 0, padding: 0, minWidth: 250 }}
              components={['DatePicker']}
            >
              <DatePicker
                value={date}
                onChange={(value) => setDate(value)}
                slotProps={{ textField: { size: 'small' } }}
              />
            </DemoContainer>
          </LocalizationProvider>
          <LoadingButton
            disabled={!categories?.length > 0}
            onClick={cookies?.role === 'master' ? handleStartNewInstruction : () => setOpen(true)}
            color="info"
            loading={creating}
            variant="contained"
          >
            {`Qo'shish`}
          </LoadingButton>

          <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
            <Card sx={{ py: 3, px: 5, minHeight: '250px' }}>
              <Typography variant="h6" my={1}>
                Tsexni tanlang
              </Typography>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                size="small"
                getOptionLabel={(option) => option.label}
                onChange={(_, value) => setFormWorkShop(value?.value)}
                options={workshopsOptions}
                sx={{ minWidth: 150 }}
                renderInput={(params) => (
                  <TextField sx={{ width: '300px' }} {...params} placeholder="Tsexni tanlang" />
                )}
              />
              <LoadingButton
                onClick={handleStartNewInstruction}
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
                loading={creating}
              >
                Qo&apos;shish
              </LoadingButton>
            </Card>
          </Backdrop>
        </Stack>
      </Stack>
      <InstructionsTable />
    </Container>
  );
}
