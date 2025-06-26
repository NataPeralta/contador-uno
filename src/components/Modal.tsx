import React from 'react';
import CloseIcon from '../assets/CloseIcon';
import type { ModalProps } from '../types';

export const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  footer,
  size = 'md' 
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl'
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={handleOverlayClick}>
      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-xl ${sizeClasses[size]} flex flex-col max-h-[90vh] w-full`}>
        <div className="flex items-center justify-between p-6 border-b border-uno-blue border-opacity-20 dark:border-uno-blue dark:border-opacity-30 flex-shrink-0">
          <h2 className="text-xl font-semibold text-uno-blue dark:text-uno-blue-light">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-uno-red dark:hover:text-uno-red-light transition-colors"
          >
            <CloseIcon />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {children}
          </div>
        </div>

        {footer && (
          <div className="flex-shrink-0 border-t border-uno-blue border-opacity-20 dark:border-uno-blue dark:border-opacity-30">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}; 