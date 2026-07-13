import { createServerFn } from "@tanstack/react-start";
import { auth, clerkClient } from "@clerk/tanstack-react-start/server";
import { getOrCreateCandidate } from "./candidates.server";

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
