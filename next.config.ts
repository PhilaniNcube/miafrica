import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  cacheComponents: true,
  typedRoutes: true,
   partialPrefetching: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.miafrica.co.za",
      },
      {
        protocol: "https",
        hostname: "**.r2.cloudflarestorage.com",
      },
    ],
  },
};

export default withPayload(nextConfig);