import Providers from "../components/Providers";
import CookieConsent from "../components/ui/CookieConsent";
import { Toaster } from "sonner";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: {
    default: "Coding Jojo - Master Programming & Web Development Online",
    template: "%s | Coding Jojo - Learn to Code"
  },
  description: "Master programming with Coding Jojo's interactive e-learning platform. Learn JavaScript, Python, React, Node.js, HTML, CSS and more through hands-on coding tutorials, projects, and community support. Start your coding journey today!",
  keywords: [
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
    "programming community",
    "interactive coding",
    "hands-on programming",
    "coding projects",
    "developer skills",
    "tech education",
    "best coding platform in Nigeria",
    "best programming platform in Cameroon",
    "best elearning platform in Africa",
    "learn programming in Nigeria",
    "learn coding in Cameroon",
    "African programming education",
    "tech education Africa",
    "coding bootcamp Nigeria",
    "programming course Cameroon",
    "web development Africa",
    "online coding Nigeria",
    "programming training Africa",
    "tech skills Nigeria",
    "coding platform West Africa",
    "learn programming online Africa"
  ],
  authors: [{ name: "JOSEPH JOSE ORIBALOYE" }],
  creator: "JOSEPH JOSE ORIBALOYE",
  publisher: "JOSEPH JOSE ORIBALOYE",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://codingjojo.vercel.app'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'es-ES': '/es-ES',
      'fr-FR': '/fr-FR',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Coding Jojo - Master Programming & Web Development Online',
    description: 'Master programming with Coding Jojo\'s interactive e-learning platform. Learn JavaScript, Python, React, Node.js, HTML, CSS and more through hands-on coding tutorials, projects, and community support.',
    siteName: 'Coding Jojo',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Coding Jojo - Learn Programming Online',
      },
      {
        url: '/og-image-square.jpg',
        width: 1200,
        height: 1200,
        alt: 'Coding Jojo - Interactive Learning Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coding Jojo - Master Programming & Web Development Online',
    description: 'Master programming with Coding Jojo\'s interactive e-learning platform. Learn JavaScript, Python, React, Node.js, HTML, CSS and more.',
    images: ['/twitter-image.jpg'],
    creator: '@codingjojo',
    site: '@codingjojo',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#5bbad5",
      },
    ],
  },
  manifest: "/site.webmanifest",
  other: {
    "msapplication-TileColor": "#da532c",
    "theme-color": "#ffffff",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://codingjojo.vercel.app';
  const courses = [
    {
      slug: 'javascript-fundamentals',
      name: 'JavaScript Fundamentals',
      description: 'Learn JavaScript from basics to advanced concepts',
      price: '49.99',
      duration: 'P8W',
      instructor: 'Expert Instructor'
    },
    {
      slug: 'react-development',
      name: 'React Development',
      description: 'Master React.js for modern web applications',
      price: '79.99',
      duration: 'P12W',
      instructor: 'React Expert'
    },
    {
      slug: 'python-programming',
      name: 'Python Programming',
      description: 'Learn Python programming from scratch',
      price: '59.99',
      duration: 'P10W',
      instructor: 'Python Expert'
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}#organization`,
        "name": "Coding Jojo",
        "url": siteUrl,
        "logo": {
          "@type": "ImageObject",
          "@id": `${siteUrl}#logo`,
          "url": `${siteUrl}/android-chrome-512x512.png`,
          "width": 512,
          "height": 512
        },
        "foundingDate": "2023",
        "sameAs": [
          "https://twitter.com/codingjojo",
          "https://github.com/codingjojo",
          "https://linkedin.com/company/codingjojo"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
            "contactType": "customer service",
            "email": "support@codingjojo.com",
            "availableLanguage": ["English", "Spanish", "French"]
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "1250",
          "bestRating": "5",
          "worstRating": "1"
        }
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}#website`,
        "url": siteUrl,
        "name": "Coding Jojo",
        "publisher": { "@id": `${siteUrl}#organization` },
        "inLanguage": "en",
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${siteUrl}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "WebPage",
        "@id": `${siteUrl}#webpage`,
        "url": siteUrl,
        "name": "Coding Jojo - Master Programming & Web Development Online",
        "isPartOf": { "@id": `${siteUrl}#website` },
        "about": { "@id": `${siteUrl}#organization` }
      },
      ...courses.map(c => ({
        "@type": "Course",
        "@id": `${siteUrl}/courses/${c.slug}#course`,
        "name": c.name,
        "description": c.description,
        "provider": { "@id": `${siteUrl}#organization` },
        "image": `${siteUrl}/og-image.jpg`,
        "url": `${siteUrl}/courses/${c.slug}`,
        "timeRequired": c.duration,
        "courseMode": "online",
        "offers": {
          "@type": "Offer",
          "price": c.price,
          "priceCurrency": "USD",
          "category": "EducationalService",
          "availability": "https://schema.org/InStock"
        },
        "hasCourseInstance": {
          "@type": "CourseInstance",
          "courseMode": "online",
          "courseSchedule": {
            "@type": "Schedule",
            "duration": c.duration,
            "repeatFrequency": "P1W"
          },
          "instructor": {
            "@type": "Person",
            "name": c.instructor
          }
        }
      })),
      {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}#breadcrumbs`,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": siteUrl },
          { "@type": "ListItem", "position": 2, "name": "Courses", "item": `${siteUrl}/courses` }
        ]
      }
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="zArg6S9DNjQCOSMFN9me3ZpfCmzXtn73ADP7CBF5PU0" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="font-montserrat antialiased bg-white text-primary-900 min-h-screen relative">
        {/* Clean background */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-white" />
        </div>

        <Toaster
          position="top-right"
          richColors
          closeButton
          expand
          theme="light"
          toastOptions={{
            style: {
              background: "rgba(255, 255, 255, 0.98)",
              border: "1px solid rgba(226, 232, 240, 0.8)",
              color: "#0f172a",
              backdropFilter: "blur(8px)",
              fontSize: "14px",
              fontWeight: "500",
            },
          }}
        />
        
        {/* React Toastify Container for course details */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          toastStyle={{
            background: "rgba(17, 24, 39, 0.95)",
            border: "1px solid rgba(75, 85, 99, 0.3)",
            color: "#f9fafb",
            backdropFilter: "blur(8px)",
          }}
        />
        {/* Content wrapper optimized for desktop */}
        <div className="page-container relative z-10 min-h-screen flex flex-col">
            <Providers>{children}</Providers>
            <CookieConsent />
        </div>
          <script src="https://cdn.botpress.cloud/webchat/v3.2/inject.js" defer></script>
<script src="https://files.bpcontent.cloud/2025/07/13/10/20250713105411-WK8OYTP5.js" defer></script>
    
      </body>
    </html>
  );
}
