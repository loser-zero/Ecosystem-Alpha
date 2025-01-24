// ./components/ProductForm.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProductAsync, fetchProductsAsync } from '../features/products/productSlice';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types/Product';
import { AppDispatch } from '../app/store';

const ProductForm: React.FC = () => {
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    title: '',
    price: 0,
    description: '',
    image: '',
    category: '',
    rating: { rate: 0, count: 0 },
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'price' ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) newErrors.title = 'Название обязательно';
    if (formData.price <= 0) newErrors.price = 'Цена должна быть больше нуля';
    if (!formData.description.trim()) newErrors.description = 'Описание обязательно';
    if (!formData.image.trim()) newErrors.image = 'URL изображения обязателен';
    if (!formData.category.trim()) newErrors.category = 'Категория обязательна';

    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
    }
    try {
      const resultAction = await dispatch(addProductAsync(formData));
      if (addProductAsync.fulfilled.match(resultAction)) {
          navigate('/products');
      }
  } catch (error) {
      console.error("Ошибка при добавлении продукта:", error);
  }
};

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        {errors.title && <span>{errors.title}</span>}
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
        {errors.price && <span>{errors.price}</span>}
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        {errors.description && <span>{errors.description}</span>}
      </div>
      <div>
        <label htmlFor="image">Image URL:</label>
        <input
          type="text"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
        />
        {errors.image && <span>{errors.image}</span>}
      </div>
      <div>
        <label htmlFor="category">Category:</label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />
        {errors.category && <span>{errors.category}</span>}
      </div>
      <button type="submit">Create Product</button>
    </form>
  );
};

export default ProductForm;