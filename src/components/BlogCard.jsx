import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '../lib/sanity';

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
}

export default function BlogCard({ post }) {
  const { title, slug, excerpt, category, readTime, publishedAt, coverImage } = post;
  
  // Render Cover Image from Sanity, or fallback to beautiful dynamic seed image
  const imageUrl = coverImage?.asset
    ? urlFor(coverImage).width(800).height(500).fit('crop').url()
    : `https://picsum.photos/seed/${slug?.current || 'fallback'}/800/500`;

  return (
    <article className="blog-card">
      {/* Stitch Corner Indicators */}
      <span className="stitch-corner-tl">+</span>
      <span className="stitch-corner-tr">+</span>
      <span className="stitch-corner-bl">+</span>
      <span className="stitch-corner-br">+</span>

      <Link href={`/blog/${slug?.current}`}>
        <div className="blog-card-image">
          {imageUrl ? (
            <Image 
              src={imageUrl} 
              alt={title} 
              width={800} 
              height={500} 
              style={{ objectFit: 'cover' }}
              loading="lazy"
            />
          ) : (
            <div className="img-placeholder">✦</div>
          )}
          {category && <span className="blog-card-cat">{category}</span>}
        </div>
      </Link>

      <div className="blog-card-body">
        <div className="blog-card-meta">
          {publishedAt && <span>{formatDate(publishedAt)}</span>}
          {readTime && (
            <>
              <span className="meta-sep">·</span>
              <span>{readTime} min read</span>
            </>
          )}
        </div>

        <h3>
          <Link href={`/blog/${slug?.current}`}>{title}</Link>
        </h3>

        {excerpt && <p>{excerpt}</p>}

        <Link href={`/blog/${slug?.current}`} className="blog-card-link">
          Read Article <span style={{ transition: 'transform 0.2s', display: 'inline-block' }}>→</span>
        </Link>
      </div>
    </article>
  );
}
