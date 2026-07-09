import { DashboardLayout } from "@/components/DashboardLayout";
import { JobCard } from "@/components/JobCard";
import { EmptyState } from "@/components/EmptyState";
import { LoadingSpinner } from "@/components/loadingSpinners/LoadingSpinner";
import { Button } from "@/components/primitives/Button";
import { useQuery } from "@tanstack/react-query";
import { jobsApi } from "@/api/jobsApi";
import { Bookmark } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function SavedJobsPage() {
  const { data = [], isLoading } = useQuery({
    queryKey: ["savedJobs"],
    queryFn: () => jobsApi.listSaved(),
  });
  return (
    <DashboardLayout title="Saved jobs" subtitle="The roles you've kept for later.">
      {isLoading ? (
        <LoadingSpinner />
      ) : data.length === 0 ? (
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
          {data.map((j) => (
            <JobCard key={j.id} job={j} />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
