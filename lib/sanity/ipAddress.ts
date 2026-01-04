import { client } from "@/sanity/lib/client";

export async function ordersFromIPLast24h(ip: string) {
  const query = `
    count(*[
      _type == "order" &&
      ipAddress == $ip &&
      dateTime(orderedAt) > dateTime(now()) - 60*60*24
    ])
  `;

  // Force fresh data with multiple cache busting strategies
  const timestamp = Date.now();
  const count = await client.fetch(
    query,
    { ip, timestamp }, // Add timestamp to bust cache
    {
      cache: "no-store",
      next: { revalidate: 0 },
    }
  );
  return count;
}
