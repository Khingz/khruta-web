import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/primitives/Button";
import { Input } from "@/components/primitives/Input";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/Toast";
import { Modal } from "@/components/Modal";
import { useNavigate } from "@tanstack/react-router";

export function SettingsPage() {
  const { user, logout } = useAuth();
  const { push } = useToast();
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState(false);
  const [notifs, setNotifs] = useState({
    email: true,
    interview: true,
    offers: true,
    marketing: false,
  });

  return (
    <DashboardLayout title="Account settings" subtitle="Manage how Khruta works for you.">
      <div className="space-y-6 max-w-3xl">
        <section className="surface-card p-6">
          <h2 className="font-display font-semibold text-lg">Notifications</h2>
          <p className="text-sm text-[#6B7280] mt-1">Choose what we email you about.</p>
          <div className="mt-4 space-y-3">
            {[
              {
                k: "email",
                label: "Application updates",
                desc: "Status changes and recruiter messages",
              },
              {
                k: "interview",
                label: "Interview reminders",
                desc: "Day-before and day-of reminders",
              },
              { k: "offers", label: "Offer notifications", desc: "When you receive a new offer" },
              {
                k: "marketing",
                label: "Product updates",
                desc: "Occasional emails about new features",
              },
            ].map((row) => (
              <label
                key={row.k}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#F8FAFC] cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 accent-[#5B3FD6]"
                  checked={(notifs as any)[row.k]}
                  onChange={(e) => setNotifs({ ...notifs, [row.k]: e.target.checked })}
                />
                <div className="flex-1">
                  <p className="font-medium text-sm">{row.label}</p>
                  <p className="text-xs text-[#6B7280]">{row.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </section>

        <section className="surface-card p-6 border-[#FECACA]">
          <h2 className="font-display font-semibold text-lg text-[#DC2626]">Danger zone</h2>
          <p className="text-sm text-[#6B7280] mt-1">
            Permanently delete your account and all data.
          </p>
          <Button variant="danger" className="mt-4" onClick={() => setConfirm(true)}>
            Delete account
          </Button>
        </section>
      </div>

      <Modal
        open={confirm}
        onClose={() => setConfirm(false)}
        title="Delete account?"
        footer={
          <>
            <Button variant="ghost" onClick={() => setConfirm(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={async () => {
                await logout();
                push({ tone: "success", title: "Account deleted" });
                navigate({ to: "/" });
              }}
            >
              Yes, delete
            </Button>
          </>
        }
      >
        <p className="text-sm text-[#6B7280]">
          This action is permanent. All your applications, saved jobs, and profile data will be
          removed.
        </p>
      </Modal>
    </DashboardLayout>
  );
}
