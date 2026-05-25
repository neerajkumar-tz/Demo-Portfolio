'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const FEATURES = [
  {
    title: 'Create Trips',
    desc: 'Set up trips with pricing, T&Cs, and registration.',
    href: '/#create-trips',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5v14M5 12h14"/>
      </svg>
    )
  },
  {
    title: 'Registration',
    desc: 'Self-service registration, operator stays in control.',
    href: '/#registration',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    )
  },
  {
    title: 'Payments',
    desc: 'Installments, reminders, and reconciliation built in.',
    href: '/#payments',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    )
  },
  {
    title: 'Quotations',
    desc: 'Versioned quotes with digital sign-off.',
    href: '/#quotations',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    )
  },
  {
    title: 'On-Trip Operations',
    desc: 'Room lists, coach lists, vendor management.',
    href: '/#operations',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    )
  },
  {
    title: 'Traveler Portal',
    desc: 'Mobile-friendly self-service for parents and travelers.',
    href: '/#travelers',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    )
  },
  {
    title: 'Visibility & Control',
    desc: 'Real-time dashboard across every trip and traveler.',
    href: '/#control',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/>
        <path d="M22 12A10 10 0 0 0 12 2v10z"/>
      </svg>
    )
  }
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileActive, setMobileActive] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header className={`voyita-header${scrolled ? ' scrolled' : ''}`}>
        <div className="voyita-container">
          <div className="voyita-header-inner">
            <Link href="/" className="voyita-logo">
              <span className="voyita-logo-icon">V</span>
              Voyita
            </Link>

            <nav className="voyita-nav">
              <Link href="/#about" className="voyita-nav-link">About Us</Link>
              
              <div className="voyita-dropdown-wrapper">
                <span className="voyita-nav-link">
                  Features
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </span>
                <div className="voyita-dropdown-menu">
                  {FEATURES.map((feat) => (
                    <Link key={feat.title} href={feat.href} className="voyita-dropdown-item">
                      <div className="voyita-dropdown-icon">{feat.icon}</div>
                      <div>
                        <div className="voyita-dropdown-title">{feat.title}</div>
                        <div className="voyita-dropdown-desc">{feat.desc}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <Link href="/blog" className="voyita-nav-link">Blog</Link>
              <Link href="/#contact" className="voyita-nav-link">Contact Us</Link>
            </nav>

            <div className="voyita-header-cta">
              <Link href="/#contact" className="voyita-btn-primary" style={{ padding: '8px 20px', borderRadius: '6px', fontSize: '13px' }}>
                Book a Demo
              </Link>
            </div>

            <button 
              className="voyita-mobile-toggle" 
              onClick={() => setMobileActive(!mobileActive)}
              aria-label="Toggle menu"
            >
              <span style={{ transform: mobileActive ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></span>
              <span style={{ opacity: mobileActive ? 0 : 1 }}></span>
              <span style={{ transform: mobileActive ? 'rotate(-45deg) translate(6px, -6px)' : 'none' }}></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile navigation overlay */}
      <div className={`voyita-mobile-overlay${mobileActive ? ' active' : ''}`}>
        <div className="voyita-mobile-nav">
          <Link href="/#about" className="voyita-mobile-link" onClick={() => setMobileActive(false)}>About Us</Link>
          <div style={{ paddingBottom: '8px', borderBottom: '1px solid var(--voyita-border)' }}>
            <span style={{ fontSize: '18px', fontWeight: '600', color: 'var(--voyita-text-dark)', display: 'block', marginBottom: '16px' }}>Features</span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px', paddingLeft: '12px' }}>
              {FEATURES.map((feat) => (
                <Link 
                  key={feat.title} 
                  href={feat.href} 
                  className="voyita-nav-link" 
                  onClick={() => setMobileActive(false)}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}
                >
                  <span style={{ color: 'var(--voyita-blue)' }}>{feat.icon}</span>
                  {feat.title}
                </Link>
              ))}
            </div>
          </div>
          <Link href="/blog" className="voyita-mobile-link" onClick={() => setMobileActive(false)}>Blog</Link>
          <Link href="/#contact" className="voyita-mobile-link" onClick={() => setMobileActive(false)}>Contact Us</Link>
        </div>
        <Link 
          href="/#contact" 
          className="voyita-btn-primary" 
          onClick={() => setMobileActive(false)}
          style={{ width: '100%', marginTop: 'auto' }}
        >
          Book a Demo
        </Link>
      </div>
    </>
  );
}
