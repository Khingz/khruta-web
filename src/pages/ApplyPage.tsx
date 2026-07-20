import { PublicLayout } from "@/components/PublicLayout";
import { Button } from "@/components/primitives/Button";
import { Input, Textarea } from "@/components/primitives/Input";
import { Badge } from "@/components/primitives/Badge";
import { EmptyState } from "@/components/EmptyState";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { jobsApi } from "@/api/jobsApi";
import { profileApi } from "@/api/profileApi";
import { type ApplyPayload } from "@/api/applicationsApi";
import { useParams, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { formatSalary } from "@/utils/format";
import { ArrowLeft, MapPin, Briefcase, Lock, FileText, Check } from "lucide-react";
import { useToast } from "@/components/Toast";
import { useEffect } from "react";
import { LoadingSpinner } from "@/components/loadingSpinners/LoadingSpinner";

export function ApplyPage() {
  // const { id } = useParams({ from: "/jobs/$id/apply" });
  const id = "job_1000";
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { push } = useToast();

  const { data: job, isLoading } = useQuery({
    queryKey: ["job", id],
    queryFn: () => jobsApi.getById(id),
  });
  const { data: profile } = useQuery({ queryKey: ["profile"], queryFn: () => profileApi.get() });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ApplyPayload>({
    defaultValues: {
      fullname: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (profile) {
      reset({
        fullname: profile.fullname,
        phone: profile.phone,
        location: profile.location,
      });
    }
  }, [profile, reset]);

  const apply = useMutation({});

  if (isLoading)
    return (
      <PublicLayout>
        <div className="py-24">
          <LoadingSpinner label="Loading…" />
        </div>
      </PublicLayout>
    );
  if (!job)
    return (
      <PublicLayout>
        <EmptyState
          title="Job not found"
          action={
            <Link to="/jobs">
              <Button>Browse jobs</Button>
            </Link>
          }
        />
      </PublicLayout>
    );

  return (
    <PublicLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <Link
          to="/jobs/$id"
          params={{ id }}
          className="inline-flex items-center gap-1 text-sm text-[#6B7280] hover:text-[#1F2937] mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to job
        </Link>

        <h1 className="font-display text-3xl font-bold">Apply for this role</h1>
        <p className="text-[#6B7280] mt-1">
          Review your details and submit — you can track everything from your applications.
        </p>

        {/* Locked job summary */}
        <div className="mt-6 surface-card p-5 border-l-4 border-l-[#5B3FD6]">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-1.5 text-xs text-[#6B7280] mb-1">
                <Lock className="h-3 w-3" />
                Applying for
              </div>
              <h2 className="font-display text-lg font-semibold truncate">{job.title}</h2>
              <p className="text-[#6B7280] text-sm">{job.company}</p>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#6B7280]">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {job.location}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Briefcase className="h-3.5 w-3.5" />
                  {job.type}
                </span>
                <span>{formatSalary(job.salaryMin, job.salaryMax, job.currency)}</span>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={() => console.log("submitting")} className="mt-8 space-y-6">
          <section className="surface-card p-6">
            <h3 className="font-display font-semibold mb-4">Your details</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="Full name"
                {...register("fullname", { required: "Required" })}
                error={errors.fullname?.message}
              />
              <Input
                label="Email"
                type="email"
                {...register("email", { required: "Required" })}
                error={errors.email?.message}
              />
              <Input label="Phone" {...register("phone")} />
              <Input label="Location" {...register("location")} />
              <Input
                label="LinkedIn"
                placeholder="https://linkedin.com/in/…"
                {...register("linkedin")}
              />
              <Input label="Portfolio" placeholder="https://…" {...register("portfolio")} />
            </div>
          </section>

          <section className="surface-card p-6">
            <h3 className="font-display font-semibold mb-1">
              Cover letter <span className="text-[#6B7280] font-normal">(optional)</span>
            </h3>
            <p className="text-sm text-[#6B7280] mb-3">
              Tell {job.company} why you're a great fit.
            </p>
            <Textarea
              rows={7}
              placeholder="A few words about your background and interest…"
              {...register("coverLetter")}
            />
          </section>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-[#6B7280]">
              By submitting, you agree to share these details with {job.company}.
            </p>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate({ to: "/jobs/$id", params: { id } })}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                loading={isSubmitting || apply.isPending}
                leftIcon={<Check className="h-4 w-4" />}
              >
                Submit application
              </Button>
            </div>
          </div>
        </form>
      </div>
    </PublicLayout>
  );
}
