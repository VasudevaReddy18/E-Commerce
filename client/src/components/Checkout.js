import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCreditCard, FaLock, FaCheckCircle } from 'react-icons/fa';
import { useCart } from './CartContext';
import axios from 'axios';
import './Checkout.css';

const Checkout = () => {
  const { cart, clearCart, user } = useCart();
  const navigate = useNavigate();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const getSubtotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getShipping = () => {
    return getSubtotal() > 50 ? 0 : 5.99;
  };

  const getTotal = () => {
    return (getSubtotal() + getShipping()).toFixed(2);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Place order in backend
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/orders`, {
        userId: user?.id,
        items: cart,
        shipping: {
          ...formData
        },
        total: getTotal()
      });
      if (res.data.success) {
        setPaymentSuccess(true);
        clearCart();
      } else {
        alert('Order failed. Please try again.');
      }
    } catch (err) {
      alert('Order failed. Please try again.');
    }
    setLoading(false);
  };

  if (cart.length === 0 && !paymentSuccess) {
    navigate('/cart');
    return null;
  }

  if (paymentSuccess) {
    return (
      <div className="checkout-success">
        <div className="container">
          <div className="success-card card">
            <FaCheckCircle className="success-icon" />
            <h2>Payment Successful!</h2>
            <p>Your order has been placed successfully. You will receive a confirmation email shortly.</p>
            <button className="btn btn-primary" onClick={() => navigate('/orders')}>
              View Order History
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <h1>Checkout</h1>
        <div className="checkout-layout">
          <div className="checkout-form">
            <div className="form-section card">
              <h3>Shipping Information</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>ZIP Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-section card">
              <h3>Payment Information</h3>
              <div className="form-group">
                <label>Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Expiry Date</label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    placeholder="123"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="order-summary card">
            <h3>Order Summary</h3>
            <div className="order-items">
              {cart.map(item => (
                <div key={item.id} className="order-item">
                  <img src={item.image} alt={item.name} />
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p>Qty: {item.quantity}</p>
                  </div>
                  <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="order-totals">
              <div className="total-row">
                <span>Subtotal:</span>
                <span>${getSubtotal().toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>Shipping:</span>
                <span>${getShipping().toFixed(2)}</span>
              </div>
              <div className="total-row total">
                <span>Total:</span>
                <span>${getTotal()}</span>
              </div>
            </div>
            <button 
              className="btn btn-success full-width" 
              onClick={handlePayment}
              disabled={loading}
            >
              {loading ? 'Processing...' : `Pay $${getTotal()}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 