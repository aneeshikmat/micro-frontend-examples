# مثال ال Module Federation

يوضح هذا المثال كيفية استخدام ال Webpack Module Federation لإنشاء بنية ال micro-frontend باستخدام ال React وال Material UI وال React Router.

## ال Modules

- **ال Host**: التطبيق الرئيسي الذي يقوم بتحميل ال micros
- **ال Header**: للتنقل
- **ال Signin**: نموذج تسجيل الدخول
- **ال AccountDetails**:  يعرض معلومات حساب المستخدم
- **ال PaymentDetails**:  يعرض طرق الدفع وسجل المعاملات
- **ال Catalog**:  يعرض قائمة المنتجات وتفاصيلها
- **ال MyAccount**:  يدمج مكونات تفاصيل الحساب وتفاصيل الدفع في واجهة مبوبة (يمثل بنية معمارية horizontal)

## تشغيل المثال

### الطريقة 1: باستخدام سكريبت التشغيل التلقائي

يمكنك استخدام السكريبت المرفق `run-all.sh` لتثبيت وتشغيل جميع الوحدات بسهولة:

1. لتثبيت الاعتماديات لجميع الوحدات:

```bash
./run-all.sh install
```

2. لتشغيل جميع الوحدات في نوافذ طرفية منفصلة:

```bash
./run-all.sh dev
```

### الطريقة 2: التشغيل اليدوي

بدلاً من ذلك، يمكنك تشغيل كل وحدة بشكل منفصل:

1. أولاً، قم بتثبيت الاعتماديات المطلوبة لكل module:

```bash
# Install dependencies in the header module
cd header
npm install

# Install dependencies in the signin module
cd ../signin
npm install

# Install dependencies in the accountdetails module
cd ../accountdetails
npm install

# Install dependencies in the paymentdetails module
cd ../paymentdetails
npm install

# Install dependencies in the catalog module
cd ../catalog
npm install

# Install dependencies in the myaccount module
cd ../myaccount
npm install

# Install dependencies in the host module
cd ../host
npm install
```

2. قم بتشغيل جميع ال micros:

```bash
# Start the header module
cd header
npm run dev

# Start the signin module
cd ../signin
npm run dev

# Start the accountdetails module
cd ../accountdetails
npm run dev

# Start the paymentdetails module
cd ../paymentdetails
npm run dev

# Start the catalog module
cd ../catalog
npm run dev

# Start the myaccount module
cd ../myaccount
npm run dev

# Start the host module
cd ../host
npm run dev
```

3. افتح متصفحك وانتقل إلى http://localhost:8100

## ملاحظات مهمة

- يمثل هذا المشروع مثال فيه العديد من الخصائص التي لا يشترط وجوودها أو تنفيذها بهذا الشكل
وإنما الغرض محاولة مشاركة أكبر كم ممكن من اتخصائص والإعدادات حتى تتمكن من حل المشاكل المستقبلية وفهم آلية التعامل مع الإعدادات والمكونات المختلفة.
- من التحسينات الجميلة الممكنة مشاركة ال webpack shared من خلال shared config والقيام ببناء workspace وتحو ذلك.
- تم استخدام "event-bus": "file:../shared-utils/event-bus" لمحاكاة التحميل من خلال ال npm