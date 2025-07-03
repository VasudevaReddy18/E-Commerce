import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaStar, FaShoppingCart } from 'react-icons/fa';
import axios from 'axios';
import { useCart } from './CartContext';
import './Home.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/products`);
        setFeaturedProducts(response.data.slice(0, 4)); // Show first 4 products
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Discover Amazing Products
            </h1>
            <p className="hero-subtitle">
              Shop the latest trends in electronics, fashion, and more. 
              Quality products at unbeatable prices.
            </p>
            <div className="hero-buttons">
              <Link to="/products" className="btn btn-primary">
                Shop Now <FaArrowRight />
              </Link>
              <Link to="/products" className="btn btn-secondary">
                View Categories
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <img 
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600" 
              alt="Shopping" 
            />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <div className="container">
          <div className="section-header">
            <h2>Featured Products</h2>
            <p>Handpicked products for you</p>
          </div>
          
          <div className="grid grid-4">
            {featuredProducts.map((product) => (
              <div key={product.id} className="product-card card">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => addToCart(product)}
                  >
                    <FaShoppingCart />
                  </button>
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-rating">
                    <FaStar className="star" />
                    <span>{product.rating}</span>
                    <span className="reviews">({product.reviews} reviews)</span>
                  </div>
                  <p className="product-price">${product.price}</p>
                  <Link to={`/product/${product.id}`} className="btn btn-primary">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-4">
            <Link to="/products" className="btn btn-secondary">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <div className="container">
          <div className="section-header">
            <h2>Shop by Category</h2>
            <p>Find what you're looking for</p>
          </div>
          
          <div className="grid grid-3">
            <div className="category-card card">
              <div className="category-icon">📱</div>
              <h3>Electronics</h3>
              <p>Latest gadgets and tech</p>
              <Link to="/products?category=Electronics" className="btn btn-primary">
                Explore
              </Link>
            </div>
            
            <div className="category-card card">
              <div className="category-icon">👕</div>
              <h3>Clothing</h3>
              <p>Fashion and style</p>
              <Link to="/products?category=Clothing" className="btn btn-primary">
                Explore
              </Link>
            </div>
            
            <div className="category-card card">
              <div className="category-icon">🏠</div>
              <h3>Home & Garden</h3>
              <p>Everything for your home</p>
              <Link to="/products?category=Home & Garden" className="btn btn-primary">
                Explore
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 