# MongoDB Setup Guide

## 🚀 Quick Setup Options

### Option 1: MongoDB Atlas (Cloud - Recommended)
**Free tier available, no local installation needed**

1. **Create MongoDB Atlas Account:**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Sign up for free account
   - Create a new cluster (free tier)

2. **Get Connection String:**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string

3. **Update Environment:**
   ```bash
   # In server/.env file
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
   ```

### Option 2: Local MongoDB Installation

#### Windows:
1. Download MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Install with default settings
3. MongoDB will run on `mongodb://localhost:27017`

#### macOS:
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb/brew/mongodb-community
```

#### Linux (Ubuntu):
```bash
# Install MongoDB
sudo apt update
sudo apt install mongodb

# Start MongoDB service
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

## 🔧 Configuration

### 1. Environment Variables
Create `server/.env` file:
```env
# Database
MONGODB_URI=mongodb://localhost:27017/ecommerce
# Or for Atlas: mongodb+srv://username:password@cluster.mongodb.net/ecommerce

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=http://localhost:3000
```

### 2. Test Connection
```bash
# Start the server
cd server
npm start

# Check logs for:
# ✅ MongoDB Connected: localhost:27017
# ✅ Database seeded with 15 products successfully!
```

## 📊 Database Features

### What's Included:
- ✅ **User Management:** Registration, login, profile updates
- ✅ **Product Catalog:** 15 products with images and details
- ✅ **Order System:** Complete order tracking
- ✅ **Data Persistence:** All data survives server restarts
- ✅ **Search & Filtering:** Product search and category filtering
- ✅ **Admin Features:** User and order management

### Database Collections:
1. **users** - User accounts and profiles
2. **products** - Product catalog with 15 items
3. **orders** - Order history and tracking

## 🛠️ Fallback System

If MongoDB is not available:
- App automatically falls back to in-memory storage
- All features work without database
- Data is lost on server restart
- Perfect for development and testing

## 🚀 Deployment with MongoDB

### Heroku + MongoDB Atlas:
1. Create MongoDB Atlas cluster
2. Deploy to Heroku
3. Set environment variables in Heroku dashboard:
   ```bash
   heroku config:set MONGODB_URI=your_atlas_connection_string
   heroku config:set NODE_ENV=production
   ```

### Railway + MongoDB Atlas:
1. Connect GitHub repo to Railway
2. Add MongoDB Atlas connection string to environment variables
3. Deploy automatically

### Vercel + MongoDB Atlas:
1. Deploy backend separately (Railway/Heroku)
2. Deploy frontend to Vercel
3. Set API URL in frontend environment

## 🔍 Troubleshooting

### Connection Issues:
```bash
# Check if MongoDB is running
mongo --eval "db.runCommand('ping')"

# Check connection string format
mongodb://localhost:27017/ecommerce
mongodb+srv://username:password@cluster.mongodb.net/ecommerce
```

### Common Errors:
1. **"ECONNREFUSED"** - MongoDB not running
2. **"Authentication failed"** - Wrong username/password
3. **"Network timeout"** - Check internet connection for Atlas

### Reset Database:
```bash
# Clear all data and reseed
# The app will automatically reseed on startup
```

## 📈 Performance Tips

1. **Indexes:** Already configured for optimal performance
2. **Connection Pooling:** Handled by Mongoose
3. **Caching:** Consider Redis for production
4. **Backup:** MongoDB Atlas provides automatic backups

## 🎯 Next Steps

1. **Set up MongoDB Atlas** (recommended for production)
2. **Test the application** with real database
3. **Deploy to your chosen platform**
4. **Monitor performance** and scale as needed

---

**Your e-commerce app is now production-ready with MongoDB!** 🎉 