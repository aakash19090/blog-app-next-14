/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: "images.pexels.com"
            }
        ]
    },
    logging: {
        fetches: {
            fullUrl: true
        }
    }
};

export default nextConfig;
