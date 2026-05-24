'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`header${scrolled ? ' scrolled' : ''}`}>
      <div className="container">
        <div className="header-inner">
          <Link href="/" className="logo">
            <span className="logo-dot" />
            Alex Rivera
          </Link>

          <nav className="nav">
            <Link href="/#about" className="nav-link">About</Link>
            <Link href="/#services" className="nav-link">Services</Link>
            <Link href="/blog" className="nav-link">Blog</Link>
            <Link href="/#contact" className="nav-link">Contact</Link>
          </nav>

          <Link href="/#contact" className="nav-cta">
            Let's Talk
          </Link>
        </div>
      </div>
    </header>
  );
}
