import Link from 'next/link';
import Image from 'next/image';
import BlogCard from '../../components/BlogCard';
import { getRecentPosts } from '../../lib/sanity';
import InteractiveHero from '../../components/InteractiveHero';

const PAIN_CARDS = [
  {
    title: 'Too many spreadsheets',
    desc: 'Registrations in one sheet, payments in another, room lists somewhere else. When something breaks, everything breaks.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <line x1="9" y1="3" x2="9" y2="21"/>
        <line x1="15" y1="3" x2="15" y2="21"/>
        <line x1="3" y1="9" x2="21" y2="9"/>
        <line x1="3" y1="15" x2="21" y2="15"/>
      </svg>
    )
  },
  {
    title: 'Too much manual chasing',
    desc: 'Spending hours sending payment reminders, answering who has paid, and updating group leaders by hand.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-3 0v2a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3v-2"/>
        <circle cx="12" cy="9" r="1"/>
      </svg>
    )
  },
  {
    title: 'Payments are painful',
    desc: 'Tracking partial payments across dozens of travelers, reconciling installments, and chasing overdue balances.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    )
  },
  {
    title: 'Disconnected tools',
    desc: 'Separate systems for bookings, communications, documents, and vendor coordination that do not talk to each other.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
      </svg>
    )
  },
  {
    title: 'Room lists rebuilt every trip',
    desc: 'A new Word document every time. Shared by email. Outdated the moment someone makes a change.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    )
  },
  {
    title: 'Proposals that lose deals',
    desc: 'Schools and school boards expect professionalism. Sending a PDF by email loses deals before the conversation starts.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    )
  }
];

const PILLARS = [
  {
    num: '01',
    title: 'Create Trips',
    sub: 'Launch trips faster, with fewer mistakes',
    desc: 'Create trips from a description or upload an existing document and let AI build the structure for you.',
    checklist: [
      'Flexible trip pricing & traveler types',
      'Booking cutoffs & group size limits',
      'Staff roles & assignment',
      'Trip documents & terms management'
    ]
  },
  {
    num: '02',
    title: 'Register Travelers',
    sub: 'Self-service registration, operator stays in control',
    desc: 'Travelers register and manage their own accounts while you see everything in real time from your dashboard.',
    checklist: [
      'Multi-traveler accounts for families',
      'Restrictions & special requirements',
      'Optional add-ons during registration',
      'Waitlist handling when trips are full'
    ]
  },
  {
    num: '03',
    title: 'Collect Payments',
    sub: 'Stop chasing, automate it',
    desc: 'Online payments, installment schedules, per-traveler tracking, automated reminders. All built in.',
    checklist: [
      'Installments & payment schedules',
      'Shareable payment links',
      'Refunds & payment adjustments',
      'Fundraising and scholarship support'
    ]
  },
  {
    num: '04',
    title: 'Send Quotations',
    sub: 'Look professional from the first conversation',
    desc: 'Create and share versioned trip quotations with clear inclusions, exclusions, payment schedules, and T&Cs.',
    checklist: [
      'Versioned quote documents',
      'Inclusions, exclusions & assumptions',
      'Payment schedule visibility',
      'Digital sign-off & agreements'
    ]
  },
  {
    num: '05',
    title: 'Stay in Control',
    sub: 'Real-time visibility across every trip',
    desc: 'One dashboard. Every registration, payment, capacity status, and staff assignment — always current.',
    checklist: [
      'Centralized trip management',
      'Role-based staff access',
      'Capacity & waitlist control',
      'Communication history per trip'
    ]
  },
  {
    num: '06',
    title: 'Execute On-Trip',
    sub: 'Everything your team needs on the ground',
    desc: 'Room lists, coach lists, vendor reservations, tour manager access. The operational detail that matters.',
    checklist: [
      'Room & coach list versioning',
      'Vendor management & payments',
      'Final paperwork packets',
      'Tour manager mobile access'
    ]
  }
];

