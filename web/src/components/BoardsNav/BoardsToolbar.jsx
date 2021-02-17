import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  makeStyles,
  Button,
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';

import useUserStore from '../../stores/useUserStore';

import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles(theme => ({
  aboveDrawer: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  flex: {
    flex: 1,
  },
}));

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