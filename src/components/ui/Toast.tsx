import React, { useEffect, useState } from 'react';

interface ToastProps {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  onClose: (id: string) => void;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const Toast: React.FC<ToastProps> = ({
  id,
  type,
  title,
  message,
  duration = 5000,
  onClose,
  action,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // تأخير صغير لإظهار الرسالة
    const showTimer = setTimeout(() => setIsVisible(true), 100);
    
    // إخفاء الرسالة تلقائياً
    const hideTimer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [duration]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => onClose(id), 300);
  };

  const typeStyles = {
    success: {
      bg: 'bg-white border-success-200',
      icon: '✅',
      titleColor: 'text-success-700',
      messageColor: 'text-success-600',
    },
    error: {
      bg: 'bg-error-50 border-error-200',
      icon: '❌',
      titleColor: 'text-error-800',
      messageColor: 'text-error-700',
    },
    warning: {
      bg: 'bg-warning-50 border-warning-200',
      icon: '⚠️',
      titleColor: 'text-warning-800',
      messageColor: 'text-warning-700',
    },
    info: {
      bg: 'bg-info-50 border-info-200',
      icon: 'ℹ️',
      titleColor: 'text-info-800',
      messageColor: 'text-info-700',
    },
  };

  const styles = typeStyles[type];

  return (
    <div
      className={`
        fixed top-4 right-4 z-50 max-w-sm w-full transform transition-all duration-300 ease-in-out
        ${isVisible && !isLeaving ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}
      role="alert"
      aria-live="polite"
    >
      <div className={`
        ${styles.bg} border rounded-lg shadow-strong p-4 bg-white bg-opacity-100
      `}>
        <div className="flex items-start">
          <div className="flex-shrink-0 text-lg ml-3">
            {styles.icon}
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className={`text-sm font-semibold ${styles.titleColor} dark:text-neutral-100`}>
              {title}
            </h4>
            {message && (
              <p className={`mt-1 text-sm ${styles.messageColor} dark:text-neutral-300`}>
                {message}
              </p>
            )}
            
            {action && (
              <button
                onClick={action.onClick}
                className="mt-2 text-sm font-medium text-primary-600 hover:text-primary-500 focus:outline-none focus:underline"
              >
                {action.label}
              </button>
            )}
          </div>
          
          <button
            onClick={handleClose}
            className="flex-shrink-0 mr-2 text-neutral-400 hover:text-neutral-600 focus:outline-none focus:text-neutral-600"
            aria-label="إغلاق الرسالة"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

// Toast Container Component
interface ToastContainerProps {
  toasts: Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message?: string;
    duration?: number;
    action?: {
      label: string;
      onClick: () => void;
    };
  }>;
  onRemove: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          onClose={onRemove}
        />
      ))}
    </div>
  );
};
