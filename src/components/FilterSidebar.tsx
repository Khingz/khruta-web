import { cn } from "@/utils/format";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

type Filters = { department?: string; type?: string; experience?: string };
type Props = {
  filters: Filters;
  onChange: (next: Filters) => void;
  isFilterLoading: boolean;
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

export function FilterSidebar({ filters, onChange, isFilterLoading }: Props) {
  const [draft, setDraft] = useState<Filters>(filters);
  const set = (patch: Filters) => setDraft((prev) => ({ ...prev, ...patch }));
  const anyDraftActive = draft.department || draft.type || draft.experience;

  const [isApplying, setIsApplying] = useState(false); // optimistic local flag (Bridge round trip delay for isLoading)

  useEffect(() => {
    setDraft(filters);
  }, [filters]);

  useEffect(() => {
    if (!isFilterLoading) {
      setIsApplying(false);
    }
  }, [filters, isFilterLoading]);

  const showLoading = isApplying || isFilterLoading;

  // Has the user changed anything since the last applied filters?
  const isDirty = JSON.stringify(draft) !== JSON.stringify(filters);

  const handleApply = () => {
    setIsApplying(true);
    onChange(draft);
  };

  const handleClearAll = () => {
    setIsApplying(true);
    setDraft({});
    onChange({});
  };

  return (
    <aside className={cn("surface-card p-5 sticky top-24 space-y-6")}>
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold">Filters</h3>
        {anyDraftActive && (
          <button
            onClick={handleClearAll}
            disabled={showLoading}
            className="text-sm text-[#5B3FD6] hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Clear all
          </button>
        )}
      </div>

      <fieldset disabled={showLoading} className="space-y-6">
        <Group
          label="Category"
          options={[
            "Engineering",
            "Design",
            "Product",
            "Data & AI",
            "Marketing",
            "Sales",
            "Human Resource",
            "Operations",
            "Finance",
          ]}
          value={draft.department}
          onChange={(v) => set({ department: v })}
        />
        <Group
          label="Employment"
          options={["Full-time", "Part-Time", "Contract", "Internship"]}
          value={draft.type}
          onChange={(v) => set({ type: v })}
        />
        <Group
          label="Experience"
          options={["Entry", "Mid", "Senior", "Lead"]}
          value={draft.experience}
          onChange={(v) => set({ experience: v })}
        />
      </fieldset>

      <button
        onClick={handleApply}
        disabled={!isDirty || showLoading}
        className={cn(
          "w-full rounded-md py-2 text-sm font-semibold transition-colors flex items-center justify-center gap-2",
          isDirty && !showLoading
            ? "bg-[#5B3FD6] text-white hover:bg-[#4C32B8] cursor-pointer"
            : "bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed",
        )}
      >
        {showLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Applying...
          </>
        ) : (
          "Apply Filters"
        )}
      </button>
    </aside>
  );
}
