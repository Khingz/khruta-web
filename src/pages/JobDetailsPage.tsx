import { PublicLayout } from "@/components/PublicLayout";
import { Button } from "@/components/primitives/Button";
import { Badge } from "@/components/primitives/Badge";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, Link, useNavigate, Outlet } from "@tanstack/react-router";
import { formatSalary, timeAgo } from "@/utils/format";
import { MapPin, Briefcase, Clock, Bookmark, Share2, Check, ArrowLeft } from "lucide-react";
import { useToast } from "@/components/Toast";
import { JobDetailSkeleton } from "@/components/loadingSpinners/JobDetailSkeleton";
import { jobQueryOptions, savedJobsQueryOptions } from "@/queries/job.queries";
import { useAuth } from "@clerk/tanstack-react-start";
import { candidateProfileQuery } from "@/queries/candidate.queries";
import { savedJobToggle } from "@/server/jobs/jobs.functions";

export function JobDetailsPage() {
  const qc = useQueryClient();
  const { id } = useParams({ from: "/jobs/$id" });
  const { data: response, isLoading } = useQuery(jobQueryOptions(id));
  const job = response.data || [];
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  const { push } = useToast();

  // candidate profile
  const { data: currentUser } = useQuery(candidateProfileQuery);
  const user = currentUser?.data ?? null;

  // saved job
  const { data: savedJob } = useQuery(savedJobsQueryOptions(user?.id));
  const isSaved = savedJob?.data.some((obj: any) => obj.Id === job.Id);

  // Toggle saved job
  const toggleSaved = useMutation({
    mutationFn: () =>
      savedJobToggle({
        data: { jobOpeningId: job.Id, candidateId: user?.id },
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["savedJobs", user?.id] });
    },
  });

  const onApply = () =>
    isSignedIn
      ? navigate({ to: "/jobs/$id/apply", params: { id } })
      : navigate({ to: "/login", search: { redirect: `/jobs/${id}/apply` } as any });

  return (
    <PublicLayout>
      {isLoading && !job ? (
        <JobDetailSkeleton />
      ) : (
        <>
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
                  {job && job.CompanyName[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="font-display text-2xl sm:text-3xl font-bold">{job.Title}</h1>
                  <p className="text-[#6B7280] mt-1">{job.Company}</p>
                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#6B7280]">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" />
                      {job.Location}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Briefcase className="h-4 w-4" />
                      {job.Type}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      {timeAgo(job.OpenDate)}
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <Badge tone="brand">{job.Type}</Badge>
                    <span className="ml-auto font-semibold">
                      {formatSalary(job.MinOffer, job.MaxOffer, job.currency)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-2 cursor-pointer">
                <Button
                  size="lg"
                  onClick={onApply}
                  loading={false}
                  leftIcon={<Check className="h-4 w-4" />}
                >
                  Apply now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleSaved.mutate();
                  }}
                  leftIcon={<Bookmark className={isSaved ? "h-4 w-4 fill-current" : "h-4 w-4"} />}
                >
                  {isSaved ? "Saved" : "Save"}
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
                <p className="text-[#1F2937] leading-relaxed">
                  {job.Description || "No job description has been provided for this position."}
                </p>
              </section>
              {job && job.Responsibilities.length > 0 && (
                <section>
                  <h2 className="font-display text-xl font-semibold mb-3">Responsibilities</h2>
                  <ul className="space-y-2">
                    {job.Responsibilities.map((r: any) => (
                      <li key={r} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full gradient-brand shrink-0" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
              {job && job.Requirements.length > 0 && (
                <section>
                  <h2 className="font-display text-xl font-semibold mb-3">
                    What we're looking for
                  </h2>
                  <ul className="space-y-2">
                    {job.Requirements.map((r: any) => (
                      <li key={r} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full gradient-brand shrink-0" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
              {job && job.Benefits.length > 0 && (
                <section>
                  <h2 className="font-display text-xl font-semibold mb-3">Benefits</h2>
                  <ul className="space-y-2">
                    {job.Benefits.map((r: any) => (
                      <li key={r} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full gradient-brand shrink-0" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </article>
            <aside className="space-y-4">
              <div className="surface-card p-5">
                <h3 className="font-display font-semibold mb-3">Skills</h3>
                <div className="flex flex-wrap gap-1.5">
                  {job &&
                    job.Skills.map((s: any) => (
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
                    <dd>{job.Type}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-[#6B7280]">Location</dt>
                    <dd>{job.Location}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-[#6B7280]">Posted</dt>
                    <dd>{timeAgo(job.OpenDate)}</dd>
                  </div>
                </dl>
              </div>
            </aside>
          </div>
        </>
      )}
    </PublicLayout>
  );
}
