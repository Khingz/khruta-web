import { createServerFn } from "@tanstack/react-start";
import { auth, clerkClient } from "@clerk/tanstack-react-start/server";
import { getOrCreateCandidate, updateCandidate, verifyCandidateSync } from "./candidates.server";
import { FormValues } from "@/pages/EditProfilePage";

export const fetchCandidateProfile = createServerFn({ method: "GET" }).handler(async () => {
  const { userId, isAuthenticated } = await auth();
  if (!isAuthenticated) return null;

  const user = await clerkClient().users.getUser(userId);
  const fullname = `${user?.firstName} ${user?.lastName}`;

  return getOrCreateCandidate({
    email: user?.primaryEmailAddress?.emailAddress ?? "",
    fullname,
    clerkId: userId,
  });
});

export const updateCandidateProfile = createServerFn({ method: "POST" })
  .validator((input: { recordId: string; data: Partial<FormValues> }) => input)
  .handler(async ({ data: { recordId, data } }) => {
    const { userId: clerkId } = await auth();
    if (!clerkId) throw new Error("Not authenticated");

    const { synced } = await verifyCandidateSync(recordId, clerkId);
    if (!synced) {
      throw new Error("Candidate record does not belong to this user");
    }

    return updateCandidate(recordId, data);
  });
