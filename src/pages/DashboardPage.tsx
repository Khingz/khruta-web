import { DashboardLayout } from "@/components/DashboardLayout";
import { JobCard } from "@/components/JobCard";
import { NotificationCard } from "@/components/NotificationCard";
import { useQuery } from "@tanstack/react-query";
import { applicationsApi } from "@/api/applicationsApi";
import { offersApi } from "@/api/offersApi";
import { notificationsApi } from "@/api/notificationsApi";
import { jobsApi } from "@/api/jobsApi";
import { Link } from "@tanstack/react-router";
import { Briefcase, Bookmark, Activity, CalendarCheck, Gift, ArrowRight } from "lucide-react";
import { Badge } from "@/components/primitives/Badge";
import { useAuth } from "@/contexts/AuthContext";
import { formatDateTime, timeAgo } from "@/utils/format";
import { menuItems } from "@/utils/navUtils";

const STATUS_TONE: Record<string, any> = {
  Submitted: "info",
  "Under Review": "warning",
  Interview: "brand",
  Offer: "success",
  Rejected: "error",
  Withdrawn: "default",
};

export function DashboardPage() {
  const { user } = useAuth();
  const { data: apps = [] } = useQuery({
    queryKey: ["applications"],
    queryFn: () => applicationsApi.list(),
  });
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

  const active = apps.filter((a) => !["Rejected", "Withdrawn"].includes(a.status));
  const interviews = apps.filter((a) => a.status === "Interview" && a.interviewAt);

  return (
    <DashboardLayout
      title={`Welcome back, ${user?.firstName ?? ""}`}
      subtitle="Here's the state of your search today."
    >
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
        {menuItems.map((s, i) => (
          <Link
            key={s.label}
            to={s.to as any}
            className="surface-card p-4 hover:shadow-lift hover:border-[#C7D2FE] transition-all"
          >
            <span className="h-9 w-9 grid place-items-center rounded-lg bg-[#EEF0FB] text-[#5B3FD6]">
              <s.icon className="h-4 w-4" />
            </span>
            <p className="mt-3 font-display text-2xl font-bold">{2 + i}</p>
            <p className="text-xs text-[#6B7280] mt-0.5">{s.label}</p>
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
                className="text-sm text-[#5B3FD6] hover:underline inline-flex items-center gap-1"
              >
                All <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            {apps.length === 0 ? (
              <p className="text-sm text-[#6B7280] py-4">
                No applications yet.{" "}
                <Link to="/jobs" className="text-[#5B3FD6] hover:underline">
                  Browse jobs
                </Link>
                .
              </p>
            ) : (
              <ul className="divide-y divide-[#F1F5F9]">
                {apps.slice(0, 5).map((a) => (
                  <li key={a.id} className="py-3 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg gradient-brand text-white grid place-items-center font-bold shrink-0">
                      {a.job.company[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link
                        to="/jobs/$id"
                        params={{ id: a.jobId }}
                        className="font-medium hover:text-[#5B3FD6] truncate block"
                      >
                        {a.job.title}
                      </Link>
                      <p className="text-xs text-[#6B7280] truncate">
                        {a.job.company} · Applied {timeAgo(a.appliedAt)}
                      </p>
                    </div>
                    <Badge tone={STATUS_TONE[a.status]}>{a.status}</Badge>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="surface-card p-6">
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
          </section>
        </div>

        <div className="space-y-6">
          <section className="surface-card p-6">
            <h2 className="font-display text-lg font-semibold mb-4">Upcoming interviews</h2>
            {interviews.length === 0 ? (
              <p className="text-sm text-[#6B7280]">No interviews scheduled.</p>
            ) : (
              <ul className="space-y-3">
                {interviews.map((a) => (
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

          <section className="surface-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg font-semibold">Latest notifications</h2>
              <Link to="/notifications" className="text-sm text-[#5B3FD6] hover:underline">
                All
              </Link>
            </div>
            <div className="space-y-2">
              {notes.slice(0, 3).map((n) => (
                <NotificationCard key={n.id} n={n} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
}
