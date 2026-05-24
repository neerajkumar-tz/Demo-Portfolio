import '../globals.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Lora, Inter } from 'next/font/google';

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata = {
  title: { default: 'Neeraj — Digital Marketing Strategist', template: '%s | Neeraj' },
  description:
    'Award-winning digital marketing strategist helping ambitious brands grow through data-driven SEO, paid media, content, and analytics.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://alexrivera.marketing',
    siteName: 'Neeraj',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${lora.variable} ${inter.variable}`}>
      <body>
        <div className="ambient-glow">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
