import { PublicLayout } from "@/components/PublicLayout";
import { Button } from "@/components/primitives/Button";
import { Badge } from "@/components/primitives/Badge";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { EmptyState } from "@/components/EmptyState";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { jobsApi } from "@/api/jobsApi";
import { applicationsApi } from "@/api/applicationsApi";
import { useParams, Link, useNavigate } from "@tanstack/react-router";
import { formatSalary, timeAgo } from "@/utils/format";
import { MapPin, Briefcase, Clock, Bookmark, Share2, Check, ArrowLeft } from "lucide-react";
import { useToast } from "@/components/Toast";
import { useAuth } from "@/contexts/AuthContext";

export function JobDetailsPage() {
  const { id } = useParams({ from: "/jobs/$id" });
  const { data: job, isLoading } = useQuery({
    queryKey: ["job", id],
    queryFn: () => jobsApi.getById(id),
  });
  const { data: savedIds = [] } = useQuery({
    queryKey: ["savedIds"],
    queryFn: () => jobsApi.getSavedIds(),
    staleTime: 0,
  });
  const qc = useQueryClient();
  const { push } = useToast();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const toggleSave = useMutation({
    mutationFn: () => jobsApi.toggleSave(id),
    onSuccess: (r) => {
      qc.invalidateQueries({ queryKey: ["savedIds"] });
      push({ tone: "success", title: r.saved ? "Saved to your list" : "Removed from saved" });
    },
  });

  const apply = useMutation({
    mutationFn: () => applicationsApi.apply(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["applications"] });
      push({
        tone: "success",
        title: "Application submitted",
        description: "Track its progress in your dashboard.",
      });
      navigate({ to: "/applications" });
    },
    onError: (e: any) => push({ tone: "error", title: "Could not apply", description: e?.message }),
  });

  if (isLoading)
    return (
      <PublicLayout>
        <div className="py-24">
          <LoadingSpinner label="Loading job…" />
        </div>
      </PublicLayout>
    );
  if (!job)
    return (
      <PublicLayout>
        <EmptyState
          title="Job not found"
          description="This role may have been removed."
          action={
            <Link to="/jobs">
              <Button>Browse jobs</Button>
            </Link>
          }
        />
      </PublicLayout>
    );

  const saved = savedIds.includes(job.id);
  const onApply = () =>
    isAuthenticated
      ? apply.mutate()
      : navigate({ to: "/login", search: { redirect: `/jobs/${id}` } as any });

  return (
    <PublicLayout>
      <div className="bg-[#F8FAFC] border-b border-[#E5E7EB]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <Link
            to="/jobs"
            className="inline-flex items-center gap-1 text-sm text-[#6B7280] hover:text-[#1F2937] mb-5"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to jobs
          </Link>
          <div className="flex items-start gap-5">
            <div className="h-16 w-16 rounded-2xl gradient-brand text-white grid place-items-center text-2xl font-display font-bold shrink-0">
              {job.company[0]}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="font-display text-2xl sm:text-3xl font-bold">{job.title}</h1>
              <p className="text-[#6B7280] mt-1">{job.company}</p>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#6B7280]">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  {job.location}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Briefcase className="h-4 w-4" />
                  {job.type}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {timeAgo(job.postedAt)}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Badge tone="brand">{job.remote}</Badge>
                <Badge>{job.experienceLevel}</Badge>
                <Badge>{job.category}</Badge>
                <span className="ml-auto font-semibold">
                  {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <Button
              size="lg"
              onClick={onApply}
              loading={apply.isPending}
              leftIcon={<Check className="h-4 w-4" />}
            >
              Apply now
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => toggleSave.mutate()}
              leftIcon={<Bookmark className={saved ? "h-4 w-4 fill-current" : "h-4 w-4"} />}
            >
              {saved ? "Saved" : "Save"}
            </Button>
            <Button
              size="lg"
              variant="ghost"
              leftIcon={<Share2 className="h-4 w-4" />}
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                push({ tone: "success", title: "Link copied" });
              }}
            >
              Share
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 grid lg:grid-cols-[1fr_280px] gap-10">
        <article className="space-y-8">
          <section>
            <h2 className="font-display text-xl font-semibold mb-2">About the role</h2>
            <p className="text-[#1F2937] leading-relaxed">{job.description}</p>
          </section>
          <section>
            <h2 className="font-display text-xl font-semibold mb-3">Responsibilities</h2>
            <ul className="space-y-2">
              {job.responsibilities.map((r) => (
                <li key={r} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full gradient-brand shrink-0" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="font-display text-xl font-semibold mb-3">What we're looking for</h2>
            <ul className="space-y-2">
              {job.requirements.map((r) => (
                <li key={r} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full gradient-brand shrink-0" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="font-display text-xl font-semibold mb-3">Benefits</h2>
            <ul className="space-y-2">
              {job.benefits.map((r) => (
                <li key={r} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full gradient-brand shrink-0" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </section>
        </article>
        <aside className="space-y-4">
          <div className="surface-card p-5">
            <h3 className="font-display font-semibold mb-3">Skills</h3>
            <div className="flex flex-wrap gap-1.5">
              {job.skills.map((s) => (
                <Badge key={s} tone="brand">
                  {s}
                </Badge>
              ))}
            </div>
          </div>
          <div className="surface-card p-5">
            <h3 className="font-display font-semibold mb-3">Job details</h3>
            <dl className="text-sm space-y-2">
              <div className="flex justify-between">
                <dt className="text-[#6B7280]">Type</dt>
                <dd>{job.type}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[#6B7280]">Location</dt>
                <dd>{job.remote}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[#6B7280]">Experience</dt>
                <dd>{job.experienceLevel}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[#6B7280]">Posted</dt>
                <dd>{timeAgo(job.postedAt)}</dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </PublicLayout>
  );
}
