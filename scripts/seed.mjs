/**
 * Seed script — adds demo blog posts to Sanity
 * Usage: node scripts/seed.mjs
 * Requires: SANITY_API_TOKEN and NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local
 */

import { createClient } from '@sanity/client';
import 'dotenv/config';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

// Picsum photos for cover images (stable URLs)
const COVER_IMAGES = [
  'https://picsum.photos/seed/seo/1200/630',
  'https://picsum.photos/seed/social/1200/630',
  'https://picsum.photos/seed/content/1200/630',
  'https://picsum.photos/seed/ppc/1200/630',
  'https://picsum.photos/seed/analytics/1200/630',
  'https://picsum.photos/seed/email/1200/630',
];

const posts = [
  {
    title: '10 SEO Strategies That Will Dominate 2025',
    slug: '10-seo-strategies-2025',
    excerpt:
      'Search algorithms are evolving faster than ever. Here are the battle-tested tactics that will keep your brand visible when it matters most.',
    category: 'SEO',
    readTime: 8,
    featured: true,
    publishedAt: '2025-03-15T09:00:00Z',
    imageUrl: COVER_IMAGES[0],
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: "SEO in 2025 isn't about gaming the algorithm — it's about building genuine authority. Google's Helpful Content updates have fundamentally shifted what it means to rank well, and brands that understood this early are seeing exponential returns.",
          },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: '1. Prioritise Topic Clusters Over Keywords' }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'The era of targeting isolated keywords is over. Modern SEO demands interconnected content ecosystems — pillar pages supported by detailed cluster articles. This architecture signals topical authority to search engines far more effectively than isolated optimised pages.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: '2. Core Web Vitals as Ranking Differentiators' }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: "Performance is no longer a nice-to-have. Pages that load in under 2 seconds with stable layouts and quick interactivity consistently outperform slower competitors — even when the slower page has stronger backlinks. Invest in your LCP, CLS, and INP scores before anything else.",
          },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: '3. E-E-A-T: Experience is the New Edge' }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: "Google's Quality Rater Guidelines now explicitly reward first-hand experience. Case studies, original data, and genuine practitioner insights carry enormous weight. If your content doesn't demonstrate that a real expert wrote it, it will struggle to compete in YMYL categories.",
          },
        ],
      },
      {
        _type: 'block',
        style: 'blockquote',
        children: [
          {
            _type: 'span',
            text: "The brands winning in search aren't thinking about keywords anymore — they're thinking about becoming the definitive source of truth in their niche.",
          },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: '4. Zero-Click Optimisation' }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Over 65% of searches now end without a click. Winning the featured snippet, knowledge panel, or People Also Ask box is often more valuable than ranking #1. Structure your content with clear definitions, numbered lists, and concise answers to common questions.',
          },
        ],
      },
    ],
  },
  {
    title: 'How I Grew a Brand's Instagram From 2K to 200K in 18 Months',
    slug: 'instagram-growth-case-study',
    excerpt:
      'A behind-the-scenes look at the content strategy, posting cadence, and community tactics that drove 100x follower growth for a lifestyle brand.',
    category: 'Social Media',
    readTime: 12,
    featured: true,
    publishedAt: '2025-02-20T09:00:00Z',
    imageUrl: COVER_IMAGES[1],
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: "In early 2023, a sustainable fashion brand came to me with 2,100 followers, inconsistent posting, and zero content strategy. By mid-2024, they had 207,000 engaged followers and Instagram had become their #1 revenue channel. Here's exactly what we did.",
          },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Phase 1: The Audit (Weeks 1–2)' }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: "Before creating a single piece of content, we spent two weeks auditing competitors, identifying content gaps, and defining the brand's unique visual language. Most brands skip this step and it shows. We mapped 47 competitor accounts, classified every post type, and found a clear gap: nobody was combining behind-the-scenes sustainability content with editorial photography.",
          },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Phase 2: Content Architecture' }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'We designed a 4-pillar content framework: (1) Educational carousels on sustainable fashion, (2) Brand storytelling reels, (3) UGC reposts with strong CTAs, and (4) Trend-responsive content. Each pillar served a different algorithmic function — reach, saves, shares, and engagement spikes respectively.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'blockquote',
        children: [
          {
            _type: 'span',
            text: "The algorithm doesn't reward consistency — it rewards momentum. Posting 3x a week with strategic intention beats posting daily with no plan.",
          },
        ],
      },
    ],
  },
  {
    title: 'The Content Marketing Funnel That Actually Converts',
    slug: 'content-marketing-funnel-converts',
    excerpt:
      'Most content strategies fail because they treat the funnel as a straight line. Here\'s a data-driven approach that matches content to buyer psychology at every stage.',
    category: 'Content Marketing',
    readTime: 10,
    featured: false,
    publishedAt: '2025-01-10T09:00:00Z',
    imageUrl: COVER_IMAGES[2],
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: "Content marketing ROI is notoriously hard to attribute, and most teams blame measurement tools when the real problem is strategic misalignment. The content at the top of your funnel has a completely different job than what's needed mid-funnel — and most brands produce everything as if it's the same piece.",
          },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Awareness Stage: Earn Attention, Not Clicks' }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: "TOFU content should answer questions your audience is already asking — not questions about your product. The goal is to appear in their life as a useful presence before they need you. Think: original research, genuinely useful guides, entertaining takes on industry trends.",
          },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Consideration Stage: Reduce Decision Friction' }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: "By the time someone is evaluating solutions, they're drowning in options. Your MOFU content should ruthlessly reduce cognitive load. Comparison articles, ROI calculators, case studies with specific numbers, and 'how it works' explainers all perform exceptionally here.",
          },
        ],
      },
    ],
  },
  {
    title: 'Google Ads in 2025: The Survival Guide',
    slug: 'google-ads-survival-guide-2025',
    excerpt:
      "Smart Bidding, Performance Max, and AI-generated creatives have changed PPC permanently. Here's how to maintain control and profitability in an increasingly automated landscape.",
    category: 'PPC & Ads',
    readTime: 9,
    featured: true,
    publishedAt: '2024-12-05T09:00:00Z',
    imageUrl: COVER_IMAGES[3],
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: "Google Ads has essentially become two different products: the interface you can see, and the machine-learning layer making most of the actual decisions. Advertisers who fight automation lose. Advertisers who blindly trust it also lose. The winners are those who understand how to guide the machine with better inputs.",
          },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Performance Max: Friend or Foe?' }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: "PMax campaigns consistently outperform standard campaigns for most ecommerce accounts — but only when fed high-quality audience signals, rich product feeds, and diverse creative assets. The problem isn't the campaign type; it's that most advertisers give it insufficient data and then blame the format when results disappoint.",
          },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'First-Party Data is Your New Moat' }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: "With third-party cookies largely deprecated, your CRM data has become your most valuable advertising asset. Customer match audiences built from purchase history dramatically improve both prospecting and remarketing performance. If you haven't integrated your CRM with Google Ads, this is the single highest-ROI action you can take today.",
          },
        ],
      },
    ],
  },
  {
    title: 'GA4 Deep Dive: The Metrics That Actually Matter',
    slug: 'ga4-metrics-that-matter',
    excerpt:
      "GA4's event-based model surfaces insights that Universal Analytics never could — but only if you know where to look. A practitioner's guide to the KPIs worth your attention.",
    category: 'Analytics',
    readTime: 7,
    featured: false,
    publishedAt: '2024-11-18T09:00:00Z',
    imageUrl: COVER_IMAGES[4],
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: "Most marketers moved to GA4 because they had to, not because they wanted to. The interface is counterintuitive and the metrics have new names for familiar concepts. But buried beneath the confusion are genuinely powerful insights that Universal Analytics couldn't surface — and they're worth the learning curve.",
          },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Engagement Rate > Bounce Rate' }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: "GA4's Engagement Rate (sessions lasting 10+ seconds, with a conversion, or with 2+ page views) is a far more useful signal than Bounce Rate ever was. A high bounce rate on a well-performing blog post was always misleading — someone could read your entire article and still 'bounce'. Engagement Rate surfaces actual quality.",
          },
        ],
      },
    ],
  },
  {
    title: 'Email Sequences That Generate 40%+ Open Rates',
    slug: 'email-sequences-high-open-rates',
    excerpt:
      "The average email open rate is 21%. These are the subject line formulas, send-time strategies, and segmentation techniques that consistently push well past 40%.",
    category: 'Email Marketing',
    readTime: 6,
    featured: false,
    publishedAt: '2024-10-30T09:00:00Z',
    imageUrl: COVER_IMAGES[5],
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: "Email has an image problem. Every marketer I speak to treats it as a broadcast channel — a megaphone for promotions. The brands getting 40%+ open rates treat it as a conversation. That fundamental shift in mindset changes everything: the subject lines you write, the segmentation you build, the cadence you choose.",
          },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Subject Lines: The 5-Second Gut Test' }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: "The best subject lines read like something a thoughtful colleague would write, not a marketing department. Specificity beats cleverness every time. '3 things I learned after spending $200K on Facebook ads' will outperform 'Boost your ad ROI today' in almost every segment. The former promises a specific, valuable, earned insight — the latter promises nothing but work.",
          },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Segmentation: Your Open Rate Multiplier' }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: "Sending the same email to your entire list is leaving performance on the table. At minimum, segment by: acquisition source, engagement level (champions, at-risk, dormant), and product interest based on browsing behaviour. A re-engagement sequence for dormant subscribers alone can lift overall list open rates by 8–12 percentage points.",
          },
        ],
      },
    ],
  },
];

