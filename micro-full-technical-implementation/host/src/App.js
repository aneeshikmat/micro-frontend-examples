import React, {Suspense, useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';
import { Box, Container, CircularProgress } from '@mui/material';

// Lazy load remote components
const Header = React.lazy(() => import('header/Header'));
const Signin = React.lazy(() => import('signin/Signin'));
const Catalog = React.lazy(() => import('catalog/Catalog'));
const MyAccount = React.lazy(() => import('myaccount/MyAccount'));

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
            <Route path="/" element={
              <AuthWrapper>
                <Suspense fallback={<CircularProgress />}>
                  <MyAccount />
                </Suspense>
              </AuthWrapper>
            } />
            <Route path="/signin" element={
              <Suspense fallback={<CircularProgress />}>
                <Signin />
              </Suspense>
            } />
            <Route path="/catalog/*" element={
              <AuthWrapper>
                <Suspense fallback={<CircularProgress />}>
                  <Catalog />
                </Suspense>
              </AuthWrapper>
            } />
            <Route path="*" element={<Box>404</Box>} />
          </Routes>
        </Container>
      </Box>
    </Router>
  );
};

export default App;