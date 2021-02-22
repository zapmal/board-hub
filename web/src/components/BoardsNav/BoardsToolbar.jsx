import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';

import useUserStore from 'stores/useUserStore';
import { useStyles } from './styles';

import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const BoardsToolbar = ({ history, handleClick }) => {
  const { aboveDrawer, menuButton, flex } = useStyles();
  const removeUser = useUserStore(state => state.removeUser);

  const handleLogout = () => {
    removeUser();
    history.push('/');
  };

  return (
    <AppBar className={aboveDrawer} color='secondary'>
      <Toolbar>
        <IconButton
          className={menuButton}
          onClick={handleClick}
        >
          <MenuIcon color='primary'/>
        </IconButton>
        <Typography variant='h6' color='inherit' className={flex}>
          Tableros
        </Typography>
        <div>
          <Button 
            variant='outlined'
            color='primary'
            startIcon={<ExitToAppIcon />}
            onClick={handleLogout}
          >
            Cerrar sesión
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(BoardsToolbar);