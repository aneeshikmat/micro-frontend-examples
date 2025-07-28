import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Card, 
  CardContent, 
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';

const Dashboard = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title="Users" />
            <CardContent>
              <Typography variant="h3" align="center">1,254</Typography>
              <Typography variant="body2" color="text.secondary" align="center">
                Total registered users
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title="Revenue" />
            <CardContent>
              <Typography variant="h3" align="center">$15,420</Typography>
              <Typography variant="body2" color="text.secondary" align="center">
                Monthly revenue
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title="Orders" />
            <CardContent>
              <Typography variant="h3" align="center">234</Typography>
              <Typography variant="body2" color="text.secondary" align="center">
                New orders this month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Recent Activity */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <List>
              <ListItem>
                <ListItemText 
                  primary="New user registered" 
                  secondary="John Doe - 2 hours ago" 
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText 
                  primary="New order placed" 
                  secondary="Order #12345 - 4 hours ago" 
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText 
                  primary="Payment received" 
                  secondary="Invoice #54321 - 1 day ago" 
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        
        {/* System Status */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              System Status
            </Typography>
            <List>
              <ListItem>
                <ListItemText 
                  primary="Server Uptime" 
                  secondary="99.9% - 45 days" 
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText 
                  primary="Database Status" 
                  secondary="Operational" 
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText 
                  primary="API Response Time" 
                  secondary="120ms (avg)" 
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;