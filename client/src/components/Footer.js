import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <span className="footer-logo">ShopHub</span>
          <p>&copy; {new Date().getFullYear()} ShopHub. All rights reserved.</p>
        </div>
        <div className="footer-links">
          <a href="/" className="footer-link">Home</a>
          <a href="/products" className="footer-link">Products</a>
          <a href="/cart" className="footer-link">Cart</a>
          <a href="/login" className="footer-link">Login</a>
        </div>
        <div className="footer-social">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon"><FaFacebook /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon"><FaTwitter /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon"><FaInstagram /></a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon"><FaLinkedin /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 