import { createFileRoute } from "@tanstack/react-router";
import { EditProfilePage } from "@/pages/EditProfilePage";
export const Route = createFileRoute("/profile/edit")({
  head: () => ({
    meta: [
      { title: "Khruta - Profile Update" },
      {
        name: "description",
        content:
          "Update your skills, experience, and preferences to keep your profile accurate and your job matches relevant.",
      },
    ],
  }),
  component: EditProfilePage,
});
