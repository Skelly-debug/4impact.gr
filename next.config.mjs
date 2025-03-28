/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
    workerThreads: false,
    cpus: 1
    },
    images: {
        domains: ['placehold.co'],
      },
};

export default nextConfig;
