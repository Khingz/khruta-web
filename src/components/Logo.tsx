import { cn } from "@/utils/format";

export function Logo({ className, mono = false }: { className?: string; mono?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-display font-bold tracking-tight",
        className,
      )}
    >
      <span
        aria-hidden
        className="relative grid place-items-center h-8 w-8 rounded-[10px] text-white font-bold text-[15px] shadow-soft"
        style={{ backgroundImage: "linear-gradient(135deg,#1B2A6B 0%,#5B3FD6 100%)" }}
      >
        K
        <span
          className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full"
          style={{ background: "#5B3FD6", boxShadow: "0 0 0 2px #fff" }}
        />
      </span>
      <span className={cn("text-lg", mono ? "text-white" : "text-[#1B2A6B]")}>Khruta</span>
    </span>
  );
}
