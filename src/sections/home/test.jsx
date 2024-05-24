import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SingleTest from './singleTest';

function Test() {
  const [answers, setAnswers] = useState([]);
  console.log(answers);

  const addAnswers = (data) => setAnswers([...answers, data]);

  const testList = [
    {
      id: 1,
      question: "O'zbekistonning poytaxti qayer",
      choices: [
        {
          id: 1,
          title: 'Toshkent',
          is_correct: false,
        },
        {
          id: 2,
          title: 'Toshkent',
          is_correct: false,
        },
        {
          id: 3,
          title: 'Toshkent',
          is_correct: false,
        },
        {
          id: 4,
          title: 'Toshkent',
          is_correct: true,
        },
      ],
    },
    {
      id: 2,
      question: "O'zbekistonning poytaxti qayer",
      choices: [
        {
          id: 1,
          title: 'Toshkent',
          is_correct: false,
        },
        {
          id: 2,
          title: 'Toshkent',
          is_correct: true,
        },
        {
          id: 3,
          title: 'Toshkent',
          is_correct: false,
        },
        {
          id: 4,
          title: 'Toshkent',
          is_correct: false,
        },
      ],
    },
    {
      id: 3,
      question: "O'zbekistonning poytaxti qayer",
      choices: [
        {
          id: 1,
          title: 'Toshkent',
          is_correct: true,
        },
        {
          id: 2,
          title: 'Toshkent',
          is_correct: false,
        },
        {
          id: 3,
          title: 'Toshkent',
          is_correct: false,
        },
        {
          id: 4,
          title: 'Toshkent',
          is_correct: false,
        },
      ],
    },
    {
      id: 4,
      question: "O'zbekistonning poytaxti qayer",
      choices: [
        {
          id: 1,
          title: 'Toshkent',
          is_correct: false,
        },
        {
          id: 2,
          title: 'Toshkent',
          is_correct: false,
        },
        {
          id: 3,
          title: 'Toshkent',
          is_correct: true,
        },
        {
          id: 4,
          title: 'Toshkent',
          is_correct: false,
        },
      ],
    },
  ];

  const renderTest = () =>
    testList?.map((item, index) => (
      <SingleTest addAnswers={addAnswers} index={index} test={item} key={item?.id} />
    ));

  return <Container>{renderTest()}</Container>;
}

export default Test;
