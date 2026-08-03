import { IntFilters } from "@/schemas/interview.schemas";
import { auth } from "@clerk/tanstack-react-start/server";
import { getSalesforceToken } from "../salesforce.server";

export async function getUserInterviews(filters: IntFilters) {
  const { userId, isAuthenticated } = await auth();

  if (!isAuthenticated || !userId) {
    throw new Error("Unauthorized");
  }
  const { accessToken, instanceUrl } = await getSalesforceToken();

  const params = new URLSearchParams();

  params.set("candidateId", filters.candidateId);
  if (filters.pageSize) params.set("pageSize", String(filters.pageSize));
  if (filters.stage) params.set("stage", String(filters.stage));

  const res = await fetch(`${instanceUrl}/services/apexrest/interviews/?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Verified-Clerk-Id": userId,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error(`Salesforce error (${res.status}):`, errorBody);
    throw new Error(`Failed to fetch applications openings (${res.status}): ${errorBody}`);
  }
  const json = await res.json();
  return json;
}
