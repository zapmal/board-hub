import React, { useState } from 'react';
import styled from 'styled-components/macro';
import clsx from 'clsx';
import {
  Card,
  CardContent,
  CardActions,
  Grid,
  Button,
  IconButton,
  Typography,
  makeStyles,
} from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

import { Link } from 'react-router-dom';

import ConfirmationDialog from '../../components/ConfirmationDialog';
import Highlight from '../../components/Highlight';

import lost from '../../assets/svgs/lost.svg';
import working from '../../assets/svgs/working.svg';

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 275,
    minHeight: 170,
    margin: '40px 20px',
  },
  favoriteButton: {
    marginBottom: 3,
  },
  deleteButton: {
    color: theme.palette.error.main,
  },
  isFavorite: {
    color: 'gold',
  },
  top: {
    fontSize: 14,
  },
  name: {
    marginBottom: 12,
  },
  container: {
    justifyContent: 'center',
  },
}));

const MessageContainer = styled.div`
  margin: ${({ margin }) => margin}px;
  text-align: center;
`;

const boards = [
  // {
  //   'name': 'Escuela',
  //   'description': 'Aquí guardo cosas de la escuela.',
  //   'created': '01/01/2001',
  // },
  // {
  //   'name': 'Trabajo',
  //   'description': 'Aquí guardo cosas del trabajo.',
  //   'created': '02/02/2002',
  // },
  // {
  //   'name': 'Hogar',
  //   'description': 'Aquí guardo cosas del hogar.',
  //   'created': '03/03/2003',
  // },
  // {
  //   'name': 'Entretenimiento',
  //   'description': 'Aquí guardo cosas para entretenerme.',
  //   'created': '04/04/2004',
  //   'isFavorite': true,
  // },
  // {
  //   'name': 'Entretenimiento',
  //   'description': 'Aquí guardo cosas para entretenerme.',
  //   'created': '04/04/2004',
  //   'isFavorite': true,
  // },
  {
    'name': 'Entretenimiento',
    'description': '',
    'created': '04/04/2004',
    'isFavorite': true,
  },
];

const Boards = () => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <Grid container className={classes.container}>
        {boards.length > 0 ? boards.map((board, index) => (
          <Grid item md={3} key={`${board.name}-${index}`}>
            <Card className={classes.root} variant="outlined" color='secondary'>
              <CardContent>
                <Typography className={classes.top} color="textSecondary" gutterBottom>
                  {board.created.toString()}
                  <IconButton 
                    className={clsx(classes.favoriteButton, { [classes.isFavorite]: board.isFavorite })}
                    onClick={(() => console.log('new favorite'))}
                  >
                    <StarIcon />
                  </IconButton>
                </Typography>
                <Typography className={classes.name} color="secondary">
                  {board.name}
                </Typography>
                <Typography variant="body2" component="p">
                  {board.description || 'Este tablero no posee una descripción.'}
                  <br />
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" component={Link} to='/b/id' variant='outlined'>Abrir</Button>
                <IconButton className={classes.deleteButton} onClick={handleOpen}>
                  <DeleteIcon />
                </IconButton>
                <ConfirmationDialog isOpen={isOpen} handleClose={handleClose} />
              </CardActions>
            </Card>
          </Grid>
        )) 
        : (
          <MessageContainer margin={50}>
            <img src={lost} alt='Lost' width='500px'/>
            <Typography variant='h5' gutterBottom>
              Parece que no hay nada aún.
            </Typography>
            <Typography gutterBottom>
              Pero eso no importa, empieza a tu ritmo, nosotros te seguiremos.
            </Typography>
            <IconButton 
              component={Link}
              to='/b/new'
              color='secondary'
            >
              <AddIcon />
            </IconButton>
          </MessageContainer>
        )}
        </Grid>
        <MessageContainer margin={30}>
          <Typography variant='h4'>
            <Highlight>¿Atascado?</Highlight>
          </Typography>
          <img src={working} alt='Working' width='500px'/>
          <Typography gutterBottom>
            Rompe tus tareas en trozos digeribles, pequeños y fáciles de procesar.
          </Typography>
        </MessageContainer>
      </>
  );
};

export default Boards;