/* eslint-disable no-nested-ternary */
import { Stack, Button, Container, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { closeInstruction, getAllInstructions, getInstructionsDetails } from 'src/api/instruction';
import CustomizedSteppers from '../stepper';
import AttendanceTable from '../attendanceTable';
import WeatherForecast from '../weatherForecast';
import VideoInstruction from '../videoinstruction';
import Test from '../test';
import { useParams } from 'react-router-dom/dist';
import { End } from '../end';
import ConfirmationTable from '../confirmationTbale';
import FinshedInstruction from '../finshedInstruction';
import { faceRecognition } from 'src/api/auth';
import { clearLastConfirmedUser, clearLastUser } from 'src/redux/slices/instruction.slice';
import { isNull } from 'lodash';

function HomeView() {
  const dispatch = useDispatch();

  const [cookies] = useCookies();

  const { id } = useParams();

  const [activeStep, setActiveStep] = useState(0);

  const [isNextDisabled, setIsNextDisabled] = useState(false);

  const [weatherData, setWeatherData] = useState();

  const [answers, setAnswers] = useState([]);

  const toNextStep = () => setActiveStep(activeStep + 1);
  const toPreviousStep = () => setActiveStep(activeStep - 1);

  const disableNext = () => setIsNextDisabled(true);
  const enableNext = () => setIsNextDisabled(false);

  const { detail, detailLoading, lastUser, lastConfirmedUser } = useSelector(
    (state) => state.instructions
  );

  useEffect(() => {
    dispatch(getInstructionsDetails({ token: cookies?.access, id }));
    fetch(
      'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Tashkent?include=fcst%2Cobs%2Chistfcst%2Cstats%2Cdays%2Chours%2Ccurrent%2Calerts&key=3VUZ2V4BXUDXTG3JR9WMMH9HC&options=beta&contentType=json',
      {
        method: 'GET',
      }
    )
      .then((res) => res.json())
      .then((data) => setWeatherData(data));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (activeStep !== 0) {
      dispatch(clearLastUser());
    }
    if (activeStep !== 3 && !isNull(lastConfirmedUser)) {
      dispatch(clearLastConfirmedUser());
    }
  }, [activeStep]);

  // Define Uzbek month and day names

  const handleCloseInst = () => {
    dispatch(closeInstruction({ token: cookies.access, id, data: { completed: true } }));
  };

  return detail?.completed ? (
    <FinshedInstruction />
  ) : (
    <Container maxWidth="xl">
      <Box component="section" mb={5}>
        <CustomizedSteppers activeStep={activeStep} />
      </Box>
      {activeStep === 0 ? (
        <AttendanceTable loading={detailLoading} users={detail?.attendance} />
      ) : activeStep === 1 ? (
        <WeatherForecast weatherData={weatherData} />
      ) : activeStep === 2 ? (
        <VideoInstruction
          video={detail?.video}
          loading={detailLoading}
          disableNext={disableNext}
          enableNext={enableNext}
        />
      ) : activeStep === 3 ? (
        <ConfirmationTable users={detail?.attendance} />
      ) : activeStep === 4 ? (
        <End
          finishInstruction={handleCloseInst}
          goBack={toPreviousStep}
          tests={detail?.tests}
          answers={answers}
        />
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
