import Link from 'next/link';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { getPostBySlug, getAllPostSlugs, urlFor } from '../../../../lib/sanity';
import { notFound } from 'next/navigation';
import ProgressBar from '../../../../components/ProgressBar';
import FaqSection from '../../../../components/FaqSection';

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const slugs = await getAllPostSlugs();
    return slugs.map(({ slug }) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }) {
  try {
    const post = await getPostBySlug(params.slug);
    if (!post) return {};
    return {
      title: `${post.title} | Alex Rivera Playbooks`,
      description: post.excerpt,
    };
  } catch {
    return {};
  }
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

const ptComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h2:     ({ children }) => <h2>{children}</h2>,
    h3:     ({ children }) => <h3>{children}</h3>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em:     ({ children }) => <em>{children}</em>,
    code:   ({ children }) => <code>{children}</code>,
    link:   ({ children, value }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer">{children}</a>
    ),
  },
  types: {
    image: ({ value }) => {
      const src = value?.asset ? urlFor(value).width(1200).url() : null;
      return src ? (
        <figure style={{ margin: '48px 0', border: '1px dashed var(--border-strong)', padding: '8px', borderRadius: 'var(--radius-md)', background: 'var(--bg-2)', position: 'relative' }}>
          <span className="stitch-corner-tl">+</span>
          <span className="stitch-corner-tr">+</span>
          <span className="stitch-corner-bl">+</span>
          <span className="stitch-corner-br">+</span>
          <img
            src={src}
            alt={value?.alt || 'Article Graphic'}
            style={{ width: '100%', borderRadius: 'var(--radius)', display: 'block' }}
          />
          {value?.alt && (
            <figcaption style={{
              textAlign: 'center',
              fontSize: '12px',
              color: 'var(--text-muted)',
              marginTop: '12px',
              fontFamily: 'var(--font-sans)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              {value.alt}
            </figcaption>
          )}
        </figure>
      ) : null;
    },
  },
};

export default async function PostPage({ params }) {
  let post = null;
  try {
    post = await getPostBySlug(params.slug);
  } catch (e) {
    notFound();
  }

  if (!post) notFound();

  const coverSrc = post.coverImage?.asset
    ? urlFor(post.coverImage).width(1400).height(650).fit('crop').url()
    : `https://picsum.photos/seed/${params.slug}/1400/650`;

  // Calculate Author details with secure fallback defaults
  const authorName = post.authorName || 'Alex Rivera';
  const authorImageSrc = post.authorImage?.asset
    ? urlFor(post.authorImage).width(120).height(120).fit('crop').url()
    : `https://picsum.photos/seed/${encodeURIComponent(authorName)}/120/120`;

  return (
    <>
      {/* Dynamic Scroll Reading Progress bar */}
      <ProgressBar />

      <article style={{ position: 'relative', zIndex: 2 }}>
        <div className="post-hero">
          <div className="container">
            <Link href="/blog" className="back-link">
              ← Return to Library
            </Link>

            <div style={{ marginTop: '24px' }}>
              {post.category && (
                <span className="post-cat" style={{ marginBottom: '20px', display: 'inline-block' }}>
                  {post.category}
                </span>
              )}
            </div>

            <h1 className="post-title">{post.title}</h1>
            {post.excerpt && <p className="post-excerpt" style={{ marginBottom: '32px' }}>{post.excerpt}</p>}

            {/* Premium Top Inline Author details */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', borderTop: '1px dashed var(--border-strong)', paddingTop: '24px', maxWidth: 'var(--max-w-text)' }}>
              <Image
                src={authorImageSrc}
                alt={authorName}
                width={46}
                height={46}
                style={{ borderRadius: '50%', objectFit: 'cover', border: '1px dashed var(--accent-secondary)' }}
              />
              <div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)' }}>
                  {authorName}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-sans)', marginTop: '2px' }}>
                  {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
                  {post.publishedAt && post.readTime && <span style={{ opacity: 0.3 }}>·</span>}
                  {post.readTime && <span>{post.readTime} min read</span>}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container" style={{ position: 'relative' }}>
          <span className="stitch-corner-tl">+</span>
          <span className="stitch-corner-tr">+</span>
          <span className="stitch-corner-bl">+</span>
          <span className="stitch-corner-br">+</span>
          <Image
            src={coverSrc}
            alt={post.coverImage?.alt || post.title}
            width={1400}
            height={650}
            className="post-cover"
            style={{ objectFit: 'cover' }}
            priority={true}
          />
        </div>

        <div className="container">
          <div className="post-body">
            {post.body ? (
              <PortableText value={post.body} components={ptComponents} />
            ) : (
              <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>
                This playbook does not contain text sections yet.
              </p>
            )}

            {/* Bottom Biography Card */}
            <div style={{
              marginTop: '80px',
              padding: '36px',
              background: 'var(--bg-2)',
              border: '1px dashed var(--border-strong)',
              borderRadius: 'var(--radius-md)',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              gap: '28px',
              flexWrap: 'wrap'
            }}>
              <span className="stitch-corner-tl">+</span>
              <span className="stitch-corner-tr">+</span>
              <span className="stitch-corner-bl">+</span>
              <span className="stitch-corner-br">+</span>

              <Image
                src={authorImageSrc}
                alt={authorName}
                width={80}
                height={80}
                style={{ borderRadius: '50%', objectFit: 'cover', border: '1px dashed var(--accent-secondary)' }}
              />
              <div style={{ flex: '1', minWidth: '240px' }}>
                <span className="label" style={{ fontSize: '9px', marginBottom: '8px' }}>Written By</span>
                <h3 style={{ fontSize: '20px', marginBottom: '8px', fontFamily: 'var(--font-sans)', fontWeight: '700' }}>{authorName}</h3>
                <p style={{ fontSize: '14px', lineHeight: '1.65', color: 'var(--text-secondary)', margin: 0 }}>
                  {post.authorBio || "Senior Digital Growth Director helping B2B product brands scale through systematic attribution mapping and high-converting acquisition channels."}
                </p>
              </div>
            </div>

            {/* Interactive Accordion FAQs Section */}
            <FaqSection faqs={post.faqs} />

            <div style={{
              marginTop: '80px',
              paddingTop: '40px',
              borderTop: '1px dashed var(--border-strong)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '24px',
              position: 'relative'
            }}>
              <span className="stitch-corner-tl">+</span>
              <span className="stitch-corner-tr">+</span>
              <Link href="/blog" className="back-link" style={{ marginBottom: 0 }}>
                ← Library Catalog
              </Link>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '11px',
                  fontWeight: '600',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-secondary)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                Share Strategy Playbook <span style={{ fontSize: '10px' }}>↗</span>
              </a>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
