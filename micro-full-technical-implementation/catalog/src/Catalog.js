import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {Box, Container} from '@mui/material';
import ProductList from './ProductList';
import ProductDetails from './ProductDetails';

const Catalog = () => {
  return (
    <Container component="main" sx={{ py: 3 }}>
      <Routes>
        <Route index element={<ProductList />} />
        <Route path="list" element={<ProductList />} />
        <Route path="details/:id" element={<ProductDetails />} />
        <Route path="*" element={<Box>404</Box>} />
      </Routes>
    </Container>
  );
};

export default Catalog;