import React from 'react';
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

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 275,
    minHeight: 170,
    margin: '40px 20px',
  },
  favoriteButton: {
    margin: '-5px 0 -5px 135px',
  },
  isFavorite: {
    color: 'gold',
  },
  title: {
    fontSize: 14,
  },
  pos: {
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
];

const Boards = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      {boards.map((board, index) => (
        <Grid item md={3}>
          <Card className={classes.root} variant="outlined" color='secondary'>
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                {board.created.toString()}
                <IconButton className={clsx(classes.favoriteButton, { [classes.isFavorite]: board.isFavorite })}>
                  <StarIcon />
                </IconButton>
              </Typography>
              <Typography className={classes.pos} color="secondary">
                {board.name}
              </Typography>
              <Typography variant="body2" component="p">
                {board.description}
                <br />
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" variant='outlined'>Abrir</Button>
              <IconButton><DeleteIcon /></IconButton>
            </CardActions>
          </Card>
        </Grid>
      ))};
      </Grid>
  );
};

export default Boards;