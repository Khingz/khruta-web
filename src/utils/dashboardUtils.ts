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
