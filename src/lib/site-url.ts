export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL || "https://miafrica.co.za";
  return url.replace(/\/$/, "");
}
