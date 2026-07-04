import { DashboardLayout } from "@/components/DashboardLayout";
import { Badge } from "@/components/primitives/Badge";
import { Button } from "@/components/primitives/Button";
import { EmptyState } from "@/components/EmptyState";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { applicationsApi } from "@/api/applicationsApi";
import { Link } from "@tanstack/react-router";
import { Briefcase } from "lucide-react";
import { timeAgo } from "@/utils/format";
import { useState } from "react";
import { useToast } from "@/components/Toast";

const STATUSES = [
  "All",
  "Submitted",
  "Under Review",
  "Interview",
  "Offer",
  "Rejected",
  "Withdrawn",
] as const;
const TONE: Record<string, any> = {
  Submitted: "info",
  "Under Review": "warning",
  Interview: "brand",
  Offer: "success",
  Rejected: "error",
  Withdrawn: "default",
};

export function ApplicationsPage() {
  const qc = useQueryClient();
  const { push } = useToast();
  const { data = [], isLoading } = useQuery({
    queryKey: ["applications"],
    queryFn: () => applicationsApi.list(),
  });
  const [filter, setFilter] = useState<(typeof STATUSES)[number]>("All");
  const withdraw = useMutation({
    mutationFn: (id: string) => applicationsApi.withdraw(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["applications"] });
      push({ tone: "success", title: "Application withdrawn" });
    },
  });

  const filtered = filter === "All" ? data : data.filter((a) => a.status === filter);

  return (
    <DashboardLayout title="My applications" subtitle="Track every application in one place.">
      <div className="flex flex-wrap gap-2 mb-4">
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${filter === s ? "gradient-brand text-white border-transparent" : "bg-white border-[#E5E7EB] text-[#1F2937] hover:bg-[#F8FAFC]"}`}
          >
            {s}
            {s !== "All" && (
              <span className="ml-1.5 opacity-70">{data.filter((a) => a.status === s).length}</span>
            )}
          </button>
        ))}
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : filtered.length === 0 ? (
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
              {filtered.map((a) => (
                <tr key={a.id} className="hover:bg-[#F8FAFC]">
                  <td className="px-5 py-4">
                    <Link
                      to="/jobs/$id"
                      params={{ id: a.jobId }}
                      className="font-medium hover:text-[#5B3FD6]"
                    >
                      {a.job.title}
                    </Link>
                    <p className="text-xs text-[#6B7280]">
                      {a.job.company} · {a.job.location}
                    </p>
                    {a.nextStep && (
                      <p className="text-xs mt-1 text-[#5B3FD6]">Next: {a.nextStep}</p>
                    )}
                  </td>
                  <td className="px-5 py-4 hidden sm:table-cell text-[#6B7280]">
                    {timeAgo(a.appliedAt)}
                  </td>
                  <td className="px-5 py-4">
                    <Badge tone={TONE[a.status]}>{a.status}</Badge>
                  </td>
                  <td className="px-5 py-4 text-right">
                    {!["Withdrawn", "Rejected"].includes(a.status) && (
                      <Button size="sm" variant="ghost" onClick={() => withdraw.mutate(a.id)}>
                        Withdraw
                      </Button>
                    )}
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
