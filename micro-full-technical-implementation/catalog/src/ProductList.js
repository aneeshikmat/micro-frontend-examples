import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Button, 
  CardActions,
  Box
} from '@mui/material';

// Mock product data
const products = [
  {
    id: 1,
    name: 'Product 1',
    description: 'This is a description for Product 1. It is a great product with many features.',
    price: '$19.99',
    imageUrl: 'https://2nees.com/img/pages/58.jpg'
  },
  {
    id: 2,
    name: 'Product 2',
    description: 'This is a description for Product 2. It is an amazing product that you will love.',
    price: '$29.99',
    imageUrl: 'https://2nees.com/img/pages/58.jpg'
  },
  {
    id: 3,
    name: 'Product 3',
    description: 'This is a description for Product 3. It is a fantastic product with excellent quality.',
    price: '$39.99',
    imageUrl: 'https://2nees.com/img/pages/58.jpg'
  },
  {
    id: 4,
    name: 'Product 4',
    description: 'This is a description for Product 4. It is a wonderful product that exceeds expectations.',
    price: '$49.99',
    imageUrl: 'https://2nees.com/img/pages/58.jpg'
  }
];

const ProductList = () => {
  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Product Catalog
        </Typography>
        <Typography variant="body1">
          Browse our collection of products or view details of specific items.
        </Typography>
      </Box>

      <Box>
        <Typography variant="h5" component="h2" gutterBottom>
          Product List
        </Typography>

        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={product.imageUrl}
                  alt={product.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="h3">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                    {product.price}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    component={RouterLink}
                    to={`/details/${product.id}`}
                  >
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default ProductList;