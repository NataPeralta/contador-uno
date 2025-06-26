import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import type { ConfirmProps } from '../types/components/Confirm.types';

export const Confirm: React.FC<ConfirmProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  type = 'default'
}) => {
  const variantClasses = {
    warning: {
      titleColor: 'text-uno-yellow dark:text-uno-yellow-light',
      confirmVariant: 'yellow' as const,
      cancelVariant: 'gray' as const
    },
    danger: {
      titleColor: 'text-uno-red dark:text-uno-red-light',
      confirmVariant: 'red' as const,
      cancelVariant: 'gray' as const
    },
    default: {
      titleColor: 'text-uno-blue dark:text-uno-blue-light',
      confirmVariant: 'blue' as const,
      cancelVariant: 'gray' as const
    }
  }

  const { titleColor, confirmVariant, cancelVariant } = variantClasses[type as keyof typeof variantClasses];

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="md"
      footer={
        <div className="p-6">
          <div className="flex gap-3 justify-end">
            <Button
              onClick={onClose}
              variant={cancelVariant}
              aria-label={cancelText}
            >
              {cancelText}
            </Button>
            <Button
              onClick={handleConfirm}
              variant={confirmVariant}
              aria-label={confirmText}
            >
              {confirmText}
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