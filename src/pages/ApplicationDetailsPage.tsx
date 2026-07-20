import { DashboardLayout } from "@/components/DashboardLayout";
import { Badge } from "@/components/primitives/Badge";
import { Button } from "@/components/primitives/Button";
import { EmptyState } from "@/components/EmptyState";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { applicationsApi } from "@/api/applicationsApi";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  MapPin,
  Briefcase,
  Clock,
  FileText,
  Mail,
  Phone,
  Linkedin,
  Globe,
} from "lucide-react";
import { formatSalary, timeAgo } from "@/utils/format";
import { useToast } from "@/components/Toast";
import { LoadingSpinner } from "@/components/loadingSpinners/LoadingSpinner";

const TONE: Record<string, any> = {
  Submitted: "info",
  "Under Review": "warning",
  Interview: "brand",
  Offer: "success",
  Rejected: "error",
  Withdrawn: "default",
};
const STEPS = ["Submitted", "Under Review", "Interview", "Offer"] as const;

export function ApplicationDetailsPage() {
  const { id } = useParams({ from: "/applications_/$id" });
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { push } = useToast();

  const { data: app, isLoading } = useQuery({
    queryKey: ["application", id],
    queryFn: () => applicationsApi.getById(id),
  });

  const withdraw = useMutation({
    mutationFn: () => applicationsApi.withdraw(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["applications"] });
      qc.invalidateQueries({ queryKey: ["application", id] });
      push({ tone: "success", title: "Application withdrawn" });
    },
  });

  if (isLoading)
    return (
      <DashboardLayout title="Application">
        <LoadingSpinner />
      </DashboardLayout>
    );
  if (!app)
    return (
      <DashboardLayout title="Application">
        <EmptyState
          title="Application not found"
          action={
            <Link to="/applications">
              <Button>Back to applications</Button>
            </Link>
          }
        />
      </DashboardLayout>
    );

  const currentStepIdx = STEPS.indexOf(app.status as any);
  const p = app.payload;

  return (
    <DashboardLayout title="Application details" subtitle={`Applied ${timeAgo(app.appliedAt)}`}>
      <button
        onClick={() => navigate({ to: "/applications" })}
        className="inline-flex items-center gap-1 text-sm text-[#6B7280] hover:text-[#1F2937] mb-5"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to applications
      </button>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <div className="space-y-6">
          {/* Job summary */}
          <div className="surface-card p-6">
            <div className="flex items-start gap-4">
              <div className="h-14 w-14 rounded-2xl gradient-brand text-white grid place-items-center text-xl font-display font-bold shrink-0">
                {app.job.company[0]}
              </div>
              <div className="flex-1 min-w-0">
                <Link
                  to="/jobs/$id"
                  params={{ id: app.jobId }}
                  className="font-display text-xl font-semibold hover:text-[#5B3FD6]"
                >
                  {app.job.title}
                </Link>
                <p className="text-[#6B7280]">{app.job.company}</p>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[#6B7280]">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    {app.job.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Briefcase className="h-4 w-4" />
                    {app.job.type}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    {timeAgo(app.job.postedAt)}
                  </span>
                </div>
                <p className="mt-3 font-semibold">
                  {formatSalary(app.job.salaryMin, app.job.salaryMax, app.job.currency)}
                </p>
              </div>
              <Badge tone={TONE[app.status]}>{app.status}</Badge>
            </div>
          </div>

          {/* Progress */}
          <div className="surface-card p-6">
            <h3 className="font-display font-semibold mb-4">Progress</h3>
            <ol className="grid grid-cols-4 gap-2">
              {STEPS.map((s, i) => {
                const done =
                  currentStepIdx >= i && app.status !== "Rejected" && app.status !== "Withdrawn";
                const active = i === currentStepIdx;
                return (
                  <li key={s} className="text-center">
                    <div
                      className={`mx-auto h-8 w-8 rounded-full grid place-items-center text-xs font-semibold ${done ? "gradient-brand text-white" : active ? "bg-[#EEF2FF] text-[#5B3FD6] border border-[#5B3FD6]" : "bg-[#F1F5F9] text-[#6B7280]"}`}
                    >
                      {i + 1}
                    </div>
                    <p
                      className={`mt-2 text-xs ${done || active ? "text-[#1F2937]" : "text-[#6B7280]"}`}
                    >
                      {s}
                    </p>
                  </li>
                );
              })}
            </ol>
            {app.nextStep && <p className="mt-4 text-sm text-[#5B3FD6]">Next: {app.nextStep}</p>}
          </div>

          {/* Submitted details */}
          {p && (
            <div className="surface-card p-6">
              <h3 className="font-display font-semibold mb-4">Submitted details</h3>
              <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                <Row label="Full name" value={p.fullName} />
                <Row label="Email" icon={<Mail className="h-3.5 w-3.5" />} value={p.email} />
                {p.phone && (
                  <Row label="Phone" icon={<Phone className="h-3.5 w-3.5" />} value={p.phone} />
                )}
                {p.location && (
                  <Row
                    label="Location"
                    icon={<MapPin className="h-3.5 w-3.5" />}
                    value={p.location}
                  />
                )}
                {p.linkedin && (
                  <Row
                    label="LinkedIn"
                    icon={<Linkedin className="h-3.5 w-3.5" />}
                    value={p.linkedin}
                  />
                )}
                {p.portfolio && (
                  <Row
                    label="Portfolio"
                    icon={<Globe className="h-3.5 w-3.5" />}
                    value={p.portfolio}
                  />
                )}
              </dl>
              {p.resumeName && (
                <div className="mt-5 flex items-center gap-3 rounded-[10px] border border-[#E5E7EB] bg-[#F8FAFC] px-4 py-3">
                  <div className="h-9 w-9 rounded-lg gradient-brand text-white grid place-items-center">
                    <FileText className="h-4 w-4" />
                  </div>
                  <p className="text-sm font-medium">{p.resumeName}</p>
                </div>
              )}
              {p.coverLetter && (
                <div className="mt-5">
                  <p className="text-xs uppercase tracking-wider text-[#6B7280] mb-1.5">
                    Cover letter
                  </p>
                  <p className="text-sm whitespace-pre-wrap text-[#1F2937] leading-relaxed">
                    {p.coverLetter}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <aside className="space-y-4">
          <div className="surface-card p-5">
            <h3 className="font-display font-semibold mb-3">Timeline</h3>
            <ul className="text-sm space-y-3">
              <li className="flex justify-between">
                <span className="text-[#6B7280]">Applied</span>
                <span>{timeAgo(app.appliedAt)}</span>
              </li>
              {app.interviewAt && (
                <li className="flex justify-between">
                  <span className="text-[#6B7280]">Interview</span>
                  <span>{new Date(app.interviewAt).toLocaleDateString()}</span>
                </li>
              )}
              <li className="flex justify-between">
                <span className="text-[#6B7280]">Status</span>
                <Badge tone={TONE[app.status]}>{app.status}</Badge>
              </li>
            </ul>
          </div>

          <div className="surface-card p-5 space-y-2">
            <Link to="/jobs/$id" params={{ id: app.jobId }} className="block">
              <Button variant="outline" className="w-full">
                View job posting
              </Button>
            </Link>
            {!["Withdrawn", "Rejected"].includes(app.status) && (
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => withdraw.mutate()}
                loading={withdraw.isPending}
              >
                Withdraw application
              </Button>
            )}
          </div>
        </aside>
      </div>
    </DashboardLayout>
  );
}

function Row({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wider text-[#6B7280] mb-0.5 inline-flex items-center gap-1">
        {icon}
        {label}
      </dt>
      <dd className="text-[#1F2937] break-words">{value}</dd>
    </div>
  );
}
