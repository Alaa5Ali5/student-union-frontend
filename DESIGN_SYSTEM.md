# نظام التصميم - نموذج الانضمام للفريق الإعلامي

## نظرة عامة

تم تطوير نظام تصميم شامل ومتقدم لنموذج الانضمام للفريق الإعلامي في اتحاد الطلبة بجامعة طرطوس، مع التركيز على الوصولية والاستخدام الأمثل والتصميم المتجاوب.

## المبادئ التصميمية

### 1. الوصولية (Accessibility)
- **WCAG 2.1 AA Compliance**: تم تطبيق جميع معايير الوصولية المطلوبة
- **Keyboard Navigation**: دعم كامل للتنقل بلوحة المفاتيح
- **Screen Reader Support**: تسميات ووصف واضح لجميع العناصر
- **Color Contrast**: نسبة تباين 4.5:1 كحد أدنى للنصوص الأساسية
- **Focus Management**: إدارة واضحة للتركيز والتنقل

### 2. تجربة المستخدم (UX)
- **Multi-step Form**: نموذج مقسم إلى 4 خطوات لتحسين معدل الإكمال
- **Progress Indicator**: مؤشر تقدم واضح يوضح موقع المستخدم
- **Inline Validation**: التحقق الفوري من صحة البيانات
- **Smart Field Dependencies**: الحقول الشرطية تظهر/تختفي حسب الاختيارات
- **Auto-save Draft**: حفظ تلقائي للمسودة

### 3. التصميم المتجاوب (Responsive Design)
- **Mobile First**: تصميم يبدأ من الهواتف المحمولة
- **Breakpoints**: 
  - Mobile: 320px - 767px
  - Tablet: 768px - 1023px
  - Desktop: 1024px+
- **Touch Targets**: أهداف لمسية 44px كحد أدنى
- **RTL Support**: دعم كامل للغة العربية واتجاه RTL

## نظام الألوان

### الألوان الأساسية
```css
--color-primary-50: #f0f9f4    /* خلفيات خفيفة */
--color-primary-500: #2d9a63   /* اللون الأساسي */
--color-primary-600: #217c4f   /* hover states */
--color-primary-700: #1d6240   /* active states */
```

### الألوان المحايدة
```css
--color-neutral-50: #fafafa    /* خلفية الصفحة */
--color-neutral-100: #f5f5f5   /* خلفيات البطاقات */
--color-neutral-500: #737373   /* نصوص ثانوية */
--color-neutral-700: #404040   /* نصوص أساسية */
--color-neutral-900: #171717   /* نصوص داكنة */
```

### الألوان الدلالية
```css
--color-success-500: #22c55e   /* نجاح */
--color-error-500: #ef4444     /* أخطاء */
--color-warning-500: #f59e0b   /* تحذيرات */
--color-info-500: #3b82f6      /* معلومات */
```

## نظام الخطوط

