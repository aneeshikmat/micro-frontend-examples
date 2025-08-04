# ال MyAccount Micro

## الوصف
يعمل ال MyAccount كحاوية تدمج مكونات ال AccountDetails و ال PaymentDetails في واجهة موحدة. يمثل هذا ال micro مثالاً على البنية المعمارية الأفقية (horizontal) حيث يقوم بتجميع مكونات من micros أخرى.

## الوظائف الرئيسية
- تحميل وعرض مكون ال AccountDetails
- تحميل وعرض مكون ال PaymentDetails
- دمج المكونات في واجهة موحدة

## كيفية التشغيل
```bash
cd myaccount
npm install
npm run dev
```

يعمل هذا ال micro على ال Port 8105.

## ملاحظات
- يجب تشغيل ال AccountDetails و ال PaymentDetails قبل تشغيل ال MyAccount
- يمثل هذا ال micro مثالاً على البنية المعمارية الأفقية في تطبيقات ال micro-frontend