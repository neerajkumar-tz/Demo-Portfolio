import Link from 'next/link';
import BlogCard from '../../components/BlogCard';
import { getRecentPosts } from '../../lib/sanity';

const MARQUEE_ITEMS = [
  'Search Optimisation', 'Paid Ads & PPC', 'Content Funnels', 'Growth Analytics',
  'Brand Positioning', 'Social Authority', 'Lifecycle Automations', 'CRO Testing',
];

const SERVICES = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Search Engine Optimisation',
    desc: 'Technical audits, topical-authority mapping, and advanced content systems that capture high-intent search traffic and build compounding organic compounding growth.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2V22M17 5H9.5C8.67157 5 8 5.67157 8 6.5C8 7.32843 8.67157 8 9.5 8H14.5C15.3284 8 16 8.67157 16 9.5C16 10.3284 15.3284 11 14.5 11H8M17 14H9.5C8.67157 14 8 14.6716 8 15.5C8 16.3284 8.67157 17 9.5 17H16" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Paid Media & PPC',
    desc: 'Performance-driven acquisition campaigns across Google, Meta, and LinkedIn with a focus on conversion rate alignment, custom landing pages, and rapid testing pipelines.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 20H21M3 20L10 4L14 12L17 8L21 16" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Content Strategy',
    desc: 'B2B content operations, custom lead generation magnet pieces, and syndication strategies that establish industry authority and predictably warm cold pipeline accounts.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 20V10M12 20V4M6 20V14" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Analytics & Attribution',
    desc: 'Custom GA4 migrations, server-side tracking, multi-touch attribution dashboards, and cohort analysis metrics that reveal what moves revenue.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 8L21 12M21 12L17 16M21 12H9C7.14348 12 5.36301 11.2625 3.97827 9.94975C2.59353 8.63702 1.81598 6.85652 1.81598 5" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Conversion Optimisation',
    desc: 'Iterative checkout tuning, user session recording audits, visual heatmaps, and systematic landing page experiments designed to multiply existing lead velocity.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 4H20V20H4V4Z" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4 12H20M12 4V20" stroke="var(--border-strong)" strokeWidth="1" strokeDasharray="3 3"/>
      </svg>
    ),
    title: 'Growth Consulting',
    desc: 'Comprehensive fractional head-of-growth engagements covering full marketing stack configuration, execution playbooks, and internal talent coaching.',
  },
];

const TESTIMONIALS = [
  {
    quote: 'Alex completely transformed our organic pipeline. Monthly leads tripled inside 6 months and acquisition costs decreased by 40%. The tactical detail she operates at is genuinely next-level.',
    name: 'Sarah Chen',
    role: 'VP of Marketing, Vello Health',
    initials: 'SC',
  },
  {
    quote: "She operates like an internal marketing director rather than a consultant. She spotted friction points in our checkout flow that tripled conversion rates in a single month.",
    name: 'Marcus Obi',
    role: 'Founder, Kova Studio',
    initials: 'MO',
  },
  {
    quote: 'Our Meta ROAS rocketed from 1.6x to 4.2x inside 90 days. Her meticulous performance matrices and cohort testing frameworks are best-in-class.',
    name: 'Priya Nair',
    role: 'Head of Growth, Cartly',
    initials: 'PN',
  },
];

