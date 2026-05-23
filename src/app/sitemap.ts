import { MetadataRoute } from 'next';
import { PROJECTS, DEVELOPERS } from '@/lib/data';

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://housingmantra.in';

    const projectUrls = PROJECTS.map((project) => ({
        url: `${baseUrl}/projects/${project.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    const developerUrls = DEVELOPERS.map((dev) => ({
        url: `${baseUrl}/developers/${dev.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    const localityUrls = [
        "pimpri", "chinchwad", "borhade-wadi", "akurdi", "moshi", "spine-road",
        "dudulgoan", "charoli", "charholi-phata", "wadmukhwadi", "dighi"
    ].map((loc) => ({
        url: `${baseUrl}/projects-in-${loc}`,
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
            url: `${baseUrl}/developers`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/post-property`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        ...projectUrls,
        ...developerUrls,
        ...localityUrls,
    ];
}
