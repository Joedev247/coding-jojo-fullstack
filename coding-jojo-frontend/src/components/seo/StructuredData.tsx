'use client';

import React from 'react';
import { generateCourseStructuredData, generateArticleStructuredData, generateBreadcrumbStructuredData, generateFAQStructuredData } from '../../lib/seo';

interface StructuredDataProps {
  type: 'course' | 'article' | 'breadcrumb' | 'faq';
  data: any;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  let structuredData;

  switch (type) {
    case 'course':
      structuredData = generateCourseStructuredData(data);
      break;
    case 'article':
      structuredData = generateArticleStructuredData(data);
      break;
    case 'breadcrumb':
      structuredData = generateBreadcrumbStructuredData(data);
      break;
    case 'faq':
      structuredData = generateFAQStructuredData(data);
      break;
    default:
      return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  );
}

interface BreadcrumbProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export function Breadcrumbs({ items }: BreadcrumbProps) {
  return (
    <>
      {/* Visible breadcrumbs */}
      <nav className="flex mb-4" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          {items.map((item, index) => (
            <li key={index} className="inline-flex items-center">
              {index > 0 && (
                <svg
                  className="w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
              )}
              {index === items.length - 1 ? (
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {item.name}
                </span>
              ) : (
                <a
                  href={item.url}
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                >
                  {item.name}
                </a>
              )}
            </li>
          ))}
        </ol>
      </nav>
      
      {/* Structured data */}
      <StructuredData type="breadcrumb" data={items} />
    </>
  );
}

interface CourseSchemaProps {
  course: {
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
  };
}

export function CourseSchema({ course }: CourseSchemaProps) {
  return <StructuredData type="course" data={course} />;
}

interface ArticleSchemaProps {
  article: {
    headline: string;
    description: string;
    author: string;
    datePublished: string;
    dateModified?: string;
    image?: string;
    url: string;
  };
}

export function ArticleSchema({ article }: ArticleSchemaProps) {
  return <StructuredData type="article" data={article} />;
}

interface FAQSchemaProps {
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
  return <StructuredData type="faq" data={faqs} />;
}