async function uploadImageFromUrl(url, filename) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch image: ${url}`);
  const buffer = await response.arrayBuffer();
  const asset = await client.assets.upload('image', Buffer.from(buffer), {
    filename,
    contentType: 'image/jpeg',
  });
  return asset;
}

async function seed() {
  console.log('🌱  Starting seed…\n');

  // Delete existing posts
  const existing = await client.fetch(`*[_type == "post"]._id`);
  if (existing.length) {
    console.log(`🗑   Deleting ${existing.length} existing posts…`);
    await Promise.all(existing.map((id) => client.delete(id)));
  }

  for (const [index, post] of posts.entries()) {
    console.log(`📝  Creating post ${index + 1}/${posts.length}: "${post.title}"`);

    // Upload cover image
    let coverImage = null;
    try {
      console.log(`     ↳ Uploading cover image from ${post.imageUrl}`);
      const asset = await uploadImageFromUrl(
        post.imageUrl,
        `cover-${post.slug}.jpg`
      );
      coverImage = {
        _type: 'image',
        asset: { _type: 'reference', _ref: asset._id },
        alt: post.title,
      };
    } catch (err) {
      console.warn(`     ⚠  Could not upload image: ${err.message}`);
    }

    const doc = {
      _type: 'post',
      title: post.title,
      slug: { _type: 'slug', current: post.slug },
      excerpt: post.excerpt,
      category: post.category,
      readTime: post.readTime,
      featured: post.featured,
      publishedAt: post.publishedAt,
      coverImage,
      body: post.body.map((block) => ({
        ...block,
        _key: Math.random().toString(36).slice(2),
        ...(block.children && {
          children: block.children.map((child) => ({
            ...child,
            _key: Math.random().toString(36).slice(2),
          })),
        }),
      })),
    };

    await client.create(doc);
    console.log(`     ✓  Done\n`);
  }

  console.log(`✅  Seeded ${posts.length} demo posts successfully!`);
  console.log(`\n📌  Next steps:`);
  console.log(`    1. Go to https://sanity.io/manage to view your content`);
  console.log(`    2. Run "npm run dev" to start the Next.js app\n`);
}

seed().catch((err) => {
  console.error('❌  Seed failed:', err);
  process.exit(1);
});
