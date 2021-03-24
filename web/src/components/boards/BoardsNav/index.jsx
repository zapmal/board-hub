import React, { useState } from 'react';

import { BoardsToolbar } from './components/BoardsToolbar';
import { BoardsDrawer } from './components/BoardsDrawer';

import { NavContainer } from './styles';

export const BoardsNav = () => {
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
