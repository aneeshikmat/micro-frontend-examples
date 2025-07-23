# Server-Side Inclusion (SSI) with Nginx and Docker Compose

هذا المثال يوضح كيفية تنفيذ micro-frontends باستخدام Server-Side Inclusion (SSI) مع Nginx و Docker Compose. يظهر كيفية تكوين صفحة ويب من عدة micro-frontends مستقلة تعمل كخدمات منفصلة.

## نظرة عامة

يتكون التطبيق من ثلاثة micro-frontends، كل منها يعمل كخدمة منفصلة على منفذ خاص به:

1. **Header** (localhost:7210)
2. **Content** (localhost:7211)
3. **Footer** (localhost:7212)

## كيف يعمل

1. كل micro-frontend يعمل كخادم Express.js منفصل يقدم صفحة HTML كاملة
2. يقوم Nginx بتوجيه الطلبات إلى هذه الخدمات ويستخدم `sub_filter` لاستخراج المحتوى ذي الصلة فقط
3. يحتوي ملف `index.html` الرئيسي على توجيهات SSI التي تتضمن المحتوى المستخرج
4. عندما يأتي طلب، يعالج Nginx توجيهات SSI ويكوّن الصفحة النهائية
5. يتم إرسال HTML المكوّن النهائي إلى المتصفح
6. يقوم المتصفح بعرض الصفحة الكاملة كما لو كانت تطبيقًا واحدًا

## توجيهات SSI وتكوين الـ Proxy

يستخدم ملف `index.html` الرئيسي توجيهات SSI لتضمين الـ micro-frontends:

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
# Use Docker's internal DNS for service discovery
resolver 127.0.0.11 valid=30s;

# Set variables for upstream services to force DNS resolution at runtime
map $uri $header_upstream {
    default "header:7210";
}

# For direct access to micro-frontends
location /header/ {
    set $upstream_header http://$header_upstream;
    proxy_pass $upstream_header/;
    proxy_connect_timeout 5s;
    proxy_read_timeout 60s;
    proxy_send_timeout 60s;
}

# For SSI includes, extract only the body content
location /ssi/header/ {
    set $upstream_header http://$header_upstream;
    proxy_pass $upstream_header/;
    sub_filter '<body>' '';
    sub_filter '</body>' '';
    proxy_connect_timeout 5s;
    proxy_read_timeout 60s;
    proxy_send_timeout 60s;
}
```

يضمن هذا التكوين ما يلي:
1. يستخدم Nginx خدمة DNS الداخلية لـ Docker (127.0.0.11) لاكتشاف الخدمة
2. يتم حل أسماء المضيفين في وقت الطلب، وليس وقت بدء التشغيل
3. يتم تعيين مهلات الاتصال للتعامل مع عدم توفر الخدمة المؤقت

## تشغيل المثال

### المتطلبات الأساسية

- تثبيت Docker و Docker Compose على جهازك

### الخطوات

1. نسخ الريبو:
   ```bash
   git clone <repository-url>
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