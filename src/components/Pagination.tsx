import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/utils/format";

export function Pagination({
  page,
  pageSize,
  total,
  onChange,
}: {
  page: number;
  pageSize: number;
  total: number;
  onChange: (p: number) => void;
}) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  if (totalPages <= 1) return null;
  const pages: (number | "…")[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - page) <= 1) pages.push(i);
    else if (pages[pages.length - 1] !== "…") pages.push("…");
  }

  const Btn = ({ children, onClick, disabled, active }: any) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "h-9 min-w-9 px-3 rounded-lg text-sm border transition-colors",
        active
          ? "gradient-brand text-white border-transparent"
          : "bg-white border-[#E5E7EB] text-[#1F2937] hover:bg-[#F8FAFC]",
        disabled && "opacity-40 cursor-not-allowed",
      )}
    >
      {children}
    </button>
  );
  return (
    <nav className="flex items-center justify-center gap-1.5" aria-label="Pagination">
      <Btn onClick={() => onChange(page - 1)} disabled={page <= 1}>
        <ChevronLeft className="h-4 w-4" />
      </Btn>
      {pages.map((p, i) =>
        p === "…" ? (
          <span key={i} className="px-1 text-[#9CA3AF]">
            …
          </span>
        ) : (
          <Btn key={i} active={p === page} onClick={() => onChange(p as number)}>
            {p}
          </Btn>
        ),
      )}
      <Btn onClick={() => onChange(page + 1)} disabled={page >= totalPages}>
        <ChevronRight className="h-4 w-4" />
      </Btn>
    </nav>
  );
}
