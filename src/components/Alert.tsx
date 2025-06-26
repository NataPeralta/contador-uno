import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import type { AlertProps } from '../types/components/Alert.types';

export const Alert: React.FC<AlertProps> = ({
  isOpen,
  onClose,
  title,
  message,
  type = 'info'
}) => {
   const variantClasses = {
    success: {
          titleColor: 'text-uno-green dark:text-uno-green-light',
          buttonVariant: 'green' as const
        },
    warning: {
          titleColor: 'text-uno-yellow dark:text-uno-yellow-light',
          buttonVariant: 'yellow' as const
        },
    error: {
          titleColor: 'text-uno-red dark:text-uno-red-light',
          buttonVariant: 'red' as const
        }
  };

  const { titleColor, buttonVariant } = variantClasses[type as keyof typeof variantClasses];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="md"
      footer={
        <div className="p-6">
          <div className="flex justify-end">
            <Button
              onClick={onClose}
              variant={buttonVariant}
              aria-label="Aceptar"
            >
              Aceptar
            </Button>
          </div>
        </div>
      }
    >
      <div className="p-6">
        <p className={`${titleColor} text-center text-lg`}>
          {message}
        </p>
      </div>
    </Modal>
  );
}; 