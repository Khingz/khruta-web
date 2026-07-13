import { getOrCreateCandidate } from "@/server/candidates/candidates.server";
import { Webhook } from "svix";

export async function POST(request: Request) {
  const payload = await request.text();
  const headers = Object.fromEntries(request.headers);

  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);
  const evt = wh.verify(payload, headers) as any;

  if (evt.type === "user.created") {
    const { id, email_addresses, first_name, last_name } = evt.data;
    const fullname = `${first_name} ${last_name}`;
    await getOrCreateCandidate({
      email: email_addresses[0]?.email_address,
      fullname,
      clerkId: id,
    });
  }

  return new Response("ok", { status: 200 });
}
