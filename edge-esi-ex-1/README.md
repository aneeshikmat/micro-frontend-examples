# Edge Side Includes (ESI) with Varnish and Nginx

هذا المثال يوضح كيفية تنفيذ **micro-frontends** باستخدام **Edge Side Includes (ESI)** مع **Varnish** و **Nginx**، ويعرض كيفية تجميع صفحة ويب من عدة micro-frontends مستقلة تعمل كخدمات منفصلة.

> ⚠️ ملاحظة مهمة: هذا المثال للتوضيح فقط، أما التطبيق الحقيقي فيتطلب إعدادات أكثر تعقيدًا تشمل المراقبة، وتحسين الأداء، وعزل الخدمات، وتطوير الـ micro-frontends.

---

## نظرة عامة

يتكون التطبيق من ثلاث خدمات مستقلة (micro-frontends)، كل واحدة منها تعمل على منفذ منفصل:

1. **Header** – `localhost:7210`
2. **Content** – `localhost:7211`
3. **Footer** – `localhost:7212`

---

## ما هو ESI؟

**Edge Side Includes (ESI)** هي لغة ترميز تُستخدم لتوجيه خوادم مثل Varnish أو CDN لطلب ودمج محتوى من مصادر مختلفة. بخلاف **Server-Side Includes (SSI)**، تتم معالجة ESI عند أي على مستوى CDN أو الـ reverse proxy، وليس على خادم الويب نفسه.

---

## مزايا ESI

1. **تخزين مؤقت متقدم (Granular Caching)**: يمكن تحديد سياسات تخزين مختلفة لكل جزء من الصفحة.
2. **تقليل الضغط على الخوادم الأصلية**: يتم تجميع الصفحة على CDN بدلاً من الخادم الرئيسي.
3. **نشر مستقل (Independent Deployment)**: يمكن تطوير ونشر كل micro-frontend بشكل منفصل.
4. **أداء أعلى**: يمكن تخزين الأجزاء الثابتة من الصفحة مؤقتًا لفترات أطول.

---

## كيف يعمل النظام

1. كل micro-frontend يعمل كخدمة Express.js مستقلة تقدم جزءًا من الصفحة (HTML fragment).
2. يقوم **Nginx** بتوجيه الطلبات إلى الخدمات المناسبة واستخراج الـ fragment المطلوب.
3. يقوم **Varnish** بمعالجة تعليمات ESI وتجميع الصفحة النهائية.
4. يتم إرسال HTML النهائي إلى المتصفح.
5. يعرض المتصفح الصفحة كاملة وكأنها تطبيق موحد.

---

## تعليمات ESI وتكوين الـ Proxy

```html
<!-- تضمين الـ Header باستخدام ESI -->
<esi:include src="/esi/header/" />

<!-- تضمين الـ Content باستخدام ESI -->
<esi:include src="/esi/content/" />

<!-- تضمين الـ Footer باستخدام ESI -->
<esi:include src="/esi/footer/" />
```

تم تكوين **Varnish** لمعالجة تعليمات ESI وتوجيه الطلبات إلى **Nginx**، والذي يقوم بدوره بتوجيهها إلى الخدمة المناسبة:

```vcl
# تمكين معالجة ESI في حال وجود Surrogate-Control
if (beresp.http.Surrogate-Control ~ "ESI/1.0") {
    unset beresp.http.Surrogate-Control;
    set beresp.do_esi = true;
}
```

---

## تشغيل المثال

### المتطلبات الأساسية

* وجود Docker و Docker Compose مثبتين على جهازك

### الخطوات

1. نسخ المستودع:

   ```bash
   git clone https://github.com/aneeshikmat/micro-frontend-examples.git
   cd micro-frontend-examples/edge-esi-ex-1
   ```

2. تشغيل التطبيق:

   ```bash
   docker-compose up -d
   ```

3. افتح المتصفح وانتقل إلى:

   * `http://localhost:7222` – التطبيق الرئيسي
   * `http://localhost:7222/header/` – للوصول المباشر إلى الـ Header
   * `http://localhost:7222/content/` – للوصول المباشر إلى الـ Content
   * `http://localhost:7222/footer/` – للوصول المباشر إلى الـ Footer

4. لإيقاف التطبيق:

   ```bash
   docker-compose down
   ```

---

## الفرق بين ESI و SSI

| الميزة          | ESI                           | SSI                                       |
| --------------- |-------------------------------| ----------------------------------------- |
| مكان المعالجة   | عند ال (CDN أو reverse proxy) | على خادم الويب                            |
| التخزين المؤقت  | متقدم (Granular)              | محدود                                     |
| متطلبات التنفيذ | يتطلب Varnish أو CDN يدعم ESI | مدعوم من أغلب خوادم الويب (Apache، Nginx) |
| الإمكانيات      | محدودة                        | أوسع (حسب التنفيذ)                        |

---

## مصادر إضافية

* [ESI Language Specification – W3C](https://www.w3.org/TR/esi-lang)