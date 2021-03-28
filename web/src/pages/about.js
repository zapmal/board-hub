import React from 'react';
import styled from 'styled-components/macro';
import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Button,
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import GitHubIcon from '@material-ui/icons/GitHub';

import wave from '../assets/svgs/wave.svg';
import zapmalImage from '../assets/images/zapata-gh.jpeg';
import biktolImage from '../assets/images/victor-gh.png';
import noImage from '../assets/images/noimage.png';

const useStyles = makeStyles(() => ({
  root: {
    margin: 20,
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

const developers = [
  {
    username: 'zapmal',
    name: 'Manuel Zapata',
    avatar: zapmalImage,
    link: 'https://github.com/zapmal',
  },
  {
    username: 'biktol',
    name: 'Víctor Homez',
    avatar: biktolImage,
    link: 'https://github.com/biktol',
  },
  {
    name: 'Noel Duque',
    avatar: noImage
  },
  {
    name: 'Samuel Yépez',
    avatar: noImage
  },
  {
    name: 'Andrés Gonzáles',
    avatar: noImage
  },
];

const About = () => {
  const { root, media, container } = useStyles();

  return (
    <>
      <Header>
        <Waves src={wave} alt='Wave' />
        <WaveText>
          Las mentes detrás de <strong>Board Hub</strong>
        </WaveText>
      </Header>

      <main>
        <Grid container spacing={10} className={container}>
          <DevelopersInformation 
            developers={developers} 
            classes={{
              root,
              media
            }}
          />
        </Grid>
      </main>
    </>
  );
};

const DevelopersInformation = ({ developers, classes }) => {

  return developers.map(dev => (
    <Grid item md={3}>
      <Card className={classes.root}>
        <CardHeader title={dev.name} />
        <CardMedia
          title={`Foto de ${dev.name}`}
          className={classes.media}
          image={dev.avatar}
        />
        <CardContent>
          <Button
            color='secondary'
            href={dev.link}
            target='_blank'
            disabled={dev.link ? false : true}
            endIcon={<GitHubIcon />}
          >
            GitHub
          </Button>
        </CardContent>
      </Card>
    </Grid>
  ));
};

export default About;
