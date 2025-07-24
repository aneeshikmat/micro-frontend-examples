# Server-Side Inclusion (SSI) with Nginx and Docker Compose

هذا المثال يوضح كيفية تنفيذ ال micro-frontends باستخدام Server-Side Inclusion (SSI) مع ال Nginx، ويظهر كيفية تجميع صفحة ويب من عدة micro-frontends مستقلة تعمل كخدمات منفصلة.

ملاحظة مهمة: هذا مثال توضيحي فقط، أما الإعداد الحقيقي فيحتاج إلى إعداد أفضل يشمل المراقبة والأداء وتحسين الخدمات وتطوير ال micro بطريقة تمنع تداخل ال css كما تحدثنا في الكتاب سابقا... إلخ

## نظرة عامة

يتكون التطبيق من ثلاثة micro-frontends، كل منها يعمل كخدمة منفصلة على منفذ خاص به:

1. **Header** (localhost:7210)
2. **Content** (localhost:7211)
3. **Footer** (localhost:7212)

## كيف يعمل

1. كل micro-frontend يعمل كخادم Express.js منفصل يقدم صفحة HTML كاملة
2. يقوم Nginx بتوجيه الطلبات إلى هذه الخدمات ويستخدم ال `fragment` لاستخراج المحتوى ذي الصلة فقط
3. يتم إرسال HTML المكوّن النهائي إلى المتصفح
4. يقوم المتصفح بعرض الصفحة الكاملة كما لو كانت تطبيقًا واحدًا

## توجيهات SSI وتكوين الـ Proxy

```html
<!-- Include Header Micro-Frontend using SSI with the /ssi/ prefix -->
<!--# include virtual="/ssi/header/" -->

<!-- Include Content Micro-Frontend using SSI with the /ssi/ prefix -->
<!--# include virtual="/ssi/content/" -->

<!-- Include Footer Micro-Frontend using SSI with the /ssi/ prefix -->
<!--# include virtual="/ssi/footer/" -->
```

تم تكوين Nginx لتوجيه الطلبات واستخراج المحتوى ذي الصلة، مع حل DNS ديناميكي لاكتشاف الخدمة:

```nginx
        # Fragment routes for SSI includes - these call /fragment endpoints
        location /ssi/header/ {
            set $upstream_header http://$header_upstream;
            proxy_pass $upstream_header/fragment;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            add_header Cache-Control no-cache;
        }

        location /ssi/content/ {
            set $upstream_content http://$content_upstream;
            proxy_pass $upstream_content/fragment;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            add_header Cache-Control no-cache;
        }

        location /ssi/footer/ {
            set $upstream_footer http://$footer_upstream;
            proxy_pass $upstream_footer/fragment;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            add_header Cache-Control no-cache;
        }
```

## تشغيل المثال

### المتطلبات الأساسية

- تثبيت Docker و Docker Compose على جهازك

### الخطوات

1. نسخ الريبو:
   ```bash
   git clone https://github.com/aneeshikmat/micro-frontend-examples.git
   cd micro-frontend-examples/ssi-nginx-docker-ex-1
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