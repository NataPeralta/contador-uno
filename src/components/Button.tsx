import React from 'react';
  import type { ButtonProps } from '../types';

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant,
  disabled = false,
  className = ''
}) => {
  const baseClasses = 'w-full px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    gray: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600',
    yellow: 'bg-uno-yellow text-black hover:bg-uno-yellow-dark focus:ring-uno-yellow',
    blue: 'bg-uno-blue text-white hover:bg-uno-blue-dark focus:ring-uno-blue',
    red: 'bg-uno-red text-white hover:bg-uno-red-dark focus:ring-uno-red',
    green: 'bg-uno-green text-uno-white hover:bg-uno-green-dark focus:ring-uno-green',
    transparent: 'bg-transparent text-gray-800 hover:bg-gray-300 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      aria-label={children?.toString()}
    >
      {children}
    </button>
  );
}; 