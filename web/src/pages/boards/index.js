import React, { useState } from 'react';
// import styled from 'styled-components/macro';
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

import { Link } from 'react-router-dom';

import ConfirmationDialog from '../../components/ConfirmationDialog';

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

const boards = [
  {
    'name': 'Escuela',
    'description': 'Aquí guardo cosas de la escuela.',
    'created': '01/01/2001',
  },
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
  // {
  //   'name': 'Entretenimiento',
  //   'description': '',
  //   'created': '04/04/2004',
  //   'isFavorite': true,
  // },
];

const Boards = () => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => setIsOpen(false);

  return (
    <Grid container className={classes.container}>
      {boards.map((board, index) => (
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
      ))}
      </Grid>
  );
};

export default Boards;