import React from 'react';
import {
  Drawer,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListSubheader,
  ListItemText,
  Collapse,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

import HomeIcon from '@material-ui/icons/Home';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import FilterNoneIcon from '@material-ui/icons/FilterNone';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import StarIcon from '@material-ui/icons/Star';
import SettingsIcon from '@material-ui/icons/Settings';
import EditIcon from '@material-ui/icons/Edit';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import { NewBoardDialog } from '../Dialogs/NewBoardDialog';

import useToggle from 'hooks/useToggle';
import { useStyles } from './styles';

import logo from 'assets/images/logo.png';

export const BoardsDrawer = ({ isOpen, handleClick }) => {
  const {
    paper,
    drawerPaper,
    listText,
    collapsedListItem,
    collapsedListIcon,
  } = useStyles();
  const [boardActionsState, toggleActions] = useToggle();
  const [settingsState, toggleSettings] = useToggle();
  const [newBoardState, toggleNewBoard] = useToggle();

  return (
      <Drawer 
        open={isOpen}
        onClose={handleClick}
        classes={{ paper: drawerPaper }}
      >
        <Paper className={paper} variant='outlined' square>
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
            <ListItemText classes={{ primary: listText }} primary='Home' />
          </ListItem>

          <ListItem
            button
            onClick={toggleActions}
          >
            <ListItemIcon>
              <CollectionsBookmarkIcon color='primary'/>
            </ListItemIcon>
            <ListItemText classes={{ primary: listText }} primary='Tableros' />
            {boardActionsState ? <ExpandLess color='primary'/> : <ExpandMore color='primary'/>}
          </ListItem>

          <Collapse in={boardActionsState} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              <ListItem button component={Link} to='/b'>
                <ListItemText classes={{ primary: collapsedListItem }} primary='Todos'/>
                <ListItemIcon className={collapsedListIcon}>
                  <FilterNoneIcon color='primary'/>
                </ListItemIcon>
              </ListItem>

              <ListItem button component={Link} to='/b/favorites'>
                <ListItemText classes={{ primary: collapsedListItem }} primary='Favoritos'/>
                <ListItemIcon className={collapsedListIcon}>
                  <StarIcon color='primary'/>
                </ListItemIcon>
              </ListItem>

              <ListItem button onClick={toggleNewBoard}>
                <ListItemText classes={{ primary: collapsedListItem }} primary='Nuevo'/>
                <ListItemIcon className={collapsedListIcon}>
                  <AddCircleIcon color='primary'/>
                </ListItemIcon>

              </ListItem>
            </List>
          </Collapse>

          <ListItem
            button
            onClick={toggleSettings}
          >
            <ListItemIcon>
              <SettingsIcon color='primary'/>
            </ListItemIcon>
            <ListItemText classes={{ primary: listText }} primary='Ajustes' />
            {settingsState ? <ExpandLess color='primary'/> : <ExpandMore color='primary'/>}
          </ListItem>
        </List>

        <Collapse in={settingsState} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            <ListItem button component={Link} to='/account/change-password'>
              <ListItemText classes={{ primary: collapsedListItem }} primary='Cambiar Contraseña'/>
              <ListItemIcon className={collapsedListIcon}>
                <VpnKeyIcon color='primary'/>
              </ListItemIcon>
            </ListItem>

            <ListItem button component={Link} to='/account/change-username'>
              <ListItemText classes={{ primary: collapsedListItem }} primary='Cambiar nombre de usuario'/>
              <ListItemIcon className={collapsedListIcon}>
                <EditIcon color='primary'/>
              </ListItemIcon>
            </ListItem>
          </List>
        </Collapse>

        <NewBoardDialog isOpen={newBoardState} handleClose={toggleNewBoard} />
      </Drawer>
  );
};