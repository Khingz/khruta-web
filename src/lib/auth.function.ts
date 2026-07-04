import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { auth, clerkClient } from "@clerk/tanstack-react-start/server";

export type CurrentUser = {
  userId: string | null;
  firstName: string | null;
  lastName: string | null;
};

export const requireAuth = createServerFn().handler(async () => {
  const { isAuthenticated } = await auth();
  if (!isAuthenticated) throw redirect({ to: "/login" });
  return { isAuthenticated };
});

export const getCurrentUser = createServerFn().handler(async () => {
  const { userId } = await auth();
  if (!userId) return null;
  const user = await clerkClient().users.getUser(userId);
  return {
    userId: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
  };
});
