import {
  Bookmark,
  Briefcase,
  FileText,
  Gift,
  LayoutDashboard,
  Settings,
  UserIcon,
} from "lucide-react";

export const publicLinks = [
  { to: "/jobs", label: "Browse jobs" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export const menuItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/profile", label: "My profile", icon: UserIcon },
  { to: "/applications", label: "Applications", icon: Briefcase },
  { to: "/saved", label: "Saved jobs", icon: Bookmark },
  { to: "/offers", label: "Offers", icon: Gift },
  { to: "/settings", label: "Settings", icon: Settings },
];
