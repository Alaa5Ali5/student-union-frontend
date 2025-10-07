# Student Union Frontend

واجهة أمامية لتطبيق اتحاد الطلابي - جامعة طرطوس

## الوصف

هذا هو الفرونت إند لتطبيق اتحاد الطلابي الذي يوفر:
- نموذج انضمام للفرق الإعلامية
- واجهة مستخدم عربية متجاوبة
- نظام إشعارات Toast
- تصميم عصري ومتجاوب

## التقنيات المستخدمة

- **React** - مكتبة واجهة المستخدم
- **TypeScript** - لغة البرمجة
- **Vite** - أداة البناء والتطوير
- **Tailwind CSS** - إطار عمل CSS
- **React Hook Form** - إدارة النماذج
- **Zod** - التحقق من صحة البيانات
- **TanStack Query** - إدارة حالة الخادم
- **Axios** - طلبات HTTP

## التثبيت والتشغيل

### المتطلبات
- Node.js (الإصدار 18 أو أحدث)
- npm أو yarn

### خطوات التثبيت

1. **استنساخ المستودع**
```bash
git clone <repository-url>
cd student-union-frontend
```

2. **تثبيت التبعيات**
```bash
npm install
```

3. **إعداد متغيرات البيئة**
```bash
cp .env.example .env
# قم بتحرير ملف .env وإضافة رابط API
```

4. **تشغيل خادم التطوير**
```bash
npm run dev
```

5. **بناء المشروع للإنتاج**
```bash
npm run build
npm run preview
```

## متغيرات البيئة المطلوبة

```env
VITE_API_URL=http://localhost:3000/api/v1
```

## الميزات

### نموذج الانضمام
- ✅ إدخال البيانات الشخصية
- ✅ اختيار الكلية والسنة الدراسية
- ✅ اختيار المجالات الإعلامية
- ✅ رفع روابط الأعمال (Portfolio)
- ✅ التحقق من صحة البيانات
- ✅ إرسال الطلب مع معالجة الأخطاء

### واجهة المستخدم
- ✅ تصميم عربي متجاوب
- ✅ نظام ألوان متناسق
- ✅ رسائل نجاح وخطأ
- ✅ تحميل البيانات
- ✅ تأثيرات بصرية

### مكونات UI
- ✅ Input Fields
- ✅ Select Dropdowns
- ✅ Text Areas
- ✅ Checkboxes & Radio Buttons
- ✅ Toast Notifications
- ✅ Modal Windows
- ✅ Buttons

## هيكل المشروع

```
src/
├── components/           # المكونات
│   ├── application/     # مكونات النموذج
│   └── ui/              # مكونات UI أساسية
├── services/            # خدمات API
├── hooks/               # React Hooks
├── utils/               # أدوات مساعدة
├── assets/              # الصور والملفات الثابتة
└── index.css           # الأنماط الأساسية
```

## المكونات الرئيسية

### ApplicationForm
نموذج الانضمام الرئيسي مع:
- التحقق من البيانات باستخدام Zod
- إدارة الحالة مع React Hook Form
- إرسال البيانات للخادم
- عرض رسائل النجاح والخطأ

### UI Components
مجموعة من المكونات القابلة لإعادة الاستخدام:
- `Button` - أزرار بتصميمات مختلفة
- `Input` - حقول الإدخال
- `Select` - القوائم المنسدلة
- `Toast` - إشعارات منبثقة
- `Modal` - النوافذ المنبثقة

## التطوير

### إضافة مكون جديد
1. أنشئ المكون في `src/components/`
2. أضف الأنماط المطلوبة
3. أضف الاختبارات
4. حدث التوثيق

### الاختبار
```bash
npm run test
```

### التحقق من الكود
```bash
npm run lint
```

### بناء المشروع
```bash
npm run build
```

## التخصيص

### الألوان
يمكن تخصيص نظام الألوان في `tailwind.config.js`:

```javascript
colors: {
  'primary': {
    50: '#f0f9f4',
    500: '#2d9a63',
    // ...
  }
}
```

### الخطوط
يتم تحميل خط Tajawal من Google Fonts للدعم العربي.

## المساهمة

1. Fork المشروع
2. أنشئ branch للميزة الجديدة (`git checkout -b feature/amazing-feature`)
3. Commit التغييرات (`git commit -m 'Add some amazing feature'`)
4. Push إلى Branch (`git push origin feature/amazing-feature`)
5. افتح Pull Request

## الترخيص

هذا المشروع مرخص تحت رخصة MIT - راجع ملف [LICENSE](LICENSE) للتفاصيل.

## التواصل

لأي استفسارات أو مساعدة، يرجى التواصل مع فريق التطوير.