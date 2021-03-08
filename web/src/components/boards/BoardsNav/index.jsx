import React, { useState } from 'react';

import { BoardsToolbar } from './BoardsToolbar';
import { BoardsDrawer } from './BoardsDrawer';

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