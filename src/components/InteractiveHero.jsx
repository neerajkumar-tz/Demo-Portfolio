'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function InteractiveHero() {
  const containerRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Calculate normalized mouse positions (-0.5 to 0.5) relative to hero container center
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    setCoords({ x, y });
  };

  // Safe fallback before mounting (critical for SSR matching)
  const tiltStyle = mounted && isHovered ? {
    transform: `perspective(1200px) rotateX(${-coords.y * 12}deg) rotateY(${coords.x * 12}deg) translateZ(10px)`,
    transition: 'transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)',
  } : {
    transform: 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
    transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
  };

  const svgStyle = mounted && isHovered ? {
    transform: `perspective(1200px) rotateX(${-coords.y * 22}deg) rotateY(${coords.x * 22}deg) translateZ(40px)`,
    boxShadow: `${-coords.x * 30}px ${-coords.y * 30}px 50px rgba(255, 92, 53, 0.15), 0 10px 40px rgba(0,0,0,0.3)`,
    transition: 'transform 0.1s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.1s ease',
  } : {
    transform: 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
    transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.6s ease',
  };

  const glowStyle = mounted ? {
    background: `radial-gradient(600px circle at ${(coords.x + 0.5) * 100}% ${(coords.y + 0.5) * 100}%, rgba(255, 92, 53, 0.08) 0%, rgba(59, 130, 246, 0.04) 40%, transparent 80%)`
  } : {};

  return (
    <section 
      ref={containerRef}
      className="hero 3d-hero-container"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setCoords({ x: 0, y: 0 });
      }}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* 3D Parallax Grid Backdrop */}
      <div className="hero-3d-glow" style={glowStyle} />
      <div className="hero-grid-line-3d" />

      {/* Floating Spatial 3D Elements */}
      <div 
        className="floating-3d-card float-card-1"
        style={mounted && isHovered ? {
          transform: `translate3d(${-coords.x * 40}px, ${-coords.y * 40}px, 60px) rotate(${coords.x * 5}deg)`,
          opacity: 0.85
        } : {}}
      />
      <div 
        className="floating-3d-card float-card-2"
        style={mounted && isHovered ? {
          transform: `translate3d(${coords.x * 30}px, ${coords.y * 30}px, -20px)`,
          opacity: 0.65
        } : {}}
      />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div className="hero-content">
          
          {/* Main Titles with dynamic tilting response */}
          <div className="hero-tilt-wrap" style={tiltStyle}>
            <div className="hero-eyebrow animate-fade-up">
              <span className="hero-eyebrow-line" />
              <span className="label">Growth Strategy &amp; Performance</span>
              <span className="hero-eyebrow-line" />
            </div>

            <h1 className="hero-title animate-fade-up delay-1">
              Marketing that <em>scales</em><br />bottom line revenue.
            </h1>

            <p className="hero-subtitle animate-fade-up delay-2">
              Fractional growth director and strategist helping ambitious product brands grow
              through structured SEO, analytical performance-attribution, and high-converting funnel design.
            </p>

            <div className="hero-actions animate-fade-up delay-3">
              <Link href="/#contact" className="btn-primary">
                Acquisition Blueprint →
              </Link>
              <Link href="/blog" className="btn-secondary">
                Explore Playbooks
              </Link>
            </div>
          </div>

          {/* Interactive 3D Marketing Pipeline Dashboard Card */}
          <div 
            className="animate-fade-up delay-4 pipeline-3d-card" 
            style={svgStyle}
          >
            <span className="stitch-corner-tl">+</span>
            <span className="stitch-corner-tr">+</span>
            <span className="stitch-corner-bl">+</span>
            <span className="stitch-corner-br">+</span>
            
            <div className="pipeline-card-header">
              <span className="pipeline-sys-title">Marketing Pipeline Attribution.sys</span>
              <div className="dot-indicators">
                <span className="indicator-dot red"></span>
                <span className="indicator-dot yellow"></span>
                <span className="indicator-dot green"></span>
              </div>
            </div>

            <svg viewBox="0 0 800 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="pipeline-svg">
              {/* Dotted Grid lines */}
              <line x1="50" y1="20" x2="750" y2="20" stroke="var(--border)" strokeDasharray="3 6" />
              <line x1="50" y1="80" x2="750" y2="80" stroke="var(--border)" strokeDasharray="3 6" />
              <line x1="50" y1="140" x2="750" y2="140" stroke="var(--border)" strokeDasharray="3 6" />
              <line x1="50" y1="200" x2="750" y2="200" stroke="var(--border)" strokeDasharray="3 6" />
              
              {/* Vertical blueprint boundaries */}
              <line x1="200" y1="0" x2="200" y2="240" stroke="var(--border)" strokeDasharray="2 4" />
              <line x1="400" y1="0" x2="400" y2="240" stroke="var(--border)" strokeDasharray="2 4" />
              <line x1="600" y1="0" x2="600" y2="240" stroke="var(--border)" strokeDasharray="2 4" />
              
              {/* Interactive Curve Paths */}
              <path d="M 80,140 Q 200,60 320,110 T 560,180 T 720,50" className="animated-path-primary" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" />
              <path d="M 80,140 Q 200,60 320,110 T 560,180 T 720,50" stroke="var(--accent)" strokeWidth="8" strokeLinecap="round" opacity="0.15" />
              
              <path d="M 80,160 Q 200,100 320,160 T 560,90 T 720,110" stroke="var(--accent-secondary)" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
              
              {/* Nodes & Data Dots */}
              <circle cx="80" cy="140" r="5" fill="var(--bg-2)" stroke="var(--accent)" strokeWidth="2" />
              <circle cx="270" cy="95" r="5" fill="var(--bg-2)" stroke="var(--accent)" strokeWidth="2" />
              <circle cx="480" cy="145" r="5" fill="var(--bg-2)" stroke="var(--accent)" strokeWidth="2" />
              
              {/* Revenue Node pulsing */}
              <circle cx="720" cy="50" r="6" fill="var(--bg-2)" stroke="var(--accent)" strokeWidth="3" className="pulsing-revenue-dot" />
              
              {/* Labels */}
              <text x="80" y="225" fill="var(--text-muted)" fontSize="10" fontFamily="var(--font-sans)" letterSpacing="0.1em" textAnchor="middle">ACQUISITION</text>
              <text x="280" y="225" fill="var(--text-muted)" fontSize="10" fontFamily="var(--font-sans)" letterSpacing="0.1em" textAnchor="middle">ENGAGEMENT</text>
              <text x="480" y="225" fill="var(--text-muted)" fontSize="10" fontFamily="var(--font-sans)" letterSpacing="0.1em" textAnchor="middle">RETENTION</text>
              <text x="680" y="225" fill="var(--accent)" fontSize="10" fontFamily="var(--font-sans)" letterSpacing="0.1em" textAnchor="middle" fontWeight="bold">REVENUE ENGINE</text>
              
              {/* Real-time moving signal dots */}
              <circle cx="0" cy="0" r="4" fill="var(--accent-secondary)">
                <animateMotion path="M 80,140 Q 200,60 320,110 T 560,180 T 720,50" dur="6s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>

        </div>
      </div>

      <div className="hero-scroll">
        <div className="scroll-line" />
        <span>Scroll</span>
      </div>

      <style jsx>{`
        .hero-3d-glow {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          pointer-events: none;
          z-index: 1;
        }
        .hero-grid-line-3d {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background-image: 
            linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 40px 40px;
          background-position: center;
          pointer-events: none;
          z-index: 2;
        }
        .floating-3d-card {
          position: absolute;
          border: 1px solid rgba(255,255,255,0.05);
          background: rgba(255,255,255,0.02);
          backdrop-filter: blur(12px);
          border-radius: var(--radius-md);
          pointer-events: none;
          z-index: 3;
          transition: transform 0.2s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.3s ease;
        }
        .float-card-1 {
          top: 20%; right: 10%;
          width: 140px; height: 140px;
          border-left: 2px solid var(--accent);
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }
        .float-card-2 {
          bottom: 25%; left: 8%;
          width: 180px; height: 90px;
          border-right: 2px solid var(--accent-secondary);
        }
        @media (max-width: 991px) {
          .floating-3d-card { display: none; }
        }
        .hero-tilt-wrap {
          transform-style: preserve-3d;
        }
        .pipeline-3d-card {
          margin-top: 64px;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: var(--radius-md);
          padding: 24px;
          background: rgba(15, 15, 20, 0.7);
          backdrop-filter: blur(20px);
          position: relative;
          transform-style: preserve-3d;
        }
        .pipeline-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px dashed rgba(255,255,255,0.1);
          padding-bottom: 12px;
          margin-bottom: 16px;
        }
        .pipeline-sys-title {
          font-size: 11px;
          font-family: var(--font-sans);
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .dot-indicators {
          display: flex;
          gap: 6px;
        }
        .indicator-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }
        .indicator-dot.red { background: #ef4444; }
        .indicator-dot.yellow { background: #fbbf24; }
        .indicator-dot.green { background: #22c55e; }
        .pipeline-svg {
          width: 100%;
          height: auto;
          max-height: 180px;
        }
        .animated-path-primary {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: drawPath 4s forwards cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes drawPath {
          to { stroke-dashoffset: 0; }
        }
        .pulsing-revenue-dot {
          animation: pulseDot 2s infinite ease-in-out;
        }
        @keyframes pulseDot {
          0%, 100% { r: 6; stroke-width: 3; }
          50% { r: 9; stroke-width: 5; }
        }
      `}</style>
    </section>
  );
}
