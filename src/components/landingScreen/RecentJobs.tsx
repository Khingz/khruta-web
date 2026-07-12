import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { JobCard } from "../JobCard";
import { RecentJobsSkeleton } from "../loadingSpinners/RecentJobSkeleton";

export const RecentJobs = ({ recentJobs, isLoading }: any) => {
  return (
    <div>
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold">Most Recent Opportunities</h2>
          <p className="text-[#6B7280] mt-1">Fresh opportunities, added to the board regularly.</p>
        </div>
        <Link
          to="/jobs"
          className="text-sm font-medium text-[#5B3FD6] hover:underline inline-flex items-center gap-1"
        >
          View all <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      {isLoading ? (
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
                }}
              />
            ))}
        </div>
      )}
    </div>
  );
};
