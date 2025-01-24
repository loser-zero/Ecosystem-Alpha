import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { useNavigate } from 'react-router-dom';

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams();
  const products = useSelector((state: RootState) => state.products.products);
  const status = useSelector((state: RootState) => state.products.status);
  const navigate = useNavigate();

  // Проверка статуса загрузки
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  const productId = parseInt(id!, 10);
  const product = products.find((p) => p.id === productId);

  // Проверка наличия продукта
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div id="content-container">
      <div className="product-card">
        <div className="product-card-img">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="product-card-content">
          <h3>{product.title}</h3>
          <p>Price: ${product.price}</p>
          <p>Description: {product.description}</p>
        </div>
        <div className="actions">
          <button onClick={() => navigate('/products')}>Back to Products</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;