// D:\project\student-union\student-union-frontend\src\components\application\ApplicationForm.tsx

import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import type { SubmitErrorHandler, Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { FormField } from '../ui/FormField';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { TextArea } from '../ui/TextArea';
import { PhoneInput } from '../ui/PhoneInput';
import { Button } from '../ui/Button';
import { ToastContainer } from '../ui/Toast';
import { submitApplication, getColleges, type ApplicationFormData as ApiFormData, type College } from '../../services/api';
import logo from '../../assets/logo.png';

// ++ تعديل نهائي: مخطط Zod مع تصحيح نوع السنة الدراسية باستخدام preprocess
const applicationFormSchema = z.object({
  fullName: z.string()
    .min(3, "الاسم الكامل مطلوب ويجب أن يحتوي على 3 أحرف على الأقل")
    .regex(/^[\u0600-\u06FF\s]+$/, "يجب أن يحتوي الاسم على أحرف عربية فقط"),
  
  phoneNumber: z.string().regex(/^09\d{8}$/, "صيغة رقم الهاتف غير صحيحة (مثال: 0912345678)"),
  
  college: z.string().min(1, "يرجى اختيار الكلية"),
  
  // ++ تعديل: استخدام z.coerce.number لضمان التحويل إلى رقم دائماً
  academicYear: z.coerce.number().int().min(1, "يرجى اختيار السنة الدراسية"),
  
  interestedFields: z.array(z.string()).nonempty({ message: "يجب اختيار مجال اهتمام واحد على الأقل" }),
  
  hasExperience: z.boolean(),
  
  experienceDetails: z.string().optional(),
  
  portfolioLink1: z.string().url("الرابط غير صالح").or(z.literal('')).optional(),
  portfolioLink2: z.string().url("الرابط غير صالح").or(z.literal('')).optional(),
  portfolioLink3: z.string().url("الرابط غير صالح").or(z.literal('')).optional(),
  portfolioLink4: z.string().url("الرابط غير صالح").or(z.literal('')).optional(),
  
  equipmentDetails: z.string().optional(),
  
  reasonToJoin: z.string()
    .min(20, "سبب الانضمام مطلوب ويجب أن يحتوي على 20 حرفًا على الأقل")
    .max(500, "يجب ألا يتجاوز السبب 500 حرف"),
  
  consent: z.boolean().refine((val) => val === true, "يجب الموافقة على الشروط للمتابعة"),
})
.superRefine((data, ctx) => {
  if (data.hasExperience && (!data.experienceDetails || data.experienceDetails.trim().length < 10)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "تفاصيل الخبرة مطلوبة ويجب أن تحتوي على 10 أحرف على الأقل",
      path: ["experienceDetails"],
    });
  }
});

type FormSchemaData = z.infer<typeof applicationFormSchema>;

const fieldsOfInterestOptions = [
    { value: 'photography', label: 'التصوير الفوتوغرافي والفيديو' },
    { value: 'voiceover', label: 'التعليق الصوتي والتقديم' },
    { value: 'montage', label: 'المونتاج وتحرير الفيديو' },
    { value: 'graphic_design', label: 'التصميم الجرافيكي' },
    { value: 'content_writing', label: 'كتابة المحتوى الإعلامي' },
    { value: 'social_media', label: 'إدارة وسائل التواصل الاجتماعي' },
    { value: 'live_streaming', label: 'البث المباشر والتغطية الحية' },
];

