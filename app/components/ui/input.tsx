// app/components/ui/input.tsx

import React from 'react';

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  (props, ref) => {
    return <input ref={ref} {...props} className="border p-2 rounded" />;
  }
);

Input.displayName = 'Input';
