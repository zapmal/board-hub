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

import logo from '../images/logo-alter.png';

const useStyles = makeStyles(theme => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  button: {
    fontWeight: 700,
    size: '18px',
    marginLeft: '5px',
    marginRight: '20px',
    transition: '200ms ease-in',

    '&:hover': {
      backgroundColor: theme.palette.primary.light
    }
  },

  actionButtons: {
    marginRight: '10px',
    color: theme.palette.primary.main,
    transition: '100ms ease-in',

    '&:hover': {
      backgroundColor: '#ffffffff'
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
    href: 'https://github.com/Zondazx/board-hub',
    icon: <GitHubIcon />,
  },
];

const Nav = () => {
  const { header, toolbar, button, actionButtons } = useStyles();

  return (
    <header>
      <AppBar className={header}>
        <Toolbar className={toolbar}>
          <img src={logo} width='160px' alt='Logo' />
          {/* <a><img src={logo} width='160px' /></a> */}
          <Box>
            {navRoutes.map(({ label, href, icon }) => (
              <Button
                startIcon={icon}
                key={label}
                color='secondary'
                to={href}
                className={button}
                  // component: Link,
              >
                {label}
              </Button>
            ))}
            <Button 
              variant='contained' 
              color='secondary' 
              href='/signin'
              className={actionButtons}
            >
              Inicio de sesión
            </Button>

            <Button 
              variant='contained' 
              color='secondary'
              href='/signup'
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