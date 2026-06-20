import { useState, useRef, useEffect } from 'react';

function useReveal(delay = 0, dir: 'up' | 'left' | 'right' = 'up') {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = '0';
    const tx = dir === 'left' ? '-36px' : dir === 'right' ? '36px' : '0px';
    const ty = dir === 'up' ? '28px' : '0px';
    el.style.transform = `translate(${tx}, ${ty})`;
    el.style.transition = `opacity .85s cubic-bezier(.2,.6,.2,1) ${delay}s, transform .85s cubic-bezier(.2,.6,.2,1) ${delay}s`;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'none'; obs.disconnect(); }
    }, { threshold: 0.08, rootMargin: '0px 0px -5% 0px' });
    obs.observe(el);
    const t = setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'none'; }, 1500);
    return () => { obs.disconnect(); clearTimeout(t); };
  }, [delay, dir]);
  return ref;
}

const C = {
  ink:         '#0a1933',
  inkSoft:     '#3d5778',
  inkFaint:    '#8295b3',
  cream:       '#eaf1fa',
  paper:       '#f8fafd',
  saffron:     '#1e77c1',
  saffronBright: '#3d96e0',
  terra:       '#DC143C',
  line:        'rgba(10,25,51,0.14)',
  lineS:       'rgba(10,25,51,0.08)',
};

const SERIF = "'Cormorant Garamond', Georgia, serif";
const BEBAS = "'Bebas Neue', sans-serif";
const MUKTA = "'Mukta', system-ui, sans-serif";
const MONO  = "'JetBrains Mono', ui-monospace, monospace";

const ITEMS = [
  {
    n: '01',
    title: 'Podcasts & Interviews',
    desc: "International interview series featuring Nepal's culture, voices and stories.",
    tag: 'Long-form · Audio · Global guests',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}>
        <rect x="9" y="3" width="6" height="13" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>
      </svg>
    ),
  },
  {
    n: '02',
    title: 'Travel Vlogs',
    desc: 'Visual storytelling through immersive travel content and creator partnerships.',
    tag: 'YouTube · Reels · Creator collabs',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}>
        <rect x="3" y="6" width="14" height="12" rx="2"/><path d="M17 10l4-2v8l-4-2z"/>
      </svg>
    ),
  },
  {
    n: '03',
    title: 'Documentaries & Films',
    desc: "Cinematic productions showcasing Nepal's breathtaking landscapes and heritage.",
    tag: 'Festival · Streaming · Original',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}>
        <rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 9h18M7 5v14M17 5v14"/>
      </svg>
    ),
  },
  {
    n: '04',
    title: 'Cultural Festivals',
    desc: 'Musical concerts and cultural celebrations connecting Nepal with the world.',
    tag: 'Live · Heritage · Diaspora',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}>
        <path d="M9 18V6l11-2v12"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>
      </svg>
    ),
  },
  {
    n: '05',
    title: 'Digital Campaigns',
    desc: "Global collaborations and social media movements amplifying Nepal's voice.",
    tag: 'Always-on · Multi-platform',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}>
        <circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>
      </svg>
    ),
  },
  {
    n: '06',
    title: 'Influencer Experiences',
    desc: "Inviting celebrities and creators to experience and share Nepal's magic.",
    tag: 'Hosted · Curated · Bespoke',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}>
        <circle cx="9" cy="8" r="4"/><path d="M2 21a7 7 0 0 1 14 0M17 11l2 2 4-4"/>
      </svg>
    ),
  },
];

function LedgerCard({ item, col }: { item: typeof ITEMS[0]; col: number }) {
  const [hovered, setHovered] = useState(false);

  const isLastInRow = col % 3 === 0;

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        padding: '38px 32px 36px',
        borderRight: isLastInRow ? 'none' : `1px solid ${C.line}`,
        background: hovered ? C.paper : 'transparent',
        transition: 'background .35s ease',
        cursor: 'pointer',
        overflow: 'hidden',
      }}
    >
      {/* top sweep bar */}
      <div style={{
        position: 'absolute', left: 0, top: 0, height: '2px',
        width: hovered ? '100%' : '0%',
        background: C.saffron,
        transition: 'width .5s cubic-bezier(.2,.6,.2,1)',
      }} />

      {/* number + icon row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '18px', marginBottom: '26px' }}>
        <div style={{ fontFamily: BEBAS, fontSize: '42px', lineHeight: 0.9, color: C.ink, letterSpacing: '0.02em' }}>
          <span style={{ color: C.saffron, fontWeight: 400 }}>{item.n[0]}</span>{item.n[1]}
        </div>
        <div style={{
          width: '34px', height: '34px', borderRadius: '50%', flexShrink: 0,
          border: `1px solid ${hovered ? C.ink : C.line}`,
          background: hovered ? C.ink : 'transparent',
          color: hovered ? C.saffronBright : C.inkSoft,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transform: hovered ? 'rotate(-45deg)' : 'none',
          transition: 'background .3s, color .3s, border-color .3s, transform .3s',
        }}>
          {item.icon}
        </div>
      </div>

      {/* title */}
      <h3 style={{
        fontFamily: SERIF, fontWeight: 500,
        fontSize: '28px', lineHeight: 1.1, letterSpacing: '-0.005em',
        marginBottom: '14px', color: C.ink,
      }}>
        {item.title}
      </h3>

      {/* description */}
      <p style={{
        fontSize: '14.5px', lineHeight: 1.75, color: C.inkSoft,
        fontWeight: 300, fontFamily: MUKTA, maxWidth: '32ch',
      }}>
        {item.desc}
      </p>

      {/* tag strip */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '8px',
        marginTop: '24px', paddingTop: '18px',
        borderTop: `1px dashed ${C.lineS}`, width: '100%',
        fontFamily: MONO, fontSize: '10.5px', letterSpacing: '0.22em',
        textTransform: 'uppercase', color: C.inkFaint,
      }}>
        <span style={{ width: '6px', height: '6px', background: C.terra, flexShrink: 0 }} />
        {item.tag}
      </div>
    </article>
  );
}

