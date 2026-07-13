export async function getSalesforceToken() {
  const res = await fetch(`${process.env.SF_LOGIN_URL}/services/oauth2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.SF_CLIENT_ID!,
      client_secret: process.env.SF_CLIENT_SECRET!,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error("Salesforce auth failed:", res.status, body);
    throw new Error(`Salesforce auth failed: ${res.status} ${body}`);
  }

  const data = await res.json();
  return { accessToken: data.access_token, instanceUrl: data.instance_url };
}
