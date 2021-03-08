import styled from 'styled-components/macro';

import background from 'assets/svgs/background-light.svg'; 

/**
 * On large screens (height-wise) the footer needs to go a bit down.
 */
export const FooterContainer = styled.footer`
  padding: 30px 40px;
  background-color: #7362d0;
  background-image: url(${background});
  background-size: 80%;
  background-position: 400% 70%;
`;

export const Information = styled.div`
  color: #ffffff;
  text-align: center;
`;

export const Contributors = styled.a`
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