const AI_FEATURES = [
  {
    tag: 'Trip Creation',
    title: 'AI Trip Creation',
    desc: 'Describe a trip in plain language or upload an existing document, and Voyita automatically builds the complete trip structure for you.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    )
  },
  {
    tag: 'Itinerary Creation',
    title: 'AI Itinerary Builder',
    desc: 'Write your itinerary in natural language or upload an existing document. Voyita automatically organizes it into a day-by-day plan.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    )
  },
  {
    tag: 'Visual Assets',
    title: 'AI-Generated Trip Images',
    desc: 'Instantly generate compelling visuals for your trips and itineraries without needing a dedicated design team.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <polyline points="21 15 16 10 5 21"/>
      </svg>
    )
  },
  {
    tag: 'Communications',
    title: 'AI Communications',
    desc: 'Tour coordinators, managers, and group leaders can draft highly professional and accurate group communications in seconds.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    )
  },
  {
    tag: 'Cost Sheets',
    title: 'AI Cost Sheet Generation',
    desc: 'Enter your trip parameters and let AI populate your comprehensive cost sheet line by line or entirely at once.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    )
  },
  {
    tag: 'Internal Ops',
    title: 'AI Knowledge Base & Insights',
    desc: 'Empower your team with an AI training assistant and automatically surface actionable insights directly from customer feedback.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
      </svg>
    )
  }
];

const OUTCOMES = [
  {
    title: 'More professional client experience',
    desc: 'Deliver versioned quotations, digital agreements, and a mobile-friendly traveler portal so every client interaction looks polished.'
  },
  {
    title: 'Scale without adding headcount',
    desc: 'Manage more trips, travelers, and complex itineraries without hiring additional staff to handle the workload manually.'
  },
  {
    title: 'A platform you can trust',
    desc: 'Your funds move on a clear, predictable schedule with transparent fees, no surprises, and dedicated support when you need it.'
  }
];

const COMPARISON_TODAY = [
  'Word docs for room lists, rebuilt from scratch every trip',
  'Group leaders call or email for every update',
  'Manual itinerary creation that takes hours every trip',
  'Manual payment reminders via email or WhatsApp',
  'Funds held or frozen without explanation',
  'Hidden fees and penalties on cancellations'
];

const COMPARISON_VOYITA = [
  'Room & coach lists built, versioned, and shared in-platform',
  'Group leader portal provides real-time visibility, no calls needed',
  'Automated itinerary creation built specifically for complex group travel',
  'Automated payment schedules and reminder sequences',
  'Funds transferred on a clear, predictable schedule',
  'Transparent fees with no penalties on cancellations'
];

const MOCK_POSTS = [
  {
    _id: 'mock1',
    title: '5 Ways Group Tour Operators Scale Booking Volume by 3x',
    slug: { current: 'scale-booking-volume' },
    excerpt: 'Discover how modern group operators are using automation and self-service registration to double their trip count without adding any headcount.',
    category: 'Scale Operations',
    readTime: 5,
    publishedAt: new Date().toISOString(),
  },
  {
    _id: 'mock2',
    title: 'How to Reconcile Installment Payments Without the Spreadsheets',
    slug: { current: 'reconcile-installment-payments' },
    excerpt: 'Tired of tracking partial payments manually? Learn the exact workflow for setting up automatic payment schedules and automated notifications.',
    category: 'Payments',
    readTime: 7,
    publishedAt: new Date().toISOString(),
  },
  {
    _id: 'mock3',
    title: 'Designing proposals that actually win school board deals',
    slug: { current: 'winning-proposals' },
    excerpt: 'School boards expect high professionalism. See the checklist for versioned proposals with digital agreements and transparent exclusions.',
    category: 'Sales Strategy',
    readTime: 4,
    publishedAt: new Date().toISOString(),
  }
];

