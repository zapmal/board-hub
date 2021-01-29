import React from 'react';
import styled from 'styled-components/macro';
import Footer from './Footer';

import Nav from './Nav';

const StyledLayout = styled.div`
  padding-top: 60px;
`;

const Main = styled.main``;

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