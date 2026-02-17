import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'Creovis | Premium Digital Agency',
  description: 'Transform your digital presence with Creovis - Marketing, Branding, Web Design, Video Editing & Social Media Management',
  keywords: 'digital agency, marketing, branding, web design, video editing, social media',
  authors: [{ name: 'Creovis' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://creovis.co',
    siteName: 'Creovis',
    title: 'Creovis | Premium Digital Agency',
    description: 'Premium digital growth agency',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Creovis | Premium Digital Agency',
    description: 'Premium digital growth agency',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#111827" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-dark-950">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}