import { Link } from "@tanstack/react-router";
import { Bookmark, MapPin, Briefcase, Clock } from "lucide-react";
import type { Job } from "@/types";
import { formatSalary, timeAgo, cn } from "@/utils/format";
import { Badge } from "./primitives/Badge";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { savedJobsQueryOptions } from "@/queries/job.queries";
import { candidateProfileQuery } from "@/queries/candidate.queries";
import { savedJobToggle } from "@/server/jobs/jobs.functions";

export function JobCard({ job, compact = false }: { job: Job; compact?: boolean }) {
  const qc = useQueryClient();
  const { data: currentUser } = useQuery(candidateProfileQuery);
  const user = currentUser?.data ?? null;

  const { data: savedJob, isLoading } = useQuery(savedJobsQueryOptions(user?.id));

  const isSaved = savedJob?.data.some((obj: any) => obj.Id === job.id);

  const toggle = useMutation({
    mutationFn: () =>
      savedJobToggle({
        data: { jobOpeningId: job.id, candidateId: user?.id },
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["savedJobs", user?.id] });
    },
  });

  return (
    <Link
      to="/jobs/$id"
      params={{ id: job.id }}
      className={cn(
        "group block surface-card p-5 hover:shadow-lift hover:border-[#C7D2FE] transition-all duration-300 ease-out hover:scale-103 hover:shadow-lg",
        compact && "p-4",
      )}
    >
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-xl gradient-brand text-white grid place-items-center font-display font-bold shrink-0">
          {job.company[0]}
        </div>
        <div className="flex-1 min-w-0">
          {/* Grid instead of flex so the button never gets squeezed */}
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
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
              aria-label={isSaved ? "Unsave job" : "Save job"}
              className={cn(
                "h-9 w-9 shrink-0 grid place-items-center rounded-lg border transition-colors",
                isSaved
                  ? "border-[#5B3FD6] bg-[#EEF0FB] text-[#5B3FD6]"
                  : "border-[#E5E7EB] text-[#6B7280] hover:text-[#5B3FD6] hover:border-[#C7D2FE]",
              )}
            >
              <Bookmark className={cn("h-4 w-4", isSaved && "fill-current")} />
            </button>
          </div>

          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-[#6B7280]">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              {job.location}
            </span>
            <span className="inline-flex items-center gap-1">
              <Briefcase className="h-3.5 w-3.5 shrink-0" />
              {job.type}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 shrink-0" />
              {timeAgo(job.postedAt)}
            </span>
          </div>

          {!compact && (
            <div className="mt-3 flex justify-end">
              <span className="text-sm font-medium text-[#1F2937] break-words">
                {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
