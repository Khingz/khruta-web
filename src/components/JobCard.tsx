import { Link } from "@tanstack/react-router";
import { Bookmark, MapPin, Briefcase, Clock } from "lucide-react";
import type { Job, JobCompact } from "@/types";
import { formatSalary, timeAgo, cn } from "@/utils/format";
import { Badge } from "./primitives/Badge";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { jobsApi } from "@/api/jobsApi";

export function JobCard({ job, compact = false }: { job: JobCompact; compact?: boolean }) {
  const qc = useQueryClient();
  const { data: savedIds = [] } = useQuery({
    queryKey: ["savedIds"],
    queryFn: () => jobsApi.getSavedIds(),
    staleTime: 0,
  });
  const saved = savedIds.includes(job.id);
  const toggle = useMutation({
    mutationFn: () => jobsApi.toggleSave(job.id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["savedIds"] });
      qc.invalidateQueries({ queryKey: ["savedJobs"] });
    },
  });

  return (
    <Link
      to="/jobs/$id"
      params={{ id: job.id }}
      className={cn(
        "group block surface-card p-5 hover:shadow-lift hover:border-[#C7D2FE] transition-all",
        compact && "p-4",
      )}
    >
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-xl gradient-brand text-white grid place-items-center font-display font-bold shrink-0">
          {job.company[0]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="font-display font-semibold text-[#1F2937] group-hover:text-[#1B2A6B] truncate">
                {job.title}
              </h3>
              <p className="text-sm text-[#6B7280] mt-0.5 truncate">{job.company}</p>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggle.mutate();
              }}
              aria-label={saved ? "Unsave job" : "Save job"}
              className={cn(
                "h-9 w-9 grid place-items-center rounded-lg border transition-colors",
                saved
                  ? "border-[#5B3FD6] bg-[#EEF0FB] text-[#5B3FD6]"
                  : "border-[#E5E7EB] text-[#6B7280] hover:text-[#5B3FD6] hover:border-[#C7D2FE]",
              )}
            >
              <Bookmark className={cn("h-4 w-4", saved && "fill-current")} />
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-[#6B7280]">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {job.location}
            </span>
            <span className="inline-flex items-center gap-1">
              <Briefcase className="h-3.5 w-3.5" />
              {job.type}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {timeAgo(job.postedAt)}
            </span>
          </div>
          {!compact && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="ml-auto text-sm font-medium text-[#1F2937]">
                {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
