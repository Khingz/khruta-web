import { createFileRoute } from "@tanstack/react-router";
import { ResumeManagerPage } from "@/pages/ResumeManagerPage";
export const Route = createFileRoute("/resume")({ component: ResumeManagerPage });
