import { DashboardLayout } from "@/components/DashboardLayout";
import { JobCard } from "@/components/JobCard";
import { EmptyState } from "@/components/EmptyState";
import { LoadingSpinner } from "@/components/loadingSpinners/LoadingSpinner";
import { Button } from "@/components/primitives/Button";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { Bookmark } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { savedJobsQueryOptions } from "@/queries/job.queries";
import { candidateProfileQuery } from "@/queries/candidate.queries";

export function SavedJobsPage() {
  //Get current user data
  const { data: currentUser } = useSuspenseQuery(candidateProfileQuery);
  const user = currentUser?.data ?? null;

  const { data: response, isLoading } = useQuery(savedJobsQueryOptions(user?.id));
  const jobs = response?.data ?? [];

  return (
    <DashboardLayout title="Saved jobs" subtitle="The roles you've kept for later.">
      {isLoading ? (
        <LoadingSpinner />
      ) : jobs.length === 0 ? (
        <EmptyState
          icon={<Bookmark className="h-5 w-5" />}
          title="No saved jobs yet"
          description="Tap the bookmark on any role to save it."
          action={
            <Link to="/jobs">
              <Button>Browse jobs</Button>
            </Link>
          }
        />
      ) : (
        <div className="grid sm:grid-cols-2 gap-3">
          {jobs.map((j: any) => (
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
    </DashboardLayout>
  );
}
