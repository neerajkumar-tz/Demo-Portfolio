import Link from 'next/link';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { getPostBySlug, getRecentPosts, getAllPostSlugs, urlFor } from '../../../../lib/sanity';
import { notFound } from 'next/navigation';
import ProgressBar from '../../../../components/ProgressBar';
import FaqSection from '../../../../components/FaqSection';
import TableOfContents from '../../../../components/TableOfContents';

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
      title: `${post.title} | Voyita Growth Library`,
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
        <figure className="figure-stitched">
          <img
            src={src}
            alt={value?.alt || 'Strategy Blueprint Graphic'}
            className="figure-stitched-image"
          />
          {value?.alt && (
            <figcaption className="figure-stitched-caption">
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
  let recentPosts = [];
  
  try {
    post = await getPostBySlug(params.slug);
    recentPosts = await getRecentPosts(5);
  } catch (e) {
    notFound();
  }

  if (!post) notFound();

  const coverSrc = post.coverImage?.asset
    ? urlFor(post.coverImage).width(1400).height(650).fit('crop').url()
    : `https://picsum.photos/seed/${params.slug}/1400/650`;

  // Calculate Author details with secure fallback defaults
  const authorName = post.authorName || 'Voyita Team';
  const authorRole = 'Group Tour Expert';
  const authorImageSrc = post.authorImage?.asset
    ? urlFor(post.authorImage).width(120).height(120).fit('crop').url()
    : `https://picsum.photos/seed/${encodeURIComponent(authorName)}/120/120`;

  const shareUrl = `https://voyita.com/blog/${params.slug}`;

  // Filter out the current post from recent posts to avoid duplicate listings
  const filteredRecentPosts = recentPosts
    .filter(rp => rp._id !== post._id)
    .slice(0, 4);

  return (
    <>
      {/* Dynamic Scroll Reading Progress bar */}
      <ProgressBar />

      <article className="post-container-root">
        {/* BLOG POST HERO SECTION */}
        <section className="blog-post-hero">
          <div className="container">
            {/* Wellows-style Breadcrumb line */}
            <div className="breadcrumb-line">
              <Link href="/" className="breadcrumb-link">Voyita</Link>
              <span className="breadcrumb-sep">/</span>
              <Link href="/blog" className="breadcrumb-link">Blog</Link>
              <span className="breadcrumb-sep">/</span>
              <span className="breadcrumb-link">{post.category || 'OPERATIONS'}</span>
              <span className="breadcrumb-sep">/</span>
              <span className="breadcrumb-active">{post.title.toUpperCase()}</span>
            </div>

            <div className="hero-heading-group">
              <h1 className="post-title">{post.title}</h1>
              
              {/* Premium Top Inline Author details with Hover Card */}
              <div className="hero-author-info">
                <div className="hero-author-avatars">
                  <div className="hero-author-avatar">
                    <img 
                      src={authorImageSrc} 
                      alt={authorName} 
                      className="avatar-img"
                      width={40}
                      height={40}
                    />
                  </div>
                </div>

                <div className="author-data">
                  Written by <span className="author-name-trigger">{authorName}</span>
                  
                  {/* Wellows-style Elegant Biography Hover Box */}
                  <div className="author-hover-box">
                    <div className="author-hover-header">
                      <img 
                        src={authorImageSrc} 
                        alt={authorName} 
                        className="author-hover-avatar"
                        width={50}
                        height={50}
                      />
                      <div>
                        <h6 className="author-hover-name">{authorName}</h6>
                        <span className="author-hover-role">{authorRole}</span>
                      </div>
                    </div>
                    <p className="author-hover-description">
                      {post.authorBio || "Tour coordinator and travel management expert. Helping group operators automate setup, registrations, payments, and ground operations."}
                    </p>
                    <div className="author-hover-footer">
                      <Link href="/blog" className="author-hover-bio-btn">
                        View library
                      </Link>
                      <div className="author-hover-socials">
                        <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="author-hover-icon" aria-label="Twitter">
                          <svg width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.6.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z"/>
                          </svg>
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="author-hover-icon" aria-label="LinkedIn">
                          <svg width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v-.925H7.962c.03.676 0 7.225 0 7.225h2.401z"/>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <span className="separator-dot"></span>
                <span className="read-time">{post.readTime || '7'} min read</span>
                <span className="separator-dot"></span>
                <span className="published-date">{post.publishedAt ? formatDate(post.publishedAt) : 'May 24, 2026'}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Cover Graphic Container with corner stitch accents */}
        <section className="post-cover-section">
          <div className="container">
            <div className="cover-img-wrapper">
              <Image
                src={coverSrc}
                alt={post.coverImage?.alt || post.title}
                width={1400}
                height={650}
                className="post-cover-image"
                style={{ objectFit: 'cover' }}
                priority={true}
              />
            </div>
          </div>
        </section>

        {/* Dual-column Grid Content Section */}
        <section className="blog-post-content-section">
          <div className="container post-layout-grid">
            
            {/* LEFT SIDEBAR */}
            <aside className="post-sidebar">
              {/* Dynamic Table of Contents */}
              <TableOfContents />

              {/* Recent Posts - Custom load matching Wellows */}
              {filteredRecentPosts.length > 0 && (
                <div className="sidebar-section recent-posts-sidebar">
                  <div className="sidebar-divider"></div>
                  <div className="sidebar-title">Recent Posts</div>
                  <div className="recent-posts-list">
                    {filteredRecentPosts.map((rp) => {
                      const rpCover = rp.coverImage?.asset 
                        ? urlFor(rp.coverImage).width(160).height(90).fit('crop').url()
                        : `https://picsum.photos/seed/${rp.slug.current}/160/90`;
                      return (
                        <div key={rp._id} className="recent-post-item">
                          <Link href={`/blog/${rp.slug.current}`} className="recent-post-thumb">
                            <img 
                              src={rpCover} 
                              alt={rp.title}
                              width={80}
                              height={45}
                              className="recent-post-img"
                              loading="lazy"
                            />
                          </Link>
                          <div className="recent-post-details">
                            <h4 className="recent-post-heading">
                              <Link href={`/blog/${rp.slug.current}`}>{rp.title}</Link>
                            </h4>
                            <div className="recent-post-meta">{rp.readTime || '7'} min read</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Summarize AI Panel */}
              <div className="sidebar-section ai-summary-sidebar">
                <div className="sidebar-divider"></div>
                <div className="sidebar-title">Summarise this article</div>
                <div className="ai-round-buttons">
                  {/* ChatGPT */}
                  <a 
                    href={`https://chat.openai.com/?q=Summarize+this+playbook.+${encodeURIComponent(shareUrl)}`} 
                    target="_blank" 
                    rel="nofollow noopener noreferrer"
                    className="ai-round-btn chatgpt"
                    title="Summarize with ChatGPT"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.28 9.82a5.985 5.985 0 0 0-.51-4.91c-.8-1.39-2.22-2.39-3.86-2.69-.87-.16-1.78-.11-2.62.15-.65-1.28-1.77-2.28-3.15-2.78A6.056 6.056 0 0 0 4.98 4.18a5.985 5.985 0 0 0-4 2.9 6.046 6.046 0 0 0 .74 7.1 5.98 5.98 0 0 0 .51 4.91 6.051 6.051 0 0 0 6.51 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.77-4.21 5.989 5.989 0 0 0 4-2.9c1-1.39 1.26-3.18.75-4.98zm-9.02 12.61a4.476 4.476 0 0 1-2.88-1.04l.14-.08 4.78-2.76c.26-.15.42-.43.39-.68v-6.74l2.02 1.17c.02.01.03.03.04.05v5.58a4.504 4.504 0 0 1-4.49 4.49zm-9.66-4.13a4.471 4.471 0 0 1-.53-3.01l.14.09 4.78 2.76c.23.13.51.13.78 0l5.84-3.37v2.33c0 .02-.01.04-.03.06l-4.82 2.78a4.499 4.499 0 0 1-6.14-1.65z"/>
                    </svg>
                  </a>
                  {/* Google AI */}
                  <a 
                    href={`https://gemini.google.com/search?q=Summarize+this+playbook.+${encodeURIComponent(shareUrl)}`} 
                    target="_blank" 
                    rel="nofollow noopener noreferrer"
                    className="ai-round-btn gemini"
                    title="Summarize with Gemini"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#F0F4F9" />
                      <path d="M12 18.5C12 18.5 12.5 15 15.5 12C18.5 9 18.5 9 18.5 9C18.5 9 15 8.5 12 5.5C9 2.5 9 2.5 9 2.5C9 2.5 8.5 6 5.5 9C2.5 12 2.5 12 2.5 12C2.5 12 6 12.5 9 15.5C12 18.5 12 18.5 12 18.5Z" fill="#1A73E8" />
                    </svg>
                  </a>
                  {/* Perplexity */}
                  <a 
                    href={`https://www.perplexity.ai/search?q=Summarize+this+playbook.+${encodeURIComponent(shareUrl)}`} 
                    target="_blank" 
                    rel="nofollow noopener noreferrer"
                    className="ai-round-btn perplexity"
                    title="Summarize with Perplexity"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Share Sidebar Section */}
              <div className="sidebar-section share-sidebar">
                <div className="sidebar-divider"></div>
                <div className="sidebar-title">Share this article</div>
                <div className="share-icons">
                  {/* Twitter */}
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="share-icon-btn"
                    aria-label="Share on Twitter"
                  >
                    <svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14">
                      <path d="M9.594 7.015L13.953 2h-1.767L8.775 5.924 5.833 2H1.166l5.007 6.677L1.546 14h1.767l3.678-4.233L9.833 14h4.667L9.594 7.015zm1.239 5.652H3.833V3.333h1.333l7 9.334h-1.333z" />
                    </svg>
                  </a>
                  {/* LinkedIn */}
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="share-icon-btn"
                    aria-label="Share on LinkedIn"
                  >
                    <svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14">
                      <path d="M15.3 0H0.7C0.3 0 0 0.3 0 0.7V15.4C0 15.7 0.3 16 0.7 16H15.4C15.8 16 16.1 15.7 16.1 15.3V0.7C16 0.3 15.7 0 15.3 0zM4.7 13.6H2.4V6h2.3v7.6zm-1.1-8.6c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4 1.4.6 1.4 1.4-.6 1.4-1.4 1.4zm10 8.6h-2.4V9.9c0-.9 0-2-1.2-2s-1.4 1-1.4 2v3.7H6.2V6h2.3v1c.3-.6 1.1-1.2 2.2-1.2 2.4 0 2.8 1.6 2.8 3.6v4.2h.1z" />
                    </svg>
                  </a>
                  {/* Facebook */}
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="share-icon-btn"
                    aria-label="Share on Facebook"
                  >
                    <svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14">
                      <path d="M8.999 16V9.545h2.163l.324-2.513H8.999V5.43c0-.727.202-1.224 1.246-1.224h1.332V1.96C11.352 1.93 10.59 1.868 9.7 1.868c-2.637 0-4.441 1.61-4.441 4.563v1.8H3V9.545h2.26V16h3.739z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Verified Author Card block */}
              <div className="sidebar-section author-sidebar">
                <div className="sidebar-divider"></div>
                <div className="sidebar-title">About the Author</div>
                <div className="author-card-box">
                  <div className="author-card-header">
                    <img 
                      src={authorImageSrc} 
                      alt={authorName} 
                      className="author-card-avatar"
                      width={64}
                      height={64}
                    />
                    <div>
                      <h4 className="author-card-name">
                        {authorName}
                        {/* Verified Checkmark Badge */}
                        <span className="verified-badge-wrap" title="Verified Author">
                          <svg className="verified-badge" width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M2.5668 5.74706C2.46949 5.30874 2.48443 4.85295 2.61023 4.42195C2.73604 3.99095 2.96863 3.59869 3.28644 3.28154C3.60425 2.96439 3.997 2.73262 4.42827 2.60772C4.85953 2.48282 5.31535 2.46883 5.75346 2.56706C5.9946 2.18992 6.3268 1.87956 6.71943 1.66458C7.11206 1.4496 7.55249 1.33691 8.00013 1.33691C8.44776 1.33691 8.8882 1.4496 9.28083 1.66458C9.67346 1.87956 10.0057 2.18992 10.2468 2.56706C10.6856 2.46841 11.1422 2.48233 11.5741 2.60753C12.0061 2.73274 12.3994 2.96515 12.7174 3.28316C13.0354 3.60117 13.2678 3.99444 13.393 4.42639C13.5182 4.85834 13.5321 5.31494 13.4335 5.75372C13.8106 5.99486 14.121 6.32706 14.3359 6.71969C14.5509 7.11232 14.6636 7.55275 14.6636 8.00039C14.6636 8.44802 14.5509 8.88846 14.3359 9.28109C14.121 9.67372 13.8106 10.0059 13.4335 10.2471C13.5317 10.6852 13.5177 11.141 13.3928 11.5723C13.2679 12.0035 13.0361 12.3963 12.719 12.7141C12.4018 13.0319 12.0096 13.2645 11.5786 13.3903C11.1476 13.5161 10.6918 13.531 10.2535 13.4337C10.0126 13.8123 9.68018 14.124 9.28688 14.3399C8.89358 14.5559 8.45215 14.6691 8.00346 14.6691C7.55478 14.6691 7.11335 14.5559 6.72004 14.3399C6.32674 14.124 5.99429 13.8123 5.75346 13.4337C5.31535 13.5319 4.85953 13.518 4.42827 13.3931C3.997 13.2682 3.60425 13.0364 3.28644 12.7192C2.96863 12.4021 2.73604 12.0098 2.61023 11.5788C2.48443 11.1478 2.46949 10.692 2.5668 10.2537C2.18677 10.0132 1.87374 9.6805 1.65683 9.28653C1.43992 8.89256 1.32617 8.45013 1.32617 8.00039C1.32617 7.55065 1.43992 7.10822 1.65683 6.71425C1.87374 6.32027 2.18677 5.98756 2.5668 5.74706Z"/>
                            <path d="M6 8l1.333 1.333L10 6.667" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                      </h4>
                      <div className="author-card-role">{authorRole}</div>
                    </div>
                  </div>
                  <p className="author-card-bio">
                    {post.authorBio || "Tour coordinator and travel management expert. Helping group operators automate setup, registrations, payments, and ground operations."}
                  </p>
                </div>
              </div>
            </aside>

            {/* RIGHT MAIN CONTENT SECTION */}
            <div className="blog-main-content">
              
              {/* TL;DR AI SUMMARY TRAP BOX */}
              {post.excerpt && (
                <div className="ai-trap">
                  <strong className="ai-trap-title">TL;DR</strong>
                  <p>{post.excerpt}</p>
                </div>
              )}


              {/* Main Playbook Rich Text portable-text container */}
              <div className="post-body">
                {post.body ? (
                  <PortableText value={post.body} components={ptComponents} />
                ) : (
                  <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>
                    This strategy playbook does not contain text sections yet.
                  </p>
                )}

                {/* Bottom FAQs accordion */}
                <FaqSection faqs={post.faqs} />

                {/* Bottom navigation line */}
                <div className="playbook-bottom-nav">
                  <Link href="/blog" className="back-link-bottom">
                    ← Back to Growth Library
                  </Link>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="share-link-bottom"
                  >
                    Share Article <span className="arrow-icon">↗</span>
                  </a>
                </div>
              </div>      </div>

            </div>

          </div>
        </section>
      </article>

      {/* Script to enable dynamic checklist checkbox toggling */}
      <script dangerouslySetInnerHTML={{ __html: `
        (function() {
          const checklist = document.querySelector('.wsc-checklist');
          if (checklist) {
            checklist.addEventListener('click', function(e) {
              const li = e.target.closest('li');
              if (li) {
                li.classList.toggle('wsc-checked');
              }
            });
          }
        })();
      ` }} />
    </>
  );
}
