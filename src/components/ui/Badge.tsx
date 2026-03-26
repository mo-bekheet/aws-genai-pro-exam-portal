import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
}

export function Badge({
  className,
  variant = 'default',
  size = 'md',
  children,
  ...props
}: BadgeProps) {
  const baseStyles = 'inline-flex items-center font-medium rounded-full';
  
  const variants = {
    default: 'bg-[#334155] text-white',
    success: 'bg-green-500/20 text-green-400 border border-green-500/30',
    warning: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
    danger: 'bg-red-500/20 text-red-400 border border-red-500/30',
    info: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
  };
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <span
      className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
      {...props}
    >
      {children}
    </span>
  );
}

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

interface DifficultyBadgeProps {
  difficulty: DifficultyLevel;
  className?: string;
}

export function DifficultyBadge({ difficulty, className = "" }: DifficultyBadgeProps) {
  const styles = {
    easy: 'bg-[#dcfce7] text-[#16a34a]',
    medium: 'bg-[#fef3c7] text-[#d97706]',
    hard: 'bg-[#fee2e2] text-[#dc2626]',
  };

  const labels = {
    easy: 'Easy',
    medium: 'Medium', 
    hard: 'Hard',
  };

  return (
    <span className={clsx(
      'inline-flex items-center font-mono text-xs px-3 py-1 rounded-full',
      styles[difficulty],
      className
    )}>
      {labels[difficulty]}
    </span>
  );
}

interface DomainBadgeProps {
  domainNumber: number;
  domainName: string;
  className?: string;
}

export function DomainBadge({ domainNumber, domainName, className = "" }: DomainBadgeProps) {
  return (
    <span className={clsx(
      'inline-flex items-center font-mono text-xs px-3 py-1 rounded-full',
      'bg-[#e0e7ff] text-[#6366f1]',
      'dark:bg-[#6366f1]/20 dark:text-[#a5b4fc]',
      className
    )}>
      Domain {domainNumber} — {domainName}
    </span>
  );
}