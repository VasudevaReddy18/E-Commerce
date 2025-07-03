import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaSearch, FaUser, FaBars, FaTimes, FaCog, FaGlobe } from 'react-icons/fa';
import { useCart } from './CartContext';
import { useTranslation } from 'react-i18next';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { cart, user, logout } = useCart();
  const { t, i18n } = useTranslation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-logo">
            ShopHub
          </Link>
        </div>

        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
            {t('nav.home')}
          </Link>
          <Link to="/products" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
            {t('nav.products')}
          </Link>
          {user && (
            <Link to="/admin" className="navbar-link" onClick={() => setIsMenuOpen(false)}>
              <FaCog /> {t('nav.admin')}
            </Link>
          )}
          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder={t('nav.search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              <FaSearch />
            </button>
          </form>
        </div>

        <div className="navbar-actions">
          <div className="language-switcher">
            <FaGlobe />
            <select onChange={handleLanguageChange} value={i18n.language}>
              <option value="en">{t('language.english')}</option>
              <option value="es">{t('language.spanish')}</option>
              <option value="hi">{t('language.hindi')}</option>
              <option value="ta">{t('language.tamil')}</option>
            </select>
          </div>
          {user ? (
            <div className="user-menu">
              <Link to="/profile" className="navbar-link">{t('nav.profile')}</Link>
              <span className="user-name">Hi, {user.name}</span>
              <button onClick={logout} className="btn btn-secondary">{t('nav.logout')}</button>
            </div>
          ) : (
            <Link to="/login" className="navbar-icon">
              <FaUser />
            </Link>
          )}
          <Link to="/cart" className="navbar-icon cart-icon">
            <FaShoppingCart />
            {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
          </Link>
          <button className="navbar-toggle" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 