export default async function HomePage() {
  let posts = [];
  try {
    posts = await getRecentPosts(3);
  } catch (e) {
    // Falls back gracefully
  }

  return (
    <>
      {/* ── Hero Section ────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid-line" />

        <div className="container">
          <div className="hero-content">
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
            
            {/* Interactive Motion Graphic: Blueprint SVG */}
            <div className="animate-fade-up delay-4" style={{ 
              marginTop: '64px',
              border: '1px dashed var(--border-strong)', 
              borderRadius: 'var(--radius-md)', 
              padding: '24px',
              background: 'rgba(255, 255, 255, 0.01)',
              position: 'relative'
            }}>
              <span className="stitch-corner-tl">+</span>
              <span className="stitch-corner-tr">+</span>
              <span className="stitch-corner-bl">+</span>
              <span className="stitch-corner-br">+</span>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px dashed var(--border)', paddingBottom: '12px', marginBottom: '16px' }}>
                <span style={{ fontSize: '11px', fontFamily: 'var(--font-ui)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Marketing Pipeline Attribution.sys</span>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ef4444' }}></span>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fbbf24' }}></span>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }}></span>
                </div>
              </div>
              <svg viewBox="0 0 800 240" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', maxHeight: '180px' }}>
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
                <path d="M 80,140 Q 200,60 320,110 T 560,180 T 720,50" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" strokeDasharray="1000" strokeDashoffset="0">
                  <animate attributeName="stroke-dashoffset" values="1000;0" dur="4s" repeatCount="1" />
                </path>
                <path d="M 80,140 Q 200,60 320,110 T 560,180 T 720,50" stroke="var(--accent)" strokeWidth="8" strokeLinecap="round" opacity="0.15" />
                
                <path d="M 80,160 Q 200,100 320,160 T 560,90 T 720,110" stroke="var(--accent-secondary)" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
                
                {/* Nodes & Data Dots */}
                <circle cx="80" cy="140" r="5" fill="#fff" stroke="var(--accent)" strokeWidth="2" />
                <circle cx="270" cy="95" r="5" fill="#fff" stroke="var(--accent)" strokeWidth="2" />
                <circle cx="480" cy="145" r="5" fill="#fff" stroke="var(--accent)" strokeWidth="2" />
                <circle cx="720" cy="50" r="6" fill="#fff" stroke="var(--accent)" strokeWidth="3">
                  <animate attributeName="r" values="6;9;6" dur="2s" repeatCount="indefinite" />
                </circle>
                
                {/* Labels */}
                <text x="80" y="225" fill="var(--text-muted)" fontSize="10" fontFamily="var(--font-ui)" letterSpacing="0.1em" textAnchor="middle">ACQUISITION</text>
                <text x="280" y="225" fill="var(--text-muted)" fontSize="10" fontFamily="var(--font-ui)" letterSpacing="0.1em" textAnchor="middle">ENGAGEMENT</text>
                <text x="480" y="225" fill="var(--text-muted)" fontSize="10" fontFamily="var(--font-ui)" letterSpacing="0.1em" textAnchor="middle">RETENTION</text>
                <text x="680" y="225" fill="var(--accent)" fontSize="10" fontFamily="var(--font-ui)" letterSpacing="0.1em" textAnchor="middle" fontWeight="bold">REVENUE ENGINE</text>
                
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
      </section>

      {/* ── Marquee Section ─────────────────────────────────────── */}
      <div className="marquee-section">
        <div className="marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <div key={i} className="marquee-item">
              <span className="marquee-dot" />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* ── Statistics / Results ────────────────────────────────── */}
      <section className="section" id="results">
        <div className="container">
          <span className="label">Performance Matrices</span>
          <div className="stats-grid">
            {[
              { n: '60+',   l: 'High Growth Brands Scaled' },
              { n: '8+',    l: 'Years Inside Marketing Trenches' },
              { n: '312%',  l: 'Average Organic Traffic Lift' },
              { n: '$40M+', l: 'Attributed Paid Acquisition Budget' },
            ].map(({ n, l }) => (
              <div className="stat-card" key={l}>
                <span className="stitch-corner-tl">+</span>
                <span className="stitch-corner-tr">+</span>
                <span className="stitch-corner-bl">+</span>
                <span className="stitch-corner-br">+</span>
                <div className="stat-number">{n}</div>
                <div className="stat-label">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About Details ───────────────────────────────────────── */}
      <section className="section" id="about">
        <div className="container">
          <div className="about-grid">
            <div className="about-image-wrap">
              {/* Stitched grid layout corners inside wrapping frame */}
              <span className="stitch-corner-tl">+</span>
              <span className="stitch-corner-tr">+</span>
              <span className="stitch-corner-bl">+</span>
              <span className="stitch-corner-br">+</span>
              <div className="about-image-frame">
                <img
                  src="https://picsum.photos/seed/editorial/600/800"
                  alt="Alex Rivera Portrait"
                  loading="lazy"
                />
              </div>
              <div className="about-image-accent">
                <span className="accent-num">8+</span>
                <span className="accent-txt">Years scaling<br />companies</span>
              </div>
            </div>

            <div className="about-text">
              <span className="label">Principal Profile</span>
              <h2 style={{ marginTop: '16px' }}>Data-driven strategy.<br />Repeatable growth patterns.</h2>

              <p>
                I am Alex Rivera — a digital growth consultant specializing in turning underperforming
                funnels into highly optimized, scaling sales operations. Operating as a strategic marketing
                director, I collaborate with founders to construct scalable distribution frameworks.
              </p>
              <p>
                My process maps SEO infrastructure, programmatic attribution, paid advertising testing cycles,
                and high-converting landing assets. I prioritize metrics that drive net operating profit and
                repeatable growth curves over standard superficial volume charts.
              </p>
              <p>
                Previously at Ogilvy and led global growth marketing at two scaling B2B enterprise software companies.
                Currently operating independently, offering a highly hands-on partnership to a selective group
                of fast-moving brands.
              </p>

              <div className="about-tag-row">
                {['Advanced SEO', 'PPC Attribution', 'Funnel Architectures', 'B2B Cohort Cycles', 'Programmatic Growth', 'Landing Page CRO'].map(t => (
                  <span key={t} className="about-tag">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stitched Services Grid ──────────────────────────────── */}
      <section className="section" id="services" style={{ background: 'var(--bg-2)' }}>
        <div className="container">
          <div className="services-header">
            <div>
              <span className="label">Attribution Stack</span>
              <h2 style={{ marginTop: '16px' }}>Engineered channels<br />that compound values.</h2>
            </div>
            <Link href="/#contact" className="btn-secondary">
              Acquisition Assessment
            </Link>
          </div>

          <div className="services-grid">
            {SERVICES.map(({ icon, title, desc }) => (
              <div className="service-card" key={title}>
                <span className="stitch-corner-tl">+</span>
                <span className="stitch-corner-tr">+</span>
                <span className="stitch-corner-bl">+</span>
                <span className="stitch-corner-br">+</span>
                <span className="service-icon">{icon}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Elegant Blog Previews ───────────────────────────────── */}
      <section className="section" id="blog">
        <div className="container">
          <div className="blog-header">
            <div>
              <span className="label">Growth Library</span>
              <h2 style={{ marginTop: '16px' }}>Marketing insights<br />worth reading.</h2>
            </div>
            <Link href="/blog" className="view-all">See All Playbooks →</Link>
          </div>

          {posts.length > 0 ? (
            <div className="blog-grid">
              {posts.map((post) => (
                <BlogCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <div style={{
              background: 'rgba(255,255,255,0.01)',
              border: '1px dashed var(--border-strong)',
              borderRadius: 'var(--radius-md)',
              padding: '80px',
              textAlign: 'center',
              position: 'relative'
            }}>
              <span className="stitch-corner-tl">+</span>
              <span className="stitch-corner-tr">+</span>
              <span className="stitch-corner-bl">+</span>
              <span className="stitch-corner-br">+</span>
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: '14px', color: 'var(--text-muted)' }}>
                Populating recent playbooks... Run <code style={{ background: 'var(--bg-3)', padding: '4px 10px', borderRadius: '4px', color: 'var(--accent)' }}>npm run seed</code> to trigger demo posts.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── Testimonials ────────────────────────────────────────── */}
      <section className="section testimonials-bg">
        <div className="container">
          <span className="label">Validated Engagements</span>
          <h2 style={{ marginTop: '16px' }}>Partner experiences.</h2>

          <div className="testimonials-grid">
            {TESTIMONIALS.map(({ quote, name, role, initials }) => (
              <div className="testimonial-card" key={name}>
                <span className="stitch-corner-tl">+</span>
                <span className="stitch-corner-tr">+</span>
                <span className="stitch-corner-bl">+</span>
                <span className="stitch-corner-br">+</span>
                <div className="testimonial-quote">“</div>
                <p>{quote}</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{initials}</div>
                  <div>
                    <div className="author-name">{name}</div>
                    <div className="author-role">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA / Contact ───────────────────────────────────────── */}
      <section className="section cta-section" id="contact">
        <div className="container">
          <span className="label">Attribution Audit</span>
          <h2 style={{ marginTop: '20px' }}>
            Ready to design<br />your acquisition blueprint?
          </h2>
          <p style={{ marginTop: '16px' }}>
            Book a complimentary growth pipeline audit. I will review your stack, highlight leaks, and
            provide three immediately actionable expansion strategies.
          </p>
          <a href="mailto:hello@alexrivera.marketing" className="btn-primary" style={{ marginTop: '24px' }}>
            hello@alexrivera.marketing →
          </a>
        </div>
      </section>
    </>
  );
}
