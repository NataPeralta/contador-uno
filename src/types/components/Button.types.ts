export interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant: 'gray' | 'yellow' | 'blue' | 'red' | 'green' | 'transparent';
  disabled?: boolean;
  className?: string;
}
