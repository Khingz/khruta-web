import { cn } from "@/utils/format";

export function Logo({ footer = false }: { footer?: boolean }) {
  return (
    <div
      className={cn(
        "lg:h-16 lg:w-48 overflow-hidden flex items-center",
        footer ? "justify-start" : "justify-center",
      )}
    >
      <img src="/khruta-logo-full.png" alt="Khruta" className="h-12 w-auto" />
    </div>
  );
}
