import React from 'react';
import { useQuery } from 'react-query';

import BoardsDisplay from 'components/BoardsDisplay';
import Status from 'components/Status';

import apiClient from 'services/api';

const Boards = () => {
  const { 
    data: boards,
    isLoading,
    isError,
  } = useQuery('boards', async () => {
    const { data } = await apiClient.get('/b/all');
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
      header={<span><strong>Todos</strong> tus tableros</span>}
    />
  );
};

export default Boards;