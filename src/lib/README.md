# Server-side layer (TanStack Start)

The app now calls Salesforce through TanStack Start **server functions**
instead of a dedicated Node/Express backend. Nothing here ships to the browser.

## Files

- `salesforce.server.ts` — reusable Salesforce client. Routes every request
  through the **Lovable Salesforce connector gateway**, which handles OAuth
  token refresh automatically. Exposes:
  - `sfQuery(soql)` — SOQL
  - `sfSObject.get/create/update/remove(object, id, body?)` — standard REST
  - `sfApex.get/post/patch/delete(path, ...)` — custom Apex REST endpoints
    (this app's default, since your objects live behind
    `/services/apexrest/khruta/*`)
- `*.functions.ts` — `createServerFn(...)` wrappers. Components import from
  here; the client bundle only sees an RPC stub.

## Enabling Salesforce

1. Link the Salesforce connector when prompted (or via project settings).
   Lovable injects `LOVABLE_API_KEY` and `SALESFORCE_API_KEY` into server env.
2. Expose Apex REST endpoints in your org, e.g.
   `@RestResource(urlMapping='/khruta/jobs/*')`.
3. Replace mock calls in `src/api/*Api.ts` with `useServerFn(listJobs)` etc.

Until the connector is linked, server functions fall back to
`src/api/mockData.ts` so the UI stays functional.

## Adding a new endpoint

```ts
// src/lib/applications.functions.ts
import { createServerFn } from "@tanstack/react-start";

export const applyToJob = createServerFn({ method: "POST" })
  .inputValidator((d: { jobId: string }) => d)
  .handler(async ({ data }) => {
    const { sfApex } = await import("@/lib/salesforce.server");
    return sfApex.post("/khruta/applications", { jobId: data.jobId });
  });
```

Then in a component:

```tsx
import { useServerFn } from "@tanstack/react-start";
import { applyToJob } from "@/lib/applications.functions";

const apply = useServerFn(applyToJob);
await apply({ data: { jobId } });
```
