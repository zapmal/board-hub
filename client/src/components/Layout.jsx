import React from 'react';
import styled from 'styled-components/macro';

import Nav from './Nav';

const Main = styled.main`
  position: relative;
  height: calc(100% - 180px);
  width: 100%;
  top: 60px;
`;

/**
const Main = styled.main`
  position: fixed;
  height: calc(100% - 185px);
  width: 100%;
  padding: 1em;
  overflow-y: scroll;

  @media (min-width: 700px) {
    flex: 1;
    margin-left: 220px;
    height: calc(100% - 64px);
    width: calc(100% - 220px);
  }
`;

 */

const Layout = ({ children }) => {
  return (
    <div>
      <Nav />
      <Main>{children}</Main>
    </div>
  );
};

export default Layout;