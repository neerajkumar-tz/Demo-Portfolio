import '../globals.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Syne, DM_Serif_Display, DM_Sans } from 'next/font/google';

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-ui',
  display: 'swap',
});

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata = {
  title: { default: 'Alex Rivera — Digital Marketing Strategist', template: '%s | Alex Rivera' },
  description:
    'Award-winning digital marketing strategist helping ambitious brands grow through data-driven SEO, paid media, content, and analytics.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://alexrivera.marketing',
    siteName: 'Alex Rivera',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSerif.variable} ${dmSans.variable}`}>
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