export default async function HomePage() {
  let posts = [];
  try {
    posts = await getRecentPosts(3);
  } catch (e) {
    // Falls back gracefully
  }

  if (!posts || posts.length === 0) {
    posts = MOCK_POSTS;
  }

  return (
    <>
      {/* ── Interactive Hero Section ── */}
      <InteractiveHero />

      {/* ── Problem Section ── */}
      <section className="voyita-section" id="about">
        <div className="voyita-container">
          <div className="voyita-section-title">
            <span>The Problem</span>
            <h2 className="voyita-h2">
              The current reality of group travel operations
            </h2>
          </div>

          <div className="voyita-pain-grid">
            {PAIN_CARDS.map((card) => (
              <div className="voyita-pain-card" key={card.title}>
                <div className="voyita-pain-icon">{card.icon}</div>
                <h3 className="voyita-h3">{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── End-To-End Operations / Pillars Timeline ── */}
      <section className="voyita-section voyita-section-light" id="operations">
        <div className="voyita-container">
          <div className="voyita-section-title">
            <span style={{ color: 'var(--voyita-blue)' }}>End-to-End Operations</span>
            <h2 className="voyita-h2">Voyita, one place for all of it</h2>
          </div>

          <div className="voyita-timeline-wrapper">
            {PILLARS.map((pillar) => (
              <div className="voyita-pillar-row" key={pillar.num}>
                <div className="voyita-pillar-num-wrapper">
                  <div className="voyita-pillar-num">{pillar.num}</div>
                </div>

                <div className="voyita-pillar-content">
                  <span className="voyita-badge voyita-badge-blue" style={{ fontSize: '10px', padding: '4px 10px', marginBottom: '8px' }}>
                    Pillar {pillar.num}
                  </span>
                  <h3>{pillar.title}</h3>
                  <div className="voyita-h3" style={{ fontSize: '16px', color: '#4b5563', marginBottom: '12px', fontWeight: '600' }}>
                    {pillar.sub}
                  </div>
                  <p>{pillar.desc}</p>
                  
                  <div className="voyita-pillar-checklist">
                    {pillar.checklist.map((item) => (
                      <div className="voyita-pillar-check-item" key={item}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="voyita-pillar-visual">
                  <div className="voyita-logo-icon" style={{ width: '80px', height: '80px', fontSize: '32px', borderRadius: '16px', opacity: 0.1, color: 'var(--voyita-navy)' }}>
                    {pillar.num}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI Features Section ── */}
      <section className="voyita-section" id="ai" style={{ backgroundColor: 'var(--voyita-navy-dark)' }}>
        <div className="voyita-container">
          <div className="voyita-section-title">
            <span style={{ color: 'var(--voyita-gold)' }}>Powered by AI</span>
            <h2 className="voyita-h2">
              AI-powered group travel management, built for operators
            </h2>
            <p className="voyita-lead" style={{ marginTop: '16px', maxWidth: '640px', marginLeft: 'auto', marginRight: 'auto' }}>
              Voyita's tour management software handles the repetitive work of trip creation, communications, and cost sheets.
            </p>
          </div>

          <div className="voyita-ai-grid">
            {AI_FEATURES.map((feat) => (
              <div className="voyita-ai-card" key={feat.title}>
                <div className="voyita-ai-icon-wrapper">
                  <div className="voyita-ai-icon">{feat.icon}</div>
                  <span className="voyita-ai-tag">{feat.tag}</span>
                </div>
                <h3 className="voyita-h3">{feat.title}</h3>
                <p>{feat.desc}</p>
              </div>
            ))}
          </div>

          {/* AI Metrics Counters */}
          <div className="voyita-ai-metrics">
            <div className="voyita-ai-metric-item">
              <div className="voyita-ai-metric-val">10s</div>
              <div className="voyita-ai-metric-label">to build a complete trip from a description</div>
            </div>
            <div className="voyita-ai-metric-item">
              <div className="voyita-ai-metric-val">4×</div>
              <div className="voyita-ai-metric-label">faster itinerary building with AI</div>
            </div>
            <div className="voyita-ai-metric-item">
              <div className="voyita-ai-metric-val">∞</div>
              <div className="voyita-ai-metric-label">trip images generated on demand</div>
            </div>
            <div className="voyita-ai-metric-item">
              <div className="voyita-ai-metric-val">1-Click</div>
              <div className="voyita-ai-metric-label">cost sheet population for any trip</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Results / Outcomes Section ── */}
      <section className="voyita-section" id="results">
        <div className="voyita-container">
          <div className="voyita-section-title">
            <span>Results</span>
            <h2 className="voyita-h2">
              What operators experience when they switch
            </h2>
          </div>

          <div className="voyita-outcomes-grid">
            {OUTCOMES.map((outcome) => (
              <div className="voyita-outcome-card" key={outcome.title}>
                <div className="voyita-outcome-check">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h3 className="voyita-h3">{outcome.title}</h3>
                <p>{outcome.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparative Before / After Grid ── */}
      <section className="voyita-section" id="control" style={{ backgroundColor: 'var(--voyita-navy-dark)' }}>
        <div className="voyita-container">
          <div className="voyita-section-title">
            <span>Why Voyita</span>
            <h2 className="voyita-h2">
              Purpose-built for group operators for their diverse needs
            </h2>
          </div>

          <div className="voyita-comparison-grid">
            
            {/* Box 1: How it works today */}
            <div className="voyita-comparison-box today">
              <h3 className="voyita-h3" style={{ color: 'var(--voyita-error)' }}>
                <span className="voyita-comparison-icon today" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>✗</span>
                How it works today
              </h3>
              <div className="voyita-comparison-list">
                {COMPARISON_TODAY.map((item) => (
                  <div className="voyita-comparison-item today" key={item}>
                    <span style={{ color: 'var(--voyita-error)', fontWeight: 'bold' }}>✗</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Box 2: With Voyita */}
            <div className="voyita-comparison-box voyita" style={{ borderColor: 'rgba(81, 96, 238, 0.3)' }}>
              <h3 className="voyita-h3" style={{ color: 'var(--voyita-success)' }}>
                <span className="voyita-comparison-icon voyita" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }}>✓</span>
                With Voyita
              </h3>
              <div className="voyita-comparison-list">
                {COMPARISON_VOYITA.map((item) => (
                  <div className="voyita-comparison-item voyita" key={item}>
                    <span style={{ color: 'var(--voyita-success)', fontWeight: 'bold' }}>✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Blog Previews ── */}
      <section className="voyita-section" id="blog">
        <div className="voyita-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <span className="voyita-badge voyita-badge-blue" style={{ marginBottom: '12px' }}>Growth Library</span>
              <h2 className="voyita-h2" style={{ marginTop: '8px' }}>Operator playbooks &amp; guides</h2>
            </div>
            <Link href="/blog" className="voyita-btn-secondary" style={{ padding: '8px 20px', fontSize: '13px' }}>
              See All Articles →
            </Link>
          </div>

          <div className="blog-grid">
            {posts.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* ── High-Contrast Bottom CTA Banner ── */}
      <section className="voyita-section" id="contact" style={{ paddingTop: '40px' }}>
        <div className="voyita-container">
          <div className="voyita-cta-banner">
            <div className="voyita-cta-content">
              <h2 className="voyita-h2">
                More trips per season. Less admin. More control.
              </h2>
              <p>
                Join the operators who have replaced spreadsheets, manual chasing, and disconnected tools with one platform that actually fits how they work.
              </p>
              <div className="voyita-cta-buttons">
                <Link href="/#contact" className="voyita-btn-orange">
                  Book a Demo
                </Link>
                <Link href="/#contact" className="voyita-btn-secondary">
                  Talk to Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
