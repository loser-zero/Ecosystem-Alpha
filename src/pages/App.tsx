// src/pages/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductsPage from './ProductsPage';
import ProductDetailsPage from './ProductDetailsPage';
import CreateProductPage from './CreateProductPage';

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:id" element={<ProductDetailsPage />} />
      <Route path="/create-product" element={<CreateProductPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;