import { ApplicationDetailsPage } from "@/pages/ApplicationDetailsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/applications_/$id")({ component: ApplicationDetailsPage });
