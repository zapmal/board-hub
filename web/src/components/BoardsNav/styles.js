import styled from 'styled-components/macro';
import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles(theme => ({
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
  paper: {
    height: 100,
    '& img': {
      display: 'block',
      margin: '20px auto',
    },
  },
  drawerPaper: {
    position: 'relative',
    backgroundColor: theme.palette.secondary.main,
    width: 240,
  },
  listText: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },
  collapsedListItem: {
    color: theme.palette.primary.main,
    paddingLeft: 60,
  },
  collapsedListIcon: {
    paddingLeft: 30,
  },
}));

export const NavContainer = styled.div`
  flex-grow: 1;
`;
