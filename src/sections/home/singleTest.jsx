import { Box, Button, Card, Grid, Paper, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { error, grey, primary, success } from 'src/theme/palette';

function SingleTest({ test, index, addAnswers }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeChoice, setActiveChoice] = useState(null);

  const handleSubmit = () => {
    setIsSubmitted(true);
    const answer = {
      question: test?.question,
      selected: activeChoice?.id,
      is_correct: activeChoice?.is_correct,
    };
    addAnswers(answer);
  };

  const renderChoices = () =>
    test?.choices?.map((item, idx) => {
      let background = '';
      let border = 'rgba(145, 158, 171, 0.2)';
      let color = grey[600];
      if (activeChoice?.id === item?.id) {
        border = primary?.main;
      }
      if (isSubmitted) {
        if (item?.id === activeChoice?.id && item?.is_correct) {
          background = success.main;
          border = success.main;
          color = '#fff';
        } else if (item?.id === activeChoice?.id && !item?.is_correct) {
          background = error.main;
          color = '#fff';
          border = error?.main;
        } else if (item?.id !== activeChoice?.id && item?.is_correct) {
          background = success.main;
          color = '#fff';
          border = success?.main;
        } else background = '';
      }
      return (
        <Grid key={item?.id} item xs={6}>
          <Box
            component={Paper}
            display="flex"
            alignItems="center"
            p={2}
            onClick={() => setActiveChoice(item)}
            border={`1px solid ${border}`}
            sx={{
              cursor: 'pointer',
              transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
              background,
            }}
          >
            <Typography sx={{ color }} fontSize={14}>
              {item?.title}
            </Typography>
          </Box>
        </Grid>
      );
    });

  return (
    <Box mb={3}>
      <Card sx={{ p: 3 }}>
        <Typography fontSize={18}>
          {index + 1} {'. '}
          {test?.question}
        </Typography>
        <Grid container spacing={1} mt="2px">
          {renderChoices()}
        </Grid>
        <Stack direction="row" justifyContent="flex-end" mt={1}>
          <Button
            disabled={isSubmitted || !activeChoice}
            onClick={handleSubmit}
            variant="contained"
            color="primary"
          >
            Tasdiqlash
          </Button>
        </Stack>
      </Card>
    </Box>
  );
}

export default SingleTest;
