import React, { useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Button,
  Box,
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import GitHubIcon from '@material-ui/icons/GitHub';
import PulseLoader from 'react-spinners/PulseLoader';
import { Link, withRouter } from 'react-router-dom';

import useUserStore from 'stores/useUserStore';
import { useStyles } from './styles';

import logoImage from 'assets/images/logo.png';

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

const Nav = ({ location }) => {
  const { 
    logo,
    header, 
    toolbar, 
    button, 
    actionButtons 
  } = useStyles();
  const {
    user,
    loading,
    setUser,
    removeUser,
  } = useUserStore();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!user && token) {
      setUser();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
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

            {loading 
            ? (
              <PulseLoader color='#7352d0' loading={loading} size={10}/> 
            ) 
            : (
              user
                ? (
                  <>
                    <Button 
                      variant='contained' 
                      color='secondary' 
                      to='/b'
                      component={Link}
                      className={actionButtons}
                    >
                      Tus Tableros
                    </Button>
                    <Button 
                      variant='contained' 
                      color='secondary' 
                      className={actionButtons}
                      onClick={removeUser}
                    >
                      Cerrar sesión
                    </Button>
                  </>
                )
                : (
                  <>
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
                  </>
              )
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default withRouter(Nav);