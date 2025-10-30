import React from 'react';
import HomePageWrapper from '../components/HomePageWrapper';
import { generateSEO } from '../lib/seo';
import { Metadata } from 'next';

export const metadata: Metadata = generateSEO({
  title: "Learn Programming Online",
  description: "Master programming with Coding Jojo's interactive e-learning platform. Learn JavaScript, Python, React, Node.js, HTML, CSS and more through hands-on coding tutorials, projects, and community support. Join thousands of developers who started their coding journey with us!",
  keywords: [
    "learn programming online",
    "interactive coding platform", 
    "programming tutorials",
    "web development bootcamp",
    "coding for beginners",
    "hands-on programming",
    "coding projects",
    "programming community",
    "learn JavaScript",
    "learn Python",
    "learn React",
    "learn Node.js",
    "learn HTML CSS",
    "coding education",
    "developer training",
    "programming skills"
  ],
  canonical: "/",
});


export default function HomePage() {
  return (
    <>
      <HomePageWrapper />
    </>
  );
}