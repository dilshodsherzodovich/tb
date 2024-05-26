import { Container } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import SingleTest from './singleTest';

function Test({ tests, answers, setAnswers }) {
  useEffect(() => {
    setAnswers([]);
  }, []);

  const addAnswers = (data) => setAnswers([...answers, data]);

  const testsList = useMemo(() => {
    if (!tests?.find((_, index) => index === 0)?.questions?.length) return [];
    return tests[0].questions;
  }, [tests]);

  const renderTest = () =>
    testsList?.map((item, index) => (
      <SingleTest addAnswers={addAnswers} index={index} test={item} key={item?.id} />
    ));

  return <Container>{renderTest()}</Container>;
}

export default Test;
