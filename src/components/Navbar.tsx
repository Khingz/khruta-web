import { Link, useRouterState } from "@tanstack/react-router";
import { Bell, LogOut, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "./primitives/Button";
import { cn } from "@/utils/format";
import { Show, useAuth, useClerk } from "@clerk/tanstack-react-start";
import { useSuspenseQuery } from "@tanstack/react-query";
import { candidateProfileQuery } from "@/queries/candidate.queries";
import { menuItems, publicLinks } from "@/utils/navUtils";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Avatar } from "./Avatar";
import { MobileNavItems } from "./MobileNavItems";

export function Navbar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const { signOut } = useClerk();
  const { isSignedIn } = useAuth();

  const { data: response } = useSuspenseQuery(candidateProfileQuery);
  const candidate = response?.data ?? null;

  const logout = () => {
    signOut();
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center gap-6">
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
            {candidate && (
              <div className="relative">
                <button
                  onClick={() => setMenu((s) => !s)}
                  className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border border-[#E5E7EB] hover:bg-[#F8FAFC]"
                >
                  {/* <UserButton /> */}
                  <Avatar name={`${candidate && candidate?.fullname}`} size={28} />
                  <span className="text-sm font-medium">
                    {candidate.fullname?.split(" ")[0] ?? candidate.email}
                  </span>
                </button>
                {menu && (
                  <>
                    <div className="fixed inset-0 z-30" onClick={() => setMenu(false)} />
                    <div className="absolute right-0 mt-2 w-60 surface-card p-1.5 z-40">
                      {menuItems.map(({ to, label, icon: Icon }) => (
                        <Link
                          key={to}
                          to={to as any}
                          onClick={() => setMenu(false)}
                          className="flex items-center gap-2.5 px-2.5 py-2 text-sm rounded-lg hover:bg-[#F8FAFC]"
                        >
                          <Icon className="h-4 w-4 text-[#6B7280]" />
                          {label}
                        </Link>
                      ))}
                      <div className="border-t border-[#F1F5F9] my-1.5" />
                      <button
                        onClick={async () => {
                          logout();
                          setMenu(false);
                          navigate({ to: "/" });
                        }}
                        className="w-full flex items-center gap-2.5 px-2.5 py-2 text-sm rounded-lg hover:bg-[#FEE2E2] text-[#DC2626]"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign out
                      </button>
                    </div>
                  </>
                )}
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

        {/* Toggle for small screens */}
        <button
          className="md:hidden h-10 w-10 grid place-items-center rounded-lg hover:bg-[#F8FAFC]"
          onClick={() => setOpen((s) => !s)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {open && (
          <div className="md:hidden fixed left-0 top-18 w-screen h-screen bg-white">
            <MobileNavItems setOpen={setOpen} logout={logout} isAuthenticated={!!isSignedIn} />
          </div>
        )}
      </div>
    </header>
  );
}