export function CampaignApproachSection() {
  const [ctaHover, setCtaHover] = useState(false);
  const rLeft  = useReveal(0, 'left');
  const rRight = useReveal(0.12, 'right');
  const rGrid  = useReveal(0.2);
  const rFooter = useReveal(0.28);

  return (
    <section style={{
      padding: '110px 0',
      background: C.cream,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* subtle background warmth */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `
          radial-gradient(90% 70% at 100% 0%, rgba(30,119,193,0.06), transparent 55%),
          radial-gradient(70% 60% at 0% 100%, rgba(255,0,0,0.04), transparent 60%)`,
      }} />

      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 1 }}>

        {/* ── header ── */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px',
          alignItems: 'end', paddingBottom: '48px',
          borderBottom: `1px solid ${C.line}`,
        }}>
          <div ref={rLeft}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '12px',
              fontSize: '12px', letterSpacing: '0.32em', textTransform: 'uppercase',
              fontWeight: 500, fontFamily: MUKTA, color: C.terra, marginBottom: '22px',
            }}>
              Campaign approach
            </div>
            <h2 style={{
              fontFamily: SERIF, fontWeight: 300,
              fontSize: 'clamp(40px, 4.6vw, 68px)',
              lineHeight: 1.0, letterSpacing: '-0.015em', color: C.ink,
            }}>
              Promote Nepal through<br />
              <em style={{ fontStyle: 'italic', color: C.terra, fontWeight: 400 }}>global media</em>.
            </h2>
          </div>

          <div ref={rRight} style={{ paddingBottom: '6px' }}>
            <p style={{
              fontSize: '16px', lineHeight: 1.85, color: C.inkSoft,
              fontWeight: 300, fontFamily: MUKTA, maxWidth: '46ch',
            }}>
              The 0.5% Campaign leverages modern storytelling and digital platforms
              to share Nepal's wonders with billions of potential travellers worldwide.
            </p>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '14px', marginTop: '22px',
              fontFamily: MONO, fontSize: '11px', letterSpacing: '0.18em',
              textTransform: 'uppercase', color: C.inkFaint,
            }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: C.saffron, display: 'inline-block' }} />
              06 channels · one voice
            </div>
          </div>
        </div>

        {/* ── ledger grid ── */}
        <div ref={rGrid} className="campaign-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          borderBottom: `1px solid ${C.line}`,
        }}>
          {ITEMS.map((item, i) => {
            const col = (i % 3) + 1;
            const row = Math.floor(i / 3);
            return (
              <div key={i} className="campaign-item" style={{ borderTop: row > 0 ? `1px solid ${C.line}` : 'none' }}>
                <LedgerCard item={item} col={col} />
              </div>
            );
          })}
        </div>

        {/* ── footer ── */}
        <div ref={rFooter} style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          paddingTop: '36px', flexWrap: 'wrap', gap: '20px',
        }}>
          <div style={{
            fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400,
            fontSize: '22px', lineHeight: 1.4, color: C.ink, maxWidth: '42ch',
          }}>
            "Nepal doesn't need to be discovered — it needs to be heard."
          </div>
          <a
            href="mailto:vfytalks@gmail.com"
            onMouseEnter={() => setCtaHover(true)}
            onMouseLeave={() => setCtaHover(false)}
            style={{
              display: 'inline-flex', alignItems: 'center',
              gap: ctaHover ? '18px' : '12px',
              padding: '14px 24px', borderRadius: '100px',
              background: ctaHover ? C.saffron : C.ink,
              color: C.cream,
              fontSize: '12px', letterSpacing: '0.22em', textTransform: 'uppercase',
              fontWeight: 600, fontFamily: MUKTA,
              transition: 'gap .25s, background .25s',
              textDecoration: 'none',
            }}
          >
            Partner with us
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}
