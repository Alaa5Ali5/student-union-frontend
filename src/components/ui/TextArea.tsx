import React from 'react';
import type { TextareaHTMLAttributes } from 'react';

interface TextAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> {
  className?: string;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className = '', rows = 4, ...props }, ref) => {
    return (
      <textarea
        className={`form-input resize-y ${className}`}
        rows={rows}
        ref={ref}
        {...props}
      />
    );
  }
);

TextArea.displayName = 'TextArea';