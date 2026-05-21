import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'ShadowChat v70 - Multi-Industry Platform',
  description: 'The ultimate multi-industry platform combining Social, Crypto, and Marketplace',
  keywords: ['social', 'crypto', 'marketplace', 'trading', 'community'],
  authors: [{ name: 'ShadowChat Team' }],
  openGraph: {
    title: 'ShadowChat v70',
    description: 'Multi-industry platform',
    url: 'https://shadowchat.io',
    siteName: 'ShadowChat',
    images: [
      {
        url: 'https://shadowchat.io/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#667eea" />
      </head>
      <body>{children}</body>
    </html>
  );
}
