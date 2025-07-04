# ShopHub - Modern E-Commerce Platform

A full-stack e-commerce application built with React, Node.js, and Express. This platform provides a complete shopping experience similar to Amazon and Flipkart, with user authentication, product management, shopping cart, and a mock payment system.

## 🚀 Features

### User Features
- **Modern Homepage** with hero section, featured products, and category browsing
- **Product Catalog** with advanced filtering, search, and sorting
- **Product Details** with images, ratings, and descriptions
- **Shopping Cart** with quantity management and real-time updates
- **User Authentication** with registration and login
- **Checkout Process** with shipping and payment forms
- **Mock Payment System** with success confirmation
- **Responsive Design** optimized for mobile and desktop

### Admin Features
- **Admin Dashboard** with statistics overview
- **Product Management** with CRUD operations
- **Order Management** (ready for implementation)
- **User Management** (ready for implementation)

### Technical Features
- **Global State Management** using React Context
- **RESTful API** with Express.js backend
- **Modern UI/UX** with smooth animations and transitions
- **Responsive Grid System** for optimal viewing
- **Form Validation** and error handling
- **Search Functionality** across products
- **Category Filtering** and price range selection

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with hooks
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Icons** - Icon library
- **CSS3** - Custom styling with modern features

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **JSON Web Tokens** - Authentication (mock implementation)

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd e-commerce-app
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Start the backend server**
   ```bash
   cd ../server
   npm start
   ```
   The server will run on `http://localhost:5000`

5. **Start the frontend application**
   ```bash
   cd ../client
   npm start
   ```
   The application will open on `http://localhost:3000`

## 🎯 Usage

### For Users
1. **Browse Products**: Visit the homepage or products page to explore items
2. **Search & Filter**: Use the search bar and filters to find specific products
3. **Add to Cart**: Click "Add to Cart" on any product
4. **Manage Cart**: View cart, update quantities, or remove items
5. **Checkout**: Proceed to checkout and complete the purchase
6. **Register/Login**: Create an account or sign in for a personalized experience

### For Admins
1. **Access Admin Panel**: Login and click "Admin" in the navigation
2. **View Dashboard**: See statistics and overview
3. **Manage Products**: Add, edit, or delete products
4. **Monitor Orders**: Track order status and management

### Demo Credentials
- **Email**: `demo@example.com`
- **Password**: `password`


## 🔧 Configuration

### Environment Variables
Create a `.env` file in the server directory:
```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your-secret-key-here
```

### API Endpoints

#### Products
- `GET /api/products` - Get all products
- `GET /api/categories` - Get all categories

#### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

#### Cart
- `POST /api/cart` - Create cart (mock)

## 🚀 Deployment

### Frontend Deployment
1. Build the React app:
   ```bash
   cd client
   npm run build
   ```
2. Deploy the `build` folder to your hosting service (Netlify, Vercel, etc.)

### Backend Deployment
1. Deploy to platforms like Heroku, Railway, or DigitalOcean
2. Update the frontend API base URL to point to your deployed backend

## 🔮 Future Enhancements

- **Real Database Integration** (MongoDB, PostgreSQL)
- **Payment Gateway Integration** (Stripe, PayPal)
- **Email Notifications** (Order confirmations, password reset)
- **User Profiles** (Order history, address management)
- **Product Reviews & Ratings** (User-generated content)
- **Inventory Management** (Stock tracking)
- **Advanced Search** (Elasticsearch integration)
- **Mobile App** (React Native)
- **Analytics Dashboard** (Sales reports, user behavior)
- **Multi-language Support** (Internationalization)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Happy Shopping! 🛒✨** 
