import styled from 'styled-components/macro';

import graduated from 'assets/svgs/graduated.svg';
import team from 'assets/svgs/team.svg';

export const Background = styled.div`
  background-image: url(${graduated}), url(${team});
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 360px;
  background-position: left center, right center;

  position: absolute;
  width: 100%;
  left: 2px;
  height: 90%;
  z-index: -1;
`;

export const Container = styled.div`
  padding: 25px;
  margin: 0 auto;
  max-width: ${({ maxWidth }) => maxWidth}px;
  text-align: center;

  button {
    margin-top: 20px;
    margin-bottom: 15px;
    padding: 10px 20px;
  }

  h6 {
    margin: 20px 0 10px 0;
  }

  svg {
    margin: 8px 0 0 -8px;
  }
`;