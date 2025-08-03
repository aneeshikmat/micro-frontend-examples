import React, { Suspense } from 'react';
import { Box, Container, Typography, Tabs, Tab, CircularProgress, Paper } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

// Lazy load remote components
const AccountDetails = React.lazy(() => import('accountdetails/AccountDetails'));
const PaymentDetails = React.lazy(() => import('paymentdetails/PaymentDetails'));

const MyAccount = () => {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container component="main" sx={{ py: 3 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <AccountBoxIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
          <Typography variant="h4" component="h1">
            My Account
          </Typography>
        </Box>

        <Box sx={{ width: '100%', mb: 3 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="account tabs"
            variant="fullWidth"
          >
            <Tab label="Account Details" />
            <Tab label="Payment Details" />
          </Tabs>
        </Box>

        <Box sx={{ mt: 2 }}>
          {tabValue === 0 && (
            <Suspense fallback={
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                <CircularProgress />
              </Box>
            }>
              <AccountDetails />
            </Suspense>
          )}
          {tabValue === 1 && (
            <Suspense fallback={
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                <CircularProgress />
              </Box>
            }>
              <PaymentDetails />
            </Suspense>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default MyAccount;