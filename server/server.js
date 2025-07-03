const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Mock user storage (in real app, this would be a database)
let users = [
  {
    id: 1,
    name: 'Demo User',
    email: 'demo@example.com',
    password: 'password',
    phone: '1234567890',
    orders: []
  }
];

// Mock order storage
let orders = [];

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

// Product routes
app.get('/api/products', (req, res) => {
  // Mock products data with 15 diverse items
  const products = [
    {
      id: 1,
      name: 'iPhone 15 Pro Max',
      price: 1199.99,
      description: 'Latest iPhone with A17 Pro chip, 48MP camera, and titanium design',
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
      category: 'Electronics',
      rating: 4.8,
      reviews: 1247,
      stock: 45
    },
    {
      id: 2,
      name: 'Samsung 65" 4K Smart TV',
      price: 899.99,
      description: 'Crystal clear 4K resolution with HDR and built-in streaming apps',
      image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400',
      category: 'Electronics',
      rating: 4.6,
      reviews: 892,
      stock: 23
    },
    {
      id: 3,
      name: 'Nike Air Max 270',
      price: 129.99,
      description: 'Comfortable running shoes with Air Max technology and breathable mesh',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
      category: 'Sports',
      rating: 4.7,
      reviews: 1563,
      stock: 67
    },
    {
      id: 4,
      name: 'MacBook Air M2',
      price: 1099.99,
      description: 'Ultra-thin laptop with M2 chip, 13.6" Retina display, and all-day battery',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
      category: 'Electronics',
      rating: 4.9,
      reviews: 2341,
      stock: 34
    },
    {
      id: 5,
      name: 'Levi\'s 501 Original Jeans',
      price: 79.99,
      description: 'Classic straight-fit jeans in authentic denim with button fly',
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',
      category: 'Clothing',
      rating: 4.5,
      reviews: 892,
      stock: 89
    },
    {
      id: 6,
      name: 'Sony WH-1000XM5 Headphones',
      price: 349.99,
      description: 'Industry-leading noise cancellation with 30-hour battery life',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
      category: 'Electronics',
      rating: 4.8,
      reviews: 1876,
      stock: 28
    },
    {
      id: 7,
      name: 'Instant Pot Duo 7-in-1',
      price: 89.99,
      description: '7-in-1 electric pressure cooker for fast, healthy cooking',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
      category: 'Home & Garden',
      rating: 4.6,
      reviews: 3421,
      stock: 156
    },
    {
      id: 8,
      name: 'Adidas Ultraboost 22',
      price: 179.99,
      description: 'Premium running shoes with responsive Boost midsole and Primeknit upper',
      image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400',
      category: 'Sports',
      rating: 4.7,
      reviews: 1123,
      stock: 42
    },
    {
      id: 9,
      name: 'Apple Watch Series 9',
      price: 399.99,
      description: 'Advanced health monitoring with ECG, blood oxygen, and fitness tracking',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
      category: 'Electronics',
      rating: 4.8,
      reviews: 2156,
      stock: 78
    },
    {
      id: 10,
      name: 'Ray-Ban Aviator Classic',
      price: 154.99,
      description: 'Timeless aviator sunglasses with gold frame and green lenses',
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400',
      category: 'Accessories',
      rating: 4.6,
      reviews: 567,
      stock: 34
    },
    {
      id: 11,
      name: 'The Great Gatsby Hardcover',
      price: 24.99,
      description: 'F. Scott Fitzgerald\'s masterpiece in beautiful hardcover edition',
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
      category: 'Books',
      rating: 4.9,
      reviews: 2891,
      stock: 234
    },
    {
      id: 12,
      name: 'Dyson V15 Detect Vacuum',
      price: 699.99,
      description: 'Cord-free vacuum with laser dust detection and 60-minute runtime',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400',
      category: 'Home & Garden',
      rating: 4.7,
      reviews: 892,
      stock: 19
    },
    {
      id: 13,
      name: 'Yoga Mat Premium',
      price: 49.99,
      description: 'Non-slip yoga mat with alignment lines, perfect for home workouts',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
      category: 'Sports',
      rating: 4.4,
      reviews: 445,
      stock: 123
    },
    {
      id: 14,
      name: 'Starbucks Coffee Maker',
      price: 199.99,
      description: 'Automatic coffee maker with built-in grinder and programmable settings',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
      category: 'Home & Garden',
      rating: 4.5,
      reviews: 678,
      stock: 56
    },
    {
      id: 15,
      name: 'Wireless Bluetooth Speaker',
      price: 79.99,
      description: 'Portable speaker with 360° sound, waterproof design, and 20-hour battery',
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400',
      category: 'Electronics',
      rating: 4.3,
      reviews: 1123,
      stock: 89
    }
  ];
  
  res.json(products);
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
app.post('/api/orders', (req, res) => {
  const { userId, items, shipping, total } = req.body;
  if (!userId || !items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ success: false, message: 'Invalid order data' });
  }
  const order = {
    id: orders.length + 1,
    userId,
    items,
    shipping,
    total,
    date: new Date().toISOString()
  };
  orders.push(order);
  // Attach order to user
  const user = users.find(u => u.id === userId);
  if (user) {
    user.orders = user.orders || [];
    user.orders.push(order);
    // Send email notification
    sendEmail(user.email, 'Order Confirmation', `Thank you for your order! Order ID: ${order.id}`);
  }
  res.json({ success: true, order });
});

// Get user orders
app.get('/api/orders/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  res.json({ success: true, orders: user.orders || [] });
});

// User routes
app.post('/api/auth/register', (req, res) => {
  const { name, email, password, phone } = req.body;
  
  // Check if user already exists
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ 
      success: false, 
      message: 'User with this email already exists' 
    });
  }
  
  // Create new user
  const newUser = {
    id: users.length + 1,
    name,
    email,
    password, // In real app, this would be hashed
    phone,
    orders: []
  };
  
  users.push(newUser);
  
  // Send welcome email
  sendEmail(email, 'Welcome to ShopHub', `Hello ${name}, welcome to ShopHub!`);
  
  // Return user without password
  const { password: _, ...userWithoutPassword } = newUser;
  
  res.json({
    success: true,
    message: 'User registered successfully',
    user: userWithoutPassword
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // Find user
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    res.json({
      success: true,
      token: 'mock-jwt-token',
      user: userWithoutPassword
    });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Get/update user profile
app.get('/api/user/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  const { password: _, ...userWithoutPassword } = user;
  res.json({ success: true, user: userWithoutPassword });
});

app.put('/api/user/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  const { name, phone } = req.body;
  if (name) user.name = name;
  if (phone) user.phone = phone;
  const { password: _, ...userWithoutPassword } = user;
  res.json({ success: true, user: userWithoutPassword });
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