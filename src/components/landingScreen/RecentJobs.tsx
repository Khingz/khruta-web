import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { JobCard } from "../JobCard";
import { RecentJobsSkeleton } from "../loadingSpinners/RecentJobSkeleton";
import { useInView } from "@/hooks/use-inview";

export const RecentJobs = ({ recentJobs, isLoading }: any) => {
  const { ref, isInView } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
        <div className="min-w-0">
          <h2 className="font-display text-2xl sm:text-3xl font-bold">Most Recent Opportunities</h2>
          <p className="text-[#6B7280] mt-1">Fresh opportunities, added to the board regularly.</p>
        </div>
        <Link
          to="/jobs"
          className="text-sm font-medium text-[#5B3FD6] hover:underline inline-flex items-center gap-1 shrink-0"
        >
          View all <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      {isLoading && !recentJobs ? (
        <RecentJobsSkeleton />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentJobs &&
            recentJobs.map((j: any) => (
              <JobCard
                key={j.Id}
                job={{
                  id: j.Id,
                  title: j.Title,
                  company: j.CompanyName,
                  location: j.Location,
                  type: j.Type,
                  postedAt: j.OpenDate,
                  salaryMin: j.MinOffer,
                  salaryMax: j.MaxOffer,
                  currency: "USD",
                  description: j.Description,
                  responsibilities: j.Responsibilities,
                  requirements: j.Requirements,
                  benefits: j.Benefits,
                  skills: j.Skills,
                }}
              />
            ))}
        </div>
      )}
    </div>
  );
};
