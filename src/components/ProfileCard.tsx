import type { Profile } from "@/types";
import { Avatar } from "./Avatar";
import { Badge } from "./primitives/Badge";
import { MapPin, Mail, Phone, Link2 } from "lucide-react";

export function ProfileCard({ profile }: any) {
  return (
    <div className="surface-card p-6">
      <div className="flex items-start gap-4">
        <Avatar name={`${profile.fullname}`} src={profile.avatarUrl} size={64} />
        <div className="flex-1 min-w-0">
          <h2 className="font-display text-xl font-semibold">{profile.fullname}</h2>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-y-3 text-sm text-[#6B7280]">
            <span className="inline-flex items-center gap-1.5">
              <Mail className="h-4 w-4" />
              {profile.email}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              {profile.location || "Not Set"}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Phone className="h-4 w-4" />
              {profile.phone || "Not Set"}
            </span>
            <a
              href={profile.portfolioLink || "#"}
              className="inline-flex items-center gap-1.5 hover:text-[#5B3FD6]"
              target="_blank"
              rel="noreferrer"
            >
              <Link2 className="h-4 w-4" />
              Portfolio
            </a>
            <a
              href={profile.resumeLink || "#"}
              className="inline-flex items-center gap-1.5 hover:text-[#5B3FD6]"
              target="_blank"
              rel="noreferrer"
            >
              <Link2 className="h-4 w-4" />
              Resume
            </a>
            <a
              href={profile.linkedinURL || "#"}
              className="inline-flex items-center gap-1.5 hover:text-[#5B3FD6]"
              target="_blank"
              rel="noreferrer"
            >
              <Link2 className="h-4 w-4" />
              Linkedin
            </a>
          </div>
          {profile.skills?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {profile.skills.map((s: any) => (
                <Badge key={s} tone="brand">
                  {s}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
