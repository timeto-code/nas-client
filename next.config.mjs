/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: {
    buildActivity: true,
    buildActivityPosition: "bottom-right",
  },
  httpAgentOptions: {
    // keepAlive: false,
  },
  poweredByHeader: false,
};

export default nextConfig;
