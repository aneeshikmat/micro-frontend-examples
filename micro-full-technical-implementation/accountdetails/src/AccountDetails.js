import React from 'react';
import { Box, Container, Typography, Paper, Grid, Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const AccountDetails = () => {
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
        </Grid>
      </Paper>
    </Container>
  );
};

export default AccountDetails;