import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

type Toast = {
  id: string;
  title: string;
  description?: string;
  tone: "success" | "error" | "info";
};
const Ctx = createContext<{ push: (t: Omit<Toast, "id">) => void } | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const push = useCallback((t: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((p) => [...p, { id, ...t }]);
    setTimeout(() => setToasts((p) => p.filter((x) => x.id !== id)), 4000);
  }, []);
  return (
    <Ctx.Provider value={{ push }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[60] flex flex-col gap-2 w-[320px] max-w-[calc(100vw-2rem)]">
        {toasts.map((t) => {
          const Icon =
            t.tone === "success" ? CheckCircle2 : t.tone === "error" ? AlertCircle : Info;
          const color =
            t.tone === "success"
              ? "text-[#16A34A]"
              : t.tone === "error"
                ? "text-[#DC2626]"
                : "text-[#5B3FD6]";
          return (
            <div key={t.id} className="surface-card p-3 flex gap-3 animate-fade-in">
              <Icon className={`h-5 w-5 shrink-0 mt-0.5 ${color}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#1F2937]">{t.title}</p>
                {t.description && <p className="text-xs text-[#6B7280] mt-0.5">{t.description}</p>}
              </div>
              <button
                onClick={() => setToasts((p) => p.filter((x) => x.id !== t.id))}
                aria-label="Dismiss"
                className="text-[#9CA3AF] hover:text-[#1F2937]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
    </Ctx.Provider>
  );
}
export function useToast() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useToast inside ToastProvider");
  return c;
}
