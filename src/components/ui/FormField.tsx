import React from 'react';
import type { FieldError } from 'react-hook-form';

interface FormFieldProps {
  label: string;
  required?: boolean;
  hint?: string;
  error?: FieldError | any; // Allow for array errors
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  required = false,
  hint,
  error,
  children,
  id,
  className = '',
}) => {
  const fieldId = id || `field-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = `${fieldId}-error`;
  const hintId = `${fieldId}-hint`;

  return (
    <div className={`form-field ${className}`}>
      <label 
        htmlFor={fieldId}
        className={`form-label ${required ? 'required' : ''}`}
      >
        {label}
      </label>
      
      {React.cloneElement(children as React.ReactElement<any>, {
        id: fieldId,
        'aria-describedby': [
          error ? errorId : '',
          hint ? hintId : '',
        ].filter(Boolean).join(' ') || undefined,
        'aria-invalid': error ? 'true' : 'false',
      })}
      
      {hint && (
        <div id={hintId} className="form-hint">
          {hint}
        </div>
      )}
      
      {error && (
        <div id={errorId} className="form-error" role="alert">
          {error?.message || error}
        </div>
      )}
    </div>
  );
};
