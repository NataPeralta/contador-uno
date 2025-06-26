import React from 'react';
  import type { InputProps } from '../types';

export const Input: React.FC<InputProps> = ({ 
  disabled = false,
  className = '',
  type = 'text',
  placeholder = '',
  value,
  onChange,
  label,
  onBlur,
  onKeyDown,
  onKeyPress,
  ...props
}) => {
  const baseClasses = 'w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-uno-blue focus:border-transparent';

  return (
    <>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
    <input
      disabled={disabled}
      className={`${baseClasses} ${className}`}
      type={type}
      onChange={onChange}
      value={value}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      onKeyPress={onKeyPress}
      placeholder={placeholder}
        {...props}
    />
    </>
  );
}; 