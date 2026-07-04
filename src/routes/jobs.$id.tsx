import { createFileRoute } from "@tanstack/react-router";
import { JobDetailsPage } from "@/pages/JobDetailsPage";

export const Route = createFileRoute("/jobs/$id")({ component: JobDetailsPage });
