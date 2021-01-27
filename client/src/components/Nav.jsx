import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Button,
  Box,
  makeStyles,
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import GitHubIcon from '@material-ui/icons/GitHub';
import { Link } from 'react-router-dom';

import logoImage from '../images/logo.png';

const useStyles = makeStyles(theme => ({
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

const navRoutes = [
  {
    label: 'Acerca de nosotros',
    href: '/about',
    icon: <InfoIcon />,
  },
  {
    label: 'Contacto',
    href: '/contact',
    icon: <ContactPhoneIcon />,
  },
  {
    label: 'Open Source',
    href: '/opensource',
    icon: <GitHubIcon />,
  },
];

const Nav = () => {
  const { 
    logo,
    header, 
    toolbar, 
    button, 
    actionButtons 
  } = useStyles();

  return (
    <header>
      <AppBar className={header}>
        <Toolbar className={toolbar}>

          <Link to={'/'}>
            <img src={logoImage} className={logo} width='160px' alt='Logo' />
          </Link>

          <Box>
            {navRoutes.map(({ label, href, icon }) => (
              <Button
                startIcon={icon}
                key={label}
                to={href}
                className={button}
                component={Link}
              >
                {label}
              </Button>
            ))}
            <Button 
              variant='contained' 
              color='secondary' 
              to='/signin'
              component={Link}
              className={actionButtons}
            >
              Inicio de sesión
            </Button>

            <Button 
              variant='contained' 
              color='secondary'
              to='/signup'
              component={Link}
              className={actionButtons}
            >
              Registro
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Nav;