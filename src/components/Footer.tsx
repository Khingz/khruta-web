import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-[#E5E7EB] bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-2 md:grid-cols-5 gap-8">
        <div className="col-span-2">
          <Logo />
          <p className="text-sm text-[#6B7280] max-w-xs">
            A premium recruitment platform built around candidates. Find roles, track progress,
            accept offers, all in one polished workspace.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-[#1F2937] mb-3">Candidates</h4>
          <ul className="space-y-2 text-sm text-[#6B7280]">
            <li>
              <Link to="/jobs" className="hover:text-[#5B3FD6]">
                Browse jobs
              </Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-[#5B3FD6]">
                Create account
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-[#5B3FD6]">
                Sign in
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-[#1F2937] mb-3">Company</h4>
          <ul className="space-y-2 text-sm text-[#6B7280]">
            <li>
              <Link to="/about" className="hover:text-[#5B3FD6]">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[#5B3FD6]">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-[#1F2937] mb-3">Legal</h4>
          <ul className="space-y-2 text-sm text-[#6B7280]">
            <li>
              <Link to="/privacy" className="hover:text-[#5B3FD6]">
                Privacy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-[#5B3FD6]">
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row gap-2 items-center justify-between">
          <p className="text-xs text-[#6B7280]">
            © {new Date().getFullYear()} Khruta. All rights reserved.
          </p>
          <p className="text-xs text-[#6B7280]">Crafted for candidates.</p>
        </div>
      </div>
    </footer>
  );
}
