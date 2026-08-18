import { AppFilters, AppId } from "@/schemas/application.schemas";
import { getSalesforceToken } from "../salesforce.server";
import { auth } from "@clerk/tanstack-react-start/server";
import { ApplyPayload } from "@/types";

export async function getUserApplications(filters: AppFilters) {
  const { userId, isAuthenticated } = await auth();

  if (!isAuthenticated || !userId) {
    throw new Error("Unauthorized");
  }
  const { accessToken, instanceUrl } = await getSalesforceToken();

  const params = new URLSearchParams();

  params.set("candidateId", filters.candidateId);
  if (filters.pageSize) params.set("pageSize", String(filters.pageSize));
  if (filters.stage) params.set("stage", String(filters.stage));
  if (filters.offers) params.set("offers", String(filters.offers));

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

export async function createApplication(data: ApplyPayload) {
  const { accessToken, instanceUrl } = await getSalesforceToken();
  const { userId, isAuthenticated } = await auth();

  if (!isAuthenticated || !userId) {
    throw new Error("Unauthorized");
  }

  const res = await fetch(`${instanceUrl}/services/apexrest/applications/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Verified-Clerk-Id": userId,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorBody = await res.text();
    let detail: unknown;
    try {
      detail = JSON.parse(errorBody);
    } catch {
      detail = errorBody;
    }

    console.error("Salesforce upsert failed", { status: res.status, detail });
    throw new Error(
      `Salesforce upsert failed (${res.status}): ${
        typeof detail === "string" ? detail : JSON.stringify(detail)
      }`,
    );
  }

  const response = res.json();
  return response;
}
