import { useState } from 'react';
import { NavBar } from '@/components/ui/nav-bar';
import { Clock, User, ArrowRight, BookOpen } from 'lucide-react';

const C = {
  ink: '#181410', ink2: '#2a231c', inkSoft: '#5a4f44', inkFaint: '#9b8f80',
  cream: '#f4ede0', cream2: '#ebe2d1', paper: '#faf5ea',
  saffron: '#1e77c1', terra: '#ff0000', lineS: 'rgba(24,20,16,0.08)',
};
const SERIF = "'Cormorant Garamond', Georgia, serif";
const MUKTA = "'Mukta', system-ui, sans-serif";
const MONO  = "'JetBrains Mono', ui-monospace, monospace";

type Category = 'All' | 'Destinations' | 'Spiritual' | 'Adventure' | 'Culture' | 'Wildlife';
const CATS: Category[] = ['All', 'Destinations', 'Spiritual', 'Adventure', 'Culture', 'Wildlife'];

const CAT_COLOR: Record<string, string> = {
  Destinations: C.saffron,
  Spiritual:    '#9B59B6',
  Adventure:    '#E67E22',
  Culture:      '#C68B2C',
  Wildlife:     '#1D9E75',
};

const ARTICLES = [
  {
    id: 1,
    cat: 'Spiritual' as Category,
    title: 'The Sacred Lakes of Nepal: A Pilgrimage Above the Clouds',
    excerpt: "Gosaikunda, Tilicho, Rara — Nepal's high-altitude lakes are not just reflections of peaks but mirrors of the divine. We trace the spiritual routes that have guided yogis and monks for centuries.",
    author: 'Pratiksha Shrestha',
    date: 'May 2026',
    readTime: '8 min read',
    gradient: 'linear-gradient(145deg,#080C2E 0%,#1A2A8C 50%,#050820 100%)',
    featured: true,
  },
  {
    id: 2,
    cat: 'Adventure' as Category,
    title: "Annapurna Circuit: What They Don't Put in the Guidebook",
    excerpt: "After 21 days and 230 km, the Thorong La pass at 5,416 m feels less like a crossing and more like an initiation. A raw, honest account of the world's most celebrated trek.",
    author: 'Sagar Tamang',
    date: 'Apr 2026',
    readTime: '12 min read',
    gradient: 'linear-gradient(145deg,#1A0A2E 0%,#3D1F6B 50%,#0F0520 100%)',
    featured: false,
  },
  {
    id: 3,
    cat: 'Culture' as Category,
    title: "Kumari: Inside the Life of Kathmandu's Living Goddess",
    excerpt: "Chosen before her fifth birthday, the Kumari embodies the divine feminine in Nepal's capital. A respectful portrait of an ancient tradition navigating the modern world.",
    author: 'Anisha Bajracharya',
    date: 'Apr 2026',
    readTime: '7 min read',
    gradient: 'linear-gradient(145deg,#2C1810 0%,#7A4A1E 45%,#1A0E08 100%)',
    featured: false,
  },
  {
    id: 4,
    cat: 'Wildlife' as Category,
    title: 'One with the Wild: 72 Hours in Chitwan National Park',
    excerpt: "A Bengal tiger emerges at dawn. A one-horned rhino grazes 30 metres away. Chitwan's grasslands and riverine forests contain some of Asia's most remarkable wildlife encounters.",
    author: 'Roshan Rai',
    date: 'Mar 2026',
    readTime: '9 min read',
    gradient: 'linear-gradient(145deg,#0A1F0A 0%,#1A5C1A 50%,#0A150A 100%)',
    featured: false,
  },
  {
    id: 5,
    cat: 'Adventure' as Category,
    title: 'Everest Base Camp: A Journey to 5,364 Metres',
    excerpt: "The mountain doesn't care about your fitness tracker. A photographer's diary of seventeen days in the Khumbu valley — altitude, friendship, and the humbling scale of Earth's highest point.",
    author: 'Maya Lama',
    date: 'Mar 2026',
    readTime: '15 min read',
    gradient: 'linear-gradient(145deg,#0A1628 0%,#1E4070 45%,#0A1020 100%)',
    featured: false,
  },
  {
    id: 6,
    cat: 'Spiritual' as Category,
    title: 'Lumbini: Walking in the Footsteps of the Buddha',
    excerpt: "In 623 BCE a child was born in a garden and changed the world. Today, pilgrims from 80 nations walk those same grounds. We spend a week in Nepal's most sacred site.",
    author: 'Dibya Gurung',
    date: 'Feb 2026',
    readTime: '10 min read',
    gradient: 'linear-gradient(145deg,#2E2008 0%,#8C6A1A 50%,#1C1405 100%)',
    featured: false,
  },
  {
    id: 7,
    cat: 'Destinations' as Category,
    title: 'Upper Mustang: Entering the Last Forbidden Kingdom',
    excerpt: 'Permits secured, jeep packed, the road into Lo Manthang feels like time travel. Medieval walls, cave monasteries, and a sky impossibly blue above the rain shadow desert.',
    author: 'Bikash Thakali',
    date: 'Feb 2026',
    readTime: '11 min read',
    gradient: 'linear-gradient(145deg,#2E1A08 0%,#7A4518 50%,#201008 100%)',
    featured: false,
  },
  {
    id: 8,
    cat: 'Culture' as Category,
    title: 'Indra Jatra: When a God Descends into Kathmandu',
    excerpt: "Eight days, 2,000 years of history, a living chariot bearing the Kumari through ancient streets. Nepal's greatest festival is a spectacle of devotion, colour and controlled chaos.",
    author: 'Samjhana Maharjan',
    date: 'Jan 2026',
    readTime: '6 min read',
    gradient: 'linear-gradient(145deg,#1A0810 0%,#5C1A2E 50%,#0F0508 100%)',
    featured: false,
  },
];

