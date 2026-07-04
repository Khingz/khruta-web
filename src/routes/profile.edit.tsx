import { createFileRoute } from "@tanstack/react-router";
import { EditProfilePage } from "@/pages/EditProfilePage";
export const Route = createFileRoute("/profile/edit")({ component: EditProfilePage });
