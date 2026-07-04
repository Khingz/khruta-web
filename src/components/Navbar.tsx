import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Bell,
  Menu,
  X,
  LogOut,
  User as UserIcon,
  Briefcase,
  Bookmark,
  Gift,
  FileText,
  Settings,
  LayoutDashboard,
} from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "./primitives/Button";
import { Avatar } from "./Avatar";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/utils/format";
import { Show, UserButton } from "@clerk/tanstack-react-start";
import { CurrentUser, getCurrentUser } from "@/lib/auth.function";

const publicLinks = [
  { to: "/jobs", label: "Browse jobs" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [user, setUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    getCurrentUser().then((data) => setUser(data));
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-6">
        <Link to="/" className="shrink-0">
          <Logo />
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {publicLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to as any}
              className={cn(
                "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                pathname.startsWith(l.to)
                  ? "text-[#1B2A6B] bg-[#F1F5F9]"
                  : "text-[#6B7280] hover:text-[#1F2937] hover:bg-[#F8FAFC]",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex-1" />
        <div className="hidden md:flex items-center gap-2">
          <Show when={"signed-in"}>
            <Link
              to="/dashboard"
              className="px-3 py-2 rounded-lg text-sm font-medium text-[#6B7280] hover:text-[#1F2937] hover:bg-[#F8FAFC]"
            >
              Dashboard
            </Link>
            <Link
              to="/notifications"
              aria-label="Notifications"
              className="h-10 w-10 grid place-items-center rounded-lg text-[#6B7280] hover:bg-[#F8FAFC] relative"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#5B3FD6]" />
            </Link>
            {user && (
              <div className="relative">
                <button className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border border-[#E5E7EB] hover:bg-[#F8FAFC]">
                  <UserButton />
                  <span className="text-sm font-medium">{user!.firstName}</span>
                </button>
              </div>
            )}
          </Show>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <Show when={"signed-out"}>
            <Link
              to="/login"
              className="px-3 py-2 rounded-lg text-sm font-medium text-[#1F2937] hover:bg-[#F8FAFC]"
            >
              Sign in
            </Link>
            <Link to="/register">
              <Button size="sm">Get started</Button>
            </Link>
          </Show>
        </div>
        {/* <button
          className="md:hidden h-10 w-10 grid place-items-center rounded-lg hover:bg-[#F8FAFC]"
          onClick={() => setOpen((s) => !s)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button> */}
      </div>
    </header>
  );
}
