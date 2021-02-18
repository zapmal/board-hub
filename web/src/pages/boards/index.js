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
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

import { Link } from 'react-router-dom';

import ConfirmationDialog from '../../components/ConfirmationDialog';
import Highlight from '../../components/Highlight';

import lost from '../../assets/svgs/lost.svg';
import working from '../../assets/svgs/working.svg';
import help from '../../assets/svgs/help.svg';

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
  display: flex;
  align-items: center;
  border: 2px solid #7362d0;
  border-radius: 10px;
  margin: ${({ margin }) => margin}px;
  text-align: center;

  p {
    font-size: 20px;
    width: 50%;
  }
`;

const Separator = styled.div`
  height: 100px;
  background-color: #7362d0;
  text-align: center;

  h4 {
    padding-top: 10px;
  }
`;

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
              <img src={working} alt='Working' width='600px'/>
              <Typography gutterBottom>
                Rompe tus tareas en trozos digeribles, pequeños y fáciles de procesar. Estos son mucho
                más fáciles de completar y te ayudan a cumplir tu meta de forma progresiva.
              </Typography>
            </MessageContainer>

            <MessageContainer margin={30}>
              <img src={help} alt='Working' width='600px'/>
              <Typography gutterBottom>
                Escribele a algún amigo o pide ayuda en linea. Siempre es mejor trabajar en equipo.
                Si no tienes a alguien disponible, intenta una comunidad en linea como <Highlight color='#00acee'>Twitter</Highlight> o <Highlight color='#7289da'>Discord</Highlight>
              </Typography>
            </MessageContainer>
          </>
        )}
        <ConfirmationDialog isOpen={isOpen} handleClose={handleClose} />
      </>
  );
};

export default Boards;