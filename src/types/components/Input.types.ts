export interface InputProps {
  label?: string;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  value?: string | number;  
  type?: 'text' | 'number' | 'radio' | 'checkbox';
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}