import React from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaArrowLeft, FaShoppingCart } from 'react-icons/fa';
import { useCart } from './CartContext';
import './Cart.css';

const Cart = () => {
  const { cart, updateCartQty, removeFromCart } = useCart();

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  };

  if (cart.length === 0) {
    return (
      <div className="container cart-empty">
        <FaShoppingCart size={48} />
        <h2>Your cart is empty</h2>
        <Link to="/products" className="btn btn-primary mt-3">
          <FaArrowLeft /> Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1>Shopping Cart</h1>
        <div className="cart-layout">
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item card">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p>${item.price}</p>
                  <div className="cart-qty">
                    <label>Qty:</label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={e => updateCartQty(item.id, parseInt(e.target.value))}
                    />
                  </div>
                </div>
                <button className="cart-remove" onClick={() => removeFromCart(item.id)}>
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
          <div className="cart-summary card">
            <h2>Order Summary</h2>
            <p>Total Items: {cart.reduce((sum, item) => sum + item.quantity, 0)}</p>
            <p className="cart-total">Total: <strong>${getTotal()}</strong></p>
            <Link to="/checkout" className="btn btn-success full-width mt-2">Proceed to Checkout</Link>
            <Link to="/products" className="btn btn-secondary full-width mt-2">
              <FaArrowLeft /> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart; 