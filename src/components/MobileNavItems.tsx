import { menuItems, publicLinks } from "@/utils/navUtils";
import { Link, useNavigate } from "@tanstack/react-router";
import { LogOut } from "lucide-react";

type MobileNavItemsProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isAuthenticated: boolean;
  logout: () => void;
};

export const MobileNavItems = ({ setOpen, isAuthenticated, logout }: MobileNavItemsProps) => {
  const navigate = useNavigate();

  return (
    <div className="px-4 py-3 flex flex-col gap-1">
      {publicLinks.map((l) => (
        <Link
          key={l.to}
          to={l.to as any}
          onClick={() => setOpen(false)}
          className="px-3 py-2 rounded-lg text-sm font-medium text-[#1F2937] hover:bg-[#F8FAFC]"
        >
          {l.label}
        </Link>
      ))}
      <div className="border-t border-[#F1F5F9] my-1.5" />
      {isAuthenticated ? (
        <>
          {menuItems.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to as any}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-2.5 py-2 text-sm rounded-lg hover:bg-[#F8FAFC]"
            >
              <Icon className="h-4 w-4 text-[#6B7280]" />
              {label}
            </Link>
          ))}
          <div className="border-t border-[#F1F5F9] my-1.5" />
          <button
            onClick={async () => {
              await logout();
              setOpen(false);
              navigate({ to: "/" });
            }}
            className="w-full flex items-center gap-2.5 px-2.5 py-2 text-sm rounded-lg hover:bg-[#FEE2E2] text-[#DC2626]"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </>
      ) : (
        <>
          <Link
            to="/login"
            onClick={() => setOpen(false)}
            className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-[#F8FAFC]"
          >
            Sign in
          </Link>
          <Link
            to="/register"
            onClick={() => setOpen(false)}
            className="px-3 py-2 rounded-lg text-sm font-medium gradient-brand text-white"
          >
            Get started
          </Link>
        </>
      )}
    </div>
  );
};
