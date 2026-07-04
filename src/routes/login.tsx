import { createFileRoute } from "@tanstack/react-router";
import { LoginPage } from "@/pages/LoginPage";
export const Route = createFileRoute("/login")({
  component: LoginPage,
  validateSearch: (s: Record<string, unknown>): { redirect?: string } => ({
    redirect: (s.redirect as string) || undefined,
  }),
});
