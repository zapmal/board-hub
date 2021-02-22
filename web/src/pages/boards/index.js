import React from 'react';
import styled from 'styled-components/macro';
import { Typography } from '@material-ui/core';
import { useQuery } from 'react-query';

import BoardsDisplay from 'components/BoardsDisplay';
import Highlight from 'components/Highlight';

import apiClient from 'services/api';

const MessageContainer = styled.div`
  margin-top: 40px;
  text-align: center;
`;

const Boards = () => {
  const { data: boards } = useQuery('boards', async () => {
    const { data } = await apiClient.get('/b/all');
    return data;
  });

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