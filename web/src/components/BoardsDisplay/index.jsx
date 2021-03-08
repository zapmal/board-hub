import React, { useRef } from 'react';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import {
  Card,
  CardContent,
  CardActions,
  Grid,
  Button,
  IconButton,
  Typography,
} from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import DeleteIcon from '@material-ui/icons/Delete';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

import useToggle from 'hooks/useToggle';
import { 
  useStyles,
  MessageContainer,
  HeaderContainer,
  Separator,
} from './styles';

import DeleteBoardDialog from 'components/DeleteBoardDialog';
import Highlight from 'components/Highlight';

import apiClient from 'services/api';

import lost from 'assets/svgs/lost.svg';
import working from 'assets/svgs/working.svg';
import help from 'assets/svgs/help.svg';

const BoardsDisplay = ({ boards = [], header }) => {
  const classes = useStyles();
  const board = useRef(null);
  const [isOpen, toggleOpen] = useToggle();
  const queryClient = useQueryClient();
  const mutation = useMutation(({ id }) => apiClient.put(`/b/${id}/toggle-favorite`), {
    onSuccess: () => {
      queryClient.invalidateQueries('boards');
      queryClient.invalidateQueries('favoriteBoards');
    }
  });

  const handleFavoriteToggle = async (id) => {
    await mutation.mutateAsync({ id });
  };

  const handleDeleteDialogClick = (boardId) => {
    toggleOpen();
    board.current = boardId;
  };

  return (
    <>
      <HeaderContainer>
        <Typography variant='h4'>{header}</Typography>
      </HeaderContainer>
      <Grid container className={classes.container}>
        {boards.length > 0 ? boards.map((board, index) => (
          <Grid item md={3} key={`${board.name}-${index}`}>
            <Card className={classes.root} variant='outlined' color='secondary'>
              <CardContent>
                <Typography className={classes.top} color='textSecondary' gutterBottom>
                  {dayjs(board.createdAt).format('DD-MM-YYYY')}
                  <IconButton 
                    className={clsx(classes.favoriteButton, { [classes.isFavorite]: board.is_favorite })}
                    onClick={() => handleFavoriteToggle(board.id)}
                  >
                    <StarIcon />
                  </IconButton> 
                </Typography>
                <Typography className={classes.name} color='secondary'>
                  {board.name}
                </Typography>
                <Typography variant='body2' component='p'>
                  {board.description || 'Este tablero no posee una descripción.'}
                  <br />
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  size='small' 
                  component={Link} 
                  to={`/b/${board.id}`}
                  variant='outlined'
                >
                  Abrir
                </Button>
                <IconButton 
                  className={classes.deleteButton} 
                  onClick={() => handleDeleteDialogClick(board.id)} 
                  id={board.id}
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        )) 
        : (
          <MessageContainer margin={20} noBorder>
            <img src={lost} alt='Lost' width='500px'/>
            <Typography variant='h5' gutterBottom>
              Parece que no hay nada aún.
            </Typography>
            <Typography gutterBottom>
              Pero eso no importa, empieza a tu ritmo, nosotros te seguiremos.
            </Typography>
          </MessageContainer>
        )}
        </Grid>
        {boards.length >= 1 && (
          <>
            <Separator>
              <Typography variant='h4'>
                <Highlight color='#ffffff'>¿Atascado?</Highlight>
                <div>
                  <SentimentVeryDissatisfiedIcon color='primary' fontSize='large' />
                </div>
              </Typography>
            </Separator>

            <MessageContainer margin={30}>
              <img src={working} alt='Working' width='450px'/>
              <Typography gutterBottom>
                Rompe tus tareas en trozos digeribles, pequeños y fáciles de procesar. Estos son mucho
                más fáciles de completar y te ayudan a cumplir tu meta de forma progresiva.
              </Typography>
            </MessageContainer>

            <MessageContainer margin={30}>
              <img src={help} alt='Working' width='450px'/>
              <Typography gutterBottom>
                Escribele a algún amigo o pide ayuda en linea. Siempre es mejor trabajar en equipo.
                Si no tienes a alguien disponible, intenta una comunidad en linea como <Highlight color='#00acee'>Twitter</Highlight> o <Highlight color='#7289da'>Discord</Highlight>.
              </Typography>
            </MessageContainer>
          </>
        )}
        <DeleteBoardDialog isOpen={isOpen} handleClose={toggleOpen} boardId={board.current} />
      </>
  );
};

export default BoardsDisplay;