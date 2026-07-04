import { cn } from "@/utils/format";

export function Avatar({
  name,
  src,
  size = 40,
  className,
}: {
  name: string;
  src?: string;
  size?: number;
  className?: string;
}) {
  const initials = name
    .split(" ")
    .map((s) => s[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  if (src)
    return (
      <img
        src={src}
        alt={name}
        className={cn("rounded-full object-cover", className)}
        style={{ width: size, height: size }}
      />
    );
  return (
    <div
      className={cn("rounded-full grid place-items-center text-white font-semibold", className)}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.38,
        backgroundImage: "linear-gradient(135deg,#1B2A6B 0%,#5B3FD6 100%)",
      }}
    >
      {initials || "U"}
    </div>
  );
}
