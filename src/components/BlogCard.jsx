import Link from 'next/link';
import Image from 'next/image';

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
}

export default function BlogCard({ post }) {
  const { title, slug, excerpt, category, readTime, publishedAt, coverImage } = post;
  const imageUrl = coverImage?.asset
    ? null // will use sanity urlFor in parent
    : `https://picsum.photos/seed/${slug?.current}/800/450`;

  return (
    <article className="blog-card">
      <Link href={`/blog/${slug?.current}`}>
        <div className="blog-card-image">
          {imageUrl ? (
            <img src={imageUrl} alt={title} loading="lazy" />
          ) : (
            <div className="img-placeholder">✦</div>
          )}
          {category && <span className="blog-card-cat">{category}</span>}
        </div>
      </Link>

      <div className="blog-card-body">
        <div className="blog-card-meta">
          {publishedAt && <span>{formatDate(publishedAt)}</span>}
          {readTime   && <><span className="meta-sep">·</span><span>{readTime} min read</span></>}
        </div>

        <h3>
          <Link href={`/blog/${slug?.current}`}>{title}</Link>
        </h3>

        {excerpt && <p>{excerpt}</p>}

        <Link href={`/blog/${slug?.current}`} className="blog-card-link">
          Read More →
        </Link>
      </div>
    </article>
  );
}
