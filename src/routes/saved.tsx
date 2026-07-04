import { createFileRoute } from "@tanstack/react-router";
import { SavedJobsPage } from "@/pages/SavedJobsPage";
export const Route = createFileRoute("/saved")({ component: SavedJobsPage });
