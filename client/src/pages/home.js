import React from 'react';
import styled from 'styled-components/macro';

import background from '../images/background-light.svg';

const Banner = styled.div`
  background-image: url(${background});
  background-repeat: no-repeat;
`;

const Home = (props) => {
  return (
    <Banner>
      <h1>Home</h1>
    </Banner>
  );
};

export default Home;