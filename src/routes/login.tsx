import { createFileRoute } from "@tanstack/react-router";
import { LoginPage } from "@/pages/LoginPage";
export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Khruta - Login" },
      {
        name: "description",
        content: "",
      },
    ],
  }),
  component: LoginPage,
  validateSearch: (s: Record<string, unknown>): { redirect?: string } => ({
    redirect: (s.redirect as string) || undefined,
  }),
});
