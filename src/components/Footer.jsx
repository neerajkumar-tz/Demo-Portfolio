import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-links">
            <Link href="/#about"    className="footer-link">About</Link>
            <Link href="/#services" className="footer-link">Services</Link>
            <Link href="/blog"      className="footer-link">Blog</Link>
            <Link href="/#contact"  className="footer-link">Contact</Link>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="https://linkedin.com" className="footer-link" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://twitter.com"  className="footer-link" target="_blank" rel="noopener noreferrer">Twitter</a>
          </div>
        </div>
        <p className="footer-copy">
          © {new Date().getFullYear()} Alex Rivera — Digital Marketing Strategist. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
