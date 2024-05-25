import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Iconify from 'src/components/iconify';
import { useDispatch, useSelector } from 'react-redux';
import { login } from 'src/api/auth';
import { useCookies } from 'react-cookie';
import { clearUser } from 'src/redux/slices/login.slice';

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();

  const router = useRouter();

  const dispatch = useDispatch();

  const [, setCookie] = useCookies();

  const [showPassword, setShowPassword] = useState(false);

  const { loading, user } = useSelector((state) => state.login);

  useEffect(() => {
    if (user?.data?.tokens?.length) {
      setCookie('access', user?.data?.tokens?.access, {
        maxAge: 30 * 24 * 3600,
        secure: 'tb',
        path: '/',
      });
      setCookie('refresh', user?.data?.tokens?.refresh, {
        maxAge: 30 * 24 * 3600,
        secure: 'tb',
        path: '/',
      });
      setCookie('username', user?.data?.username, {
        maxAge: 30 * 24 * 3600,
        secure: 'tb',
        path: '/',
      });
      dispatch(clearUser());
      router.push('/');
    }
    // eslint-disable-next-line
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');
    dispatch(login({ data: { username, password } }));
  };

  const renderForm = (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TextField name="username" label="Foydalanuvchi nomi" />

        <TextField
          name="password"
          label="Parol"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton
        sx={{ mt: 3 }}
        fullWidth
        size="large"
        loading={loading}
        type="submit"
        variant="contained"
        color="inherit"
      >
        Kirish
      </LoadingButton>
    </form>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4" textAlign="center" mb={2}>
            Kirish
          </Typography>
          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
