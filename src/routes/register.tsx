import { createFileRoute } from "@tanstack/react-router";
import { RegisterPage } from "@/pages/RegisterPage";
export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Khruta - Register" },
      {
        name: "description",
        content: "",
      },
    ],
  }),
  component: RegisterPage,
});
