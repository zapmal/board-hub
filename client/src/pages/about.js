import React from 'react';
import styled from 'styled-components/macro';
import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import GitHubIcon from '@material-ui/icons/GitHub';

import Highlight from '../components/Highlight';

import wave from '../assets/svgs/wave.svg';
import noImage from '../assets/images/noimage.png';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 800,
    margin: '0 15px 50px 15px',
  },

  media: {
    height: 0,
    paddingTop: '70%',
  },

  container: {
    justifyContent: 'center',
    '& > *': {
      textAlign: 'center',
    },
  },
}));

const Header = styled.header`
  height: 300px;
`;

const Waves = styled.img`
  transition: all ease-in 2s;
  transform: scale(1);

  &:hover {
    transform: scale(1.1);
  }
`;

const WaveText = styled.h1`
  position: relative;
  left: 450px;
  bottom: 250px;
  color: #ffffff;
`;

const About = () => {
  const { root, media, container } = useStyles();

  return (
    <>
      <Header>
        <Waves src={wave} alt='Wave'/>
        <WaveText>Las mentes detrás de <strong>Board Hub</strong></WaveText>
      </Header>

      <main>
        <Grid container spacing={25} className={container}>
          <Grid item md={3}>
            <Card className={root}>
              <CardHeader title='Manuel Zapata' />
              <CardMedia title='Foto de Manuel Zapata' className={media} image={noImage}/>
              <CardContent>
                <Typography variant='body2' component='p'>
                  <Highlight color='#7362d0'>Frontend, Backend, Database and Design.</Highlight>
                </Typography>

                <Button color='secondary' href='https://github.com/Zondazx' target='_blank' endIcon={<GitHubIcon/>}>
                  GitHub
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item md={3}>
            <Card className={root}>
              <CardHeader title='Víctor Homez' />
              <CardMedia title='Foto de Victor Homez' className={media} image={noImage}/>
              <CardContent>
                <Typography variant='body2' component='p'>
                  <Highlight color='#7362d0'>Backend.</Highlight>
                </Typography>

                <Button color='secondary' href='https://github.com/Biktol' target='_blank' endIcon={<GitHubIcon/>}>
                  GitHub
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Estos son solo para fotos del informe. */}
          {/*
          <Grid item md={3}>
            <Card className={root}>
              <CardHeader title='Samuel Yépez' />
              <CardMedia title='Foto de Samuel Yépez' className={media} image={noImage}/>
              <CardContent>
                <Typography variant='body2' component='p'>
                  Cédula de identidad: <Highlight color='#7362d0'>27.363.562</Highlight>.
                </Typography>
              </CardContent>
            </Card>
          </Grid>


          <Grid item md={3}>
            <Card className={root}>
              <CardHeader title='Andrés Gonzáles' />
              <CardMedia title='Foto de Andrés Gonzáles' className={media} image={noImage}/>
              <CardContent>
                <Typography variant='body2' component='p'>
                  Cédula de identidad: <Highlight color='#7362d0'>29.842.253</Highlight>.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item md={3}>
            <Card className={root}>
              <CardHeader title='Noel Duque' />
              <CardMedia title='Foto de Noel Duque' className={media} image={noImage}/>
              <CardContent>
                <Typography variant='body2' component='p'>
                  Cédula de identidad: <Highlight color='#7362d0'>28.061.952</Highlight>.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          */}
        </Grid>
      </main>
    </>
  );
}; 

export default About;