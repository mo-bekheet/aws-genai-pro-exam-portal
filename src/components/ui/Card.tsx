import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export type CardVariant = 'default' | 'interactive';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
}

export function Card({
  className,
  variant = 'default',
  children,
  ...props
}: CardProps) {
  const baseStyles = 'rounded-card border border-light-border dark:border-dark-border bg-light-bg-card dark:bg-dark-bg-card p-card';
  const variants = {
    default: '',
    interactive: 'hover:border-[#6366f1] hover:dark:border-[#6366f1] transition-colors cursor-pointer',
  };

  return (
    <div
      className={twMerge(clsx(baseStyles, variants[variant], className))}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={twMerge('pb-0', className)} {...props}>
      {children}
    </div>
  );
}

export function CardContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={twMerge('', className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={twMerge('text-lg font-semibold text-light-text-primary dark:text-dark-text-primary', className)} {...props}>
      {children}
    </h3>
  );
}