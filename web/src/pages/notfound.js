import React from 'react';
import styled from 'styled-components/macro';
import Link from '@material-ui/core/Link';

import notFound from '../assets/images/404.png';

import { Highlight } from 'components/common/';

const Container = styled.div`
  margin: 31px 0;
  text-align: center;

  img { 
    margin: 0 auto; 
  }
`;

const MessageContainer = styled.div`
  margin: 30px auto;
  width: 50%;
  font-size: 20px;
  
  p {
    line-height: 40px;
  }

  strong {
    color: #d32f2f;
  }
`;

const NotFound = () => {
  return (
    <Container>
      <img src={notFound} alt='404 Not Found' width='300px' />
      <MessageContainer>
        <p>
          <Highlight>Lo sentimos</Highlight>, a no ser que estuvieras buscando de forma <Highlight>intencionada</Highlight> nuestra página para errores <strong>4xx</strong>, 
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
    </Container>
  );
};

export default NotFound;