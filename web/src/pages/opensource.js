import React from 'react';
import styled from 'styled-components/macro';

import { Typography, Button } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';

import open from '../assets/images/open.png';

const Background = styled.div`
  background-image: linear-gradient(
    66deg,rgba(0,0,0,.85),
    rgba(0,0,0,.5) 25%,
    rgba(0,0,0,.3) 50%,
    rgba(0,0,0,.1) 75%,
    rgba(0,0,0,0)),
    url(${open}
  );
  background-repeat: round;
  padding: 60px 0;
`;

const Banner = styled.div`
  width: 700px;
  height: 300px;
  text-align: center;
  padding-top: 50px;
  margin: 10px auto;

  h2 {
    margin-bottom: 80px;
  }
  
  svg {
    display: block;
    margin: 20px auto;
  }

  a {
    margin-top: 20px;
  }
`;

const OpenSource = () => {
  return (
    <>
      <Background>
        <Banner>
          <Typography variant='h2' color='primary'>
            <strong>Creemos</strong> en <strong>Open Source</strong>
            <GitHubIcon fontSize='large'/>
          </Typography>

          <Typography variant='body1' color='primary'>
            <strong>Hecho con herramientas open-source, si quieres ser parte del equipo entonces</strong>
          </Typography>


          <Button 
            variant='contained' 
            color='primary' 
            href='https://github.com/zapmal/board-hub' 
            target='_blank'
          >
            Únetenenos
          </Button>
        </Banner>
      </Background>
    </>
  );
};

export default OpenSource;
