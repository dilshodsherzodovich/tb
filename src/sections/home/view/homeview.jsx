/* eslint-disable no-nested-ternary */
import { Stack, Button, Container, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { getAllInstructions } from 'src/api/instruction';
import CustomizedSteppers from '../stepper';
import AttendanceTable from '../attendanceTable';
import WeatherForecast from '../weatherForecast';
import VideoInstruction from '../videoinstruction';
import Test from '../test';

function HomeView() {
  const dispatch = useDispatch();

  const [cookies] = useCookies();

  const [activeStep, setActiveStep] = useState(0);
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  const toNextStep = () => setActiveStep(activeStep + 1);
  const toPreviousStep = () => setActiveStep(activeStep - 1);

  const disableNext = () => setIsNextDisabled(true);
  const enableNext = () => setIsNextDisabled(false);

  useEffect(() => {
    dispatch(getAllInstructions({ token: cookies?.access }));

    // eslint-disable-next-line
  }, []);

  return (
    <Container maxWidth="xl">
      <Box component="section" mb={5}>
        <CustomizedSteppers activeStep={activeStep} />
      </Box>
      {activeStep === 0 ? (
        <AttendanceTable />
      ) : activeStep === 1 ? (
        <WeatherForecast />
      ) : activeStep === 2 ? (
        <VideoInstruction disableNext={disableNext} enableNext={enableNext} />
      ) : activeStep === 3 ? (
        <Test />
      ) : null}

      <Stack mt={5} direction="row" justifyContent="space-between">
        <Button onClick={toPreviousStep} variant="outlined" disabled={activeStep === 0}>
          <Icon icon="ooui:arrow-previous-ltr" style={{ marginRight: '4px' }} />
          Ortga
        </Button>

        <Button
          onClick={toNextStep}
          variant="outlined"
          disabled={activeStep === 3 || isNextDisabled}
        >
          Keyingisi
          <Icon style={{ marginLeft: '4px' }} icon="ooui:arrow-previous-rtl" />
        </Button>
      </Stack>
    </Container>
  );
}

export default HomeView;
