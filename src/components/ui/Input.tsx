import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({
  className,
  label,
  error,
  id,
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-light-text-muted dark:text-dark-text-muted mb-2"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={twMerge(
          clsx(
            'w-full px-4 py-2.5 rounded-lg border transition-colors duration-200',
            'bg-light-bg-card dark:bg-dark-bg-card',
            'border-light-border dark:border-dark-border',
            'text-light-text-primary dark:text-dark-text-primary',
            'placeholder:text-light-text-muted dark:placeholder:text-dark-text-muted',
            'focus:outline-none focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20',
            error && 'border-[#ef4444] focus:border-[#ef4444] focus:ring-[#ef4444]/20',
            className
          )
        )}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-sm text-[#ef4444]">{error}</p>
      )}
    </div>
  );
}