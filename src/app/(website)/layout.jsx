import '../globals.css';
import '../voyita.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Sora } from 'next/font/google';

const sora = Sora({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-sora',
  display: 'swap',
});

export const metadata = {
  title: 'Voyita — Group Travel Management Software without the chaos',
  description: 'Voyita provides group tour operators one place to manage the full trip workflow. Handle everything from setup and quotations to traveler registration, payments, and on-trip operations.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://voyita.com',
    siteName: 'Voyita',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sora.variable}`}>
      <body className="voyita-theme">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
