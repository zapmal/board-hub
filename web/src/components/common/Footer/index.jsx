import React from 'react';

import {
  FooterContainer,
  Information,
  Contributors
} from './styles';

export const Footer = () => {
  return (
    <FooterContainer>
      <Information>
        <strong>Copyright © Board Hub 2021</strong>
      </Information>
      <Information>
        <p>¿Encontraste un error o tienes una sugerencia?</p>
        <Contributors href='https://github.com/Zondazx/board-hub/issues' target='_blank'>
          Hablanos de eso
        </Contributors>
      </Information>
    </FooterContainer>
  );
};