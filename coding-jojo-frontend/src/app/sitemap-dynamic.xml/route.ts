import { NextResponse } from 'next/server';

// This would ideally fetch from your database
async function getCourses() {
  // Mock data - replace with actual database call
  return [
    { id: 'javascript-fundamentals', title: 'JavaScript Fundamentals', lastModified: '2025-01-26' },
    { id: 'react-basics', title: 'React Basics', lastModified: '2025-01-25' },
    { id: 'python-programming', title: 'Python Programming', lastModified: '2025-01-24' },
    { id: 'nodejs-backend', title: 'Node.js Backend Development', lastModified: '2025-01-23' },
    { id: 'html-css-responsive', title: 'HTML & CSS Responsive Design', lastModified: '2025-01-22' },
  ];
}

async function getCommunityPosts() {
  // Mock data - replace with actual database call
  return [
    { id: 'getting-started-react', title: 'Getting Started with React', lastModified: '2025-01-26' },
    { id: 'javascript-best-practices', title: 'JavaScript Best Practices', lastModified: '2025-01-25' },
    { id: 'python-vs-javascript', title: 'Python vs JavaScript', lastModified: '2025-01-24' },
  ];
}

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://codingjojo.vercel.app';
  
  try {
    const [courses, posts] = await Promise.all([
      getCourses(),
      getCommunityPosts()
    ]);

    const currentDate = new Date().toISOString();

    // Generate courses XML
    const coursesXml = courses.map(course => `
    <url>
      <loc>${siteUrl}/courses/${course.id}</loc>
      <lastmod>${course.lastModified}T00:00:00+00:00</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>`).join('');

    // Generate community posts XML
    const postsXml = posts.map(post => `
    <url>
      <loc>${siteUrl}/community/posts/${post.id}</loc>
      <lastmod>${post.lastModified}T00:00:00+00:00</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.6</priority>
    </url>`).join('');

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage -->
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Main Pages -->
  <url>
    <loc>${siteUrl}/courses</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <url>
    <loc>${siteUrl}/community</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>${siteUrl}/dashboard</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- Dynamic Courses -->
  ${coursesXml}
  
  <!-- Dynamic Community Posts -->
  ${postsXml}
  
</urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}
