import type {Metadata} from 'next';
import {NEXT_PUBLIC_URL} from '../config';

import './global.css';
import '@coinbase/onchainkit/styles.css';
import '@rainbow-me/rainbowkit/styles.css';
import dynamic from 'next/dynamic';
import {Header} from 'src/components/Header';

const OnchainProviders = dynamic(
  () => import('src/components/OnchainProviders'),
  {
    ssr: false,
  },
);

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export const metadata: Metadata = {
  title: 'KeyFlow App Demo',
  description: 'KeyFlow AI service to resell credits',
  openGraph: {
    title: 'KeyFlow App Demo',
    description: 'KeyFlow x Coinbase',
    images: [`${NEXT_PUBLIC_URL}/vibes/vibes-19.png`],
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className="flex items-center justify-center">
        <OnchainProviders>
          <section className="w-96 max-w-full md:w-[1008px] mx-auto min-h-screen flex flex-col">
            <Header />
            {children}
          </section>
        </OnchainProviders>
      </body>
    </html>
  );
}
