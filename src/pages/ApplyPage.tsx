import { PublicLayout } from "@/components/PublicLayout";
import { Button } from "@/components/primitives/Button";
import { Input, Textarea } from "@/components/primitives/Input";
import { Badge } from "@/components/primitives/Badge";
import { EmptyState } from "@/components/EmptyState";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { jobsApi } from "@/api/jobsApi";
import { profileApi } from "@/api/profileApi";
import { useParams, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { formatSalary } from "@/utils/format";
import { ArrowLeft, MapPin, Briefcase, Lock, FileText, Check } from "lucide-react";
import { useToast } from "@/components/Toast";
import { useEffect } from "react";
import { LoadingSpinner } from "@/components/loadingSpinners/LoadingSpinner";
import { ApplyPayload } from "@/types";
import { jobQueryOptions } from "@/queries/job.queries";

export function ApplyPage() {
  const { id } = useParams({ from: "/jobs_/$id/apply" });

  const { data: response, isLoading } = useQuery(jobQueryOptions(id));
  const job = response && response.data;

  const navigate = useNavigate();
  const qc = useQueryClient();
  const { push } = useToast();

  const { data: profile } = useQuery({ queryKey: ["profile"], queryFn: () => profileApi.get() });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ApplyPayload>({
    defaultValues: {
      resumeLink: "",
    },
  });

  useEffect(() => {
    if (profile) {
      reset({});
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
          Review your details and submit, you can track everything from your applications.
        </p>

        {/* Locked job summary */}
        <div className="mt-6 surface-card p-5 border-l-4 border-l-[#5B3FD6]">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-1.5 text-xs text-[#6B7280] mb-1">
                <Lock className="h-3 w-3" />
                Applying for
              </div>
              <h2 className="font-display text-lg font-semibold truncate">{job.Title}</h2>
              <p className="text-[#6B7280] text-sm">{job.Company}</p>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#6B7280]">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {job.Location}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Briefcase className="h-3.5 w-3.5" />
                  {job.Type}
                </span>
                <span>{formatSalary(job.MinOffer, job.MaxOffer, "USD")}</span>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={() => console.log("submitting")} className="mt-8 space-y-6">
          <section className="surface-card p-6">
            <h3 className="font-display font-semibold mb-4">Your details</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="Years of Experience"
                placeholder="How long have you worked in this role..."
                type="number"
                {...register("yearsOfExperience", { required: "Required" })}
                error={errors.yearsOfExperience?.message}
              />
              <Input
                label="Current Employer"
                placeholder="Who was your last employer..."
                {...register("currentEmployer", { required: "Required" })}
                error={errors.currentEmployer?.message}
              />
              <Input
                label="Current Role"
                placeholder="What was your last role..."
                {...register("currentRole", { required: "Required" })}
                error={errors.currentRole?.message}
              />
            </div>
          </section>

          <section className="surface-card p-6">
            <h3 className="font-display font-semibold mb-1">Cover letter</h3>
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