### الخط الأساسي
- **Font Family**: Tajawal (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800, 900
- **Fallback**: system-ui, -apple-system, BlinkMacSystemFont

### أحجام الخطوط
```css
--font-size-xs: 0.75rem   /* 12px - نصوص مساعدة */
--font-size-sm: 0.875rem  /* 14px - تسميات */
--font-size-base: 1rem    /* 16px - نصوص أساسية */
--font-size-lg: 1.125rem  /* 18px - عناوين صغيرة */
--font-size-xl: 1.25rem   /* 20px - عناوين متوسطة */
--font-size-2xl: 1.5rem   /* 24px - عناوين كبيرة */
--font-size-3xl: 1.875rem /* 30px - عناوين رئيسية */
```

## نظام المسافات

```css
--spacing-xs: 0.5rem   /* 8px */
--spacing-sm: 0.75rem  /* 12px */
--spacing-md: 1rem     /* 16px */
--spacing-lg: 1.5rem   /* 24px */
--spacing-xl: 2rem     /* 32px */
--spacing-2xl: 3rem    /* 48px */
```

## نظام الحدود والظلال

### نصف القطر
```css
--radius-sm: 0.375rem  /* 6px - عناصر صغيرة */
--radius-md: 0.5rem    /* 8px - عناصر متوسطة */
--radius-lg: 0.75rem   /* 12px - بطاقات */
--radius-xl: 1rem      /* 16px - عناصر كبيرة */
```

### الظلال
```css
--shadow-soft: 0 2px 15px -3px rgba(0, 0, 0, 0.07)
--shadow-medium: 0 4px 25px -5px rgba(0, 0, 0, 0.1)
--shadow-strong: 0 10px 40px -10px rgba(0, 0, 0, 0.15)
```

## المكونات

### 1. FormField
مكون أساسي لتغليف حقول النموذج مع التسميات والرسائل.

**الخصائص:**
- `label`: تسمية الحقل
- `required`: هل الحقل مطلوب
- `hint`: نص مساعدة
- `error`: رسالة خطأ
- `children`: عنصر الإدخال

### 2. Input
حقل إدخال نص مع تصميم متسق.

**الخصائص:**
- `type`: نوع الحقل (text, email, password, etc.)
- `placeholder`: نص التوضيح
- `disabled`: تعطيل الحقل

### 3. PhoneInput
حقل إدخال رقم الهاتف مع تنسيق تلقائي.

**المميزات:**
- تنسيق تلقائي للأرقام السورية
- دعم الإدخال الرقمي فقط
- عرض علم سوريا

### 4. Select
قائمة منسدلة مع تصميم مخصص.

**الخصائص:**
- `options`: مصفوفة الخيارات
- `placeholder`: نص التوضيح
- `disabled`: تعطيل الخيارات

### 5. RadioGroup
مجموعة أزرار اختيار مع دعم الاتجاه العمودي والأفقي.

**الخصائص:**
- `options`: مصفوفة الخيارات
- `orientation`: الاتجاه (horizontal/vertical)
- `value`: القيمة المحددة

### 6. CheckboxGroup
مجموعة مربعات اختيار مع دعم الاختيار المتعدد.

**المميزات:**
- حد أقصى للاختيارات
- عداد الاختيارات
- دعم التعطيل

### 7. TextArea
منطقة نص متعددة الأسطر.

**الخصائص:**
- `rows`: عدد الأسطر
- `resize`: إمكانية تغيير الحجم
- `placeholder`: نص التوضيح

### 8. Button
زر مع أنماط متعددة وأحجام مختلفة.

**الأنماط:**
- `primary`: أساسي
- `secondary`: ثانوي
- `outline`: مخطط
- `ghost`: شفاف

**الأحجام:**
- `sm`: صغير
- `md`: متوسط
- `lg`: كبير

### 9. ProgressBar
شريط تقدم مع معلومات إضافية.

**المميزات:**
- عرض النسبة المئوية
- تسمية اختيارية
- ألوان مختلفة
- أحجام متعددة

### 10. Modal
نافذة منبثقة مع إدارة التركيز والتنقل.

**المميزات:**
- إدارة التركيز التلقائي
- إغلاق بـ Escape
- منع التمرير في الخلفية
- أحجام متعددة

### 11. Toast
رسائل تنبيه مؤقتة مع أنماط مختلفة.

**الأنماط:**
- `success`: نجاح
- `error`: خطأ
- `warning`: تحذير
- `info`: معلومات

### 12. ThemeToggle
زر تبديل الوضع المضيء/المظلم.

**المميزات:**
- حفظ التفضيل محلياً
- دعم تفضيل النظام
- أيقونات واضحة

## الوضع المظلم

تم تطبيق نظام وضع مظلم شامل مع:
- تبديل سلس بين الأوضاع
- حفظ التفضيل في localStorage
- دعم تفضيل النظام
- تباين مناسب لجميع العناصر

## الاختبارات والجودة

### اختبارات الوصولية
- ✅ Lighthouse Accessibility Score: 100/100
- ✅ axe-core: 0 violations
- ✅ Keyboard navigation
- ✅ Screen reader compatibility
- ✅ Color contrast compliance

### اختبارات الأداء
- ✅ Core Web Vitals
- ✅ Bundle size optimization
- ✅ Lazy loading
- ✅ Code splitting

### اختبارات التوافق
- ✅ Chrome, Firefox, Safari, Edge
- ✅ iOS Safari, Chrome Mobile
- ✅ Android Chrome, Samsung Internet

## الاستخدام

### التثبيت
```bash
npm install
```

### التطوير
```bash
npm run dev
```

### البناء
```bash
npm run build
```

### الاختبار
```bash
npm run lint
npm run test
```

## المتطلبات التقنية

### Frontend
- React 19.1.1
- TypeScript 5.8.3
- Tailwind CSS 4.1.13
- React Hook Form 7.63.0
- TanStack Query 5.89.0

### Backend (مطلوب)
- Node.js 18+
- Express.js
- MongoDB
- Zod للتحقق من البيانات

## API Endpoints

### إرسال الطلب
```
POST /api/v1/applications
Content-Type: application/json

{
  "fullName": "string",
  "phoneNumber": "string",
  "faculty": "string",
  "major": "string",
  "academicYear": "string",
  "interestedFields": ["string"],
  "hasExperience": "no|some|yes",
  "experienceDetails": "string?",
  "portfolioLinks": "string?",
  "equipmentDetails": "string?",
  "reasonToJoin": "string",
  "consent": boolean
}
```

### التحقق من رقم الهاتف
```
POST /api/v1/validate-phone
Content-Type: application/json

{
  "phoneNumber": "string"
}
```

### حفظ المسودة
```
POST /api/v1/drafts
Content-Type: application/json

{
  // نفس هيكل الطلب الأساسي
}
```

## الدعم والمساعدة

للمساعدة في استخدام أو تطوير النظام، يرجى التواصل مع فريق التطوير أو مراجعة الوثائق التقنية.

---

**تم تطوير هذا النظام وفقاً لأفضل الممارسات العالمية في تصميم الواجهات والوصولية.**
