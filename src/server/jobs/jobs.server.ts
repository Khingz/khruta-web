import { JobFilters, JobId, savedJobFilters } from "@/schemas/job.schemas";
import { getSalesforceToken } from "../salesforce.server";
import { CandidateId } from "@/schemas/candidate.schemas";
import { auth } from "@clerk/tanstack-react-start/server";
import { AddSaveJobPayload } from "@/types";

export async function getJobOpenings(filters: JobFilters) {
  const { accessToken, instanceUrl } = await getSalesforceToken();
  const params = new URLSearchParams();
  if (filters.q) params.set("q", filters.q);
  if (filters.location) params.set("location", filters.location);
  if (filters.department) params.set("department", filters.department);
  if (filters.page) params.set("page", String(filters.page));
  if (filters.pageSize) params.set("pageSize", String(filters.pageSize));
  if (filters.minOffer) params.set("minOffer", String(filters.minOffer));
  if (filters.maxOffer) params.set("maxOffer", String(filters.maxOffer));

  const res = await fetch(`${instanceUrl}/services/apexrest/jobOpening/?${params.toString()}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error(`Salesforce error (${res.status}):`, errorBody);
    throw new Error(`Failed to fetch job openings (${res.status}): ${errorBody}`);
  }
  return res.json();
}

export async function getJobOpeningById(id: JobId) {
  const { accessToken, instanceUrl } = await getSalesforceToken();
  const res = await fetch(`${instanceUrl}/services/apexrest/jobOpening/${id}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error(`Salesforce error (${res.status}):`, errorBody);
    throw new Error(`Failed to fetch job opening (${res.status}): ${errorBody}`);
  }
  return res.json();
}

export async function getRecommendedJobs(id: CandidateId) {
  const { accessToken, instanceUrl } = await getSalesforceToken();
  const params = new URLSearchParams({
    recommend: "true",
    candidateId: id,
  });
  const res = await fetch(`${instanceUrl}/services/apexrest/jobOpening?${params.toString()}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error(`Salesforce error (${res.status}):`, errorBody);
    throw new Error(`Failed to fetch job opening (${res.status}): ${errorBody}`);
  }
  return res.json();
}

export async function getUserSavedJobs(candidateId: CandidateId) {
  const { accessToken, instanceUrl } = await getSalesforceToken();
  const params = new URLSearchParams();

  const { userId, isAuthenticated } = await auth();

  if (!isAuthenticated || !userId) {
    throw new Error("Unauthorized");
  }

  params.set("candidateId", candidateId);

  const res = await fetch(`${instanceUrl}/services/apexrest/savedJobs/?${params.toString()}`, {
    headers: { Authorization: `Bearer ${accessToken}`, "X-Verified-Clerk-Id": userId },
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error(`Salesforce error (${res.status}):`, errorBody);
    throw new Error(`Failed to fetch jobs (${res.status}): ${errorBody}`);
  }
  return res.json();
}

export async function toggleSavedJob(data: AddSaveJobPayload) {
  const { accessToken, instanceUrl } = await getSalesforceToken();
  const { userId, isAuthenticated } = await auth();

  if (!isAuthenticated || !userId) {
    throw new Error("Unauthorized");
  }

  const res = await fetch(`${instanceUrl}/services/apexrest/savedJobs/`, {
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
