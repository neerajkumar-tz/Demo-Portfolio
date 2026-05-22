import BlogCard from '../../components/BlogCard';
import { getAllPosts } from '../../lib/sanity';

export const metadata = {
  title: 'Blog',
  description: 'Marketing strategy, SEO deep dives, paid media insights, and analytics frameworks from Alex Rivera.',
};

export const revalidate = 60;

export default async function BlogPage() {
  let posts = [];
  try {
    posts = await getAllPosts();
  } catch (e) {
    // Sanity not yet configured
  }

  const categories = ['All', ...new Set(posts.map((p) => p.category).filter(Boolean))];

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="label">The Blog</span>
          <h1 style={{ marginTop: '16px' }}>
            Marketing insights<br />worth your time.
          </h1>
          <p style={{ marginTop: '16px' }}>
            Deep dives into SEO, paid media, content strategy, and analytics — written
            for marketers who want to do the work, not just read about it.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '60px' }}>
        <div className="container">
          {posts.length === 0 ? (
            <div style={{
              background: 'var(--bg-2)',
              border: '1px dashed var(--border-strong)',
              borderRadius: 'var(--radius-md)',
              padding: '80px 40px',
              textAlign: 'center',
              color: 'var(--text-muted)',
            }}>
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: '15px', marginBottom: '12px' }}>
                No posts yet.
              </p>
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: '13px' }}>
                Set up Sanity and run <code style={{ background: 'var(--surface)', padding: '2px 8px', borderRadius: '4px', color: 'var(--accent-2)' }}>npm run seed</code> to populate demo posts.
              </p>
            </div>
          ) : (
            <>
              <div className="blog-filters">
                {categories.map((cat) => (
                  <span key={cat} className={`filter-btn${cat === 'All' ? ' active' : ''}`}>
                    {cat}
                  </span>
                ))}
              </div>

              <div className="blog-grid">
                {posts.map((post) => (
                  <BlogCard key={post._id} post={post} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
