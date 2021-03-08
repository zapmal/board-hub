import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles(theme => ({
  logo: {
    marginTop: '5px',
  },

  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  button: {
    fontWeight: 700,
    color: theme.palette.extraColors.darkBlue,
    size: '18px',
    marginLeft: '5px',
    marginRight: '20px',
    transition: '200ms ease-in',

    '&:hover': {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.secondary.light
    }
  },

  actionButtons: {
    marginRight: '10px',
    color: theme.palette.primary.main,
    transition: '100ms ease-in',

    '&:hover': {
      backgroundColor: theme.palette.secondary.main
    },
  },
}));