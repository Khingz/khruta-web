export function LoadingSpinner({ size = 24, label }: { size?: number; label?: string }) {
  return (
    <div
      className="flex flex-col items-center gap-2 text-[#6B7280] mt-[3rem]"
      role="status"
      aria-live="polite"
    >
      <span
        className="inline-block rounded-full animate-spin"
        style={{
          width: size,
          height: size,
          border: "3px solid #E5E0FA",
          borderTopColor: "#5B3FD6",
        }}
      />
      {label && <span className="text-sm">{label}</span>}
    </div>
  );
}