function ArticleCard({ a, large = false }: { a: typeof ARTICLES[0]; large?: boolean }) {
  const [hov, setHov] = useState(false);
  const color = CAT_COLOR[a.cat] ?? C.saffron;

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: '6px', overflow: 'hidden', cursor: 'pointer',
        border: `1px solid ${C.lineS}`,
        transition: 'transform .3s ease, box-shadow .3s ease',
        transform: hov ? 'translateY(-5px)' : 'none',
        boxShadow: hov ? '0 18px 44px rgba(24,20,16,0.14)' : '0 2px 8px rgba(24,20,16,0.05)',
        display: 'flex', flexDirection: large ? 'row' : 'column',
      }}
    >
      {/* image */}
      <div style={{
        background: a.gradient, position: 'relative',
        width: large ? '45%' : '100%',
        minHeight: large ? '280px' : '180px',
        flexShrink: 0,
        display: 'flex', alignItems: 'flex-end', padding: '20px',
      }}>
        <span style={{
          fontFamily: MONO, fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase',
          background: color, color: '#fff', padding: '4px 10px', borderRadius: '2px',
        }}>
          {a.cat}
        </span>
        {large && (
          <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
            <BookOpen size={22} color="rgba(244,237,224,0.5)" strokeWidth={1.5} />
          </div>
        )}
      </div>

      {/* body */}
      <div style={{ background: C.paper, padding: large ? '32px 32px' : '20px 22px 22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
        <div>
          <h3 style={{
            fontFamily: SERIF, fontWeight: 400,
            fontSize: large ? 'clamp(22px,2.5vw,32px)' : '20px',
            lineHeight: 1.15, color: C.ink, marginBottom: '12px',
          }}>
            {a.title}
          </h3>
          <p style={{ fontFamily: MUKTA, fontSize: '14px', lineHeight: 1.8, color: C.inkSoft, marginBottom: '20px' }}>
            {a.excerpt}
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <User size={11} color={C.inkFaint} strokeWidth={1.5} />
              <span style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.14em', color: C.inkFaint }}>{a.author}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Clock size={11} color={C.inkFaint} strokeWidth={1.5} />
              <span style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.14em', color: C.inkFaint }}>{a.readTime}</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: color }}>Read</span>
            <ArrowRight size={11} color={color} strokeWidth={2} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BlogPage() {
  const [activeCat, setActiveCat] = useState<Category>('All');
  const featured = ARTICLES[0];
  const filtered = activeCat === 'All' ? ARTICLES.slice(1) : ARTICLES.slice(1).filter(a => a.cat === activeCat);

  return (
    <div style={{ background: C.paper, minHeight: '100vh' }}>
      <NavBar />

      {/* ── HERO ── */}
      <section style={{
        background: C.cream2, paddingTop: '64px', minHeight: '46vh',
        display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden',
        borderBottom: `1px solid ${C.lineS}`,
      }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '72px 40px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <span style={{ fontFamily: MONO, fontSize: '11px', letterSpacing: '0.32em', textTransform: 'uppercase', color: C.inkFaint }}>Stories from Nepal</span>
          </div>
          <h1 style={{ fontFamily: SERIF, fontWeight: 300, fontSize: 'clamp(48px,6vw,96px)', lineHeight: 0.92, letterSpacing: '-0.02em', color: C.ink }}>
            Real journeys.<br />
            <em style={{ fontStyle: 'italic', color: C.inkSoft }}>Honest stories.</em>
          </h1>
          <p style={{ fontFamily: MUKTA, fontSize: '17px', lineHeight: 1.85, fontWeight: 300, color: C.inkSoft, maxWidth: '50ch', marginTop: '28px' }}>
            Deep dives into Nepal's destinations, culture, spirituality, and adventure — written by people who live it.
          </p>
        </div>
      </section>

      {/* ── FEATURED ── */}
      <section style={{ background: C.cream, padding: '80px 0', borderTop: `1px solid ${C.lineS}` }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px' }}>
            <span style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.26em', textTransform: 'uppercase', color: C.terra }}>Featured story</span>
            <span style={{ flex: 1, height: '1px', background: C.lineS }} />
          </div>
          <ArticleCard a={featured} large />
        </div>
      </section>

      {/* ── ALL ARTICLES ── */}
      <section style={{ background: C.paper, padding: '80px 0', borderTop: `1px solid ${C.lineS}` }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 40px' }}>

          {/* category filter */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '48px' }}>
            {CATS.map(cat => {
              const active = activeCat === cat;
              const color = CAT_COLOR[cat] ?? C.ink;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCat(cat)}
                  style={{
                    fontFamily: MONO, fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase',
                    padding: '9px 18px', borderRadius: '2px', cursor: 'pointer', border: 'none',
                    background: active ? (cat === 'All' ? C.inkSoft : color) : C.cream2,
                    color: active ? C.cream : C.inkSoft,
                    transition: 'background .2s, color .2s',
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* grid */}
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', fontFamily: MUKTA, color: C.inkFaint }}>
              No articles in this category yet — check back soon.
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' }}>
              {filtered.map(a => <ArticleCard key={a.id} a={a} />)}
            </div>
          )}
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section style={{ background: C.cream2, padding: '80px 40px', textAlign: 'center', borderTop: `1px solid ${C.lineS}` }}>
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
          <div style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: C.inkFaint, marginBottom: '16px' }}>Stay connected</div>
          <h2 style={{ fontFamily: SERIF, fontWeight: 300, fontSize: 'clamp(32px,4vw,52px)', color: C.ink, marginBottom: '16px', lineHeight: 1.05 }}>
            New stories, every month.
          </h2>
          <p style={{ fontFamily: MUKTA, fontSize: '15px', color: C.inkSoft, marginBottom: '36px' }}>
            Join 4,000+ readers following Nepal's 0.5% transformation — one story at a time.
          </p>
          <div className="vfy-newsletter-row" style={{ display: 'flex', gap: '0', maxWidth: '420px', margin: '0 auto' }}>
            <input
              type="email" placeholder="your@email.com"
              style={{
                flex: 1, padding: '13px 18px', background: C.paper,
                border: `1px solid ${C.lineS}`, borderRight: 'none',
                color: C.ink, fontFamily: MUKTA, fontSize: '14px',
                outline: 'none', borderRadius: '2px 0 0 2px',
              }}
            />
            <button style={{
              padding: '13px 22px', background: C.ink, color: C.cream, border: 'none',
              fontFamily: MONO, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase',
              cursor: 'pointer', borderRadius: '0 2px 2px 0', whiteSpace: 'nowrap',
            }}>
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
