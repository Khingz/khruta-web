import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/utils/format";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "danger";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-medium rounded-[10px] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed select-none whitespace-nowrap";

const sizes: Record<Size, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-[15px]",
  lg: "h-12 px-6 text-base",
};

const variants: Record<Variant, string> = {
  primary:
    "text-white shadow-soft hover:shadow-lift active:translate-y-px [background-image:linear-gradient(135deg,#1B2A6B_0%,#5B3FD6_100%)]",
  secondary: "bg-[#1B2A6B] text-white hover:bg-[#172359]",
  ghost: "text-[#1F2937] hover:bg-[#F1F5F9]",
  outline: "border border-[#E5E7EB] bg-white text-[#1F2937] hover:bg-[#F8FAFC]",
  danger: "bg-[#DC2626] text-white hover:bg-[#B91C1C]",
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  {
    variant = "primary",
    size = "md",
    className,
    leftIcon,
    rightIcon,
    loading,
    children,
    disabled,
    ...rest
  },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(base, sizes[size], variants[variant], className)}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <span className="inline-block h-4 w-4 rounded-full border-2 border-current border-r-transparent animate-spin" />
      ) : (
        leftIcon
      )}
      {children}
      {!loading && rightIcon}
    </button>
  );
});
