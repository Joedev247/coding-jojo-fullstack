import { NextResponse } from 'next/server';

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://codingjojo.vercel.app';
  
  const robotsTxt = `# Robots.txt for Coding Jojo - Programming Education Platform
# ${siteUrl}/robots.txt

User-agent: *
Allow: /

# Allow all crawlers to access main content
Allow: /courses/
Allow: /community/
Allow: /dashboard/
Allow: /auth/
Allow: /api/courses/
Allow: /api/community/

# Disallow admin and private areas
Disallow: /admin/
Disallow: /api/admin/
Disallow: /api/auth/
Disallow: /api/payments/
Disallow: /_next/
Disallow: /private/

# Disallow temporary and development files
Disallow: /temp/
Disallow: /test/
Disallow: /*.json$
Disallow: /*?debug=*
Disallow: /*?dev=*

# Educational content crawlers
User-agent: Bingbot
Allow: /courses/
Allow: /community/
Crawl-delay: 1

# Social media crawlers
User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: LinkedInBot
Allow: /

# Sitemap location
Sitemap: ${siteUrl}/sitemap.xml
Sitemap: ${siteUrl}/sitemap-dynamic.xml

# Crawl delay for non-priority bots
User-agent: *
Crawl-delay: 1`;

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
