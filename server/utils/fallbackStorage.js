// Fallback in-memory storage when MongoDB is not available
let users = [];
let products = [];
let orders = [];

// Mock Product model
class MockProduct {
  static async find(query = {}) {
    if (query.isActive === true) {
      return products.filter(p => p.isActive !== false);
    }
    return products;
  }

  static async findById(id) {
    return products.find(p => p._id === id);
  }

  static async insertMany(productList) {
    const newProducts = productList.map((product, index) => ({
      _id: `product_${Date.now()}_${index}`,
      ...product,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    products.push(...newProducts);
    return newProducts;
  }

  static async countDocuments() {
    return products.length;
  }
}

// Mock User model
class MockUser {
  static async findOne(query) {
    if (query.email) {
      return users.find(u => u.email === query.email);
    }
    return null;
  }

  static async findById(id) {
    return users.find(u => u._id === id);
  }

  static async save() {
    // This would be called on a user instance
    return this;
  }

  async comparePassword(password) {
    return this.password === password; // Simple comparison for demo
  }
}

// Mock Order model
class MockOrder {
  static async find(query) {
    if (query.user) {
      return orders.filter(o => o.user === query.user);
    }
    return orders;
  }

  static async save() {
    // This would be called on an order instance
    return this;
  }
}

module.exports = {
  MockProduct,
  MockUser,
  MockOrder,
  users,
  products,
  orders
}; 