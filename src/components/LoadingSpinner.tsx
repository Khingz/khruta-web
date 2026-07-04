export function LoadingSpinner({ size = 24, label }: { size?: number; label?: string }) {
  return (
    <div
      className="flex items-center justify-center gap-2 text-[#6B7280]"
      role="status"
      aria-live="polite"
    >
      <span
        className="inline-block rounded-full border-2 border-[#5B3FD6] border-r-transparent animate-spin"
        style={{ width: size, height: size }}
      />
      {label && <span className="text-sm">{label}</span>}
    </div>
  );
}
