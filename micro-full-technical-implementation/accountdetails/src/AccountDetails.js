import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Paper, Grid, Avatar, Chip } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HistoryIcon from '@mui/icons-material/History';
import eventBus from 'host/eventBus';

const AccountDetails = () => {
  // State for historical orders count
  const [historicalOrders, setHistoricalOrders] = useState(3);// لأنه مجرد مثال وضعنا الرقم بشكل ثابت، لكن هل تتذكر عندما تحدثنا عن نقطة شبية بهذا الموضوع كيف سنتعامل معها؟ وكيف سنتعامل مع الأحادث لو لم التكن الخدمة موجودة؟

  // Listen for payment history added events
  useEffect(() => {
    const handlePaymentHistoryAdded = (data) => {
      setHistoricalOrders(data.count);
    };

    // Subscribe to the event
    eventBus.on('payment:history:added', handlePaymentHistoryAdded);

    // Cleanup event listener on unmount
    return () => {
      eventBus.off('payment:history:added', handlePaymentHistoryAdded);
    };
  }, []);

  // Mock account data
  const accountData = {
    name: 'Anees Hikmat',
    email: 'anees@example.com',
    username: '2nees',
    accountType: 'Premium',
    memberSince: 'January 15, 2023',
    lastLogin: new Date().toLocaleString()
  };

  return (
    <Container component="main" sx={{ py: 3 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar sx={{ width: 56, height: 56, mr: 2, bgcolor: 'primary.main' }}>
            <AccountCircleIcon fontSize="large" />
          </Avatar>
          <Typography variant="h4" component="h1">
            Account Details
          </Typography>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" color="text.secondary">
              Full Name
            </Typography>
            <Typography variant="body1" gutterBottom>
              {accountData.name}
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" color="text.secondary">
              Email Address
            </Typography>
            <Typography variant="body1" gutterBottom>
              {accountData.email}
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" color="text.secondary">
              Username
            </Typography>
            <Typography variant="body1" gutterBottom>
              {accountData.username}
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" color="text.secondary">
              Account Type
            </Typography>
            <Typography variant="body1" gutterBottom>
              {accountData.accountType}
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" color="text.secondary">
              Member Since
            </Typography>
            <Typography variant="body1" gutterBottom>
              {accountData.memberSince}
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" color="text.secondary">
              Last Login
            </Typography>
            <Typography variant="body1" gutterBottom>
              {accountData.lastLogin}
            </Typography>
          </Grid>

          {historicalOrders > 0 && (
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <HistoryIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="subtitle1" sx={{ mr: 1 }}>
                  Historical Orders:
                </Typography>
                <Chip
                  label={historicalOrders}
                  color="success"
                  size="large"
                />
              </Box>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Container>
  );
};

export default AccountDetails;