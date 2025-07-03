const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/database');
const { seedProducts } = require('./utils/seedData');
const mongoose = require('mongoose');

// Import models
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');

// Import fallback storage
const { MockProduct, MockUser, MockOrder } = require('./utils/fallbackStorage');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
let dbConnected = false;
connectDB().then(connected => {
  dbConnected = connected;
  console.log(`Database status: ${dbConnected ? 'MongoDB Connected' : 'Using Fallback Storage'}`);
});

// Seed products on startup
setTimeout(() => {
  seedProducts();
}, 1000); // Small delay to ensure connection is established

// Mock email notification function
function sendEmail(to, subject, message) {
  // In real app, use nodemailer or similar
  console.log(`\n--- EMAIL NOTIFICATION ---\nTo: ${to}\nSubject: ${subject}\nMessage: ${message}\n-------------------------\n`);
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from React build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to E-Commerce API' });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// Product routes
app.get('/api/products', async (req, res) => {
  try {
    const ProductModel = dbConnected ? Product : MockProduct;
    const products = await ProductModel.find({ isActive: true });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Get single product
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Error fetching product' });
  }
});

// Categories route
app.get('/api/categories', (req, res) => {
  const categories = [
    { id: 1, name: 'Electronics', icon: '📱', count: 6 },
    { id: 2, name: 'Clothing', icon: '👕', count: 1 },
    { id: 3, name: 'Home & Garden', icon: '🏠', count: 3 },
    { id: 4, name: 'Accessories', icon: '👜', count: 1 },
    { id: 5, name: 'Sports', icon: '⚽', count: 3 },
    { id: 6, name: 'Books', icon: '📚', count: 1 }
  ];
  
  res.json(categories);
});

// Cart routes
app.post('/api/cart', (req, res) => {
  // Mock cart creation
  res.json({ message: 'Cart created successfully', cartId: Date.now() });
});

// Order placement
app.post('/api/orders', async (req, res) => {
  try {
    const { userId, items, shipping, total } = req.body;
    
    if (!userId || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Invalid order data' });
    }

    // Create order items
    const orderItems = items.map(item => ({
      product: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: item.quantity,
      total: item.price * item.quantity
    }));

    const order = new Order({
      user: userId,
      items: orderItems,
      shipping,
      subtotal: total,
      total: total
    });

    await order.save();

    // Send email notification
    const user = await User.findById(userId);
    if (user) {
      sendEmail(user.email, 'Order Confirmation', `Thank you for your order! Order ID: ${order._id}`);
    }

    res.json({ success: true, order });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ success: false, message: 'Error creating order' });
  }
});

// Get user orders
app.get('/api/orders/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ user: userId }).populate('items.product').sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ success: false, message: 'Error fetching orders' });
  }
});

// User routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'User with this email already exists' 
      });
    }
    
    // Create new user
    const newUser = new User({
      name,
      email,
      password,
      phone
    });
    
    await newUser.save();
    
    // Send welcome email
    sendEmail(email, 'Welcome to ShopHub', `Hello ${name}, welcome to ShopHub!`);
    
    res.json({
      success: true,
      message: 'User registered successfully',
      user: newUser
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ success: false, message: 'Error registering user' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    
    if (user && await user.comparePassword(password)) {
      res.json({
        success: true,
        token: 'mock-jwt-token',
        user: user
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ success: false, message: 'Error logging in' });
  }
});

// Get/update user profile
app.get('/api/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ success: false, message: 'Error fetching user' });
  }
});

app.put('/api/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const { name, phone } = req.body;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    if (name) user.name = name;
    if (phone) user.phone = phone;
    
    await user.save();
    res.json({ success: true, user });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ success: false, message: 'Error updating user' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Serve React app for any non-API routes in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
} else {
  // 404 handler for development
  app.use('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 