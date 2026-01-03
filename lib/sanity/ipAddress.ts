import { client } from "@/sanity/lib/client";

export async function ordersFromIPLast24h(ip: string) {
  const query = `
    count(*[
      _type == "order" &&
      ipAddress == $ip &&
      dateTime(orderedAt) > dateTime(now()) - 60*60*24
    ])
  `;

  const count = await client.fetch(query, { ip }, { next: { revalidate: 0 } });
  return count;
}
