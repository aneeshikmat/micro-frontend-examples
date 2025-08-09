import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [healthStatus, setHealthStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [newUser, setNewUser] = useState({ name: '', email: '', role: '' });

  // Test health endpoint through proxy
  const checkHealth = async () => {
    try {
      setLoading(true);
      // This call goes through webpack proxy to http://localhost:3001/health
      const response = await axios.get('/health');
      setHealthStatus(response.data.message);
      setError('');
    } catch (err) {
      setError('خطأ في الاتصال بالخادم: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch users through proxy
  const fetchUsers = async () => {
    try {
      setLoading(true);
      // This call goes through webpack proxy to http://localhost:3001/api/users
      const response = await axios.get('/api/users');
      setUsers(response.data.data);
      setError('');
    } catch (err) {
      setError('خطأ في جلب المستخدمين: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch products through proxy
  const fetchProducts = async () => {
    try {
      setLoading(true);
      // This call goes through webpack proxy to http://localhost:3001/api/products
      const response = await axios.get('/api/products');
      setProducts(response.data.data);
      setError('');
    } catch (err) {
      setError('خطأ في جلب المنتجات: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Create new user through proxy
  const createUser = async (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email || !newUser.role) {
      setError('يرجى ملء جميع الحقول');
      return;
    }

    try {
      setLoading(true);
      // This call goes through webpack proxy to http://localhost:3001/api/users
      const response = await axios.post('/api/users', newUser);
      setUsers([...users, response.data.data]);
      setNewUser({ name: '', email: '', role: '' });
      setError('');
    } catch (err) {
      setError('خطأ في إنشاء المستخدم: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Autoload health status on component mount
  useEffect(() => {
    checkHealth();
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>🚀 مثال عن ال Webpack Proxy</h1>
        <p>هذا المثال يوضح كيفية استخدام إعدادات البروكسي في ال Webpack Dev Server</p>
        <p>هذا المثال لغايات العرض فقط، الشيفرة البرمجية المستخدمة ليست جيدة لاستخدامها في مشروع حقيقي</p>
      </header>

      <main className="app-main">
        {/* Health Status Section */}
        <section className="section">
          <h2>📊 حالة الخادم</h2>
          <button onClick={checkHealth} disabled={loading}>
            {loading ? 'جاري التحقق...' : 'تحقق من حالة الخادم'}
          </button>
          {healthStatus && (
            <div className="status-box success">
              ✅ {healthStatus}
            </div>
          )}
        </section>

        {/* Users Section */}
        <section className="section">
          <h2>👥 المستخدمون</h2>
          <button onClick={fetchUsers} disabled={loading}>
            {loading ? 'جاري التحميل...' : 'جلب المستخدمين'}
          </button>
          
          {/* Add User Form */}
          <form onSubmit={createUser} className="user-form">
            <h3>إضافة مستخدم جديد</h3>
            <input
              type="text"
              placeholder="الاسم"
              value={newUser.name}
              onChange={(e) => setNewUser({...newUser, name: e.target.value})}
            />
            <input
              type="email"
              placeholder="البريد الإلكتروني"
              value={newUser.email}
              onChange={(e) => setNewUser({...newUser, email: e.target.value})}
            />
            <input
              type="text"
              placeholder="الدور الوظيفي"
              value={newUser.role}
              onChange={(e) => setNewUser({...newUser, role: e.target.value})}
            />
            <button type="submit" disabled={loading}>
              {loading ? 'جاري الإضافة...' : 'إضافة مستخدم'}
            </button>
          </form>

          <div className="data-grid">
            {users.map(user => (
              <div key={user.id} className="data-card">
                <h4>{user.name}</h4>
                <p>📧 {user.email}</p>
                <p>💼 {user.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Products Section */}
        <section className="section">
          <h2>📦 المنتجات</h2>
          <button onClick={fetchProducts} disabled={loading}>
            {loading ? 'جاري التحميل...' : 'جلب المنتجات'}
          </button>
          <div className="data-grid">
            {products.map(product => (
              <div key={product.id} className="data-card">
                <h4>{product.name}</h4>
                <p>💰 {product.price} ريال</p>
                <p>🏷️ {product.category}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Proxy Information */}
        <section className="section info-section">
          <h2>ℹ️ معلومات البروكسي</h2>
          <div className="info-box">
            <p><strong>ال Frontend URL هو:</strong> http://localhost:3000</p>
            <p><strong> ال API URL هو:</strong> http://localhost:3001</p>
            <p><strong>  إعدادات ال Proxy:</strong> جميع الطلبات التي تبدأ بـ /api يتم توجيهها للخادم الخلفي</p>
            <p><strong>الفوائد:</strong> تجنب مشاكل CORS، توحيد نقطة الوصول، سهولة التطوير وإمكانية تحميل أكثر من جزء دون مشاكل ال CORS</p>
          </div>
        </section>

        <section className="section info-section">
          <h2>ℹ️ إعدادات البروكسي</h2>

          <div className="info-box" dir={'ltr'}>
             <pre>
            <code>
              {"    proxy: {\n" +
                "      // Proxy all API calls to the backend server\n" +
                "      '/api': {\n" +
                "        target: 'http://localhost:3001',\n" +
                "        changeOrigin: true,\n" +
                "        secure: false,\n" +
                "        logLevel: 'debug',\n" +
                "        onProxyReq: (proxyReq, req, res) => {\n" +
                "          console.log(`🔄 Proxying ${req.method} ${req.url} to backend server`);\n" +
                "        },\n" +
                "        onProxyRes: (proxyRes, req, res) => {\n" +
                "          console.log(`✅ Received response ${proxyRes.statusCode} for ${req.url}`);\n" +
                "        },\n" +
                "        onError: (err, req, res) => {\n" +
                "          console.error('❌ Proxy error:', err);\n" +
                "        }\n" +
                "      },\n" +
                "      // Proxy health check endpoint\n" +
                "      '/health': {\n" +
                "        target: 'http://localhost:3001',\n" +
                "        changeOrigin: true,\n" +
                "        secure: false,\n" +
                "        logLevel: 'debug'\n" +
                "      },\n" +
                "    }"}
            </code>
              </pre>
          </div>
        </section>

        {/* Error Display */}
        {error && (
          <div className="status-box error">
            ❌ {error}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;