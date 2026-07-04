// Server-only Salesforce client. Routes all calls through the Lovable
// connector gateway so OAuth token refresh is handled for us. Never import
// from client code — this file is *.server.ts and blocked from client bundles.

const GATEWAY_BASE = "https://connector-gateway.lovable.dev/salesforce";

type RequestOptions = {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  query?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
};

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not configured`);
  return value;
}

function buildUrl(path: string, query?: RequestOptions["query"]): string {
  const url = new URL(`${GATEWAY_BASE}${path.startsWith("/") ? path : `/${path}`}`);
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v !== undefined) url.searchParams.set(k, String(v));
    }
  }
  return url.toString();
}

/** Low-level gateway fetch. Prefer sfSObject / sfApex helpers below. */
export async function sfFetch<T = unknown>(path: string, opts: RequestOptions = {}): Promise<T> {
  const lovableKey = requireEnv("LOVABLE_API_KEY");
  const sfKey = requireEnv("SALESFORCE_API_KEY");

  const res = await fetch(buildUrl(path, opts.query), {
    method: opts.method ?? "GET",
    headers: {
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": sfKey,
      "Content-Type": "application/json",
    },
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });

  const text = await res.text();
  const data = text ? safeJson(text) : null;
  if (!res.ok) {
    throw new Error(
      `Salesforce ${res.status}: ${typeof data === "string" ? data : JSON.stringify(data)}`,
    );
  }
  return data as T;
}

function safeJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

/** SOQL query helper: sfQuery("SELECT Id FROM Account LIMIT 1"). */
export function sfQuery<T = unknown>(soql: string) {
  return sfFetch<{ totalSize: number; done: boolean; records: T[]; nextRecordsUrl?: string }>(
    "/query",
    { query: { q: soql } },
  );
}

/** sObject CRUD helpers (standard REST). */
export const sfSObject = {
  get: <T = unknown>(object: string, id: string) =>
    sfFetch<T>(`/sobjects/${object}/${encodeURIComponent(id)}`),
  create: <T = unknown>(object: string, body: Record<string, unknown>) =>
    sfFetch<T>(`/sobjects/${object}`, { method: "POST", body }),
  update: (object: string, id: string, body: Record<string, unknown>) =>
    sfFetch<void>(`/sobjects/${object}/${encodeURIComponent(id)}`, { method: "PATCH", body }),
  remove: (object: string, id: string) =>
    sfFetch<void>(`/sobjects/${object}/${encodeURIComponent(id)}`, { method: "DELETE" }),
};

/**
 * Custom Apex REST helper. Given an endpoint declared under
 * /services/apexrest/khruta/*, call it through the gateway.
 *
 *   sfApex.get("/khruta/jobs", { q: "engineer" })
 *   sfApex.post("/khruta/applications", { jobId })
 */
export const sfApex = {
  get: <T = unknown>(path: string, query?: RequestOptions["query"]) =>
    sfFetch<T>(`/services/apexrest${path.startsWith("/") ? path : `/${path}`}`, { query }),
  post: <T = unknown>(path: string, body: unknown) =>
    sfFetch<T>(`/services/apexrest${path.startsWith("/") ? path : `/${path}`}`, {
      method: "POST",
      body,
    }),
  patch: <T = unknown>(path: string, body: unknown) =>
    sfFetch<T>(`/services/apexrest${path.startsWith("/") ? path : `/${path}`}`, {
      method: "PATCH",
      body,
    }),
  delete: <T = unknown>(path: string) =>
    sfFetch<T>(`/services/apexrest${path.startsWith("/") ? path : `/${path}`}`, {
      method: "DELETE",
    }),
};
