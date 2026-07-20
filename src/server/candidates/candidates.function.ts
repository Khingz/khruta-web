import { createServerFn } from "@tanstack/react-start";
import { auth, clerkClient } from "@clerk/tanstack-react-start/server";
import { getOrCreateCandidate, updateCandidate } from "./candidates.server";
import { FormValues } from "@/pages/EditProfilePage";

export const fetchCandidateProfile = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const { userId, isAuthenticated } = await auth();
    if (!isAuthenticated || !userId) {
      throw new Error("Not authenticated");
    }
    const user = await clerkClient().users.getUser(userId);
    if (!user) {
      throw new Error("User not found");
    }
    const fullname = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();
    const email =
      user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId)?.emailAddress ??
      user.emailAddresses[0]?.emailAddress ??
      "";

    if (!email) {
      throw new Error("User has no verified email address");
    }
    const candidate = await getOrCreateCandidate({
      email,
      fullname,
      clerkId: userId,
    });
    return candidate;
  } catch (error) {
    console.error("fetchCandidateProfile failed:", error);
    return {
      success: false as const,
      error: error instanceof Error ? error.message : "Failed to fetch candidate profile",
    };
  }
});

export const updateCandidateProfile = createServerFn({ method: "POST" })
  .validator((input: { recordId: string; data: Partial<FormValues> }) => input)
  .handler(async ({ data: { recordId, data } }) => {
    const { userId, isAuthenticated } = await auth();

    if (!isAuthenticated || !userId) {
      throw new Error("Not authenticated");
    }

    if (!recordId) {
      throw new Error("Missing recordId");
    }

    const updated = await updateCandidate(recordId, data);

    return updated;
  });
