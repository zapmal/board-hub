import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  makeStyles,
  Paper,
  Switch,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Brightness4Icon from '@material-ui/icons/Brightness4';

import useUserStore from '../stores/useUserStore';

import logo from '../assets/images/logo.png';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: '100px',
    '& img': {
      display: 'block',
      margin: '20px auto',
    },
  },
  flex: {
    flex: 1,
  },
  drawerPaper: {
    position: 'relative',
    backgroundColor: theme.palette.secondary.main,
    width: drawerWidth,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  darkModeIcon: {
    marginBottom: '-7px', 
  },
  listText: {
    color: theme.palette.primary.main,
  },
  toolbarMargin: theme.mixins.toolbar,
  aboveDrawer: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

const BoardsNav = ({ history }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const removeUser = useUserStore(state => state.removeUser);

  const toggleOpen = () => setOpen(!open);

  const handleLogout = () => {
    removeUser();
    history.push('/');
  };

  return (
    <div className={classes.root}>
      <BoardsToolBar 
        classes={classes}
        toggleOpen={toggleOpen}
      />
      <div className={classes.toolbarMargin}/>
      <BoardsDrawer 
        open={open}
        toggleOpen={toggleOpen}
        handleLogout={handleLogout}
        classes={classes}
      />
    </div>
  );
};

const BoardsToolBar = ({ classes, toggleOpen }) => {
  return (
    <AppBar className={classes.aboveDrawer} color='secondary'>
      <Toolbar>
        <IconButton
          className={classes.menuButton}
          onClick={toggleOpen}
        >
          <MenuIcon color='primary'/>
        </IconButton>
        <Typography variant='h6' color='inherit' className={classes.flex}>
          Tableros
        </Typography>
        <div>
          <Brightness4Icon color='primary' className={classes.darkModeIcon} />
          <Switch color='primary'/>
        </div>
      </Toolbar>
    </AppBar>
  );
};

const BoardsDrawer = ({ open, toggleOpen, handleLogout, classes }) => {
  return (
      <Drawer 
        open={open}
        onClose={toggleOpen}
        classes={{ paper: classes.drawerPaper }}
      >
        <Paper className={classes.paper} variant='outlined' square='true'>
          <img src={logo} alt='Logo' width='200px'/>
        </Paper>
        <List subheader={<ListSubheader color='primary'>Acciones</ListSubheader>}>
          <ListItem
            button
            component={Link}
            to='/'
          >
            <ListItemIcon>
              <HomeIcon color='primary'/>
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.listText }} primary='Home' />
          </ListItem>

          <ListItem
            button
            component={Link}
            to='/b'
          >
            <ListItemIcon>
              <CollectionsBookmarkIcon color='primary'/>
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.listText }} primary='Tableros' />
          </ListItem>

          <ListItem
            button
            onClick={handleLogout}
          >
            <ListItemIcon>
              <ExitToAppIcon color='primary'/>
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.listText }} primary='Cerrar sesión' />
          </ListItem>
        </List>
      </Drawer>
  );
};

export default withRouter(BoardsNav);