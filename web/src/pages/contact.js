import React from 'react';
import styled from 'styled-components/macro';

import ChatIcon from '@material-ui/icons/Chat';

import { Highlight } from 'components/common';

const Background = styled.header`
  background-color: #7362d0;
  height: 300px;
  color: #ffffff;
  text-align: center;
  padding-top: 100px;
  font-size: 40px;

  span {
    display: block;
    margin: 15px 0;
    font-size: 20px;
  }
`;

const EmailsContainer = styled.section`
  width: 100%;
  height: 140px;
  display: flex;
  justify-content: center;

  strong {
    font-size: 20px;
    padding-top: 50px;
    margin-right: 20px;
  }
`;

const Contact = () => {
  return (
    <>
      <Background>
        ¿Necesitas contactarnos?
        <span>No hay problema.</span>
        <ChatIcon fontSize='large' />
      </Background>

      <EmailsContainer>
        <Highlight color='#504491'>inquiries@boardhub.com</Highlight>
        <Highlight color='#8f81d9'>support@boardhub.com</Highlight>
      </EmailsContainer>
    </>
  );
};

export default Contact;
