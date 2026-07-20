import {
  LayoutDashboard,
  User as UserIcon,
  FileText,
  Briefcase,
  Bookmark,
  Gift,
  Bell,
  Settings,
} from "lucide-react";

export const items = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/profile", label: "My profile", icon: UserIcon },
  { to: "/resume", label: "Resume", icon: FileText },
  { to: "/applications", label: "Applications", icon: Briefcase },
  { to: "/saved", label: "Saved jobs", icon: Bookmark },
  { to: "/offers", label: "Offers", icon: Gift },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export const STATUS_TONE: Record<string, any> = {
  Submitted: "info",
  "Under Review": "warning",
  Interview: "brand",
  Offer: "success",
  Rejected: "error",
  Withdrawn: "default",
};

export const dashboardItems = [
  {
    to: "/applications",
    label: "Applications",
    icon: Briefcase,
    getValue: (items?: unknown[]) => items?.length ?? 0,
  },
  { to: "/saved", label: "Saved jobs", icon: Bookmark, getValue: (_items?: unknown[]) => 6 },
  { to: "/offers", label: "Offers", icon: Gift, getValue: (_items?: unknown[]) => 6 },
  { to: "/settings", label: "Settings", icon: Settings, getValue: (_items?: unknown[]) => 6 },
];
