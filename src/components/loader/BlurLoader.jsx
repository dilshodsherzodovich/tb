import { Stack, alpha } from '@mui/material';
import Loader from './loader';

export default function BlurLoader() {
  return (
    <Stack
      direction="row"
      position="absolute"
      zIndex={100}
      top={0}
      height="100%"
      alignItems="center"
      width="100%"
      justifyContent="center"
      sx={{ background: alpha('#fff', 0.7) }}
    >
      <Loader />
    </Stack>
  );
}
