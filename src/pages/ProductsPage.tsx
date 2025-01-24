// ProductsPage.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { fetchProductsAsync } from '../features/products/productSlice';
import ProductList from '../components/ProductList';
import { Product } from '../types/Product';

const ProductsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector((state: RootState) => state.products.status);
  const products = useSelector((state: RootState) => state.products.products);
  console.log("Продукты на странице ProductsPage:", products);

  const [filter, setFilter] = useState<'all' | 'favorites'>('all');

  useEffect(() => {
    console.log("Получение продуктов...");
    dispatch(fetchProductsAsync());
  }, [dispatch]);

  useEffect(() => {
    console.log("Продукты на странице ProductsPage:", products);
  }, [products]);

  const filteredProducts: Product[] = filter === 'favorites'
    ? products.filter(product => product.liked)
    : products;

  return (
    <div>
      <h1>Products</h1>
      <div>
        <button onClick={() => setFilter('all')}>Все</button>
        <button onClick={() => setFilter('favorites')}>Избранные</button>
      </div>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'succeeded' && <ProductList products={filteredProducts} />}
      {status === 'failed' && <p>Error loading products</p>}
    </div>
  );
};

export default ProductsPage;