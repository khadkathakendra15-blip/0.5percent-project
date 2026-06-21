import { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavBar } from '@/components/ui/nav-bar';
import { Clock, User, ArrowRight, BookOpen } from 'lucide-react';
import { BLOG_POSTS, type BlogPost } from '@/data/blogPosts';

const C = {
  ink: '#0a1a2e', inkSoft: '#3d5578', inkFaint: '#82b395',
  cream: '#eaf0f8', cream2: '#dce8f5', paper: '#fafdfa',
  saffron: '#7599cb', terra: '#DC143C', lineS: 'rgba(10,26,46,0.08)',
};
const SERIF = "'Cormorant Garamond', Georgia, serif";
const MUKTA = "'Mukta', system-ui, sans-serif";
const MONO  = "'JetBrains Mono', ui-monospace, monospace";

function ArticleCard({ post, large = false }: { post: BlogPost; large?: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <Link
      to={`/blog/${post.slug}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: '6px', overflow: 'hidden', cursor: 'pointer',
        border: `1px solid ${C.lineS}`, textDecoration: 'none', color: 'inherit',
        transition: 'transform .3s ease, box-shadow .3s ease',
        transform: hov ? 'translateY(-5px)' : 'none',
        boxShadow: hov ? '0 18px 44px rgba(10,26,46,0.14)' : '0 2px 8px rgba(10,26,46,0.05)',
        display: 'flex', flexDirection: large ? 'row' : 'column',
        background: C.paper,
      }}
    >
      {/* cover */}
      <div style={{
        background: post.cover, position: 'relative',
        width: large ? '45%' : '100%',
        minHeight: large ? '320px' : '200px',
        flexShrink: 0,
        display: 'flex', alignItems: 'flex-end', padding: '20px',
      }}>
        <span style={{
          fontFamily: MONO, fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase',
          background: C.terra, color: '#fff', padding: '4px 10px', borderRadius: '2px',
        }}>
          {post.category}
        </span>
        {large && (
          <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
            <BookOpen size={22} color="rgba(234,247,238,0.55)" strokeWidth={1.5} />
          </div>
        )}
      </div>

      {/* body */}
      <div style={{ padding: large ? '40px 40px' : '22px 24px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
        <div>
          <h3 style={{
            fontFamily: SERIF, fontWeight: 400,
            fontSize: large ? 'clamp(26px,2.8vw,40px)' : '22px',
            lineHeight: 1.15, color: C.ink, marginBottom: '14px', marginTop: 0,
          }}>
            {post.title}
          </h3>
          <p style={{ fontFamily: MUKTA, fontSize: large ? '16px' : '14px', lineHeight: 1.8, color: C.inkSoft, marginBottom: '24px' }}>
            {post.excerpt}
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <User size={11} color={C.inkFaint} strokeWidth={1.5} />
              <span style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.14em', color: C.inkFaint }}>{post.author}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Clock size={11} color={C.inkFaint} strokeWidth={1.5} />
              <span style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.14em', color: C.inkFaint }}>{post.readTime}</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: C.terra }}>Read</span>
            <ArrowRight size={11} color={C.terra} strokeWidth={2} />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function BlogPage() {
  const [featured, ...rest] = BLOG_POSTS;

  return (
    <div style={{ background: C.paper, minHeight: '100vh' }}>
      <NavBar />

      {/* ── FEATURED ── */}
      {featured && (
        <section style={{ background: C.cream, padding: '120px 0 80px', borderTop: `1px solid ${C.lineS}` }}>
          <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px' }}>
              <span style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.26em', textTransform: 'uppercase', color: C.terra }}>Featured</span>
              <span style={{ flex: 1, height: '1px', background: C.lineS }} />
            </div>
            <ArticleCard post={featured} large />
          </div>
        </section>
      )}

      {/* ── MORE / EMPTY STATE ── */}
      <section style={{ background: C.paper, padding: '80px 0 100px', borderTop: `1px solid ${C.lineS}` }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '40px' }}>
            <span style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.26em', textTransform: 'uppercase', color: C.inkFaint }}>More stories</span>
            <span style={{ flex: 1, height: '1px', background: C.lineS }} />
          </div>

          {rest.length === 0 ? (
            <div style={{
              border: `1px dashed ${C.lineS}`, borderRadius: '6px',
              padding: '64px 32px', textAlign: 'center',
              background: C.cream,
            }}>
              <div style={{ fontFamily: SERIF, fontWeight: 400, fontStyle: 'italic', fontSize: '24px', color: C.ink, marginBottom: '10px' }}>
                More stories on the way.
              </div>
              <p style={{ fontFamily: MUKTA, fontSize: '14px', color: C.inkSoft, margin: 0 }}>
                We're publishing one carefully-written piece at a time. Check back soon.
              </p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' }}>
              {rest.map(p => <ArticleCard key={p.slug} post={p} />)}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