export const ApplicationForm: React.FC = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [toasts, setToasts] = useState<Array<{ id: string; type: 'success' | 'error' | 'warning' | 'info'; title: string; message?: string; duration?: number }>>([]);

  const addToast = (toast: { type: 'success' | 'error' | 'warning' | 'info'; title: string; message?: string; duration?: number }) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, ...toast }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const { data: colleges, isLoading: isLoadingColleges } = useQuery<College[]>({
    queryKey: ['colleges'],
    queryFn: getColleges,
  });

  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    control, 
    reset,
    watch,
    setValue 
  } = useForm<FormSchemaData>({
    resolver: zodResolver(applicationFormSchema) as unknown as Resolver<FormSchemaData>,
    mode: 'onBlur',
    defaultValues: {
      hasExperience: false,
      interestedFields: [],
      college: "",
      academicYear: 0, 
    },
  });
  
  const watchedHasExperience = watch('hasExperience');
  const watchedCollege = watch('college');

  useEffect(() => {
    const college = colleges?.find(c => c.name === watchedCollege) || null;
    setSelectedCollege(college);
    if (!college || college.name !== watchedCollege) {
      setValue('academicYear', 0);
    }
  }, [watchedCollege, colleges, setValue]);

  const collegeOptions = colleges?.map(c => ({ value: c.name, label: c.name })) || [];
  
  const yearOptions = selectedCollege
    ? Array.from({ length: selectedCollege.academicYearsCount }, (_, i) => ({
        value: (i + 1).toString(),
        label: `السنة ${i + 1}`
      }))
    : [];

  const mutation = useMutation({
    mutationFn: submitApplication,
    onSuccess: (data) => {
      const appId = data.applicationId || 'غير محدد';
      setApplicationId(appId);
      setShowSuccessMessage(true);
      setIsSubmitting(false);
      addToast({ type: 'success', title: 'تم إرسال الطلب بنجاح', message: 'سيتم التواصل معك قريباً عبر رقم الهاتف المدخل.' });
      reset();
      setSelectedCollege(null);
      setTimeout(() => {
        setShowSuccessMessage(false);
        setApplicationId(null);
      }, 8000);
    },
    onError: (error: any) => {
      setIsSubmitting(false);
      const msg = error?.message || error?.response?.data?.message || 'حدث خطأ غير معروف أثناء الإرسال';
      addToast({ type: 'error', title: 'فشل إرسال الطلب', message: msg });
    },
  });

  const onSubmit = async (data: FormSchemaData) => {
    setIsSubmitting(true);
    const portfolioLinks = [
      data.portfolioLink1, data.portfolioLink2, data.portfolioLink3, data.portfolioLink4,
    ].filter((link): link is string => !!link && link.trim() !== '');

    // -- حذف: إزالة الحقول المؤقتة من الكائن الرئيسي
    const { portfolioLink1, portfolioLink2, portfolioLink3, portfolioLink4, ...rest } = data;
    
    // ++ تعديل: بناء الكائن المرسل مع معالجة القيم الاختيارية
    const finalDataToSend: ApiFormData = {
      ...rest,
      // تأكد من أن الحقول الاختيارية لها قيمة (null أو string) وليست undefined
      experienceDetails: data.experienceDetails || null, 
      equipmentDetails: data.equipmentDetails || null,
      portfolioLinks: portfolioLinks.length > 0 ? portfolioLinks : [],
    };
    
    await mutation.mutateAsync(finalDataToSend);
  };

  const onError: SubmitErrorHandler<FormSchemaData> = (errors) => {
    console.error("Zod Validation Errors:", errors);
  };

  return (
    <>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <div className="min-h-screen w-full p-4 font-sans sm:p-8">
        <main className="max-w-4xl mx-auto px-4 sm:px-8">
          <header className="text-center text-white py-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-8 h-8 flex items-center justify-center overflow-hidden">
                <img src={logo} alt="شعار اتحاد طلبة جامعة طرطوس" className="w-full h-full object-contain" />
              </div>
            </div>
            <div className="bg-green-800 rounded-lg p-4 mt-8">
              <p className="text-3xl md:text-4xl font-extrabold tracking-tight">فورم الانضمام للفرق الإعلامية للكليات</p>
            </div>
          </header>
          
          <div className="py-4">
            <form onSubmit={handleSubmit(onSubmit, onError)}>
              <div className="space-y-6">
                
                <div className="space-y-4">
                  <FormField label="الاسم الثلاثي" required error={errors.fullName}>
                    <Input placeholder="أدخل اسمك الكامل" {...register('fullName')} />
                  </FormField>
                  <FormField label="رقم الهاتف" required error={errors.phoneNumber}>
                    <Controller name="phoneNumber" control={control} render={({ field }) => <PhoneInput {...field} value={field.value || ''} />} />
                  </FormField>
                  <FormField label="الكلية" required error={errors.college}>
                    <Select 
                      options={collegeOptions} 
                      {...register('college')}
                      disabled={isLoadingColleges}
                      placeholder={isLoadingColleges ? "جاري تحميل الكليات..." : "-- اختر الكلية --"}
                    />
                  </FormField>

                  <FormField label="السنة الدراسية" required error={errors.academicYear}>
                    <Select 
                      options={yearOptions} 
                      {...register('academicYear')}
                      disabled={!selectedCollege}
                      placeholder={!selectedCollege ? "اختر الكلية أولاً" : "-- اختر السنة --"}
                    />
                  </FormField>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white mb-4">المجالات الإعلامية التي ترغب بالانضمام إليها (اختر كل ما يناسبك):</h3>
                  <Controller
                    name="interestedFields"
                    control={control}
                    render={({ field }) => (
                      <div className="space-y-3">
                        {fieldsOfInterestOptions.map((option, index) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`interest-${index}`}
                              value={option.value}
                              checked={field.value?.includes(option.value)}
                              onChange={(e) => {
                                const selectedFields = field.value ? [...field.value] : [];
                                if (e.target.checked) {
                                  selectedFields.push(option.value);
                                } else {
                                  const index = selectedFields.indexOf(option.value);
                                  if (index > -1) selectedFields.splice(index, 1);
                                }
                                field.onChange(selectedFields);
                              }}
                              className="h-5 w-5 text-green-600 border-green-300 focus:ring-green-500 rounded"
                            />
                            <label htmlFor={`interest-${index}`} className="mr-3 text-lg text-white">
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                  />
                  {errors.interestedFields && (
                    <div className="form-error" role="alert">{errors.interestedFields.message}</div>
                  )}
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white mb-4">هل لديك خبرة سابقة في المجال؟</h3>
                  <Controller
                    name="hasExperience"
                    control={control}
                    render={({ field }) => (
                      <div className="flex gap-6">
                        <div className="flex items-center">
                          <input type="radio" id="experience-yes" checked={field.value === true} onChange={() => field.onChange(true)} className="h-5 w-5 text-green-600 border-green-300 focus:ring-green-500" />
                          <label htmlFor="experience-yes" className="mr-3 text-lg text-white">نعم</label>
                        </div>
                        <div className="flex items-center">
                          <input type="radio" id="experience-no" checked={field.value === false} onChange={() => field.onChange(false)} className="h-5 w-5 text-green-600 border-green-300 focus:ring-green-500" />
                          <label htmlFor="experience-no" className="mr-3 text-lg text-white">لا</label>
                        </div>
                      </div>
                    )}
                  />
                  {watchedHasExperience && (
                    <FormField label="اذكرها باختصار مع الأدوات والبرامج التي تستخدمها" required error={errors.experienceDetails}>
                      <TextArea rows={4} {...register('experienceDetails')} />
                    </FormField>
                  )}
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white mb-4">أمثلة من أعمالك (Portfolio) - اختياري</h3>
                  <p className="text-white mb-2">ضع روابط لأعمالك إن وجدت</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField label="رابط 1" error={errors.portfolioLink1}><Input placeholder="https://example.com/work1" {...register('portfolioLink1')} /></FormField>
                    <FormField label="رابط 2" error={errors.portfolioLink2}><Input placeholder="https://example.com/work2" {...register('portfolioLink2')} /></FormField>
                    <FormField label="رابط 3" error={errors.portfolioLink3}><Input placeholder="https://example.com/work3" {...register('portfolioLink3')} /></FormField>
                    <FormField label="رابط 4" error={errors.portfolioLink4}><Input placeholder="https://example.com/work4" {...register('portfolioLink4')} /></FormField>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white mb-4">ما هي المعدات أو البرامج التي تمتلكها؟ (اختياري)</h3>
                  <FormField label="" error={errors.equipmentDetails}><TextArea rows={4} {...register('equipmentDetails')} /></FormField>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white mb-4">لماذا ترغب في الانضمام إلى الفريق الإعلامي؟</h3>
                  <FormField label="" required error={errors.reasonToJoin}><TextArea rows={5} {...register('reasonToJoin')} /></FormField>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3 space-x-reverse">
                    <input type="checkbox" id="consent" className="mt-1 h-5 w-5 text-green-600 border-green-300 rounded focus:ring-green-500" {...register('consent')} />
                    <label htmlFor="consent" className="text-lg text-white leading-relaxed">أقر بأن جميع المعلومات المقدمة صحيحة وأوافق على استخدامها لأغراض الانضمام للفريق.</label>
                  </div>
                  {errors.consent && (<div className="form-error" role="alert">{errors.consent.message}</div>)}
                </div>
              </div>
              
              <div className="flex justify-center items-center mt-8 pt-6">
                <Button 
                  type="submit" 
                  variant="primary" 
                  loading={isSubmitting || mutation.isPending} 
                  disabled={isSubmitting || mutation.isPending} 
                  className="bg-green-800 hover:bg-green-700 text-white px-12 py-4 text-xl font-bold rounded-lg"
                >
                  {isSubmitting || mutation.isPending ? 'جاري الإرسال...' : 'إرسال الطلب'}
                </Button>
              </div>
            </form>
          </div>
          <footer className="text-center text-white py-6 mt-4">
            <p>جميع الحقوق محفوظة © اتحاد الطلبة - جامعة طرطوس {new Date().getFullYear()}</p>
          </footer>
        </main>
      </div>

      {showSuccessMessage && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999
          }}
        >
          <div 
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '32px',
              maxWidth: '500px',
              width: '90%',
              textAlign: 'center',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              border: '2px solid #d1d5db',
              position: 'relative'
            }}
          >
            {/* زر الإغلاق */}
            <button
              onClick={() => {
                setShowSuccessMessage(false);
                setApplicationId(null);
              }}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ×
            </button>

            {/* أيقونة النجاح */}
            <div style={{ marginBottom: '24px' }}>
              <div 
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: '#dcfce7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto'
                }}
              >
                <svg 
                  style={{ width: '48px', height: '48px', color: '#16a34a' }} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            {/* العنوان */}
            <h2 
              style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: '#000000',
                marginBottom: '16px'
              }}
            >
              تم إرسال طلبك بنجاح!
            </h2>

            {/* النص التوضيحي */}
            <p 
              style={{
                fontSize: '16px',
                color: '#000000',
                lineHeight: '1.6',
                marginBottom: '24px'
              }}
            >
              تم إرسال طلب انضمامك للفريق الإعلامي بنجاح. شكراً لك على اهتمامك!
            </p>

            {/* معلومات إضافية */}
            <div 
              style={{
                backgroundColor: '#f3f4f6',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '24px'
              }}
            >
              <p style={{ fontSize: '14px', color: '#000000' }}>
                <strong>ماذا يحدث الآن؟</strong><br />
                سيتم مراجعة طلبك من قبل فريق الإدارة والتواصل معك قريباً عبر رقم الهاتف الذي أدخلته.
              </p>
            </div>

            {/* زر الإغلاق */}
            <button
              onClick={() => {
                setShowSuccessMessage(false);
                setApplicationId(null);
              }}
              style={{
                width: '100%',
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#dc2626'}
              onMouseOut={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#ef4444'}
            >
              إغلاق
            </button>
          </div>
        </div>
      )}


    </>
  );
};