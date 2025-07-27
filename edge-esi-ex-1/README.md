# Edge Side Includes (ESI) with Varnish and Nginx

هذا المثال يوضح كيفية تنفيذ ال micro-frontends باستخدام Edge Side Includes (ESI) مع Varnish و Nginx، ويظهر كيفية تجميع صفحة ويب من عدة micro-frontends مستقلة تعمل كخدمات منفصلة.

ملاحظة مهمة: هذا مثال توضيحي فقط، أما الإعداد الحقيقي فيحتاج إلى إعداد أفضل يشمل المراقبة والأداء وتحسين الخدمات وتطوير ال micro بطريقة تمنع تداخل ال css كما تحدثنا في الكتاب سابقا... إلخ

## نظرة عامة

يتكون التطبيق من ثلاثة micro-frontends، كل منها يعمل كخدمة منفصلة على منفذ خاص به:

1. **Header** (localhost:7210)
2. **Content** (localhost:7211)
3. **Footer** (localhost:7212)

## ما هو ESI؟

Edge Side Includes (ESI) هي لغة ترميز تستخدم لتوجيه خوادم الحافة (مثل Varnish أو CDNs) لجلب وتضمين المحتوى من مصادر مختلفة. على عكس Server-Side Includes (SSI)، يتم معالجة ESI عند الحافة (CDN أو وكيل عكسي) بدلاً من خادم الويب.

## مزايا ESI

1. **التخزين المؤقت المتباين**: يمكن أن يكون لأجزاء مختلفة من الصفحة سياسات تخزين مؤقت مختلفة.
2. **تقليل الحمل على الخوادم الأصلية**: يتم تجميع الصفحات عند الحافة، مما يقلل من الحمل على الخوادم الأصلية.
3. **النشر المستقل**: يمكن تطوير ونشر كل micro-frontend بشكل مستقل.
4. **أداء أفضل**: يمكن تخزين الأجزاء الثابتة من الصفحة مؤقتًا لفترات أطول، مما يحسن الأداء.

## كيف يعمل

1. كل micro-frontend يعمل كخادم Express.js منفصل يقدم صفحة HTML كاملة
2. يقوم Nginx بتوجيه الطلبات إلى هذه الخدمات ويستخدم ال `fragment` لاستخراج المحتوى ذي الصلة فقط
3. يقوم Varnish بمعالجة علامات ESI وتجميع الصفحة النهائية
4. يتم إرسال HTML المكوّن النهائي إلى المتصفح
5. يقوم المتصفح بعرض الصفحة الكاملة كما لو كانت تطبيقًا واحدًا

## توجيهات ESI وتكوين الـ Proxy

```html
<!-- Include Header Micro-Frontend using ESI -->
<esi:include src="/esi/header/" />

<!-- Include Content Micro-Frontend using ESI -->
<esi:include src="/esi/content/" />

<!-- Include Footer Micro-Frontend using ESI -->
<esi:include src="/esi/footer/" />
```

تم تكوين Varnish لمعالجة علامات ESI وتوجيه الطلبات إلى Nginx، الذي بدوره يوجه الطلبات إلى الخدمات المناسبة:

```vcl
# Enable ESI processing if the backend response indicates it contains ESI
if (beresp.http.Surrogate-Control ~ "ESI/1.0") {
    unset beresp.http.Surrogate-Control;
    set beresp.do_esi = true;
}
```

## تشغيل المثال

### المتطلبات الأساسية

- تثبيت Docker و Docker Compose على جهازك

### الخطوات

1. نسخ الريبو:
   ```bash
   git clone https://github.com/aneeshikmat/micro-frontend-examples.git
   cd micro-frontend-examples/edge-esi-ex-1
   ```

2. بدء تشغيل التطبيق:
   ```bash
   docker-compose up -d
   ```

3. افتح متصفحك وانتقل إلى:
   ```
   http://localhost:7222  # التطبيق الرئيسي
   http://localhost:7222/header/  # وصول مباشر إلى micro-frontend للرأس
   http://localhost:7222/content/  # وصول مباشر إلى micro-frontend للمحتوى
   http://localhost:7222/footer/  # وصول مباشر إلى micro-frontend للتذييل
   ```

4. لإيقاف التطبيق:
   ```bash
   docker-compose down
   ```

## الفرق بين ESI و SSI

| الميزة | ESI | SSI |
|--------|-----|-----|
| مكان المعالجة | عند الحافة (CDN أو وكيل عكسي) | على خادم الويب |
| التخزين المؤقت | دعم متقدم للتخزين المؤقت المتباين | دعم محدود للتخزين المؤقت |
| الأداء | أفضل للمواقع عالية الحركة | مناسب للمواقع منخفضة إلى متوسطة الحركة |
| التنفيذ | يتطلب Varnish أو CDN يدعم ESI | متاح في معظم خوادم الويب (Apache، Nginx) |
| الوظائف | مجموعة محدودة من الوظائف | مجموعة أكبر من الوظائف في بعض التنفيذات |

## مصادر إضافية

- [ESI Language Specification](https://www.w3.org/TR/esi-lang)
- [Varnish ESI Documentation](https://varnish-cache.org/docs/trunk/users-guide/esi.html)
- [Akamai ESI Documentation](https://developer.akamai.com/learn/FrontEnd/ESI.html)