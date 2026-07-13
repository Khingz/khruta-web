import { DashboardLayout } from "@/components/DashboardLayout";
import { ResumeUploader } from "@/components/ResumeUploader";
import { LoadingSpinner } from "@/components/loadingSpinners/LoadingSpinner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { profileApi } from "@/api/profileApi";
import { useToast } from "@/components/Toast";

export function ResumeManagerPage() {
  const qc = useQueryClient();
  const { push } = useToast();
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => profileApi.get(),
  });

  const upload = useMutation({
    mutationFn: (f: File) => profileApi.uploadResume(f),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["profile"] });
      push({ tone: "success", title: "Resume uploaded" });
    },
  });
  const remove = useMutation({
    mutationFn: () => profileApi.deleteResume(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["profile"] });
      push({ tone: "success", title: "Resume removed" });
    },
  });

  return (
    <DashboardLayout title="Resume manager" subtitle="Upload, replace, or remove your resume.">
      {isLoading || !profile ? (
        <LoadingSpinner />
      ) : (
        <div className="max-w-3xl">
          <ResumeUploader
            resume={profile.resume}
            onUpload={(f) => upload.mutate(f)}
            onDelete={() => remove.mutate()}
            uploading={upload.isPending}
          />
        </div>
      )}
    </DashboardLayout>
  );
}
