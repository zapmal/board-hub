import React from 'react';
import styled from 'styled-components/macro';
import Footer from './Footer';

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
      <Footer />
    </StyledLayout>
  );
};

export default Layout;