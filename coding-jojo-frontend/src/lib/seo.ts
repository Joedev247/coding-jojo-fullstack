import { Metadata } from 'next';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  canonical?: string;
  noindex?: boolean;
  type?: 'website' | 'article' | 'profile';
  course?: {
    name: string;
    description: string;
    instructor: string;
    price?: string;
    duration?: string;
    level?: 'Beginner' | 'Intermediate' | 'Advanced';
    rating?: number;
    reviewCount?: number;
  };
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    tags?: string[];
  };
}

const DEFAULT_TITLE = "Coding Jojo - Master Programming & Web Development Online";
const DEFAULT_DESCRIPTION = "Master programming with Coding Jojo's interactive e-learning platform. Learn JavaScript, Python, React, Node.js, HTML, CSS and more through hands-on coding tutorials, projects, and community support.";
const DEFAULT_KEYWORDS = [
  "learn programming",
  "coding tutorials", 
  "web development course",
  "JavaScript tutorial",
  "Python programming",
  "React course",
  "Node.js tutorial",
  "HTML CSS course",
  "coding bootcamp",
  "programming education",
  "online coding platform",
  "learn to code",
  "web development training",
  "coding jojo",
  "best coding platform in Nigeria",
  "best programming platform in Cameroon", 
  "best elearning platform in Africa",
  "learn programming in Nigeria",
  "learn coding in Cameroon",
  "African programming education",
  "tech education Africa",
  "coding bootcamp Nigeria",
  "programming course Cameroon",
  "web development Africa"
];

export function generateSEO({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = [],
  image = '/og-image.jpg',
  canonical,
  noindex = false,
  type = 'website',
  course,
  article
}: SEOProps = {}): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://codingjojo.vercel.app';
  
  // Construct full title
  const fullTitle = title 
    ? `${title} | Coding Jojo - Learn to Code`
    : DEFAULT_TITLE;

  // Combine keywords
  const allKeywords = [...DEFAULT_KEYWORDS, ...keywords];

  // Build canonical URL
  const canonicalUrl = canonical 
    ? `${siteUrl}${canonical}`
    : siteUrl;

  // Build image URL
  const imageUrl = image.startsWith('http') 
    ? image 
    : `${siteUrl}${image}`;

  // Base metadata
  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: allKeywords,
    authors: [{ name: "Coding Jojo Team" }],
    creator: "Coding Jojo",
    publisher: "Coding Jojo",
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type,
      locale: 'en_US',
      url: canonicalUrl,
      title: title || DEFAULT_TITLE,
      description,
      siteName: 'Coding Jojo',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title || DEFAULT_TITLE,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title || DEFAULT_TITLE,
      description,
      images: [imageUrl],
      creator: '@codingjojo',
      site: '@codingjojo',
    },
    robots: {
      index: !noindex,
      follow: !noindex,
      googleBot: {
        index: !noindex,
        follow: !noindex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };

  // Add course-specific OpenGraph data
  if (course) {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article', // Use article for structured data
    };
  }

  // Add article-specific OpenGraph data
  if (type === 'article' && article) {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article',
      publishedTime: article.publishedTime,
      modifiedTime: article.modifiedTime,
      authors: article.author ? [article.author] : undefined,
      tags: article.tags,
    };
  }

  return metadata;
}

export function generateCourseStructuredData(course: {
  name: string;
  description: string;
  instructor: string;
  price?: string;
  currency?: string;
  duration?: string;
  level?: string;
  rating?: number;
  reviewCount?: number;
  image?: string;
  url: string;
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://codingjojo.vercel.app';
  
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": course.name,
    "description": course.description,
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Coding Jojo",
      "url": siteUrl
    },
    "instructor": {
      "@type": "Person",
      "name": course.instructor
    },
    "image": course.image ? `${siteUrl}${course.image}` : `${siteUrl}/og-image.jpg`,
    "url": `${siteUrl}${course.url}`,
    "courseMode": "online",
    "educationalLevel": course.level || "All Levels",
    "timeRequired": course.duration,
    ...(course.price && {
      "offers": {
        "@type": "Offer",
        "price": course.price,
        "priceCurrency": course.currency || "USD",
        "category": "EducationalService",
        "availability": "https://schema.org/InStock"
      }
    }),
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "online",
      "courseSchedule": {
        "@type": "Schedule",
        "duration": course.duration || "P8W",
        "repeatFrequency": "P1W"
      },
      "instructor": {
        "@type": "Person",
        "name": course.instructor
      }
    },
    ...(course.rating && course.reviewCount && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": course.rating,
        "reviewCount": course.reviewCount,
        "bestRating": 5,
        "worstRating": 1
      }
    })
  };
}

export function generateArticleStructuredData(article: {
  headline: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  url: string;
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://codingjojo.vercel.app';
  
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.headline,
    "description": article.description,
    "author": {
      "@type": "Person",
      "name": article.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Coding Jojo",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo.png`
      }
    },
    "datePublished": article.datePublished,
    "dateModified": article.dateModified || article.datePublished,
    "image": article.image ? `${siteUrl}${article.image}` : `${siteUrl}/og-image.jpg`,
    "url": `${siteUrl}${article.url}`,
    "mainEntityOfPage": `${siteUrl}${article.url}`
  };
}

export function generateBreadcrumbStructuredData(breadcrumbs: Array<{
  name: string;
  url: string;
}>) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://codingjojo.vercel.app';
  
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": `${siteUrl}${crumb.url}`
    }))
  };
}

export function generateFAQStructuredData(faqs: Array<{
  question: string;
  answer: string;
}>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}
