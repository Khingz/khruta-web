import { DashboardLayout } from "@/components/DashboardLayout";
import { JobCard } from "@/components/JobCard";
import { NotificationCard } from "@/components/NotificationCard";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { applicationsApi } from "@/api/applicationsApi";
import { offersApi } from "@/api/offersApi";
import { notificationsApi } from "@/api/notificationsApi";
import { jobsApi } from "@/api/jobsApi";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/primitives/Badge";
import { formatDateTime, timeAgo } from "@/utils/format";
import { dashboardItems, items, STATUS_TONE } from "@/utils/dashboardUtils";
import { candidateProfileQuery } from "@/queries/candidate.queries";
import { appsQueryOptions } from "@/queries/application.queries";
import { LoadingSpinner } from "@/components/loadingSpinners/LoadingSpinner";

export function DashboardPage() {
  //Get current user data
  const { data: currentUser } = useSuspenseQuery(candidateProfileQuery);
  const user = currentUser?.data ?? null;

  //application
  const { data: response, isLoading: appsLoading } = useQuery(
    appsQueryOptions({ candidateId: user?.id }),
  );
  const apps = response?.data?.items ?? null;

  const { data: savedIds = [] } = useQuery({
    queryKey: ["savedIds"],
    queryFn: () => jobsApi.getSavedIds(),
    staleTime: 0,
  });
  const { data: offers = [] } = useQuery({ queryKey: ["offers"], queryFn: () => offersApi.list() });
  const { data: notes = [] } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => notificationsApi.list(),
  });
  const { data: recommended = [] } = useQuery({
    queryKey: ["recommended"],
    queryFn: () => jobsApi.recommended(),
  });

  // const active = apps.filter((a: any) => !["Rejected", "Withdrawn"].includes(a.status));
  // const interviews = apps.filter((a: any) => a.status === "Interview" && a.interviewAt);

  if (appsLoading) {
    return (
      <DashboardLayout>
        <LoadingSpinner size={16} label="Loading..." />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title={`Welcome back, ${user?.fullname?.split(" ")[0] ?? ""}`}
      subtitle="Here's the state of your job search today."
    >
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
        {dashboardItems.map((stat, i) => (
          <Link
            key={stat.label}
            to={stat.to}
            className="surface-card p-4 hover:shadow-lift hover:border-[#C7D2FE] transition-all"
          >
            <span className="h-9 w-9 grid place-items-center rounded-lg bg-[#EEF0FB] text-[#5B3FD6]">
              <stat.icon className="h-4 w-4" />
            </span>
            <p className="mt-3 font-display text-2xl font-bold">{stat.getValue(apps) ?? 0}</p>
            <p className="text-xs text-[#6B7280] mt-0.5">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <section className="surface-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-semibold">Recent applications</h2>
              <Link
                to="/applications"
                search={{ q: "engineer", candidateId: user?.Id }}
                className="text-sm text-[#5B3FD6] hover:underline inline-flex items-center gap-1"
              >
                All <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            {apps == null ? (
              <p className="text-sm text-[#6B7280] py-4">
                No applications yet.{" "}
                <Link to="/jobs" className="text-[#5B3FD6] hover:underline">
                  Browse jobs
                </Link>
                .
              </p>
            ) : (
              <ul className="divide-y divide-[#F1F5F9]">
                {apps.slice(0, 5).map((a: any) => (
                  <li key={a.id} className="py-3 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg gradient-brand text-white grid place-items-center font-bold shrink-0">
                      {a.company.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link
                        to="/jobs/$id"
                        params={{ id: a.jobId }}
                        className="font-medium hover:text-[#5B3FD6] truncate block"
                      >
                        {a.jobTitle}
                      </Link>
                      <p className="text-xs text-[#6B7280] truncate">
                        {a.company} · Applied {timeAgo(a.dateApplied)}
                      </p>
                    </div>
                    <Badge tone={STATUS_TONE[a.stage]}>{a.stage}</Badge>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* <section className="surface-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-semibold">Recommended for you</h2>
              <Link
                to="/jobs"
                className="text-sm text-[#5B3FD6] hover:underline inline-flex items-center gap-1"
              >
                More <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {recommended.slice(0, 4).map((j) => (
                <JobCard key={j.id} job={j} compact />
              ))}
            </div>
          </section> */}
        </div>

        {/* <div className="space-y-6">
          <section className="surface-card p-6">
            <h2 className="font-display text-lg font-semibold mb-4">Upcoming interviews</h2>
            {interviews.length === 0 ? (
              <p className="text-sm text-[#6B7280]">No interviews scheduled.</p>
            ) : (
              <ul className="space-y-3">
                {interviews.map((a: any) => (
                  <li key={a.id} className="p-3 rounded-lg bg-[#F8F7FF] border border-[#E0E7FF]">
                    <p className="text-sm font-medium">{a.job.title}</p>
                    <p className="text-xs text-[#6B7280]">{a.job.company}</p>
                    <p className="text-xs mt-1.5 text-[#5B3FD6] font-medium">
                      {formatDateTime(a.interviewAt!)}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div> */}
      </div>
    </DashboardLayout>
  );
}
