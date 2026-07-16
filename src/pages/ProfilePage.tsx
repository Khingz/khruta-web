import { DashboardLayout } from "@/components/DashboardLayout";
import { ProfileCard } from "@/components/ProfileCard";
import { LoadingSpinner } from "@/components/loadingSpinners/LoadingSpinner";
import { Button } from "@/components/primitives/Button";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Pencil } from "lucide-react";
import { candidateProfileQuery } from "@/queries/candidate.queries";

export function ProfilePage() {
  const { data: response, isLoading } = useSuspenseQuery(candidateProfileQuery);
  const user = response?.data ?? null;
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
      {isLoading || !user ? (
        <LoadingSpinner label="Loading…" />
      ) : (
        <div className="space-y-6">
          <ProfileCard profile={user} />
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="surface-card p-6">
              <p className="text-sm text-[#6B7280]">Bio</p>
              <p className="text-sm text-[#1F2937] leading-relaxed mt-1">{user.bio || "Not Set"}</p>
            </div>

            <div className="surface-card p-6">
              <p className="text-sm text-[#6B7280]">Skills tracked</p>
              <p className="font-display text-2xl font-bold mt-1">{user.skills.length}</p>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
