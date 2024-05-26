/* eslint-disable no-nested-ternary */
import { Stack, Button, Container, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { getAllInstructions, getInstructionsDetails } from 'src/api/instruction';
import CustomizedSteppers from '../stepper';
import AttendanceTable from '../attendanceTable';
import WeatherForecast from '../weatherForecast';
import VideoInstruction from '../videoinstruction';
import Test from '../test';
import { useParams } from 'react-router-dom/dist';
import { End } from '../end';

function HomeView() {
  const dispatch = useDispatch();

  const [cookies] = useCookies();

  const { id } = useParams();

  const [activeStep, setActiveStep] = useState(0);

  const [isNextDisabled, setIsNextDisabled] = useState(false);

  const [answers, setAnswers] = useState([]);

  const toNextStep = () => setActiveStep(activeStep + 1);
  const toPreviousStep = () => setActiveStep(activeStep - 1);

  const disableNext = () => setIsNextDisabled(true);
  const enableNext = () => setIsNextDisabled(false);

  const { detail, detailLoading } = useSelector((state) => state.instructions);

  useEffect(() => {
    dispatch(getInstructionsDetails({ token: cookies?.access, id }));
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
        <VideoInstruction
          video={detail?.video}
          loading={detailLoading}
          disableNext={disableNext}
          enableNext={enableNext}
        />
      ) : activeStep === 3 ? (
        <Test answers={answers} setAnswers={setAnswers} tests={detail?.tests} />
      ) : activeStep === 4 ? (
        <End goBack={toPreviousStep} tests={detail?.tests} answers={answers} />
      ) : null}

      <Stack mt={5} direction="row" justifyContent="space-between">
        <Button
          sx={{ display: activeStep === 4 ? 'none' : 'block' }}
          onClick={toPreviousStep}
          variant="outlined"
          disabled={activeStep === 0}
        >
          <Icon icon="ooui:arrow-previous-ltr" style={{ marginRight: '4px' }} />
          Ortga
        </Button>

        <Button
          sx={{ display: activeStep === 4 ? 'none' : 'block' }}
          onClick={toNextStep}
          variant="outlined"
        >
          {activeStep === 3 ? 'Yakunlash' : 'Keyingisi'}
          <Icon style={{ marginLeft: '4px' }} icon="ooui:arrow-previous-rtl" />
        </Button>
      </Stack>
    </Container>
  );
}

export default HomeView;
