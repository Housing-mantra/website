
import { MetadataRoute } from 'next';
import { PROJECTS } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://housingmantra.in';

    const projectUrls = PROJECTS.map((project) => ({
        url: `${baseUrl}/projects/${project.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    const cityUrls = [
        "pimpri", "chinchwad", "borhade-wadi", "akurdi", "moshi", "spine-road",
        "dudulgoan", "charoli", "charholi-phata", "wadmukhwadi", "dighi"
    ].map((city) => ({
        url: `${baseUrl}/city/${city}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/post-property`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        ...projectUrls,
        ...cityUrls,
    ];
}
