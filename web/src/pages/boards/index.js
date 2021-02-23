import React from 'react';
import styled, { css } from 'styled-components/macro';
import HashLoader from 'react-spinners/HashLoader';
import { useQuery } from 'react-query';
import { Typography } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';

import BoardsDisplay from 'components/BoardsDisplay';
import Highlight from 'components/Highlight';

import apiClient from 'services/api';

const MessageContainer = styled.div`
  margin-top: 40px;
  text-align: center;
`;

const StatusContainer = styled.div`
  margin: 200px;
  ${({ error }) => error 
  ? 'text-align: center;'
  : css`
      display: flex;
      justify-content: center;
  `
  }
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
    return (
      <StatusContainer>
        <HashLoader loading={isLoading} size={100} color={'#7362d0'} />
      </StatusContainer>
    );
  }

  if (isError) {
    return (
      <StatusContainer error>
        <Typography variant='h4' color='secondary' gutterBottom>
          Oh no!
          <br />
          <ErrorIcon fontSize='large' color='secondary'/>
        </Typography>
        <Typography variant='subtitle1' gutterBottom>
          Parece que ha ocurrido un error.
        </Typography>
        <Typography variant='body2'>
          Revisa tu conexión e inténtalo de nuevo, si el error persiste, contacta con nosotros directamente.
        </Typography>
      </StatusContainer>
    );
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