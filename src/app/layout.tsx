import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ANICHISOM — Design System Component Browser',
  description: 'Interactive Design Token Browser & Component Library for ANICHISOM brand identity. Self-updating Figma API integration, multi-language code export, and live theme customizer.',
  keywords: ['Design System', 'ANICHISOM', 'Tailwind', 'Next.js', 'Figma API', 'Design Tokens', 'UI Library'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:ital,wght@0,400;0,500;0,700;1,400&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-[#090A0F] text-[#F4F6FC] selection:bg-[#00F0FF] selection:text-[#090A0F] min-h-screen">
        {children}
      </body>
    </html>
  );
}
