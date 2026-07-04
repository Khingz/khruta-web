import { cn } from "@/utils/format";
import type { ReactNode } from "react";

export function Badge({
  children,
  tone = "default",
  className,
}: {
  children: ReactNode;
  tone?: "default" | "brand" | "success" | "warning" | "error" | "info";
  className?: string;
}) {
  const tones: Record<string, string> = {
    default: "bg-[#F1F5F9] text-[#475569]",
    brand: "bg-[#EEF0FB] text-[#1B2A6B]",
    success: "bg-[#DCFCE7] text-[#15803D]",
    warning: "bg-[#FEF3C7] text-[#A16207]",
    error: "bg-[#FEE2E2] text-[#B91C1C]",
    info: "bg-[#E0E7FF] text-[#3730A3]",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
