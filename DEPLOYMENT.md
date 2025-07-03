# Deployment Guide

This guide covers deploying your e-commerce application to various platforms.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm 8+
- Git
- Docker (optional)

### Local Development
```bash
# Install all dependencies
npm run install-all

# Start development servers
npm run dev

# Or start production build
npm run build:prod
npm start
```

## 📦 Deployment Options

### 1. Heroku Deployment

#### Setup
1. Create a Heroku account
2. Install Heroku CLI
3. Login: `heroku login`

#### Deploy
```bash
# Create Heroku app
heroku create your-app-name

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your-secret-key

# Deploy
git push heroku main

# Open app
heroku open
```

#### Environment Variables for Heroku
```bash
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your-super-secret-jwt-key
heroku config:set PORT=5000
```

### 2. Vercel Deployment

#### Frontend (React)
1. Connect your GitHub repository to Vercel
2. Set build command: `cd client && npm install && npm run build`
3. Set output directory: `client/build`
4. Set environment variables:
   - `REACT_APP_API_URL`: Your backend API URL

#### Backend (Node.js)
1. Use Vercel Functions or deploy backend separately
2. Set environment variables in Vercel dashboard

### 3. Netlify Deployment

#### Frontend
1. Connect GitHub repository
2. Build command: `cd client && npm install && npm run build`
3. Publish directory: `client/build`
4. Set environment variables in Netlify dashboard

### 4. Railway Deployment

#### Full Stack
1. Connect GitHub repository
2. Railway will auto-detect the project structure
3. Set environment variables in Railway dashboard
4. Deploy automatically on push

### 5. Docker Deployment

#### Local Docker
```bash
# Build and run with Docker Compose
docker-compose up --build

# Or build individual containers
docker build -t ecommerce-app .
docker run -p 5000:5000 ecommerce-app
```

#### Docker Hub
```bash
# Build image
docker build -t yourusername/ecommerce-app .

# Push to Docker Hub
docker push yourusername/ecommerce-app

# Run from Docker Hub
docker run -p 5000:5000 yourusername/ecommerce-app
```

### 6. AWS Deployment

#### EC2 Instance
1. Launch EC2 instance
2. Install Node.js and PM2
3. Clone repository
4. Set environment variables
5. Use PM2 to run: `pm2 start server/server.js`

#### AWS Elastic Beanstalk
1. Create Elastic Beanstalk application
2. Upload source code
3. Configure environment variables
4. Deploy

### 7. Google Cloud Platform

#### App Engine
1. Create `app.yaml` file
2. Deploy: `gcloud app deploy`
3. Set environment variables in GCP console

#### Cloud Run
1. Build container: `gcloud builds submit --tag gcr.io/PROJECT_ID/ecommerce-app`
2. Deploy: `gcloud run deploy --image gcr.io/PROJECT_ID/ecommerce-app`

## 🔧 Environment Configuration

### Required Environment Variables

#### Backend (.env)
```env
PORT=5000
NODE_ENV=production
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
CORS_ORIGIN=https://your-frontend-domain.com
```

#### Frontend (.env)
```env
REACT_APP_API_URL=https://your-backend-domain.com/api
REACT_APP_NAME=ShopHub
REACT_APP_VERSION=1.0.0
```

## 📊 Performance Optimization

### Frontend
- Enable gzip compression
- Use CDN for static assets
- Implement lazy loading
- Optimize images

### Backend
- Enable caching
- Use PM2 for process management
- Implement rate limiting
- Database connection pooling

## 🔒 Security Checklist

- [ ] Use HTTPS in production
- [ ] Set secure JWT secret
- [ ] Enable CORS properly
- [ ] Validate all inputs
- [ ] Use environment variables
- [ ] Implement rate limiting
- [ ] Add security headers
- [ ] Regular dependency updates

## 📈 Monitoring

### Health Checks
- Backend: `GET /api/health`
- Frontend: `GET /health`

### Logging
- Use Winston or similar for structured logging
- Monitor error rates
- Set up alerts for downtime

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check CORS_ORIGIN environment variable
   - Ensure frontend URL is correct

2. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed

3. **Port Conflicts**
   - Ensure PORT environment variable is set
   - Check if port is available

4. **Database Connection**
   - Verify database credentials
   - Check network connectivity

### Debug Commands
```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Test build locally
npm run build:prod

# Check for vulnerabilities
npm audit

# Run tests
npm test
```

## 📞 Support

For deployment issues:
1. Check platform-specific documentation
2. Review environment variable configuration
3. Verify build logs
4. Test locally before deploying

## 🔄 CI/CD Setup

### GitHub Actions Example
```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm run install-all
      - run: npm run build:prod
      - run: npm test
      # Add deployment steps for your platform
```

---

**Note**: Always test your deployment in a staging environment before going to production! 