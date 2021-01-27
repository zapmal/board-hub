import React from 'react';
import styled from 'styled-components/macro';

import background from '../assets/background-light.svg'; 

const StyledFooter = styled.footer`
  display: block;
  margin: 0;
  padding: 30px 40px;
  background-color: #504491;
  background-image: url(${background});
  background-size: 80%;
  background-position: 400% 70%;
  background-repeat: no-repeat;
`;

const Container = styled.div`
  color: #ffffff;
  display: block;

  p, strong {
    margin: 20px 0;
  }
`;

const Contributors = styled.a`
  background-color: transparent;
  border: 2px solid #ffffff;
  padding: 8px 20px;
  border-radius: 10px;
  text-decoration: none;
  color: #ffffff;
  transition: all 200ms;

  &:visited,
  &:active {
    color: #ffffff;
  }

  &:hover {
    padding: 10px 25px;
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <Container>
        <strong>Copyright © BoardHub 2021</strong>
      </Container>
      <Container>
        <p>¿Encontraste un error o tienes una sugerencia?</p>
        <Contributors href='https://github.com/Zondazx/board-hub/issues' target='_blank'>
          Hablanos de eso
        </Contributors>
      </Container>
    </StyledFooter>
  );
};

export default Footer;