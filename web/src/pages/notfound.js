import React from 'react';
import styled from 'styled-components/macro';
import { Typography, Link } from '@material-ui/core';

import logoReversed from '../assets/images/reversed-logo.png';
import Highlight from '../components/Highlight';

const Container = styled.div`
  margin: 39px 0;
  text-align: center;

  img { 
    margin: 0 auto; 
  }

  h4 {
    color: #d32f2f;

    span {
      font-style: italic;
    }
  }
`;

const MessageContainer = styled.div`
  margin: 30px auto;
  width: 50%;
  font-size: 20px;
  
  p {
    line-height: 40px;
  }

  span {
    color: #d32f2f;
    font-style: italic;
  }
`;


const NotFound = () => {
  return (
    <Container>
      <img src={logoReversed} alt='Logo al revés' />
      <Typography variant='h4' gutterBottom>
        Oops! Eso está mal, <span>¿no crees?</span>
      </Typography>
      <MessageContainer>
        <p>
          <Highlight>Lo sentimos</Highlight>, a no ser que estuvieras buscando de forma <Highlight>intencionada</Highlight> nuestra página para errores <span>4xx</span>, 
          lo que estás buscando ha sido <Highlight>eliminado</Highlight> o <Highlight>movido</Highlight>.
        </p>
      </MessageContainer>

      <p>
        ¿Crees que es un error?{' '} 
        <Link 
          href='https://github.com/Zondazx/board-hub/issues' 
          color='secondary'
        >
          Reportalo.
        </Link>
      </p>
      {/* <Button variant='outlined'>Reportalo</Button> */}
    </Container>
  );
};

export default NotFound;