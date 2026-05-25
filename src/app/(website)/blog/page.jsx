import BlogCard from '../../../components/BlogCard';
import { getAllPosts } from '../../../lib/sanity';

export const metadata = {
  title: 'Voyita Growth Library — Operator Playbooks & Guides',
  description: 'Learn how modern group tour operators use automation and self-service registration to double their trip count without adding headcount.',
};

export const revalidate = 60;

export default async function BlogPage() {
  let posts = [];
  try {
    posts = await getAllPosts();
  } catch (e) {
    // Falls back gracefully if Sanity is not connected yet
  }

  // Generate unique categories for the filters
  const categories = ['All', ...new Set(posts.map((p) => p.category).filter(Boolean))];

  return (
    <>
      <section className="page-hero">
        
        <div className="container">
          <span className="label">Growth Library</span>
          <h1 style={{ marginTop: '20px' }}>
            Tactical playbooks &amp; guides<br />refined in the field.
          </h1>
          <p style={{ marginTop: '20px' }}>
            Itinerary automation frameworks, registration portal architectures, payment reconciliation sequences,
            and fundraising strategies — written specifically for group tour operators.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '60px' }}>
        <div className="container">
          {posts.length === 0 ? (
            <div style={{
              background: 'rgba(255, 255, 255, 0.01)',
              border: '1px dashed var(--border-strong)',
              borderRadius: 'var(--radius-md)',
              padding: '100px 40px',
              textAlign: 'center',
              position: 'relative'
            }}>
              
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: '15px', color: 'var(--text-muted)', marginBottom: '16px' }}>
                No playbooks found.
              </p>
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: '13px', color: 'var(--text-secondary)' }}>
                Please run <code style={{ background: 'var(--bg-3)', padding: '4px 10px', borderRadius: '4px', color: 'var(--accent)' }}>npm run seed</code> to populate demo playbooks.
              </p>
            </div>
          ) : (
            <>
              {/* Categories Filter list (visual presentation) */}
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
