import React from 'react';

interface CheckboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface CheckboxGroupProps {
  className?: string;
  options: CheckboxOption[];
  name: string;
  value?: string[];
  onChange?: (values: string[]) => void;
  orientation?: 'horizontal' | 'vertical';
  maxSelections?: number;
}

export const CheckboxGroup = React.forwardRef<HTMLInputElement, CheckboxGroupProps>(
  ({ 
    className = '', 
    options, 
    name, 
    value = [], 
    onChange,
    orientation = 'vertical',
    maxSelections,
    ...props 
  }, ref) => {
    const handleChange = (optionValue: string, checked: boolean) => {
      if (checked) {
        // إضافة القيمة إذا لم تكن موجودة ولم نتجاوز الحد الأقصى
        if (!value.includes(optionValue) && (!maxSelections || value.length < maxSelections)) {
          onChange?.([...value, optionValue]);
        }
      } else {
        // إزالة القيمة
        onChange?.(value.filter(v => v !== optionValue));
      }
    };

    return (
      <fieldset className={`${className}`}>
        <div 
          className={`flex gap-4 ${orientation === 'vertical' ? 'flex-col' : 'flex-wrap'}`}
          role="group"
          aria-label={`اختر من ${options.length} خيارات`}
        >
          {options.map((option, index) => {
            const optionId = `${name}-${index}`;
            const isChecked = value.includes(option.value);
            const isDisabled = option.disabled || (maxSelections && value.length >= maxSelections && !isChecked);
            
            return (
              <div key={option.value} className="flex items-start">
                <input
                  ref={index === 0 ? ref : undefined}
                  id={optionId}
                  name={`${name}[]`}
                  type="checkbox"
                  value={option.value}
                  checked={isChecked}
                  onChange={(e) => handleChange(option.value, e.target.checked)}
                  disabled={!!isDisabled}
                  className="h-5 w-5 mt-0.5 text-primary-500 border-neutral-300 rounded focus:ring-primary-500 focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  {...props}
                />
                <label 
                  htmlFor={optionId}
                  className={`mr-3 block text-base font-medium text-neutral-700 cursor-pointer select-none leading-relaxed ${
                    isDisabled ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {option.label}
                </label>
              </div>
            );
          })}
        </div>
        
        {maxSelections && (
          <div className="mt-2 text-sm text-neutral-500">
            يمكنك اختيار {maxSelections} خيارات كحد أقصى ({value.length}/{maxSelections})
          </div>
        )}
      </fieldset>
    );
  }
);

CheckboxGroup.displayName = 'CheckboxGroup';
