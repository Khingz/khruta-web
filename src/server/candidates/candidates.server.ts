import { Profile } from "@/types";
import { getSalesforceToken } from "../salesforce.server";

export async function getOrCreateCandidate(profile: {
  email: string;
  fullname?: string;
  clerkId: string;
}) {
  const { accessToken, instanceUrl } = await getSalesforceToken();
  const res = await fetch(`${instanceUrl}/services/apexrest/candidates/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
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

  const res = await fetch(`${instanceUrl}/services/apexrest/candidates/${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
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

export async function verifyCandidateSync(recordId: string, clerkId: string) {
  const { accessToken, instanceUrl } = await getSalesforceToken();
  const res = await fetch(
    `${instanceUrl}/services/apexrest/candidates/${recordId}?clerkId=${encodeURIComponent(clerkId)}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.ok) {
    const errorBody = await res.text();
    let detail: unknown;
    try {
      detail = JSON.parse(errorBody);
    } catch {
      detail = errorBody;
    }

    console.error("Salesforce sync check failed", { status: res.status, detail });
    throw new Error(
      `Salesforce sync check failed (${res.status}): ${
        typeof detail === "string" ? detail : JSON.stringify(detail)
      }`,
    );
  }

  const data = await res.json();
  return data as { synced: boolean };
}
