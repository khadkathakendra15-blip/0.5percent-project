import { useParams, Link } from 'react-router-dom';
import { NavBar } from '@/components/ui/nav-bar';
import { Clock, User, Calendar, ArrowLeft } from 'lucide-react';
import { getPostBySlug } from '@/data/blogPosts';

const C = {
  ink: '#0a1a2e', inkSoft: '#3d5578', inkFaint: '#82b395',
  cream: '#eaf0f8', cream2: '#dce8f5', paper: '#fafdfa',
  terra: '#DC143C', lineS: 'rgba(10,26,46,0.08)',
};
const SERIF = "'Cormorant Garamond', Georgia, serif";
const MUKTA = "'Mukta', system-ui, sans-serif";
const MONO  = "'JetBrains Mono', ui-monospace, monospace";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div style={{ background: C.paper, minHeight: '100vh' }}>
        <NavBar />
        <section style={{ padding: '160px 40px', textAlign: 'center' }}>
          <div style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.32em', textTransform: 'uppercase', color: C.terra, marginBottom: '18px' }}>
            404
          </div>
          <h1 style={{ fontFamily: SERIF, fontWeight: 300, fontSize: 'clamp(36px,4.5vw,64px)', color: C.ink, margin: 0, lineHeight: 1.05 }}>
            We couldn't find that story.
          </h1>
          <p style={{ fontFamily: MUKTA, fontSize: '15px', color: C.inkSoft, marginTop: '20px' }}>
            It may have been moved or hasn't been published yet.
          </p>
          <Link to="/blog" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            marginTop: '32px', padding: '14px 28px', borderRadius: '100px',
            fontFamily: MUKTA, fontSize: '12px', letterSpacing: '0.22em', textTransform: 'uppercase',
            fontWeight: 600, background: C.ink, color: C.cream, textDecoration: 'none',
          }}>
            <ArrowLeft size={14} /> Back to the blog
          </Link>
        </section>
      </div>
    );
  }

  const Body = post.render;

  return (
    <div style={{ background: C.paper, minHeight: '100vh' }}>
      <NavBar />

      {/* ── HERO ── */}
      <section style={{
        background: post.cover, paddingTop: '64px', minHeight: '60vh',
        position: 'relative', overflow: 'hidden',
        borderBottom: `1px solid ${C.lineS}`, color: C.cream,
      }}>
        {/* darkening scrim for text legibility */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.25) 35%, rgba(0,0,0,0.7) 100%)',
        }} />
        {/* subtle color glows */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(60% 60% at 80% 20%, rgba(255,0,0,0.14), transparent 60%), radial-gradient(40% 60% at 10% 90%, rgba(31,77,138,0.14), transparent 60%)',
        }} />
        <div style={{ position: 'relative', maxWidth: '900px', margin: '0 auto', padding: '64px 40px 96px' }}>
          {/* Back link */}
          <Link to="/blog" style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            fontFamily: MONO, fontSize: '10px', letterSpacing: '0.24em', textTransform: 'uppercase',
            color: 'rgba(234,247,238,0.7)', textDecoration: 'none', marginBottom: '32px',
          }}>
            <ArrowLeft size={12} /> All stories
          </Link>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
            <span style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.32em', textTransform: 'uppercase', background: C.terra, color: '#fff', padding: '5px 12px', borderRadius: '2px' }}>
              {post.category}
            </span>
            <span style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(234,247,238,0.6)' }}>
              Stories from Nepal
            </span>
          </div>
          <h1 style={{ fontFamily: SERIF, fontWeight: 300, fontSize: 'clamp(40px,5.4vw,80px)', lineHeight: 0.98, letterSpacing: '-0.02em', color: C.cream, margin: 0 }}>
            {post.title}
          </h1>
          <p style={{ fontFamily: MUKTA, fontSize: '18px', lineHeight: 1.7, fontWeight: 300, color: 'rgba(234,247,238,0.78)', maxWidth: '58ch', marginTop: '28px' }}>
            {post.excerpt}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginTop: '36px', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '7px', fontFamily: MONO, fontSize: '10px', letterSpacing: '0.18em', color: 'rgba(234,247,238,0.7)' }}>
              <User size={12} strokeWidth={1.5} /> {post.author}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '7px', fontFamily: MONO, fontSize: '10px', letterSpacing: '0.18em', color: 'rgba(234,247,238,0.7)' }}>
              <Calendar size={12} strokeWidth={1.5} /> {post.date}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '7px', fontFamily: MONO, fontSize: '10px', letterSpacing: '0.18em', color: 'rgba(234,247,238,0.7)' }}>
              <Clock size={12} strokeWidth={1.5} /> {post.readTime}
            </span>
          </div>
        </div>
      </section>

      {/* ── ARTICLE BODY ── */}
      <Body />
    </div>
  );
}
