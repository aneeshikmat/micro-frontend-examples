import React, { useState, useEffect } from 'react';
import {AppBar, Toolbar, Typography, Button, Box} from '@mui/material';
import {Link} from 'react-router-dom';
import eventBus from 'host/eventBus';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === "true");

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
          Module Federation Example
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/about">
            About
          </Button>
          <Button color="inherit" component={Link} to="/dashboard">
            Dashboard
          </Button>

          {!isLoggedIn ? (
            <Button color="inherit" component={Link} to="/signin">
              Sign In
            </Button>
          ) : (
            <Button color="inherit" component={Link} to="/" onClick={handleLogout}>
              Sign Out
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;