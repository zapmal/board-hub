import React from 'react';
import { useQuery } from 'react-query';

import { BoardsDisplay, Status } from 'components/boards';

import apiClient from 'services/api';

const Favorites = () => {
  const { 
    data: boards,
    isLoading,
    isError,
  } = useQuery('favoriteBoards', async () => {
    const { data } = await apiClient.get('/b/favorites');
    return data;
  });

  if (isLoading) {
    return <Status status='loading' loading={isLoading}/>;
  }

  if (isError) {
    return <Status status='error' />;
  }

  return (
    <BoardsDisplay 
      boards={boards} 
      header={<span>Tus tableros <strong>Favoritos</strong></span>}
    />
  );
};

export default Favorites;