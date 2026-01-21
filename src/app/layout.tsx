import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { GoogleAnalytics } from '@next/third-parties/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' });

export const metadata: Metadata = {
  title: 'Ayush Pandey | Indie SaaS Developer | MultiCloud Serverless Systems',
  description: 'Specializing in high-performance distributed systems, serverless orchestration, and cost-optimized cloud meshes. Founder of versionCV.',
  keywords: [
    'Infrastructure Architect', 
    'Serverless Expert India',
    'Edge-Native Developer', 
    'Multi-Cloud Engineer', 
    'High-Frequency Trading Infra',  
    'Cloud Cost Optimization', 
    'versionCV Founder', 
    'Distributed Systems Engineer',
    'AI Argumented Engineer',
    'Cloudflare Expert',
    'Cloudflare Edge Engineer',
    'GCP Serverless Engineer',
  ],
  authors: [{ name: 'Ayush Pandey' }],
  openGraph: {
    title: 'Ayush Pandey | Indie SaaS Developer',
    description: 'Engineering production-grade SaaS on serverless meshes',
    url: 'https://ayushpandey.me', 
    siteName: 'Ayush Pandey Portfolio',
    images: [],
    locale: 'en_US',
    type: 'website',
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Ayush Pandey",
    "jobTitle": "MultCloud Serverless Engineer & Indie SaaS Developer",
    "url": "https://ayushpandey.me",
    "sameAs": [
      "https://github.com/ap-dev-github", 
      "https://linkedin.com/in/linkedap"
    ],
    "alumniOf": {
      "@type": "CollegeOrUniversity",
      "name": "Vellore Institute of Technology - Amaravati",
      "alternateName": "VIT-AP University"
    },
    "description": "Specializing in high-performance distributed systems, serverless orchestration, and cost-optimized cloud meshes.",
    "award": "1st Runner Up at The Return Journey Hackathon, IIT Kanpur 2024",
    "founderOf": {
      "@type": "Organization",
      "name": "versionCV"
    },
    "knowsAbout": [
      "Cloud Architecture",
      "Serverless Systems",
      "Distributed Systems",
      "Edge Computing",
      "AI Pipelines",
      'Cloudflare Edge'
    ]
  };
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased bg-[#0b0e14]`}>
        {children}
      </body>
          <GoogleAnalytics gaId="G-XP3Z6H0SYP" />
    </html>
  );
}