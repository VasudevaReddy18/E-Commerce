import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaStar, FaArrowLeft, FaShoppingCart } from 'react-icons/fa';
import axios from 'axios';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/products`);
        const found = response.data.find((p) => String(p.id) === String(id));
        setProduct(found);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCart = () => {
    // TODO: Implement cart functionality
    alert('Added to cart!');
  };

  if (loading) {
    return (
      <div className="container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container">
        <h2>Product not found</h2>
        <Link to="/products" className="btn btn-secondary mt-3">
          <FaArrowLeft /> Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <div className="container">
        <Link to="/products" className="btn btn-secondary mb-3">
          <FaArrowLeft /> Back to Products
        </Link>
        <div className="detail-layout">
          <div className="detail-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="detail-info">
            <h1>{product.name}</h1>
            <div className="product-rating mb-2">
              <FaStar className="star" />
              <span>{product.rating}</span>
              <span className="reviews">({product.reviews} reviews)</span>
            </div>
            <p className="product-price">${product.price}</p>
            <p className="product-description mb-3">{product.description}</p>
            <button className="btn btn-primary" onClick={addToCart}>
              <FaShoppingCart /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 