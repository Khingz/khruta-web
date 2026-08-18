import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/primitives/Button";
import { Badge } from "@/components/primitives/Badge";
import { EmptyState } from "@/components/EmptyState";
import { LoadingSpinner } from "@/components/loadingSpinners/LoadingSpinner";
import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { offersApi } from "@/api/offersApi";
import { Gift, Calendar, Briefcase, Banknote } from "lucide-react";
import { formatDate } from "@/utils/format";
import { useToast } from "@/components/Toast";
import { candidateProfileQuery } from "@/queries/candidate.queries";
import { appsQueryOptions } from "@/queries/application.queries";

const TONE: Record<string, any> = { Pending: "warning", Accepted: "success", Rejected: "default" };

export function OffersPage() {
  const qc = useQueryClient();
  const { push } = useToast();

  //Get current user data
  const { data: currentUser } = useSuspenseQuery(candidateProfileQuery);
  const user = currentUser?.data ?? null;

  //application
  const { data: response, isLoading } = useQuery(
    appsQueryOptions({ candidateId: user?.id, offers: true }),
  );
  const offers = response?.data?.items ?? [];
  console.log(offers);

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
      ) : offers.length === 0 ? (
        <EmptyState
          icon={<Gift className="h-5 w-5" />}
          title="No offers yet"
          description="Offers from employers will appear here."
        />
      ) : (
        <div className="space-y-4">
          {offers &&
            offers.map((job: any) => (
              <div key={job.id} className="surface-card p-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl gradient-brand text-white grid place-items-center font-bold shrink-0">
                    {job.company[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-display text-lg font-semibold">{job.jobTitle}</h3>
                        <p className="text-sm text-[#6B7280]">
                          {job.company} · {job.jobLocation}
                        </p>
                      </div>
                      <Badge tone={TONE[job.offerAcceptanceStatus]}>
                        {job.offerAcceptanceStatus}
                      </Badge>
                    </div>
                    <div className="mt-4 grid sm:grid-cols-3 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Banknote className="h-4 w-4 text-[#5B3FD6]" />
                        <span>${job.offerAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-[#5B3FD6]" />
                        <span>Starts {formatDate(job.startDate)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-[#5B3FD6]" />
                        <span>Expires {formatDate(job.offerExpiry)}</span>
                      </div>
                    </div>
                    {job.offerAcceptanceStatus === "Pending" && (
                      <div className="mt-5 flex gap-2">
                        <Button
                          onClick={() => respond.mutate({ id: job.id, action: "accept" })}
                          loading={respond.isPending}
                        >
                          Accept offer
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => respond.mutate({ id: job.id, action: "decline" })}
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
