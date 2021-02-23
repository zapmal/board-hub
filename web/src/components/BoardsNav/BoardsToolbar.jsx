import React from 'react';
import { withRouter } from 'react-router-dom';
import { useIsFetching } from 'react-query';
import {
  AppBar,
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  Button,
} from '@material-ui/core';
import LoopIcon from '@material-ui/icons/Loop';
import CheckIcon from '@material-ui/icons/Check';

import useUserStore from 'stores/useUserStore';
import { useStyles } from './styles';

import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const BoardsToolbar = ({ history, handleClick }) => {
  const { 
    aboveDrawer, 
    menuButton, 
    flex, 
    fetchingIndicator 
  } = useStyles();
  const removeUser = useUserStore(state => state.removeUser);
  const isFetching = useIsFetching();

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
        <div className={fetchingIndicator}>
          <FetchingIndicator fetching={isFetching} />
        </div>
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

const FetchingIndicator = ({ fetching }) => {
  const message = fetching 
    ? 'Estamos chequeando que la información esté al día.'
    : 'La información está al día.';

  return (
    <Tooltip title={message}>
      {fetching 
        ? <LoopIcon color='primary' /> 
        : <CheckIcon color='primary' />
      }
    </Tooltip>
  );
};

export default withRouter(BoardsToolbar);