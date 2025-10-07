import React from 'react';
import type { InputHTMLAttributes } from 'react';

interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface RadioGroupProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'className'> {
  className?: string;
  options: RadioOption[];
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  orientation?: 'horizontal' | 'vertical';
}

export const RadioGroup = React.forwardRef<HTMLInputElement, RadioGroupProps>(
  ({ 
    className = '', 
    options, 
    name, 
    value, 
    onChange,
    orientation = 'horizontal',
    ...props 
  }, ref) => {
    return (
      <fieldset className={`${className}`}>
        <div 
          className={`flex gap-6 ${orientation === 'vertical' ? 'flex-col' : 'flex-row'}`}
          role="radiogroup"
        >
          {options.map((option, index) => {
            const optionId = `${name}-${index}`;
            const isChecked = value === option.value;
            
            return (
              <div key={option.value} className="flex items-center">
                <input
                  ref={index === 0 ? ref : undefined}
                  id={optionId}
                  name={name}
                  type="radio"
                  value={option.value}
                  checked={isChecked}
                  onChange={onChange}
                  disabled={option.disabled}
                  className="h-5 w-5 text-primary-500 border-neutral-300 focus:ring-primary-500 focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  {...props}
                />
                <label 
                  htmlFor={optionId}
                  className={`mr-3 block text-base font-medium text-neutral-700 cursor-pointer select-none ${
                    option.disabled ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {option.label}
                </label>
              </div>
            );
          })}
        </div>
      </fieldset>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';