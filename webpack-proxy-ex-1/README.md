# مثال Webpack Proxy Example

## 📖 الوصف

هذا المثال يوضح كيفية استخدام إعدادات ال Proxy في ال Webpack Dev Server لتوجيه طلبات ال API من ال FE إلى ال BE أثناء التطوير، ويحل هذا المثال مشاكل ال CORS ويوفر تجربة تطوير سلسة مع إمكانية دمج عدة أجزاء مختلفة معا مثل أكثر من micro...

## 🏗️ البنية المعمارية

```
webpack-proxy-ex-1/
├── frontend/                 # تطبيق React الأمامي
│   ├── src/
│   │   ├── App.js           # المكون الرئيسي مع استدعاءات API
│   │   ├── App.css          # تنسيقات التطبيق
│   │   ├── index.js         # نقطة دخول React
│   │   └── index.css        # تنسيقات عامة
│   ├── public/
│   │   └── index.html       # قالب HTML
│   ├── webpack.config.js    # إعدادات Webpack مع البروكسي
│   └── package.json         # تبعيات Frontend
├── api-server/
│   └── server.js           # خادم Express للبيانات الوهمية
└── package.json            # إعدادات المشروع الرئيسية
```

## ⚙️ الإعداد والتشغيل

### المتطلبات المسبقة
- Node.js
- npm أو yarn

### خطوات التشغيل

1. **تثبيت التبعيات:**
   ```bash
   npm run install:all
   ```

2. **تشغيل المشروع:**
   ```bash
   npm start
   ```
   هذا الأمر سيقوم بتشغيل:
   - API Server على `http://localhost:3001`
   - Frontend على `http://localhost:3000`

3. **أو تشغيل كل خدمة بشكل منفصل:**
   ```bash
   # تشغيل API Server
   npm run start:api
   
   # في terminal آخر، تشغيل Frontend
   npm run start:frontend
   ```

## 🔧 إعدادات البروكسي

في ملف `frontend/webpack.config.js`، يتم تكوين البروكسي كالتالي:

```javascript
devServer: {
  proxy: {
    // توجيه جميع طلبات API إلى الخادم الخلفي
    '/api': {
      target: 'http://localhost:3001',
      changeOrigin: true,
      secure: false,
      logLevel: 'debug'
    },
    // توجيه health check
    '/health': {
      target: 'http://localhost:3001',
      changeOrigin: true
    }
  }
};
```

## 📋 API Endpoints

### API Server (http://localhost:3001)

| Method | Endpoint | الوصف |
|--------|----------|--------|
| GET | `/health` | فحص حالة الخادم |
| GET | `/api/users` | جلب قائمة المستخدمين |
| GET | `/api/users/:id` | جلب مستخدم محدد |
| POST | `/api/users` | إنشاء مستخدم جديد |
| GET | `/api/products` | جلب قائمة المنتجات |

### من خلال البروكسي (http://localhost:3000)

جميع الطلبات التي تبدأ بـ `/api` أو `/health` يتم توجيهها تلقائياً إلى `http://localhost:3001`

## 💡 الفوائد الرئيسية

1. **حل مشاكل CORS**: لا حاجة لإعدادات CORS معقدة
2. **تبسيط التطوير**: نقطة وصول واحدة للتطبيق
3. **سهولة التكوين**: تغيير ال BE دون تعديل كود التطبيق
4. **التسجيل المفصل**: مراقبة جميع طلبات البروكسي
5. **المرونة**: إمكانية توجيه طلبات مختلفة لخوادم مختلفة

## 🎯 حالات الاستخدام

- تطوير micro-frontends مع خوادم منفصلة
- تجنب مشاكل CORS أثناء التطوير
- محاكاة ال PRODUCTION محلياً
- توجيه طلبات مختلفة لخدمات مختلفة
- تسهيل التطوير المحلي للفرق الموزعة