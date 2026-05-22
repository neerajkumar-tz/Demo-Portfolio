import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import { getPostBySlug, getAllPostSlugs, urlFor } from '../../../lib/sanity';
import { notFound } from 'next/navigation';

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
      title: post.title,
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
      const src = value?.asset ? urlFor(value).width(1000).url() : null;
      return src ? (
        <figure style={{ margin: '40px 0' }}>
          <img
            src={src}
            alt={value?.alt || ''}
            style={{ width: '100%', borderRadius: 'var(--radius-md)' }}
          />
          {value?.alt && (
            <figcaption style={{
              textAlign: 'center',
              fontSize: '13px',
              color: 'var(--text-muted)',
              marginTop: '10px',
              fontFamily: 'var(--font-ui)',
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
    ? urlFor(post.coverImage).width(1400).height(600).fit('crop').url()
    : `https://picsum.photos/seed/${params.slug}/1400/600`;

  return (
    <>
      <article>
        <div className="post-hero">
          <div className="container">
            <Link href="/blog" className="back-link">
              ← Back to Blog
            </Link>

            <div className="post-meta-bar">
              {post.category && <span className="post-cat">{post.category}</span>}
              {post.publishedAt && (
                <span className="post-date">{formatDate(post.publishedAt)}</span>
              )}
              {post.readTime && (
                <>
                  <span className="post-date" style={{ opacity: 0.4 }}>·</span>
                  <span className="post-time">{post.readTime} min read</span>
                </>
              )}
            </div>

            <h1 className="post-title">{post.title}</h1>
            {post.excerpt && <p className="post-excerpt">{post.excerpt}</p>}
          </div>
        </div>

        <div className="container">
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
                No content yet.
              </p>
            )}

            <div style={{
              marginTop: '64px',
              paddingTop: '40px',
              borderTop: '1px solid var(--border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
            }}>
              <Link href="/blog" className="back-link" style={{ marginBottom: 0 }}>
                ← All Posts
              </Link>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '12px',
                  fontWeight: '600',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--accent)',
                }}
              >
                Share on X →
              </a>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
