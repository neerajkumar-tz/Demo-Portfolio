import Link from 'next/link';
import BlogCard from '../components/BlogCard';
import { getRecentPosts, urlFor } from '../lib/sanity';

const MARQUEE_ITEMS = [
  'SEO Strategy', 'Paid Media', 'Content Marketing', 'Growth Analytics',
  'Brand Building', 'Social Media', 'Email Marketing', 'Conversion Rate Optimisation',
];

const SERVICES = [
  {
    icon: '🔍',
    title: 'Search Engine Optimisation',
    desc: 'Technical audits, topic-cluster strategies, and content roadmaps that drive compounding organic growth for competitive markets.',
  },
  {
    icon: '📣',
    title: 'Paid Media & PPC',
    desc: 'Performance-first Google & Meta campaigns with rigorous testing frameworks — from first touch to final conversion.',
  },
  {
    icon: '✍️',
    title: 'Content Strategy',
    desc: 'Editorial calendars, long-form content, and distribution plans that build authority and generate qualified leads at scale.',
  },
  {
    icon: '📊',
    title: 'Analytics & Attribution',
    desc: 'GA4 implementation, custom dashboards, and multi-touch attribution modelling to make confident, data-backed decisions.',
  },
  {
    icon: '📱',
    title: 'Social Media Marketing',
    desc: 'Platform-native strategies for LinkedIn, Instagram, and X — focused on community growth and measurable business outcomes.',
  },
  {
    icon: '📧',
    title: 'Email Marketing',
    desc: 'Lifecycle automations, segmentation strategies, and A/B-tested campaigns that turn subscribers into loyal customers.',
  },
];

