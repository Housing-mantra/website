/** @type {import('next').NextConfig} */
const nextConfig = {
    // ─── URL Rewrites ──────────────────────────────────────────────────────────
    async rewrites() {
        return [
            {
                source: '/projects-in-:locality',
                destination: '/projects-region/:locality',
            },
        ];
    },

    // ─── Security & Cache Headers ──────────────────────────────────────────────
    async headers() {
        return [
            {
                // Static assets — long cache
                source: '/_next/static/:path*',
                headers: [
                    { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
                ],
            },
            {
                // Optimized images — 1 day CDN cache
                source: '/_next/image',
                headers: [
                    { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=3600' },
                ],
            },
            {
                // Public files (logos, fonts, etc)
                source: '/public/:path*',
                headers: [
                    { key: 'Cache-Control', value: 'public, max-age=86400' },
                ],
            },
            {
                // API routes — no cache (always fresh)
                source: '/api/:path*',
                headers: [
                    { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate' },
                    { key: 'X-Content-Type-Options', value: 'nosniff' },
                    { key: 'X-Frame-Options', value: 'DENY' },
                ],
            },
            {
                // All pages — security headers
                source: '/(.*)',
                headers: [
                    { key: 'X-DNS-Prefetch-Control', value: 'on' },
                    { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
                    { key: 'X-Content-Type-Options', value: 'nosniff' },
                    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
                    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
                ],
            },
        ];
    },

    // ─── Image Optimization ─────────────────────────────────────────────────────
    images: {
        formats: ['image/avif', 'image/webp'],  // Serve AVIF first, fallback to WebP
        deviceSizes: [640, 750, 828, 1080, 1200, 1920],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        minimumCacheTTL: 86400, // 24 hours image cache
        remotePatterns: [
            { protocol: 'https', hostname: 'images.unsplash.com' },
            { protocol: 'https', hostname: 'firebasestorage.googleapis.com' },
            { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
        ],
    },

    // ─── Compiler Optimizations ─────────────────────────────────────────────────
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
    },

    // ─── Bundle Optimizations ───────────────────────────────────────────────────
    experimental: {
        optimizePackageImports: ['lucide-react', 'firebase/auth', 'firebase/firestore'],
    },

    // ─── Compression ────────────────────────────────────────────────────────────
    compress: true,
    poweredByHeader: false,  // Remove X-Powered-By header (security + slight perf)

    // ─── Build ─────────────────────────────────────────────────────────────────
};

module.exports = nextConfig;
