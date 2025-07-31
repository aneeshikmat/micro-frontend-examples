import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

const About = () => (
  <Box sx={{ my: 4 }}>
    <Typography variant="h4" component="h1" gutterBottom>
      About Page
    </Typography>
    <Typography variant="body1">
      This is an example of Micro Frontend architecture using Module Federation.
    </Typography>
  </Box>
);

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
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
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