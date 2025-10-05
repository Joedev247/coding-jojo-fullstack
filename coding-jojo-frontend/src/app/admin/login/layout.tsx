import { Metadata } from 'next';
import { generateSEO } from '../../../lib/seo';

export const metadata: Metadata = generateSEO({
  title: "Admin Login",
  description: "Secure admin access portal for Coding Jojo platform administrators.",
  noindex: true, // This page should not be indexed by search engines
  canonical: "/admin/login",
});

export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
