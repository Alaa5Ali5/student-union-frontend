import React from 'react';
import type { InputHTMLAttributes } from 'react';

interface PhoneInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'className'> {
  className?: string;
}

export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className = '', ...props }, ref) => {
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      // السماح بمفاتيح التنقل والتعديل (Backspace, Delete, Arrows, etc.)
      if (
        ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight'].includes(e.key) ||
        // السماح بـ: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
        (e.key === 'a' && e.ctrlKey) ||
        (e.key === 'c' && e.ctrlKey) ||
        (e.key === 'v' && e.ctrlKey) ||
        (e.key === 'x' && e.ctrlKey)
      ) {
        return;
      }
      
      // منع أي مدخل غير رقمي
      if (!/^[0-9]$/.test(e.key)) {
        e.preventDefault();
      }
    };

    return (
      <input
        ref={ref}
        type="tel"
        inputMode="numeric"
        onKeyDown={handleKeyDown}
        placeholder="09xxxxxxxx"
        // 5. إضافة text-right لمحاذاة النص إلى اليمين
        className={`form-input text-right ${className}`}
        maxLength={10}
        {...props}
      />
    );
  }
);

PhoneInput.displayName = 'PhoneInput';