/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        tls: false,
        net: false,
        dns: false,
        crypto: false,
        os: false,
        constants: false
      };
    }
    return config;
  },
  typescript: {
    ignoreBuildErrors: true
  }
};

export default nextConfig;
