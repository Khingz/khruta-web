import { DashboardLayout } from "@/components/DashboardLayout";
import { NotificationCard } from "@/components/NotificationCard";
import { EmptyState } from "@/components/EmptyState";
import { LoadingSpinner } from "@/components/loadingSpinners/LoadingSpinner";
import { Button } from "@/components/primitives/Button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Bell, CheckCheck } from "lucide-react";

export function NotificationsPage() {
  const qc = useQueryClient();
  const { data = [], isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => console.log("Fetched"),
  });

  const markAll = useMutation({
    mutationFn: async () => {
      console.log("mutate");
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["notifications"] }),
  });

  const markOne = useMutation({
    mutationFn: async () => {
      console.log("mutate");
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["notifications"] }),
  });

  const unread = 0;

  return (
    <DashboardLayout
      title="Notifications"
      subtitle={unread > 0 ? `${unread} unread` : "You're all caught up."}
      actions={
        unread > 0 ? (
          <Button
            variant="outline"
            leftIcon={<CheckCheck className="h-4 w-4" />}
            onClick={() => markAll.mutate()}
          >
            Mark all read
          </Button>
        ) : null
      }
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : data.length === 0 ? (
        <EmptyState
          icon={<Bell className="h-5 w-5" />}
          title="No notifications"
          description="This feature will be added in the next roll up"
        />
      ) : (
        <div className="space-y-2 max-w-3xl">
          {data.map((n, i) => (
            <NotificationCard key={i} n={n} onClick={() => markOne.mutate()} />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
