# مثال مكونات الويب (Web Components)

## نظرة عامة
هذا المشروع هو مثال بسيط يوضح كيفية إنشاء واستخدام ال (Web Components). يتضمن المشروع مثالين لل Web Component:
1. مكون مع Shadow DOM
2. مكون دون Shadow DOM

## ال  web components

### مكون مع Shadow DOM (`mfe-with-shadow`)
هذا ال component يستخدم Shadow DOM لتوفير تغليف (encapsulation) للنمط والمحتوى. هذا يعني أن أنماط CSS ال global لن تؤثر على هذا ال component.

```javascript
<mfe-with-shadow></mfe-with-shadow>
```

### مكون بدون Shadow DOM (`mfe-without-shadow`)
هذا ال component لا يستخدم Shadow DOM، مما يعني أن أنماط CSS global ستؤثر على محتواه.

```javascript
<mfe-without-shadow></mfe-without-shadow>
```

## كيفية الاستخدام
1. قم بتضمين ملفات JavaScript لل custom component في صفحة HTML الخاصة بك:
```html
<script type="module" src="component-with-shadow.js"></script>
<script type="module" src="component-without-shadow.js"></script>
```

2. استخدم ال custom tag في HTML:
```html
<mfe-with-shadow></mfe-with-shadow>
<mfe-without-shadow></mfe-without-shadow>
```

3. لاحظ الفرق في كيفية تفاعل ال web components مع أنماط CSS global.


### متطلبات مسبقة

تأكد من تثبيت `serve` على جهازك:

```bash
npm install -g serve
```

```bash
cd web-component-ex-1
serve -p 3000
```

## الفائدة التعليمية
يوضح هذا المثال الفرق بين مكونات الويب التي تستخدم Shadow DOM وتلك التي لا تستخدمه، مما يساعد في فهم مفهوم التغليف (encapsulation) في ال web components.