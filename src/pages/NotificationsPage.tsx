import { DashboardLayout } from "@/components/DashboardLayout";
import { NotificationCard } from "@/components/NotificationCard";
import { EmptyState } from "@/components/EmptyState";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Button } from "@/components/primitives/Button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notificationsApi } from "@/api/notificationsApi";
import { Bell, CheckCheck } from "lucide-react";

export function NotificationsPage() {
  const qc = useQueryClient();
  const { data = [], isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => notificationsApi.list(),
  });
  const markAll = useMutation({
    mutationFn: () => notificationsApi.markAllRead(),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["notifications"] }),
  });
  const markOne = useMutation({
    mutationFn: (id: string) => notificationsApi.markRead(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["notifications"] }),
  });

  const unread = data.filter((n) => !n.read).length;

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
          description="We'll let you know when something happens."
        />
      ) : (
        <div className="space-y-2 max-w-3xl">
          {data.map((n) => (
            <NotificationCard key={n.id} n={n} onClick={() => markOne.mutate(n.id)} />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
