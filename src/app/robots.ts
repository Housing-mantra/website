
import { MetadataRoute } from 'next';

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/admin',
                '/admin/*',
                '/login',
                '/bookmarks',
                '/history',
                '/api/*',
                '/private/'
            ],
        },
        sitemap: 'https://housingmantra.in/sitemap.xml',
    };
}
