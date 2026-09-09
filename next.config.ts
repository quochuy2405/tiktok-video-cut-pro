import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:locale/privacy",
        destination: "/:locale/privacy-policy",
        permanent: true,
      },
      {
        source: "/:locale/end-user-license-agreement",
        destination: "/:locale/eula",
        permanent: true,
      },
      {
        source: "/end-user-license-agreement",
        destination: "/eula",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
