import React from 'react';
import styled from 'styled-components/macro';

import Nav from './Nav';

const StyledLayout = styled.div`
  padding-top: 60px;
  /* position: relative;
  top: 60px; */
`;

const Main = styled.main`
  /* margin: 0 30px; */
`;

const Layout = ({ children }) => {
  return (
    <StyledLayout>
      <Nav />
      <Main>{children}</Main>
    </StyledLayout>
  );
};

export default Layout;