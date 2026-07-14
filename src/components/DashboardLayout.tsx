import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Navbar } from "./Navbar";
import { useAuth } from "@clerk/tanstack-react-start";
import { cn } from "@/utils/format";
import { menuItems } from "@/utils/navUtils";

export function DashboardLayout({
  children,
  title,
  subtitle,
  actions,
}: {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  const { isLoaded, isSignedIn } = useAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (isLoaded && !isSignedIn) navigate({ to: "/login", search: { redirect: pathname } as any });
  }, [isLoaded, isSignedIn, navigate, pathname]);

  if (!isLoaded || !isSignedIn) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="h-96 grid place-items-center text-[#6B7280]">Loading…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid lg:grid-cols-[240px_1fr] gap-8">
        <aside className="hidden lg:block">
          <nav className="surface-card p-2 sticky top-24">
            {menuItems.map(({ to, label, icon: Icon }) => {
              const active = pathname === to || (to !== "/dashboard" && pathname.startsWith(to));
              return (
                <Link
                  key={to}
                  to={to as any}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    active
                      ? "bg-[#EEF0FB] text-[#1B2A6B]"
                      : "text-[#6B7280] hover:bg-[#F8FAFC] hover:text-[#1F2937]",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <div className="min-w-0">
          {(title || actions) && (
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                {title && (
                  <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#1F2937]">
                    {title}
                  </h1>
                )}
                {subtitle && <p className="text-[#6B7280] mt-1">{subtitle}</p>}
              </div>
              {actions}
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
