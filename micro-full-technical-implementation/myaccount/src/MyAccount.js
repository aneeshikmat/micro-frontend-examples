import React, { Suspense } from 'react';
import { Box, Container, Typography, CircularProgress, Paper } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

// Lazy load remote components
const AccountDetails = React.lazy(() => import('accountdetails/AccountDetails'));
const PaymentDetails = React.lazy(() => import('paymentdetails/PaymentDetails'));

const MyAccount = () => {
  return (
    <Container component="main" sx={{ py: 3 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <AccountBoxIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
          <Typography variant="h4" component="h1">
            My Account
          </Typography>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Suspense fallback={
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          }>
            <AccountDetails />
          </Suspense>

          <Suspense fallback={
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          }>
            <PaymentDetails />
          </Suspense>
        </Box>
      </Paper>
    </Container>
  );
};

export default MyAccount;