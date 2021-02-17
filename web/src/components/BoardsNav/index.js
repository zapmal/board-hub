import React, { useState } from 'react';
import styled from 'styled-components/macro';

import BoardsToolbar from './BoardsToolbar';
import BoardsDrawer from './BoardsDrawer';

const NavContainer = styled.div`
  flex-grow: 1;
`;

const BoardsNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDrawerClick = () => setIsOpen(!isOpen);

  return (
    <NavContainer>
      <BoardsToolbar handleClick={handleDrawerClick}/>
      <BoardsDrawer 
        isOpen={isOpen}
        handleClick={handleDrawerClick}
      />
    </NavContainer>
  );
};

export default BoardsNav;