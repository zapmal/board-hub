import React from 'react';
import styled from 'styled-components/macro';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Grid
} from '@material-ui/core';

import wave from '../assets/svgs/wave.svg';

const Waves = styled.img`
  transition: all ease-in 2s;
  transform: scale(1);

  &:hover {
    transform: scale(1.2);
  }
`;

const WaveText = styled.h1`
  position: relative;
  left: 450px;
  bottom: 250px;
  color: #ffffff;
`;

const About = () => {
  return (
    <>
      <header>
        <Waves src={wave} alt='Wave'/>
        <WaveText>Las mentes detrás de <strong>BoardHub</strong></WaveText>
      </header>

      <main>
      </main>
    </>
  );
}; 

export default About;