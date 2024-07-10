import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.scss';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Providers } from '@/components/Providers';
import { getServerSession } from 'next-auth';
import { authConfig } from './configs/auth';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CafeHub',
  description: 'Find best cafe or restaurant in Kyiv for you and your family',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authConfig);
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers session={session}>
          <Header />
          <>{children}</>
          <Footer />
          <Toaster richColors expand />
        </Providers>
      </body>
    </html>
  );
}
