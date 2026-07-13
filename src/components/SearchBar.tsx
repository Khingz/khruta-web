import { useState, type FormEvent } from "react";
import { Search, MapPin, X } from "lucide-react";
import { Button } from "./primitives/Button";
import { useNavigate } from "@tanstack/react-router";

export function SearchBar({
  initialQ = "",
  initialLocation = "",
  variant = "hero",
}: {
  initialQ?: string;
  initialLocation?: string;
  variant?: "hero" | "compact";
}) {
  const [q, setQ] = useState(initialQ);
  const [loc, setLoc] = useState(initialLocation);
  const navigate = useNavigate();

  function submit(e: FormEvent) {
    e.preventDefault();
    navigate({ to: "/jobs", search: { q: q || undefined, location: loc || undefined } as any });
  }

  const isHero = variant === "hero";
  return (
    <form
      onSubmit={submit}
      className={
        isHero
          ? "w-full bg-white rounded-2xl border border-[#E5E7EB] shadow-lift p-2 flex flex-col md:flex-row gap-2 items-stretch"
          : "w-full bg-white rounded-xl border border-[#E5E7EB] shadow-soft p-1.5 flex gap-1.5 items-stretch"
      }
    >
      <div className="flex-1 flex items-center gap-2 px-3">
        <Search className="h-5 w-5 text-[#6B7280] shrink-0" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Job title, company, or skill"
          className="w-full h-11 bg-transparent outline-none text-[15px] placeholder:text-[#9CA3AF]"
        />
        {q && (
          <button
            type="button"
            onClick={() => setQ("")}
            className="shrink-0 text-[#9CA3AF] hover:text-[#6B7280] rounded-full p-0.5"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      <div className="hidden md:block w-px bg-[#E5E7EB]" />
      <div className="flex-1 flex items-center gap-2 px-3">
        <MapPin className="h-5 w-5 text-[#6B7280] shrink-0" />
        <input
          value={loc}
          onChange={(e) => setLoc(e.target.value)}
          placeholder="Location or 'Remote'"
          className="w-full h-11 bg-transparent outline-none text-[15px] placeholder:text-[#9CA3AF]"
        />
        {loc && (
          <button
            type="button"
            onClick={() => setLoc("")}
            className="shrink-0 text-[#9CA3AF] hover:text-[#6B7280] rounded-full p-0.5"
            aria-label="Clear location"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      <Button type="submit" size={isHero ? "lg" : "md"} className="shrink-0">
        Search jobs
      </Button>
    </form>
  );
}