const TESTIMONIALS = [
  {
    quote: 'Alex transformed our digital presence. Organic traffic tripled in 8 months and our CAC dropped 40%. The strategic clarity she brings is unmatched.',
    name: 'Sarah Chen',
    role: 'CMO, Vello Health',
    initials: 'SC',
  },
  {
    quote: "Working with Alex feels like having a senior marketing director on call. She identified growth levers we'd completely overlooked and executed flawlessly.",
    name: 'Marcus Obi',
    role: 'Founder, Kova Studio',
    initials: 'MO',
  },
  {
    quote: 'Our Google Ads ROAS went from 1.8x to 4.6x within 90 days. Alex\'s data-first approach and creative testing framework are genuinely best-in-class.',
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
    // Sanity not configured yet — render without posts
  }

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid-line" />

        <div className="container">
          <div className="hero-content">
            <div className="hero-eyebrow animate-fade-up">
              <span className="hero-eyebrow-line" />
              <span className="label">Digital Marketing Strategist</span>
              <span className="hero-eyebrow-line" />
            </div>

            <h1 className="hero-title animate-fade-up delay-1">
              Marketing that <em>moves</em><br />the needle.
            </h1>

            <p className="hero-subtitle animate-fade-up delay-2">
              I help ambitious brands scale through data-driven SEO, paid media, and
              content that converts. 8+ years. 60+ brands. Measurable results.
            </p>

            <div className="hero-actions animate-fade-up delay-3">
              <Link href="/#contact" className="btn-primary">
                Start a Project →
              </Link>
              <Link href="/blog" className="btn-secondary">
                Read the Blog
              </Link>
            </div>
          </div>
        </div>

        <div className="hero-scroll">
          <div className="scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      {/* ── Marquee ──────────────────────────────────────────────── */}
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

      {/* ── Stats ────────────────────────────────────────────────── */}
      <section className="section" id="results">
        <div className="container">
          <span className="label">By the Numbers</span>
          <div className="stats-grid" style={{ marginTop: '32px' }}>
            {[
              { n: '60+',   l: 'Brands Scaled' },
              { n: '8+',    l: 'Years Experience' },
              { n: '312%',  l: 'Avg. Organic Traffic Lift' },
              { n: '$40M+', l: 'Ad Spend Managed' },
            ].map(({ n, l }) => (
              <div className="stat-card" key={l}>
                <div className="stat-number">{n}</div>
                <div className="stat-label">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ────────────────────────────────────────────────── */}
      <section className="section" id="about">
        <div className="container">
          <div className="about-grid">
            <div className="about-image-wrap">
              <div className="about-image-frame">
                <img
                  src="https://picsum.photos/seed/portrait/600/800"
                  alt="Alex Rivera"
                  loading="lazy"
                />
              </div>
              <div className="about-image-accent">
                <span className="accent-num">8+</span>
                <span className="accent-txt">Years in<br />the field</span>
              </div>
            </div>

            <div className="about-text">
              <span className="label">About Me</span>
              <h2>Strategy first.<br />Results always.</h2>

              <p>
                I'm Alex Rivera — a digital marketing strategist based in New York with a track
                record of turning underperforming channels into growth engines. I've worked with
                seed-stage startups and Fortune 500 companies, and my approach is the same: ruthless
                prioritisation of what actually moves revenue.
              </p>
              <p>
                My work spans organic search, paid acquisition, content operations, and analytics
                infrastructure. I don't just hand over a strategy deck — I sit in the trenches,
                build the systems, and iterate until the numbers say we're winning.
              </p>
              <p>
                Previously at Ogilvy, WPP, and led growth at two Series B SaaS companies. Now
                independent, working with a select roster of brands that take marketing seriously.
              </p>

              <div className="about-tag-row">
                {['SEO', 'Paid Media', 'Analytics', 'Content', 'Email', 'CRO', 'Brand Strategy', 'Growth'].map(t => (
                  <span key={t} className="about-tag">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────────────── */}
      <section className="section" id="services" style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="services-header">
            <div>
              <span className="label">What I Do</span>
              <h2 style={{ marginTop: '12px' }}>Services built<br />for growth.</h2>
            </div>
            <Link href="/#contact" className="btn-secondary">
              Get a Proposal
            </Link>
          </div>

          <div className="services-grid">
            {SERVICES.map(({ icon, title, desc }) => (
              <div className="service-card" key={title}>
                <span className="service-icon">{icon}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Blog ─────────────────────────────────────────────────── */}
      <section className="section" id="blog">
        <div className="container">
          <div className="blog-header">
            <div>
              <span className="label">From the Blog</span>
              <h2 style={{ marginTop: '12px' }}>Insights &amp;<br />deep dives.</h2>
            </div>
            <Link href="/blog" className="view-all">View All Posts →</Link>
          </div>

          {posts.length > 0 ? (
            <div className="blog-grid">
              {posts.map((post) => (
                <BlogCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <div style={{
              background: 'var(--bg-2)',
              border: '1px dashed var(--border-strong)',
              borderRadius: 'var(--radius-md)',
              padding: '60px',
              textAlign: 'center',
              color: 'var(--text-muted)',
            }}>
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: '14px' }}>
                Connect Sanity and run <code style={{ background: 'var(--surface)', padding: '2px 8px', borderRadius: '4px', color: 'var(--accent-2)' }}>npm run seed</code> to populate blog posts.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────── */}
      <section className="section testimonials-bg">
        <div className="container">
          <span className="label">Client Love</span>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', marginTop: '12px' }}>
            What clients say.
          </h2>

          <div className="testimonials-grid">
            {TESTIMONIALS.map(({ quote, name, role, initials }) => (
              <div className="testimonial-card" key={name}>
                <div className="testimonial-quote">"</div>
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

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="section cta-section" id="contact">
        <div className="container">
          <span className="label">Let's Talk</span>
          <h2 style={{ marginTop: '16px' }}>
            Ready to grow<br />your brand?
          </h2>
          <p>
            Drop me a line and let's explore what's possible. Engagements start
            from a free 30-minute strategy call.
          </p>
          <a href="mailto:hello@alexrivera.marketing" className="btn-primary">
            hello@alexrivera.marketing →
          </a>
        </div>
      </section>
    </>
  );
}
