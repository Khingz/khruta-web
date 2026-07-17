import { createFileRoute } from "@tanstack/react-router";
import { ApplyPage } from "@/pages/ApplyPage";

export const Route = createFileRoute("/jobs_/$id/apply")({ component: ApplyPage });
