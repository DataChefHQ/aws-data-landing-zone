import type { APIRoute } from 'astro';

const docPages = import.meta.glob('../content/docs/**/*.{md,mdx}', { eager: true });

export const GET: APIRoute = ({ site }) => {
    const base = (site?.toString() ?? 'https://datalandingzone.com').replace(/\/$/, '');

    const docUrls = Object.keys(docPages).map((path) => {
        const slug = path
            .replace('../content/docs/', '')
            .replace(/\.(md|mdx)$/, '')
            .replace(/\/index$/, '');
        return slug === 'index' ? `${base}/` : `${base}/${slug}/`;
    });

    const urls = [`${base}/`, ...docUrls.filter((u) => u !== `${base}/`)];

    const xml = urls.map((u) => `  <url><loc>${u}</loc></url>`).join('\n');

    return new Response(
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${xml}\n</urlset>`,
        { headers: { 'Content-Type': 'application/xml; charset=utf-8' } }
    );
};
