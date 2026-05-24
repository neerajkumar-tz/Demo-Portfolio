import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import { getPostBySlug, getAllPostSlugs, urlFor } from '../../../../lib/sanity';
import { notFound } from 'next/navigation';
import ProgressBar from '../../../../components/ProgressBar';

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
              fontFamily: 'var(--font-ui)',
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

            <div className="post-meta-bar" style={{ marginTop: '16px' }}>
              {post.category && <span className="post-cat">{post.category}</span>}
              {post.publishedAt && (
                <span className="post-date">{formatDate(post.publishedAt)}</span>
              )}
              {post.readTime && (
                <>
                  <span className="post-date" style={{ opacity: 0.3 }}>·</span>
                  <span className="post-time">{post.readTime} min playbook reading</span>
                </>
              )}
            </div>

            <h1 className="post-title">{post.title}</h1>
            {post.excerpt && <p className="post-excerpt">{post.excerpt}</p>}
          </div>
        </div>

        <div className="container" style={{ position: 'relative' }}>
          <span className="stitch-corner-tl">+</span>
          <span className="stitch-corner-tr">+</span>
          <span className="stitch-corner-bl">+</span>
          <span className="stitch-corner-br">+</span>
          <img
            src={coverSrc}
            alt={post.coverImage?.alt || post.title}
            className="post-cover"
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
                  fontFamily: 'var(--font-ui)',
                  fontSize: '11px',
                  fontWeight: '700',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--accent)',
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
