import { DashboardLayout } from "@/components/DashboardLayout";
import { ProfileCard } from "@/components/ProfileCard";
import { LoadingSpinner } from "@/components/loadingSpinners/LoadingSpinner";
import { Button } from "@/components/primitives/Button";
import { useQuery } from "@tanstack/react-query";
import { profileApi } from "@/api/profileApi";
import { Link } from "@tanstack/react-router";
import { Pencil } from "lucide-react";

export function ProfilePage() {
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => profileApi.get(),
  });

  return (
    <DashboardLayout
      title="My profile"
      subtitle="How you appear to employers."
      actions={
        <Link to="/profile/edit">
          <Button leftIcon={<Pencil className="h-4 w-4" />}>Edit profile</Button>
        </Link>
      }
    >
      {isLoading || !profile ? (
        <LoadingSpinner label="Loading…" />
      ) : (
        <div className="space-y-6">
          <ProfileCard profile={profile} />
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="surface-card p-6">
              <p className="text-sm text-[#6B7280]">Years of experience</p>
              <p className="font-display text-2xl font-bold mt-1">{profile.experienceYears}</p>
            </div>
            <div className="surface-card p-6">
              <p className="text-sm text-[#6B7280]">Skills tracked</p>
              <p className="font-display text-2xl font-bold mt-1">{profile.skills.length}</p>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
