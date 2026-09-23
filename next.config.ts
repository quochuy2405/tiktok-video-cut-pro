import path from "path";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:locale/privacy",
        destination: "/:locale/privacy-policy",
        permanent: true,
      },
      {
        source: "/:locale/end-user-license-agreement",
        destination: "/:locale/privacy-policy",
        permanent: true,
      },
      {
        source: "/end-user-license-agreement",
        destination: "/privacy-policy",
        permanent: true,
      },
      {
        source: "/:locale/eula",
        destination: "/:locale/privacy-policy",
        permanent: true,
      },
      {
        source: "/eula",
        destination: "/privacy-policy",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
