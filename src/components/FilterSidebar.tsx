import { CATEGORIES } from "@/api/mockData";
import { cn } from "@/utils/format";

type Filters = { category?: string; type?: string; remote?: string; level?: string };
type Props = {
  filters: Filters;
  onChange: (next: Filters) => void;
};

const Group = ({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value?: string;
  onChange: (v?: string) => void;
}) => (
  <div>
    <h4 className="text-xs font-semibold uppercase tracking-wider text-[#6B7280] mb-2">{label}</h4>
    <div className="flex flex-col gap-1.5">
      {options.map((opt) => (
        <label key={opt} className="flex items-center gap-2 text-sm text-[#1F2937] cursor-pointer">
          <input
            type="radio"
            name={label}
            checked={value === opt}
            onChange={() => onChange(opt)}
            className="h-4 w-4 accent-[#5B3FD6]"
          />
          {opt}
        </label>
      ))}
      {value && (
        <button
          onClick={() => onChange(undefined)}
          className="text-xs text-[#5B3FD6] hover:underline self-start mt-1"
        >
          Clear
        </button>
      )}
    </div>
  </div>
);

export function FilterSidebar({ filters, onChange }: Props) {
  const set = (patch: Filters) => onChange({ ...filters, ...patch });
  const anyActive = filters.category || filters.type || filters.remote || filters.level;

  return (
    <aside className={cn("surface-card p-5 sticky top-24 space-y-6")}>
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold">Filters</h3>
        {anyActive && (
          <button onClick={() => onChange({})} className="text-sm text-[#5B3FD6] hover:underline">
            Clear all
          </button>
        )}
      </div>
      <Group
        label="Category"
        options={CATEGORIES.map((c) => c.name)}
        value={filters.category}
        onChange={(v) => set({ category: v })}
      />
      <Group
        label="Employment"
        options={["Full-time", "Part-time", "Contract", "Internship"]}
        value={filters.type}
        onChange={(v) => set({ type: v })}
      />
      <Group
        label="Location"
        options={["Remote", "Hybrid", "On-site"]}
        value={filters.remote}
        onChange={(v) => set({ remote: v })}
      />
      <Group
        label="Experience"
        options={["Entry", "Mid", "Senior", "Lead"]}
        value={filters.level}
        onChange={(v) => set({ level: v })}
      />
    </aside>
  );
}
