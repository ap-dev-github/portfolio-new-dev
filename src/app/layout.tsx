import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import ClarityClient from '../components/ClarityClient';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' });

export const metadata: Metadata = {
  title: 'Ayush Pandey | Infrastructure Architect',
  description: 'Portfolio powered by Google Gemini',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased bg-[#0b0e14]`}>
        {process.env.NEXT_PUBLIC_CLARITY_ID && <ClarityClient />}
        {children}
      </body>
    </html>
  );
}