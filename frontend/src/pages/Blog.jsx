import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { blogPosts } from './blogData'

function Blog() {
  return (
    <>
      <Helmet>
        <title>DPDP Act Compliance Blog — DoAide DPDP</title>
        <meta name="description" content="Expert guides on DPDP Act compliance for Indian businesses. Learn about privacy policies, compliance steps, and deadlines." />
      </Helmet>

      <div className="container" style={{ padding: '48px 24px', maxWidth: '800px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '8px' }}>Blog</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '40px' }}>Expert guides for DPDP Act compliance</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {blogPosts.map(post => (
            <Link key={post.slug} to={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
              <article className="card">
                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                  {post.tags.map(tag => (
                    <span key={tag} className="badge badge-free">{tag}</span>
                  ))}
                </div>
                <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px', color: 'var(--text-primary)' }}>
                  {post.title}
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '12px' }}>
                  {post.excerpt}
                </p>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                  {post.date} · {post.readTime}
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default Blog
