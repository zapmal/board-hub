import React from 'react';
import styled from 'styled-components/macro';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Grid
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import wave from '../assets/svgs/wave.svg';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 800,
    margin: '0 15px',
  },

  media: {
    height: 0,
    paddingTop: '70%',
  },
}));

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
  const { root, media } = useStyles();

  return (
    <>
      <header>
        <Waves src={wave} alt='Wave'/>
        <WaveText>Las mentes detrás de <strong>BoardHub</strong></WaveText>
      </header>

      <main>
        <Grid container spacing={25}>

        </Grid>
      </main>
    </>
  );
}; 

export default About;