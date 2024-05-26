import { Box, Button, Stack, Typography } from '@mui/material';
import { useMemo } from 'react';
import { Link } from 'react-router-dom/dist';

export function End({ answers, tests, goBack }) {
  const testsList = useMemo(() => {
    if (!tests?.find((_, index) => index === 0)?.questions?.length) return [];
    return tests[0].questions;
  }, [tests]);
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography>E'tiboringiz uchun rahmat</Typography>
      <Typography variant="h3">
        Sizning natijagiz {answers?.filter((item) => item?.is_correct)?.length}
        {' / '}
        {testsList?.length}
      </Typography>
      <Stack direction="row" gap={2}>
        <Link to="/">
          <Button variant="contained">Instruksiyalar ro'yxatiga qaytish</Button>
        </Link>
        <Button onClick={goBack} variant="outlined">
          Testni qayta boshlash
        </Button>
      </Stack>
    </Box>
  );
}
