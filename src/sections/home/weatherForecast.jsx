import { Icon } from '@iconify/react';
import { Box, Card, Container, Grid, Typography } from '@mui/material';
import Cloudy from '../../../public/assets/icons/weather/animated/cloudy.svg';
import PartlyCloudyDay from '../../../public/assets/icons/weather/animated/cloudy-day-1.svg';
import Snow from '../../../public/assets/icons/weather/animated/snowy-1.svg';
import Rain from '../../../public/assets/icons/weather/animated/rainy-1.svg';
import PartlyCloudyNight from '../../../public/assets/icons/weather/animated/cloudy-night-1.svg';
import ClearDay from '../../../public/assets/icons/weather/animated/day.svg';
import ClearNight from '../../../public/assets/icons/weather/animated/night.svg';
import Wind from '../../../public/assets/icons/weather/animated/weather.svg';
import SunRise from '../../../public/assets/icons/weather/animated/weather_sunset.svg';

import React, { useEffect, useMemo, useState } from 'react';
import { pxToRem } from 'src/theme/typography';
import { formatCurrentDate } from 'src/utils/formatCurrentDate';
import { grey } from 'src/theme/palette';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import { convertCelciumFromFarad } from 'src/utils/convertCelciumfromFarad';

function WeatherForecast({ weatherData }) {
  const hours = useMemo(() => {
    if (!weatherData?.days?.length) return [];
    return weatherData?.days[0]?.hours;
  }, [weatherData]);

  const icons = {
    rain: <Box width="100%" height="100%" sx={{ objectFit: 'cover' }} component="img" src={Rain} />,
    cloudy: (
      <Box width="100%" height="100%" sx={{ objectFit: 'cover' }} component="img" src={Cloudy} />
    ),
    snow: <Box width="100%" height="100%" sx={{ objectFit: 'cover' }} component="img" src={Snow} />,
    fog: <Icon icon="bi:cloud-fog" />,
    wind: <Box width="100%" height="100%" component="img" src={Wind} />,
    'partly-cloudy-day': <Box width="100%" height="100%" component="img" src={PartlyCloudyDay} />,
    'partly-cloudy-night': (
      <Box width="100%" height="100%" component="img" src={PartlyCloudyNight} />
    ),
    'clear-day': <Box width="100%" height="100%" component="img" src={ClearDay} />,
    'clear-night': <Box width="100%" height="100%" component="img" src={ClearNight} />,
  };
  return (
    <Container>
      <Card>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Box px={4}>
              <Box
                display="flex"
                margin="auto"
                justifyContent="center"
                color="#8C9094"
                width="100%"
              >
                {icons[weatherData?.currentConditions?.icon || 'cloudy']}
              </Box>
              <Typography sx={{ color: grey[500] }}>{formatCurrentDate()}</Typography>

              <Typography fontSize={pxToRem(72)} fontWeight={400}>
                {convertCelciumFromFarad(weatherData?.currentConditions?.temp)}&#176;C
              </Typography>
            </Box>
          </Grid>
          <Grid sx={{ background: '#F6F6F8' }} item xs={8} pr={3} pb={2}>
            <Box py={1}>
              <Typography my={2} fontWeight={500} fontSize={pxToRem(22)}>
                Bugun
              </Typography>
              <Swiper spaceBetween={20} slidesPerView={5.5}>
                {hours?.map((item) => (
                  <SwiperSlide>
                    <Card sx={{ padding: 1 }}>
                      <Typography fontSize={14} textAlign="center">
                        {item?.datetime?.slice(0, -3)}
                      </Typography>
                      <Box>{icons[item?.icon]}</Box>
                      <Typography fontSize={14} textAlign="center">
                        {convertCelciumFromFarad(item?.temp)}&#176;
                      </Typography>
                    </Card>
                  </SwiperSlide>
                ))}
                <Grid container mt={2} spacing="20px">
                  <Grid item xs={4}>
                    <Card sx={{ padding: 2 }}>
                      <Typography fontSize={14} sx={{ color: grey[400] }} mb={1}>
                        Shamol tezligi
                      </Typography>
                      <Typography fontSize={pxToRem(34)}>
                        {weatherData?.currentConditions?.windspeed}
                        <span style={{ fontSize: '18px', marginLeft: '4px' }}>km/s</span>
                      </Typography>
                    </Card>
                  </Grid>
                  <Grid item xs={4}>
                    <Card sx={{ padding: 2 }}>
                      <Typography fontSize={14} sx={{ color: grey[400] }} mb={1}>
                        Namlik
                      </Typography>
                      <Typography fontSize={pxToRem(34)}>
                        {weatherData?.currentConditions?.humidity}
                        <span style={{ fontSize: '18px', marginLeft: '4px' }}>%</span>
                      </Typography>
                    </Card>
                  </Grid>
                  <Grid item xs={4}>
                    <Card sx={{ padding: 2 }}>
                      <Typography fontSize={14} sx={{ color: grey[400] }} mb={1}>
                        Ko'rish uzoqligi
                      </Typography>
                      <Typography fontSize={pxToRem(34)}>
                        {weatherData?.currentConditions?.visibility}
                        <span style={{ fontSize: '18px', marginLeft: '4px' }}>km</span>
                      </Typography>
                    </Card>
                  </Grid>
                  <Grid item xs={4}>
                    <Card sx={{ padding: 2 }}>
                      <Typography fontSize={14} sx={{ color: grey[400] }} mb={1}>
                        Quyosh chiqishi
                      </Typography>
                      <Typography fontSize={pxToRem(34)}>
                        {weatherData?.currentConditions?.sunrise?.slice(0, -3)}
                      </Typography>
                    </Card>
                  </Grid>
                  <Grid item xs={4}>
                    <Card sx={{ padding: 2 }}>
                      <Typography fontSize={14} sx={{ color: grey[400] }} mb={1}>
                        Quyosh botishi
                      </Typography>
                      <Typography fontSize={pxToRem(34)}>
                        {weatherData?.currentConditions?.sunset?.slice(0, -3)}
                      </Typography>
                    </Card>
                  </Grid>
                </Grid>
              </Swiper>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}

export default WeatherForecast;
