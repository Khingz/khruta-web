import type { Profile } from "@/types";
import { Avatar } from "./Avatar";
import { Badge } from "./primitives/Badge";
import { MapPin, Mail, Phone, Link2 } from "lucide-react";

export function ProfileCard({ profile }: { profile: Profile }) {
  return (
    <div className="surface-card p-6">
      <div className="flex items-start gap-4">
        <Avatar
          name={`${profile.firstName} ${profile.lastName}`}
          src={profile.avatarUrl}
          size={64}
        />
        <div className="flex-1 min-w-0">
          <h2 className="font-display text-xl font-semibold">
            {profile.firstName} {profile.lastName}
          </h2>
          {profile.headline && <p className="text-[#6B7280] mt-0.5">{profile.headline}</p>}
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 text-sm text-[#6B7280]">
            {profile.location && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                {profile.location}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <Mail className="h-4 w-4" />
              {profile.email}
            </span>
            {profile.phone && (
              <span className="inline-flex items-center gap-1.5">
                <Phone className="h-4 w-4" />
                {profile.phone}
              </span>
            )}
            {profile.links?.portfolio && (
              <a
                href={profile.links.portfolio}
                className="inline-flex items-center gap-1.5 hover:text-[#5B3FD6]"
                target="_blank"
                rel="noreferrer"
              >
                <Link2 className="h-4 w-4" />
                Portfolio
              </a>
            )}
          </div>
          {profile.skills?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {profile.skills.map((s) => (
                <Badge key={s} tone="brand">
                  {s}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
      {profile.bio && <p className="mt-5 text-sm text-[#1F2937] leading-relaxed">{profile.bio}</p>}
    </div>
  );
}
