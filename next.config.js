/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com",
      },
        {
        protocol: "https",
        hostname: "picsum.photos",
      },
        {
        protocol: "https",
        hostname: "i.ibb.co",
      },
          {
      protocol: "https",
      hostname: "i.ibb.co.com",
    },
    ],
  },
};

module.exports = nextConfig;