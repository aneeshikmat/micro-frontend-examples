import React from 'react';
import { useParams } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardMedia, 
  Grid,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ForExampleLink from "./ForExampleLink";

// Mock product data (same as in ProductList for consistency)
const products = [
  {
    id: 1,
    name: 'Product 1',
    description: 'This is a description for Product 1. It is a great product with many features.',
    price: '$19.99',
    imageUrl: 'https://2nees.com/img/pages/58.jpg',
    details: [
      'High-quality materials',
      'Durable construction',
      'Easy to use',
      'Versatile application'
    ],
    specifications: {
      'Dimensions': '10 x 5 x 2 inches',
      'Weight': '1.5 lbs',
      'Color': 'Black',
      'Material': 'Aluminum'
    }
  },
  {
    id: 2,
    name: 'Product 2',
    description: 'This is a description for Product 2. It is an amazing product that you will love.',
    price: '$29.99',
    imageUrl: 'https://2nees.com/img/pages/58.jpg',
    details: [
      'Premium quality',
      'Advanced features',
      'Modern design',
      'Long-lasting performance'
    ],
    specifications: {
      'Dimensions': '12 x 6 x 3 inches',
      'Weight': '2.0 lbs',
      'Color': 'Silver',
      'Material': 'Stainless Steel'
    }
  },
  {
    id: 3,
    name: 'Product 3',
    description: 'This is a description for Product 3. It is a fantastic product with excellent quality.',
    price: '$39.99',
    imageUrl: 'https://2nees.com/img/pages/58.jpg',
    details: [
      'Innovative technology',
      'Sleek design',
      'User-friendly interface',
      'Energy efficient'
    ],
    specifications: {
      'Dimensions': '8 x 4 x 1 inches',
      'Weight': '1.0 lbs',
      'Color': 'White',
      'Material': 'Plastic'
    }
  },
  {
    id: 4,
    name: 'Product 4',
    description: 'This is a description for Product 4. It is a wonderful product that exceeds expectations.',
    price: '$49.99',
    imageUrl: 'https://2nees.com/img/pages/58.jpg',
    details: [
      'Superior craftsmanship',
      'Exceptional durability',
      'Elegant appearance',
      'Versatile functionality'
    ],
    specifications: {
      'Dimensions': '15 x 7 x 4 inches',
      'Weight': '3.0 lbs',
      'Color': 'Gold',
      'Material': 'Brass'
    }
  }
];

const BackLink = () => <Button
  variant="outlined"
  component={ForExampleLink}
  to="/list"
  startIcon={<ArrowBackIcon />}
  sx={{ mb: 3 }}
>
  Back to Products
</Button>;


const ProductDetails = () => {
  const { id } = useParams();
  const productId = parseInt(id, 10);
  
  // Find the product with the matching ID
  const product = products.find(p => p.id === productId);

  // If product not found
  if (!product) {
    return (
      <Box sx={{ my: 4 }}>
        <Typography variant="h5" color="error" gutterBottom>
          Product not found
        </Typography>
        <BackLink />
      </Box>
    );
  }
  
  return (
    <Box>
      <BackLink />
      
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                component="img"
                image={product.imageUrl}
                alt={product.name}
                sx={{ height: 300 }}
              />
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h1" gutterBottom>
              {product.name}
            </Typography>
            
            <Typography variant="h5" color="primary" gutterBottom>
              {product.price}
            </Typography>
            
            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="h6" gutterBottom>
              Key Features
            </Typography>
            
            <List dense>
              {product.details.map((detail, index) => (
                <ListItem key={index}>
                  <ListItemText primary={detail} />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Paper>
      
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Specifications
        </Typography>
        
        <Grid container spacing={2}>
          {Object.entries(product.specifications).map(([key, value]) => (
            <React.Fragment key={key}>
              <Grid item xs={6} sm={3}>
                <Typography variant="subtitle2">{key}</Typography>
              </Grid>
              <Grid item xs={6} sm={9}>
                <Typography variant="body2">{value}</Typography>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default ProductDetails;