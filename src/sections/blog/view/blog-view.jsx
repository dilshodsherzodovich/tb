import { Icon } from '@iconify/react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CircularProgress,
  FormControl,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Container from '@mui/material/Container';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { sendRequest } from 'src/api/chat';
import { info, secondary } from 'src/theme/palette';

// ----------------------------------------------------------------------

export default function BlogView() {
  const dispatch = useDispatch();

  const [cookies] = useCookies();

  const { history, sending } = useSelector((state) => state.chat);

  const handleSend = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    dispatch(sendRequest({ token: cookies?.access, data: { prompt: data.get('prompt') } }));
    e.target.reset();
  };

  const renderMessages = () =>
    history?.map((item, index) => (
      <Box key={item?.id}>
        <Stack gap={1} mb={1} direction="row" key={item?.id}>
          <Box>
            <Stack
              justifyContent="center"
              alignItems="center"
              color="#fff"
              width={30}
              height={30}
              sx={{ background: secondary?.main }}
              borderRadius="100%"
            >
              <Icon icon="clarity:avatar-line" />
            </Stack>
          </Box>
          <Typography fontSize={14}>{item?.prompt}</Typography>
        </Stack>
        <Stack gap={1} direction="row" key={item?.id}>
          <Box>
            <Stack
              justifyContent="center"
              alignItems="center"
              color="#fff"
              width={30}
              height={30}
              sx={{ background: info?.main }}
              borderRadius="100%"
            >
              <Icon icon="hugeicons:ai-chat-02" />
            </Stack>
          </Box>
          <Typography fontSize={14}>
            {item?.response ||
              (sending && <CircularProgress size="small" sx={{ width: '20px' }} />)}
          </Typography>
        </Stack>
      </Box>
    ));

  return (
    <Container>
      <Box sx={{ height: '80vh', background: 'transparent' }}>
        <Stack
          gap={4}
          sx={{
            height: 'calc(80vh - 66px)',
            overflow: 'auto',
            background: 'transparent',
            paddingY: 2,
          }}
        >
          {renderMessages()}
        </Stack>
        <Card>
          <form onSubmit={handleSend}>
            <FormControl
              sx={{
                bottom: 0,
                width: '100%',
                height: '66px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-end',
                background: 'transparent',
              }}
              fullWidth
            >
              <TextField
                multiline
                fullWidth
                name="prompt"
                maxRows={2}
                sx={{
                  borderRadius: 0,
                  borderBottom: 'none',
                  padding: '10px',
                }}
                placeholder="Yozing"
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                  style: {
                    borderRadius: 0,
                    border: 'none',
                    outline: 'none',
                    fontSize: '14px',
                    '::placeholder': {
                      fontSize: '14px',
                    },
                  },

                  endAdornment: (
                    <Stack
                      direction="row"
                      alignItems="center"
                      gap={1}
                      sx={{ cursor: 'pointer' }}
                      color="rgb(99, 115, 129)"
                    >
                      <Button
                        type="submit"
                        sx={{
                          ':hover': {
                            background: ' rgba(99, 115, 129, 0.08)',
                          },
                          color: 'rgb(99, 115, 129)',
                          borderRadius: '100%',
                          maxWidth: '36px',
                          maxHeight: '36px',
                          minWidth: '36px',
                          minHeight: '36px',
                          padding: 0,
                        }}
                      >
                        <Icon width="28px" height="28px" icon="mingcute:send-fill" />
                      </Button>
                    </Stack>
                  ),
                }}
                size="medium"
              />
            </FormControl>
          </form>
        </Card>
      </Box>
    </Container>
  );
}
