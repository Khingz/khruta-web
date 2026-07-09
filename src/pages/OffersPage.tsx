import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/primitives/Button";
import { Badge } from "@/components/primitives/Badge";
import { EmptyState } from "@/components/EmptyState";
import { LoadingSpinner } from "@/components/loadingSpinners/LoadingSpinner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { offersApi } from "@/api/offersApi";
import { Gift, Calendar, DollarSign, Briefcase } from "lucide-react";
import { formatDate } from "@/utils/format";
import { useToast } from "@/components/Toast";

const TONE: Record<string, any> = { Pending: "warning", Accepted: "success", Declined: "default" };

export function OffersPage() {
  const qc = useQueryClient();
  const { push } = useToast();
  const { data = [], isLoading } = useQuery({
    queryKey: ["offers"],
    queryFn: () => offersApi.list(),
  });

  const respond = useMutation({
    mutationFn: ({ id, action }: { id: string; action: "accept" | "decline" }) =>
      offersApi.respond(id, action),
    onSuccess: (_, v) => {
      qc.invalidateQueries({ queryKey: ["offers"] });
      push({ tone: "success", title: v.action === "accept" ? "Offer accepted" : "Offer declined" });
    },
  });

  return (
    <DashboardLayout title="Job offers" subtitle="Review and respond to your offers.">
      {isLoading ? (
        <LoadingSpinner />
      ) : data.length === 0 ? (
        <EmptyState
          icon={<Gift className="h-5 w-5" />}
          title="No offers yet"
          description="Offers from employers will appear here."
        />
      ) : (
        <div className="space-y-4">
          {data.map((o) => (
            <div key={o.id} className="surface-card p-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl gradient-brand text-white grid place-items-center font-bold shrink-0">
                  {o.job.company[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-lg font-semibold">{o.job.title}</h3>
                      <p className="text-sm text-[#6B7280]">
                        {o.job.company} · {o.job.location}
                      </p>
                    </div>
                    <Badge tone={TONE[o.status]}>{o.status}</Badge>
                  </div>
                  <div className="mt-4 grid sm:grid-cols-3 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-[#5B3FD6]" />
                      <span>
                        ${o.salary.toLocaleString()} {o.currency}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-[#5B3FD6]" />
                      <span>Starts {formatDate(o.startDate)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-[#5B3FD6]" />
                      <span>Expires {formatDate(o.expiresAt)}</span>
                    </div>
                  </div>
                  {o.status === "Pending" && (
                    <div className="mt-5 flex gap-2">
                      <Button
                        onClick={() => respond.mutate({ id: o.id, action: "accept" })}
                        loading={respond.isPending}
                      >
                        Accept offer
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => respond.mutate({ id: o.id, action: "decline" })}
                      >
                        Decline
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
