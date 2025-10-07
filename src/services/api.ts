import axios, { AxiosError } from 'axios';

// إعداد نسخة من axios مع الرابط الأساسي للـ API
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// تعريف نوع البيانات التي سيتم إرسالها
export interface ApplicationFormData {
  fullName: string;
  phoneNumber: string;
  college: string;
  academicYear: number;
  interestedFields: string[];
  hasExperience: boolean;
  // ++ تعديل: السماح بـ null بالإضافة إلى undefined
  experienceDetails?: string | null; 
  portfolioLinks?: string[];
  // ++ تعديل: السماح بـ null بالإضافة إلى undefined
  equipmentDetails?: string | null; 
  reasonToJoin: string;
  consent: boolean;
}
export interface ApplicationResponse {
  applicationId: string;
  status: 'success' | 'submitted' | 'pending' | 'approved' | 'rejected';
  message: string;
  submittedAt?: string;
}

export interface ApiError {
  message: string;
  field?: string;
  code?: string;
}

// ++ إضافة: تعريف نوع بيانات الكلية كما هي قادمة من الباك إند
export interface College {
  id: string;
  name: string;
  academicYearsCount: number;
  createdAt: string;
  updatedAt: string;
}

// Interceptor للتعامل مع الأخطاء
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      // Server responded with error status
      const responseData = error.response.data as any;
      const apiError: ApiError = {
        message: responseData?.message || 'حدث خطأ في الخادم',
        field: responseData?.field,
        code: responseData?.code,
      };
      return Promise.reject(apiError);
    } else if (error.request) {
      // Network error
      const apiError: ApiError = {
        message: 'خطأ في الاتصال بالخادم. تحقق من اتصالك بالإنترنت',
        code: 'NETWORK_ERROR',
      };
      return Promise.reject(apiError);
    } else {
      // Other error
      const apiError: ApiError = {
        message: 'حدث خطأ غير متوقع',
        code: 'UNKNOWN_ERROR',
      };
      return Promise.reject(apiError);
    }
  }
);

// الدالة التي تقوم بإرسال الطلب
export const submitApplication = async (data: ApplicationFormData): Promise<ApplicationResponse> => {
  try {
    const response = await apiClient.post<ApplicationResponse>('/applications', data);
    return response.data;
  } catch (error) {
    console.error('Application submission failed:', error);
    throw error;
  }
};

// ++ إضافة: دالة لجلب قائمة الكليات
export const getColleges = async (): Promise<College[]> => {
  try {
    const response = await apiClient.get<College[]>('/colleges');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch colleges:', error);
    // يمكنك هنا إرجاع مصفوفة فارغة أو إلقاء الخطأ للسماح لـ React Query بالتعامل معه
    throw error;
  }
};

// دالة للتحقق من صحة رقم الهاتف
export const validatePhoneNumber = async (phoneNumber: string): Promise<boolean> => {
  try {
    const response = await apiClient.post('/validate-phone', { phoneNumber });
    return response.data.isValid;
  } catch (error) {
    console.error('Phone validation failed:', error);
    return false;
  }
};

// دالة لحفظ المسودة
export const saveDraft = async (data: Partial<ApplicationFormData>): Promise<void> => {
  try {
    await apiClient.post('/drafts', data);
  } catch (error) {
    console.error('Draft save failed:', error);
    throw error;
  }
};

// دالة لجلب المسودة المحفوظة
export const getDraft = async (): Promise<Partial<ApplicationFormData> | null> => {
  try {
    const response = await apiClient.get('/drafts');
    return response.data;
  } catch (error) {
    console.error('Draft retrieval failed:', error);
    return null;
  }
};