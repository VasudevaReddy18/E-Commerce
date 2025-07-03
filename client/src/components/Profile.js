import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaEdit, FaSave, FaTimes, FaHistory } from 'react-icons/fa';
import { useCart } from './CartContext';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const { user, login } = useCart();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/${user.id}`);
        setProfile(res.data.user);
        setFormData({
          name: res.data.user.name,
          phone: res.data.user.phone
        });
      } catch (err) {
        setError('Failed to load profile');
      }
      setLoading(false);
    };
    fetchProfile();
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/user/${user.id}`, formData);
      setProfile(res.data.user);
      login(res.data.user); // Update global user state
      setEditing(false);
      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to update profile');
    }
  };

  const handleCancel = () => {
    setFormData({
      name: profile.name,
      phone: profile.phone
    });
    setEditing(false);
  };

  if (!user) {
    return (
      <div className="container">
        <h2>Please log in to view your profile.</h2>
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
    <div className="profile-page">
      <div className="container">
        <h1>My Profile</h1>
        
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="profile-layout">
          <div className="profile-card card">
            <div className="profile-header">
              <h2>Personal Information</h2>
              {!editing ? (
                <button className="btn btn-secondary" onClick={() => setEditing(true)}>
                  <FaEdit /> Edit
                </button>
              ) : (
                <div className="edit-buttons">
                  <button className="btn btn-success" onClick={handleSave}>
                    <FaSave /> Save
                  </button>
                  <button className="btn btn-secondary" onClick={handleCancel}>
                    <FaTimes /> Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="profile-info">
              <div className="info-group">
                <label><FaUser /> Name</label>
                {editing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                ) : (
                  <p>{profile.name}</p>
                )}
              </div>

              <div className="info-group">
                <label><FaEnvelope /> Email</label>
                <p>{profile.email}</p>
              </div>

              <div className="info-group">
                <label><FaPhone /> Phone</label>
                {editing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                ) : (
                  <p>{profile.phone}</p>
                )}
              </div>
            </div>
          </div>

          <div className="profile-actions card">
            <h3>Quick Actions</h3>
            <Link to="/orders" className="btn btn-primary full-width">
              <FaHistory /> View Order History
            </Link>
            <Link to="/products" className="btn btn-secondary full-width">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 