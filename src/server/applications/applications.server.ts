import { AppFilters, AppId } from "@/schemas/application.schemas";
import { getSalesforceToken } from "../salesforce.server";
import { auth } from "@clerk/tanstack-react-start/server";

export async function getUserApplications(filters: AppFilters) {
  const { userId, isAuthenticated } = await auth();

  if (!isAuthenticated || !userId) {
    throw new Error("Unauthorized");
  }
  const { accessToken, instanceUrl } = await getSalesforceToken();

  const params = new URLSearchParams();

  if (filters.q) params.set("q", filters.q);
  if (filters.pageSize) params.set("pageSize", String(filters.pageSize));
  if (filters.stage) params.set("stage", String(filters.stage));

  const res = await fetch(`${instanceUrl}/services/apexrest/applications/?${params.toString()}`, {
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

export async function getApplicationById(id: AppId) {
  const { userId, isAuthenticated } = await auth();

  if (!isAuthenticated || !userId) {
    throw new Error("Unauthorized");
  }
  const { accessToken, instanceUrl } = await getSalesforceToken();
  const res = await fetch(`${instanceUrl}/services/apexrest/applications/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Verified-Clerk-Id": userId,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error(`Salesforce error (${res.status}):`, errorBody);
    throw new Error(`Failed to fetch application (${res.status}): ${errorBody}`);
  }
  return res.json();
}
