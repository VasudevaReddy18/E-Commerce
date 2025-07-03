import React, { useEffect, useState } from 'react';
import { useCart } from './CartContext';
import axios from 'axios';
import './Orders.css';

const Orders = () => {
  const { user } = useCart();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/orders/${user.id}`);
        setOrders(res.data.orders || []);
      } catch (err) {
        setOrders([]);
      }
      setLoading(false);
    };
    fetchOrders();
  }, [user]);

  if (!user) {
    return (
      <div className="container">
        <h2>Please log in to view your orders.</h2>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="container">
        <h1>Order History</h1>
        {orders.length === 0 ? (
          <div className="no-orders">
            <h3>No orders found.</h3>
            <p>Start shopping and place your first order!</p>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <div key={order.id} className="order-card card">
                <div className="order-header">
                  <span>Order ID: <strong>{order.id}</strong></span>
                  <span>Date: {new Date(order.date).toLocaleString()}</span>
                  <span>Total: <strong>${order.total}</strong></span>
                </div>
                <div className="order-items">
                  {order.items.map(item => (
                    <div key={item.id} className="order-item">
                      <img src={item.image} alt={item.name} />
                      <div className="item-details">
                        <h4>{item.name}</h4>
                        <p>Qty: {item.quantity}</p>
                        <p>Price: ${item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="order-shipping">
                  <h5>Shipping Info:</h5>
                  <p>{order.shipping.firstName} {order.shipping.lastName}, {order.shipping.address}, {order.shipping.city}, {order.shipping.zipCode}</p>
                  <p>Email: {order.shipping.email}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders; 