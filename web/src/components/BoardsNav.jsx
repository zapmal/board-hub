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
  Collapse
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import FilterNoneIcon from '@material-ui/icons/FilterNone';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import StarIcon from '@material-ui/icons/Star';

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
  collapsedListItem: {
    color: theme.palette.primary.main,
    paddingLeft: '60px',
  },
  collapsedListIcon: {
    paddingLeft: '30px',
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
  const [checked, setChecked] = useState(false);

  const handleChecked = () => {
    setChecked(!checked);
  };

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
          <Switch checked={checked} onChange={handleChecked} name='theme-switch' color='primary'/>
        </div>
      </Toolbar>
    </AppBar>
  );
};

const BoardsDrawer = ({ open, toggleOpen, handleLogout, classes }) => {
  const [openBoardActions, setOpenBoardActions] = useState(false);

  const handleBoardActions = () => {
    setOpenBoardActions(!openBoardActions);
  };

  return (
      <Drawer 
        open={open}
        onClose={toggleOpen}
        classes={{ paper: classes.drawerPaper }}
      >
        <Paper className={classes.paper} variant='outlined' square>
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
            onClick={handleBoardActions}
          >
            <ListItemIcon>
              <CollectionsBookmarkIcon color='primary'/>
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.listText }} primary='Tableros' />
            {openBoardActions ? <ExpandLess color='primary'/> : <ExpandMore color='primary'/>}
          </ListItem>

          <Collapse in={openBoardActions} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              <ListItem button to='/b'>
                <ListItemText classes={{ primary: classes.collapsedListItem }} primary='Todos'/>
                <ListItemIcon className={classes.collapsedListIcon}>
                  <FilterNoneIcon color='primary'/>
                </ListItemIcon>
              </ListItem>

              <ListItem button component={Link} to='/b/favorites'>
                <ListItemText classes={{ primary: classes.collapsedListItem }} primary='Favoritos'/>
                <ListItemIcon className={classes.collapsedListIcon}>
                  <StarIcon color='primary'/>
                </ListItemIcon>
              </ListItem>

              <ListItem button>
                <ListItemText classes={{ primary: classes.collapsedListItem }} primary='Nuevo'/>
                <ListItemIcon className={classes.collapsedListIcon}>
                  <AddCircleIcon color='primary'/>
                </ListItemIcon>
              </ListItem>
            </List>
          </Collapse>

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