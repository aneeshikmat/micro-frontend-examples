import React, {Suspense, useEffect, useLayoutEffect} from 'react';
import {BrowserRouter as Router, Routes, Route, useLocation, useNavigate} from 'react-router-dom';
import { Box, Container, CircularProgress, Typography } from '@mui/material';

// Lazy load remote components
const Header = React.lazy(() => import('header/Header'));
const Signin = React.lazy(() => import('signin/Signin'));

// Local components for different routes
const Home = () => (
  <Box sx={{ my: 4 }}>
    <Typography variant="h4" component="h1" gutterBottom>
      Home Page
    </Typography>
    <Typography variant="body1">
      Welcome to the Module Federation Example with Material UI and React Router!
    </Typography>
  </Box>
);

const AuthWrapper = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') !== "true"){
      navigate('/signin', { replace: true });
    }
  }, [navigate]);

  return (<>{children}</>)
}

const App = () => {
  return (
    <Router>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Header */}
        <Suspense fallback={<CircularProgress />}>
          <Header />
        </Suspense>
        
        {/* Main content */}
        <Container component="main" sx={{ flex: 1, py: 3 }}>
          <Routes>
            <Route path="/" element={<AuthWrapper><Home /></AuthWrapper>} />
            <Route path="/signin" element={
              <Suspense fallback={<CircularProgress />}>
                <Signin />
              </Suspense>
            } />
          </Routes>
        </Container>
      </Box>
    </Router>
  );
};

export default App;