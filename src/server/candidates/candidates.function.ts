import { createServerFn } from "@tanstack/react-start";
import { auth, clerkClient } from "@clerk/tanstack-react-start/server";
import { getOrCreateCandidate, updateCandidate } from "./candidates.server";
import { FormValues } from "@/pages/EditProfilePage";

export const fetchCandidateProfile = createServerFn({ method: "GET" }).handler(async () => {
  const { userId, isAuthenticated } = await auth();
  if (!isAuthenticated) throw new Error("Not authenticated");

  const user = await clerkClient().users.getUser(userId);
  const fullname = `${user?.firstName} ${user?.lastName}`;

  const response = getOrCreateCandidate({
    email: user?.primaryEmailAddress?.emailAddress ?? "",
    fullname,
    clerkId: userId,
  });
  return response;
});

export const updateCandidateProfile = createServerFn({ method: "POST" })
  .validator((input: { recordId: string; data: Partial<FormValues> }) => input)
  .handler(async ({ data: { recordId, data } }) => {
    const { isAuthenticated } = await auth();
    if (!isAuthenticated) throw new Error("Not authenticated");

    return updateCandidate(recordId, data);
  });
