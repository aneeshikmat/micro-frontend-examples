import React, { useState } from 'react';
import { Box, Container, Typography, Paper, Grid, Card, CardContent, Divider, Chip, Button } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PaymentIcon from '@mui/icons-material/Payment';
import AddIcon from '@mui/icons-material/Add';
import eventBus from 'host/eventBus';

const PaymentDetails = () => {
  // Mock payment data
  const paymentMethods = [
    {
      id: 1,
      type: 'Credit Card',
      cardNumber: '**** **** **** 4567',
      cardHolder: 'John Doe',
      expiryDate: '09/2027',
      isDefault: true
    },
    {
      id: 2,
      type: 'Credit Card',
      cardNumber: '**** **** **** 8901',
      cardHolder: 'John Doe',
      expiryDate: '12/2025',
      isDefault: false
    }
  ];

  // Use state for payment history to allow dynamic updates
  const [paymentHistory, setPaymentHistory] = useState([
    {
      id: 1,
      date: 'August 1, 2025',
      amount: '$99.99',
      status: 'Completed',
      method: 'Credit Card (*4567)'
    },
    {
      id: 2,
      date: 'July 1, 2025',
      amount: '$99.99',
      status: 'Completed',
      method: 'Credit Card (*4567)'
    },
    {
      id: 3,
      date: 'June 1, 2025',
      amount: '$99.99',
      status: 'Completed',
      method: 'Credit Card (*4567)'
    }
  ]);

  // Function to add a new payment history row
  const addPaymentHistoryRow = () => {
    // Create a new payment history entry
    const newPayment = {
      id: paymentHistory.length + 1,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      amount: `$${Math.floor(Math.random() * 100) + 10}`,
      status: 'Completed',
      method: 'Credit Card (*4567)'
    };
    
    // Update the payment history state
    setPaymentHistory((prevState) => [
      ...prevState,
      newPayment
    ]);

    // Emit an event to notify AccountDetails to increase historical orders
    eventBus.emit('payment:history:added', { count: paymentHistory.length + 1 });
  };

  return (
    <Container component="main" sx={{ py: 3 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <CreditCardIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
          <Typography variant="h4" component="h1">
            Payment Details
          </Typography>
        </Box>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Payment Methods
        </Typography>
        
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {paymentMethods.map((method) => (
            <Grid item xs={12} sm={6} key={method.id}>
              <Card variant="outlined">
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="h6" component="div">
                      {method.type}
                    </Typography>
                    {method.isDefault && (
                      <Chip label="Default" color="primary" size="small" />
                    )}
                  </Box>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    {method.cardNumber}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {method.cardHolder}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Expires: {method.expiryDate}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3, mb: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 0 }}>
            Payment History
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<AddIcon />}
            onClick={addPaymentHistoryRow}
          >
            Add Payment History
          </Button>
        </Box>
        
        <Grid container spacing={2}>
          {paymentHistory.map((payment) => (
            <Grid item xs={12} key={payment.id}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Grid container alignItems="center">
                  <Grid item xs={12} sm={3}>
                    <Typography variant="body2" color="text.secondary">
                      Date
                    </Typography>
                    <Typography variant="body1">
                      {payment.date}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Typography variant="body2" color="text.secondary">
                      Amount
                    </Typography>
                    <Typography variant="body1">
                      {payment.amount}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Typography variant="body2" color="text.secondary">
                      Method
                    </Typography>
                    <Typography variant="body1">
                      {payment.method}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Typography variant="body2" color="text.secondary">
                      Status
                    </Typography>
                    <Chip 
                      label={payment.status} 
                      color={payment.status === 'Completed' ? 'success' : 'default'} 
                      size="small"
                      icon={<PaymentIcon />}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};

export default PaymentDetails;