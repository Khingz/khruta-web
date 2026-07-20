import { DashboardLayout } from "@/components/DashboardLayout";
import { Input, Textarea } from "@/components/primitives/Input";
import { Button } from "@/components/primitives/Button";
import { Badge } from "@/components/primitives/Badge";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "@/components/loadingSpinners/LoadingSpinner";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useToast } from "@/components/Toast";
import { useNavigate } from "@tanstack/react-router";
import type { Profile } from "@/types";
import { X } from "lucide-react";
import { candidateProfileQuery } from "@/queries/candidate.queries";
import { updateCandidateProfile } from "@/server/candidates/candidates.function";

export type FormValues = Omit<Profile, "id" | "email">;

export function EditProfilePage() {
  const qc = useQueryClient();
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const { push } = useToast();
  const navigate = useNavigate();

  const { data: response } = useSuspenseQuery(candidateProfileQuery);
  const profile = response?.data;
  const isLoading = false;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<FormValues>();

  const skillsDirty = JSON.stringify(skills) !== JSON.stringify(profile?.skills ?? []);

  const mutation = useMutation({
    mutationFn: (formData: FormValues) =>
      updateCandidateProfile({
        data: { recordId: profile!.id, data: formData },
      }),
    onSuccess: (updated) => {
      qc.setQueryData(candidateProfileQuery.queryKey, (old: any) => ({
        ...old,
        data: { ...old.data, ...updated?.data },
      }));
      push({ tone: "success", title: "Profile updated" });
      navigate({ to: "/profile" });
    },
    onError: (err: Error) => {
      push({ tone: "error", title: err.message });
    },
  });

  const onSubmit = (data: FormValues) => {
    mutation.mutate({ ...data, skills });
  };

  useEffect(() => {
    if (profile) {
      reset({
        fullname: profile.fullname,
        phone: profile.phone,
        location: profile.location,
        bio: profile.bio,
        linkedinURL: profile.linkedinURL,
        portfolioLink: profile.portfolioLink,
        resumeLink: profile.resumeLink,
        skills: profile.skills ?? [],
      });
      setSkills(profile.skills || []);
    }
  }, [profile, reset]);

  const addSkill = () => {
    const s = skillInput.trim();
    if (s && !skills.includes(s)) setSkills([...skills, s]);
    setSkillInput("");
  };

  if (isLoading)
    return (
      <DashboardLayout title="Edit profile">
        <LoadingSpinner />
      </DashboardLayout>
    );

  return (
    <DashboardLayout
      title="Edit profile"
      subtitle="Keep your information current to get better matches."
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="surface-card p-6 sm:p-8 space-y-6 max-w-3xl"
      >
        <div className="grid sm:grid-cols-1 gap-4">
          <Input
            label="Full name"
            placeholder="John Doe"
            {...register("fullname", { required: "Fullname is Required" })}
            error={errors.fullname?.message}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Input label="Location" {...register("location")} placeholder="City, Country" />
          <Input label="Phone" {...register("phone")} />
        </div>

        <Textarea
          label="Bio"
          {...register("bio")}
          rows={5}
          placeholder="A short summary about you"
        />

        <div>
          <label className="block text-sm font-medium mb-1.5">Skills</label>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {skills.map((s) => (
              <span
                key={s}
                className="inline-flex items-center gap-1 rounded-full bg-[#EEF0FB] text-[#1B2A6B] px-2.5 py-1 text-xs"
              >
                {s}
                <button type="button" onClick={() => setSkills(skills.filter((x) => x !== s))}>
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
            {skills.length === 0 && <Badge>No skills yet</Badge>}
          </div>

          <div className="flex gap-2">
            <Input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSkill();
                }
              }}
              placeholder="Add a skill and press Enter"
            />
            <Button type="button" variant="outline" onClick={addSkill}>
              Add
            </Button>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <Input
            label="LinkedIn"
            {...register("linkedinURL")}
            placeholder="https://linkedin.com/in/…"
          />
          <Input label="Portfolio" {...register("portfolioLink")} placeholder="https://…" />
          <Input
            label="Resume"
            {...register("resumeLink")}
            placeholder="https://drive.google.com/…"
          />
        </div>

        <div className="flex justify-end gap-2 border-t border-[#F1F5F9] pt-5 cursor-pointer">
          <Button type="button" variant="ghost" onClick={() => navigate({ to: "/profile" })}>
            Cancel
          </Button>
          <Button type="submit" loading={false} disabled={!isDirty && !skillsDirty}>
            Save changes
          </Button>
        </div>
      </form>
    </DashboardLayout>
  );
}
