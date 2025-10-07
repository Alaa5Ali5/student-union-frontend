import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
  showPercentage?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'success' | 'warning' | 'error';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  label,
  showPercentage = true,
  className = '',
  size = 'md',
  color = 'primary',
}) => {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;
  
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };
  
  const colorClasses = {
    primary: 'bg-primary-500',
    success: 'bg-success-500',
    warning: 'bg-warning-500',
    error: 'bg-error-500',
  };

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {label}
            </span>
          )}
          {showPercentage && (
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              {percentage}%
            </span>
          )}
        </div>
      )}
      
      <div className={`w-full bg-neutral-200 rounded-full overflow-hidden dark:bg-neutral-700 ${sizeClasses[size]}`}>
        <div
          className={`${colorClasses[color]} transition-all duration-300 ease-out ${sizeClasses[size]}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
          role="progressbar"
          aria-valuenow={current}
          aria-valuemin={0}
          aria-valuemax={total}
          aria-label={label || `التقدم: ${percentage}%`}
        />
      </div>
      
      <div className="flex justify-between items-center mt-1 text-xs text-neutral-500 dark:text-neutral-400">
        <span>الخطوة {current}</span>
        <span>من {total}</span>
      </div>
    </div>
  );
};
