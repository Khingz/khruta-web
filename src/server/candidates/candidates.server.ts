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
