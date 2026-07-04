import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/utils/format";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightSlot?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { label, hint, error, leftIcon, rightSlot, className, id, ...rest },
  ref,
) {
  const inputId = id || rest.name;
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-[#1F2937] mb-1.5">
          {label}
        </label>
      )}
      <div
        className={cn(
          "relative flex items-center rounded-[10px] border bg-white transition-colors",
          error ? "border-[#DC2626]" : "border-[#E5E7EB] focus-within:border-[#5B3FD6]",
        )}
      >
        {leftIcon && <span className="pl-3 text-[#6B7280]">{leftIcon}</span>}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "flex-1 bg-transparent px-3 h-11 text-[15px] placeholder:text-[#9CA3AF] outline-none",
            leftIcon ? "pl-2" : "",
            className,
          )}
          {...rest}
        />
        {rightSlot && <span className="pr-2">{rightSlot}</span>}
      </div>
      {error ? (
        <p className="mt-1.5 text-sm text-[#DC2626]">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-sm text-[#6B7280]">{hint}</p>
      ) : null}
    </div>
  );
});

interface TAProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}
export const Textarea = forwardRef<HTMLTextAreaElement, TAProps>(function Textarea(
  { label, error, hint, className, id, ...rest },
  ref,
) {
  const inputId = id || rest.name;
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-[#1F2937] mb-1.5">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={inputId}
        className={cn(
          "w-full rounded-[10px] border bg-white px-3 py-2.5 text-[15px] outline-none transition-colors min-h-[100px] placeholder:text-[#9CA3AF]",
          error ? "border-[#DC2626]" : "border-[#E5E7EB] focus:border-[#5B3FD6]",
          className,
        )}
        {...rest}
      />
      {error ? (
        <p className="mt-1.5 text-sm text-[#DC2626]">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-sm text-[#6B7280]">{hint}</p>
      ) : null}
    </div>
  );
});

interface SelProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
}
export const Select = forwardRef<HTMLSelectElement, SelProps>(function Select(
  { label, error, className, id, children, ...rest },
  ref,
) {
  const inputId = id || rest.name;
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-[#1F2937] mb-1.5">
          {label}
        </label>
      )}
      <select
        ref={ref}
        id={inputId}
        className={cn(
          "w-full h-11 rounded-[10px] border bg-white px-3 text-[15px] outline-none transition-colors appearance-none",
          "bg-no-repeat bg-[right_0.75rem_center] bg-[length:1.1em]",
          error ? "border-[#DC2626]" : "border-[#E5E7EB] focus:border-[#5B3FD6]",
          className,
        )}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2'><polyline points='6 9 12 15 18 9'/></svg>\")",
        }}
        {...rest}
      >
        {children}
      </select>
    </div>
  );
});
