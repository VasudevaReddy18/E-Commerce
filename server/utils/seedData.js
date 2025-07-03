const Product = require('../models/Product');

const seedProducts = async () => {
  try {
    // Check if products already exist
    const existingProducts = await Product.countDocuments();
    if (existingProducts > 0) {
      console.log('📦 Products already exist, skipping seed data');
      return;
    }

    const products = [
      {
        name: 'iPhone 15 Pro Max',
        price: 1199.99,
        description: 'Latest iPhone with A17 Pro chip, 48MP camera, and titanium design',
        image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
        category: 'Electronics',
        rating: 4.8,
        reviews: 1247,
        stock: 45,
        featured: true
      },
      {
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
        name: 'MacBook Air M2',
        price: 1099.99,
        description: 'Ultra-thin laptop with M2 chip, 13.6" Retina display, and all-day battery',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
        category: 'Electronics',
        rating: 4.9,
        reviews: 2341,
        stock: 34,
        featured: true
      },
      {
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

    await Product.insertMany(products);
    console.log('✅ Database seeded with 15 products successfully!');
  } catch (error) {
    console.error('❌ Error seeding products:', error);
  }
};

module.exports = { seedProducts }; 