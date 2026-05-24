import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-links">
            <Link href="/#about" className="footer-link">About</Link>
            <Link href="/#services" className="footer-link">Services</Link>
            <Link href="/blog" className="footer-link">Blog</Link>
            <Link href="/#contact" className="footer-link">Contact</Link>
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a 
              href="https://linkedin.com" 
              className="footer-link" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              LinkedIn <span style={{ fontSize: '10px' }}>↗</span>
            </a>
            <a 
              href="https://twitter.com" 
              className="footer-link" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              Twitter <span style={{ fontSize: '10px' }}>↗</span>
            </a>
          </div>
        </div>
        <p className="footer-copy">
          © {new Date().getFullYear()} Brandlift — Digital Marketing Strategist. Stitched with passion and precision.
        </p>
      </div>
    </footer>
  );
}
