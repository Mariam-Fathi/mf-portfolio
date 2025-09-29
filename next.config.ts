import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    // Disable TypeScript checking during build
    typescript: {
        ignoreBuildErrors: true,
    },
    // Disable ESLint during build
    eslint: {
        ignoreDuringBuilds: true,
    },
    // Optional: Increase timeout for large builds
    staticPageGenerationTimeout: 300,
    // Optional: Better for Three.js applications
    webpack: (config) => {
        config.resolve.fallback = {
            fs: false,
            path: false,
        };
        return config;
    },
    // Optional: Enable SWC minification for better performance
    // swcMinify: true,
};

export default nextConfig;