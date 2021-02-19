import React from 'react';
import styled from 'styled-components/macro';
import { Typography } from '@material-ui/core';

import BoardsDisplay from '../../components/BoardsDisplay';
import Highlight from '../../components/Highlight';

const boards = [
  {
    'name': 'Escuela',
    'description': 'Aquí guardo cosas de la escuela.',
    'created': '01/01/2001',
  },
  {
    'name': 'Trabajo',
    'description': 'Aquí guardo cosas del trabajo.',
    'created': '02/02/2002',
  },
  {
    'name': 'Hogar',
    'description': 'Aquí guardo cosas del hogar.',
    'created': '03/03/2003',
  },
  {
    'name': 'Entretenimiento',
    'description': 'Aquí guardo cosas para entretenerme.',
    'created': '04/04/2004',
    'isFavorite': true,
  },
  {
    'name': 'Entretenimiento',
    'description': 'Aquí guardo cosas para entretenerme.',
    'created': '04/04/2004',
    'isFavorite': true,
  },
  {
    'name': 'Entretenimiento',
    'description': '',
    'created': '04/04/2004',
    'isFavorite': true,
  },
];

const MessageContainer = styled.div`
  margin-top: 40px;
  text-align: center;
`;

const Boards = () => {
  return (
    <>
      <MessageContainer>
        <Typography variant='h4'>
          <Highlight>Todos</Highlight> tus tableros
        </Typography>
      </MessageContainer>
      <BoardsDisplay boards={boards}/>
    </>
  );
};

export default Boards;