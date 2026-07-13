import { DashboardLayout } from "@/components/DashboardLayout";
import { Input, Textarea } from "@/components/primitives/Input";
import { Button } from "@/components/primitives/Button";
import { Badge } from "@/components/primitives/Badge";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { profileApi } from "@/api/profileApi";
import { LoadingSpinner } from "@/components/loadingSpinners/LoadingSpinner";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useToast } from "@/components/Toast";
import { useNavigate } from "@tanstack/react-router";
import type { Profile } from "@/types";
import { X } from "lucide-react";

type Form = Pick<
  Profile,
  "firstName" | "lastName" | "email" | "phone" | "location" | "headline" | "bio" | "experienceYears"
> & {
  linkedin?: string;
  portfolio?: string;
  github?: string;
};

export function EditProfilePage() {
  const qc = useQueryClient();
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => profileApi.get(),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<Form>();
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const { push } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (profile) {
      reset({
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        phone: profile.phone,
        location: profile.location,
        headline: profile.headline,
        bio: profile.bio,
        experienceYears: profile.experienceYears,
        linkedin: profile.links?.linkedin,
        portfolio: profile.links?.portfolio,
        github: profile.links?.github,
      });
      setSkills(profile.skills);
    }
  }, [profile, reset]);

  const save = useMutation({
    mutationFn: (d: Form) =>
      profileApi.update({
        firstName: d.firstName,
        lastName: d.lastName,
        email: d.email,
        phone: d.phone,
        location: d.location,
        headline: d.headline,
        bio: d.bio,
        experienceYears: Number(d.experienceYears),
        skills,
        links: { linkedin: d.linkedin, portfolio: d.portfolio, github: d.github },
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["profile"] });
      push({ tone: "success", title: "Profile updated" });
      navigate({ to: "/profile" });
    },
  });

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
        onSubmit={handleSubmit((d) => save.mutate(d))}
        className="surface-card p-6 sm:p-8 space-y-6 max-w-3xl"
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <Input
            label="First name"
            {...register("firstName", { required: "Required" })}
            error={errors.firstName?.message}
          />
          <Input
            label="Last name"
            {...register("lastName", { required: "Required" })}
            error={errors.lastName?.message}
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Input
            label="Email"
            type="email"
            {...register("email", { required: "Required" })}
            error={errors.email?.message}
          />
          <Input label="Phone" {...register("phone")} />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Input label="Location" {...register("location")} placeholder="City, Country" />
          <Input
            label="Years of experience"
            type="number"
            min={0}
            {...register("experienceYears", { valueAsNumber: true })}
          />
        </div>
        <Input
          label="Headline"
          {...register("headline")}
          placeholder="e.g. Senior Engineer · 7 yrs"
        />
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
            {...register("linkedin")}
            placeholder="https://linkedin.com/in/…"
          />
          <Input label="Portfolio" {...register("portfolio")} placeholder="https://…" />
          <Input label="GitHub" {...register("github")} placeholder="https://github.com/…" />
        </div>

        <div className="flex justify-end gap-2 border-t border-[#F1F5F9] pt-5">
          <Button type="button" variant="ghost" onClick={() => navigate({ to: "/profile" })}>
            Cancel
          </Button>
          <Button
            type="submit"
            loading={save.isPending}
            disabled={!isDirty && skills === profile?.skills}
          >
            Save changes
          </Button>
        </div>
      </form>
    </DashboardLayout>
  );
}
