import { DashboardLayout } from "@/components/DashboardLayout";
import { Badge } from "@/components/primitives/Badge";
import { Button } from "@/components/primitives/Button";
import { EmptyState } from "@/components/EmptyState";
import { LoadingSpinner } from "@/components/loadingSpinners/LoadingSpinner";
import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { applicationsApi } from "@/api/applicationsApi";
import { Link } from "@tanstack/react-router";
import { Briefcase } from "lucide-react";
import { timeAgo } from "@/utils/format";
import { useState } from "react";
import { useToast } from "@/components/Toast";
import { STATUS_TONE, STATUSES } from "@/utils/dashboardUtils";
import { candidateProfileQuery } from "@/queries/candidate.queries";
import { appsQueryOptions } from "@/queries/application.queries";
import { Route } from "@/routes/applications";

export function ApplicationsPage() {
  const qc = useQueryClient();
  const { push } = useToast();
  const [filter, setFilter] = useState<(typeof STATUSES)[number]>("All");
  const { candidateId } = Route.useRouteContext();

  //application
  const { data: response, isLoading } = useQuery(
    appsQueryOptions({ candidateId, stage: filter === "All" ? undefined : filter }),
  );
  const data = response?.data?.items ?? [];

  const handleFilter = (key: (typeof STATUSES)[number]) => {
    setFilter(key);
  };

  return (
    <DashboardLayout title="My applications" subtitle="Track every application in one place.">
      <div className="flex flex-wrap gap-2 mb-4">
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => handleFilter(s)}
            className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${filter === s ? "gradient-brand text-white border-transparent" : "bg-white border-[#E5E7EB] text-[#1F2937] hover:bg-[#F8FAFC]"}`}
          >
            {s}
          </button>
        ))}
      </div>
      {isLoading ? (
        <LoadingSpinner />
      ) : data?.length === 0 ? (
        <EmptyState
          icon={<Briefcase className="h-5 w-5" />}
          title="No applications"
          description="When you apply, they'll show up here."
          action={
            <Link to="/jobs">
              <Button>Browse jobs</Button>
            </Link>
          }
        />
      ) : (
        <div className="surface-card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#F8FAFC] text-left text-xs uppercase tracking-wider text-[#6B7280]">
              <tr>
                <th className="px-5 py-3">Role</th>
                <th className="px-5 py-3 hidden sm:table-cell">Applied</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {data?.map((a: any) => (
                <tr key={a.id} className="hover:bg-[#F8FAFC]">
                  <td className="px-5 py-4">
                    <Link
                      to="/jobs/$id"
                      params={{ id: a.jobId }}
                      className="font-medium hover:text-[#5B3FD6]"
                    >
                      {a.jobTitle}
                    </Link>
                    <p className="text-xs text-[#6B7280]">
                      {a.company} · {a.jobLocation}
                    </p>
                    {a.nextStep && (
                      <p className="text-xs mt-1 text-[#5B3FD6]">Next: {a.nextStep}</p>
                    )}
                  </td>
                  <td className="px-5 py-4 hidden sm:table-cell text-[#6B7280]">
                    {timeAgo(a.dateApplied)}
                  </td>
                  <td className="px-5 py-4">
                    <Badge tone={STATUS_TONE[a.stage]}>{a.stage}</Badge>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="inline-flex gap-1">
                      <Link to="/applications/$id" params={{ id: a.id }}>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  );
}
