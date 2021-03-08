import React from 'react';
import styled from 'styled-components/macro';
import { withRouter } from 'react-router-dom';

import { Footer } from '../Footer';
import { Nav } from '../Nav';
import { BoardsNav } from 'components/boards';

const StyledLayout = styled.div`
  padding-top: 60px;
`;

export const Layout = withRouter(({ location, children }) => {
  const isBoardsPage = location.pathname.includes('/b');

  return (
    <StyledLayout>
      {isBoardsPage ? <BoardsNav /> : <Nav />}
      <main>{children}</main>
      <Footer />
    </StyledLayout>
  );
});