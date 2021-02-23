import React from 'react';
import styled from 'styled-components/macro';
import { useQuery } from 'react-query';
import { Typography } from '@material-ui/core';

import BoardsDisplay from 'components/BoardsDisplay';
import Status from 'components/Status';
import Highlight from 'components/Highlight';

import apiClient from 'services/api';

const MessageContainer = styled.div`
  margin-top: 40px;
  text-align: center;
`;

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
    <>
      <MessageContainer>
        {boards && (
          <Typography variant='h4'>
            <Highlight>Todos</Highlight> tus tableros
          </Typography>
        )}
      </MessageContainer>
      <BoardsDisplay boards={boards} />
    </>
  );
};

export default Boards;