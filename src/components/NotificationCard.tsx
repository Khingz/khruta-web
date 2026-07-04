import type { NotificationItem } from "@/types";
import { Bell, Briefcase, CalendarCheck, Gift } from "lucide-react";
import { timeAgo, cn } from "@/utils/format";

export function NotificationCard({ n, onClick }: { n: NotificationItem; onClick?: () => void }) {
  const Icon =
    n.type === "interview"
      ? CalendarCheck
      : n.type === "offer"
        ? Gift
        : n.type === "application"
          ? Briefcase
          : Bell;
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left flex gap-3 p-4 rounded-xl border transition-colors",
        n.read
          ? "bg-white border-[#E5E7EB] hover:bg-[#F8FAFC]"
          : "bg-[#F8F7FF] border-[#E0E7FF] hover:bg-[#EEF0FB]",
      )}
    >
      <div className="h-10 w-10 rounded-lg gradient-brand text-white grid place-items-center shrink-0">
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-medium text-[#1F2937] truncate">{n.title}</p>
          {!n.read && <span className="h-2 w-2 rounded-full bg-[#5B3FD6] shrink-0" />}
        </div>
        <p className="text-sm text-[#6B7280] mt-0.5 line-clamp-2">{n.body}</p>
        <p className="text-xs text-[#9CA3AF] mt-1.5">{timeAgo(n.createdAt)}</p>
      </div>
    </button>
  );
}
