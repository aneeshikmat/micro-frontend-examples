const express = require('express');

const app = express();
const PORT = 3001;

app.use(express.json());

// Mock data
const users = [
  { id: 1, name: 'أحمد محمد', email: 'ahmed@2nees.com', role: 'مطور' },
  { id: 2, name: 'فاطمة علي', email: 'fatima@2nees.com', role: 'مصممة' },
  { id: 3, name: 'محمد حسن', email: 'mohammed@2nees.com', role: 'مدير مشروع' }
];

const products = [
  { id: 1, name: 'لابتوب Dell', price: 2500, category: 'إلكترونيات' },
  { id: 2, name: 'هاتف iPhone', price: 3000, category: 'إلكترونيات' },
  { id: 3, name: 'كتاب البرمجة', price: 50, category: 'كتب' }
];

// API Routes
app.get('/api/users', (req, res) => {
  console.log('GET /api/users - Fetching users');
  res.json({
    success: true,
    data: users,
    message: 'تم جلب المستخدمين بنجاح'
  });
});

app.get('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);
  
  if (user) {
    console.log(`GET /api/users/${userId} - User found`);
    res.json({
      success: true,
      data: user,
      message: 'تم جلب المستخدم بنجاح'
    });
  } else {
    console.log(`GET /api/users/${userId} - User not found`);
    res.status(404).json({
      success: false,
      message: 'المستخدم غير موجود'
    });
  }
});

app.get('/api/products', (req, res) => {
  console.log('GET /api/products - Fetching products');
  res.json({
    success: true,
    data: products,
    message: 'تم جلب المنتجات بنجاح'
  });
});

app.post('/api/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    ...req.body
  };
  users.push(newUser);
  
  console.log('POST /api/users - User created:', newUser);
  res.status(201).json({
    success: true,
    data: newUser,
    message: 'تم إنشاء المستخدم بنجاح'
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'السيرفر يعمل الآن بنجاح!',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 API Server is running on http://localhost:${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`📊 Users API: http://localhost:${PORT}/api/users`);
  console.log(`📦 Products API: http://localhost:${PORT}/api/products`);
});