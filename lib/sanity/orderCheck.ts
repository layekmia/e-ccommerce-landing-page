// import { client } from "@/sanity/lib/client";

// export async function ordersFromIPLast24h(ip: string) {
//   const query = `
//     count(*[
//       _type == "order" &&
//       ipAddress == $ip &&
//       dateTime(orderedAt) > dateTime(now()) - 60*60*24
//     ])
//   `;

//   // Force fresh data with multiple cache busting strategies
//   const timestamp = Date.now();
//   const count = await client.fetch(
//     query,
//     { ip, timestamp }, // Add timestamp to bust cache
//     {
//       cache: "no-store",
//       next: { revalidate: 0 },
//     }
//   );
//   return count;
// }

// lib/sanity/orderCheck.ts
import { client } from "@/sanity/lib/client";

// Check orders by IP in last 24h
export async function ordersFromIPLast24h(ip: string): Promise<number> {
  const query = `
    count(*[
      _type == "order" &&
      ipAddress == $ip &&
      dateTime(orderedAt) > dateTime(now()) - 60*60*24
    ])
  `;
  const timestamp = Date.now();
  const count = await client.fetch(
    query,
    { ip, timestamp },
    {
      cache: "no-store",
      next: { revalidate: 0 },
    }
  );
  return count;
}

// Check orders by Phone number in last 24h
export async function ordersFromPhoneLast24h(phone: string): Promise<number> {
  const query = `
    count(*[
      _type == "order" &&
      customerPhone == $phone &&
      dateTime(orderedAt) > dateTime(now()) - 60*60*24
    ])
  `;

  const timestamp = Date.now();
  const count = await client.fetch(
    query,
    { phone, timestamp },
    {
      cache: "no-store",
      next: { revalidate: 0 },
    }
  );
  return count;
}

// Check both IP and Phone number
export async function checkOrderLimits(
  ip: string,
  phone: string
): Promise<{
  ipOrders: number;
  phoneOrders: number;
  isLimited: boolean;
  message: string;
}> {
  const [ipOrders, phoneOrders] = await Promise.all([
    ordersFromIPLast24h(ip),
    ordersFromPhoneLast24h(phone),
  ]);

  const isLimited = ipOrders >= 1 || phoneOrders >= 1;

  let message = "";
  if (ipOrders >= 1) {
    message =
      "আপনি ইতিমধ্যে ১টি অর্ডার করেছেন। আরো অর্ডার করতে চাইলে আমাদের হেল্পলাইন (01794700226) এ কল করুন।";
  } else if (phoneOrders >= 1) {
    message =
      "এই ফোন নম্বর থেকে ইতিমধ্যে আজকে ১টি অর্ডার করা হয়েছে। আরো অর্ডার করতে চাইলে আমাদের হেল্পলাইন (01794700226) এ কল করুন।";
  }

  return {
    ipOrders,
    phoneOrders,
    isLimited,
    message,
  };
}
