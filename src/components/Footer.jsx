import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="voyita-footer">
      <div className="voyita-container">
        <div className="voyita-footer-grid">
          
          {/* Column 1: Brand description */}
          <div className="voyita-footer-brand">
            <Link href="/" className="voyita-logo" style={{ marginBottom: '16px', display: 'inline-flex' }}>
              <span className="voyita-logo-icon">V</span>
              Voyita
            </Link>
            <p>
              Group travel management software built specifically for tour operators. One platform for every trip, every traveler, every season.
            </p>
            <div className="voyita-footer-socials">
              <a href="https://facebook.com" className="voyita-footer-social-link" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="https://x.com" className="voyita-footer-social-link" target="_blank" rel="noopener noreferrer" aria-label="X (formerly Twitter)">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z"/>
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/>
                </svg>
              </a>
              <a href="https://linkedin.com" className="voyita-footer-social-link" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a href="https://youtube.com" className="voyita-footer-social-link" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25a29 29 0 0 0-.46-5.33z"/>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
                </svg>
              </a>
              <a href="https://instagram.com" className="voyita-footer-social-link" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: How We Help */}
          <div className="voyita-footer-col">
            <h4>How We Help</h4>
            <div className="voyita-footer-links">
              <Link href="/#control" className="voyita-footer-link">Scale Trip Volume</Link>
              <Link href="/#payments" className="voyita-footer-link">Integrate Online Payments</Link>
              <Link href="/#travelers" className="voyita-footer-link">Traveler Self-Management</Link>
              <Link href="/#operations" className="voyita-footer-link">Improve Travel Operations</Link>
            </div>
          </div>

          {/* Column 3: Features */}
          <div className="voyita-footer-col">
            <h4>Features</h4>
            <div className="voyita-footer-links">
              <Link href="/#create-trips" className="voyita-footer-link">Create Trips</Link>
              <Link href="/#registration" className="voyita-footer-link">Registration</Link>
              <Link href="/#payments" className="voyita-footer-link">Payments</Link>
              <Link href="/#quotations" className="voyita-footer-link">Quotations</Link>
              <Link href="/#operations" className="voyita-footer-link">Operations</Link>
              <Link href="/#travelers" className="voyita-footer-link">Traveler Portal</Link>
              <Link href="/#control" className="voyita-footer-link">Visibility & Control</Link>
            </div>
          </div>

          {/* Column 4: Company */}
          <div className="voyita-footer-col">
            <h4>Company</h4>
            <div className="voyita-footer-links">
              <Link href="/#about" className="voyita-footer-link">About Us</Link>
              <Link href="/blog" className="voyita-footer-link">Blog</Link>
              <Link href="/#contact" className="voyita-footer-link">Contact Us</Link>
              <Link href="/#contact" className="voyita-footer-link">Book a Demo</Link>
            </div>
          </div>

          {/* Column 5: Legal */}
          <div className="voyita-footer-col">
            <h4>Legal</h4>
            <div className="voyita-footer-links">
              <Link href="/privacy-policy" className="voyita-footer-link">Privacy Policy</Link>
              <Link href="/terms-and-conditions" className="voyita-footer-link">Terms & Conditions</Link>
            </div>
          </div>

        </div>

        <div className="voyita-footer-bottom">
          <div>© {currentYear} Voyita. All Rights Reserved.</div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span>Purpose-built for SYTA operators</span>
            <span style={{ color: 'var(--voyita-border)' }}>|</span>
            <span>Made with precision</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
