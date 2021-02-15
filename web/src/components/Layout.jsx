import React from 'react';
import styled from 'styled-components/macro';
import { withRouter } from 'react-router-dom';

import Footer from './Footer';
import Nav from './Nav';
import BoardsNav from './BoardsNav';

const StyledLayout = styled.div`
  padding-top: 60px;
`;

const Main = styled.main``;

const Layout = ({ location, children }) => {
  const isBoardsPage = location.pathname.includes('/b');

  return (
    <StyledLayout>
      {isBoardsPage ? <BoardsNav /> : <Nav />}
      <Main>{children}</Main>
      <Footer />
    </StyledLayout>
  );
};

export default withRouter(Layout);