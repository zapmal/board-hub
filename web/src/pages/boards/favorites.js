import React from 'react';

import BoardsDisplay from '../../components/BoardsDisplay';

const boards = [
  {
    name: 'Escuela',
    description: 'Aquí guardo cosas de la escuela.',
    created: '01/01/2001',
    isFavorite: true,
  },
  {
    name: 'Escuela',
    description: 'Aquí guardo cosas de la escuela.',
    created: '01/01/2001',
    isFavorite: true,
  },
  {
    name: 'Escuela',
    description: 'Aquí guardo cosas de la escuela.',
    created: '01/01/2001',
    isFavorite: true,
  },
];

const Favorites = () => {
  return <BoardsDisplay boards={boards}/>;
};

export default Favorites;