import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
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
          className="block text-sm font-medium text-[#94a3b8] mb-2"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={twMerge(
          clsx(
            'w-full px-4 py-2 bg-[#1e293b] border border-[#334155] rounded-lg',
            'text-white placeholder-[#64748b]',
            'focus:outline-none focus:border-[#6366f1] focus:ring-1 focus:ring-[#6366f1]',
            'transition-colors duration-200',
            error && 'border-[#ef4444] focus:border-[#ef4444] focus:ring-[#ef4444]',
            className
          )
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-[#ef4444]">{error}</p>
      )}
    </div>
  );
}
