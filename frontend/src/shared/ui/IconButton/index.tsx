import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'default' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  badge?: boolean;
}

const variantStyles = {
  default: 'bg-white border border-gray-200 hover:bg-gray-50',
  ghost: 'bg-transparent hover:bg-gray-100',
};

const sizeStyles = {
  sm: 'p-1.5',
  md: 'p-2',
  lg: 'p-3',
};

export function IconButton({
  children,
  variant = 'ghost',
  size = 'md',
  badge = false,
  className = '',
  ...props
}: IconButtonProps) {
  const baseStyles = 'relative inline-flex items-center justify-center rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed';
  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  return (
    <button className={combinedStyles} {...props}>
      {children}
      {badge && (
        <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" aria-hidden="true" />
      )}
    </button>
  );
}

