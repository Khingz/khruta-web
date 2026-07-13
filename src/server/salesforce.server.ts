export async function getSalesforceToken() {
  const loginUrl = process.env.SF_LOGIN_URL;
  const clientId = process.env.SF_CLIENT_ID;
  const clientSecret = process.env.SF_CLIENT_SECRET;

  if (!loginUrl || !clientId || !clientSecret) {
    console.error("Missing Salesforce env vars", {
      hasLoginUrl: !!loginUrl,
      hasClientId: !!clientId,
      hasClientSecret: !!clientSecret,
    });
    throw new Error("Salesforce credentials are not configured in this environment");
  }

  let res: Response;
  try {
    res = await fetch(`${loginUrl}/services/oauth2/token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
      }),
    });
  } catch (err) {
    console.error("Network error calling Salesforce token endpoint:", err, (err as any)?.cause);
    throw new Error("Could not reach Salesforce login endpoint");
  }

  if (!res.ok) {
    const body = await res.text();
    console.error("Salesforce auth failed:", res.status, body);
    throw new Error(`Salesforce auth failed: ${res.status} ${body}`);
  }

  const data = await res.json();
  return { accessToken: data.access_token, instanceUrl: data.instance_url };
}
