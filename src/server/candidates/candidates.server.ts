import { Profile } from "@/types";
import { getSalesforceToken } from "../salesforce.server";
import { auth } from "@clerk/tanstack-react-start/server";

export async function getOrCreateCandidate(profile: {
  email: string;
  fullname?: string;
  clerkId: string;
}) {
  const { accessToken, instanceUrl } = await getSalesforceToken();
  const { userId, isAuthenticated } = await auth();

  if (!isAuthenticated || !userId) {
    throw new Error("Unauthorized");
  }

  const res = await fetch(`${instanceUrl}/services/apexrest/candidates/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Verified-Clerk-Id": userId,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profile),
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

  return res.json();
}

export async function updateCandidate(id: string, updates: Partial<Omit<Profile, "id" | "email">>) {
  const { accessToken, instanceUrl } = await getSalesforceToken();
  const { userId, isAuthenticated } = await auth();

  if (!isAuthenticated || !userId) {
    throw new Error("Unauthorized");
  }

  const res = await fetch(`${instanceUrl}/services/apexrest/candidates/${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Verified-Clerk-Id": userId,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });

  if (!res.ok) {
    const errorBody = await res.text();
    let detail: unknown;
    try {
      detail = JSON.parse(errorBody);
    } catch {
      detail = errorBody;
    }

    console.error("Salesforce update failed", { status: res.status, detail });
    throw new Error(
      `Salesforce update failed (${res.status}): ${
        typeof detail === "string" ? detail : JSON.stringify(detail)
      }`,
    );
  }

  return res.json();
}
