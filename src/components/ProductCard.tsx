// ./components/ProductCard.tsx
import React from 'react';
import { Product } from '../types/Product';
import { useDispatch } from 'react-redux';
import { toggleLike, removeProduct } from '../features/products/productSlice';
import { useNavigate } from 'react-router-dom';
import { FaRegHeart, FaHeart } from 'react-icons/fa';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Используем navigate

  const handleCardClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (!target.closest('.actions')) {
      navigate(`/products/${product.id}`);
    }
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      <div className='product-card-img'>
        <img src={product.image} alt={product.title} />
      </div>
      <div className="product-card-content">
        <h3>{product.title}</h3>
        <p>{product.description.substring(0, 100)}...</p>
        <div className="actions">
          <button onClick={(e) => { e.stopPropagation(); dispatch(toggleLike(product.id)); }}>
            {product.liked ? <FaHeart color="red" /> : <FaRegHeart />}
          </button>
          <button onClick={(e) => { e.stopPropagation(); dispatch(removeProduct(product.id)); }}>Удалить</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;