import React, {useState, useEffect} from 'react';
import {AppBar, Toolbar, Typography, Button, Stack} from '@mui/material';
import {Link, useLocation} from 'react-router-dom';
import eventBus from 'event-bus';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === "true");
  const location = useLocation();

  useEffect(() => {
    // Listen for login events
    const loginHandler = () => {
      setIsLoggedIn(true);
    };

    // Listen for logout events
    const logoutHandler = () => {
      setIsLoggedIn(false);
    };

    // Subscribe to events
    eventBus.on('user:login', loginHandler);
    eventBus.on('user:logout', logoutHandler);

    // Cleanup event listeners on unmount
    return () => {
      eventBus.off('user:login', loginHandler);
      eventBus.off('user:logout', logoutHandler);
    };
  }, []);

  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', "false");
    eventBus.emit('user:logout');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
          Micro Frontend Full Technical Implementation Example
        </Typography>
        <Stack direction={'row'} spacing={2}>
          {!isLoggedIn ? (
            <Button color="inherit" component={Link} to="/signin">
              Sign In
            </Button>
          ) : (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/"
                variant={'outlined'}
                sx={{
                  borderColor: location.pathname === '/' ? 'white' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderColor: 'white'
                  }
                }}
              >
                My Account
              </Button>

              <Button
                color="inherit"
                component={Link}
                to="/catalog"
                variant={'outlined'}
                sx={{
                  borderColor: location.pathname.includes('catalog') ? 'white' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderColor: 'white'
                  }
                }}
              >
                Catalog
              </Button>

              <Button color="inherit" component={Link} to="/signin" onClick={handleLogout}>
                Sign Out
              </Button>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;