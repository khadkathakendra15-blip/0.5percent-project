import { NavBar } from '@/components/ui/nav-bar';

const C = {
  ink:      '#0a1a2e',
  inkSoft:  '#3d5578',
  inkFaint: '#82b395',
  cream:    '#eaf0f8',
  cream2:   '#dce8f5',
  paper:    '#fafdfa',
  saffron:  '#7599cb',
  terra:    '#DC143C',
  line:     'rgba(10,26,46,0.08)',
  lineM:    'rgba(10,26,46,0.13)',
};
const SERIF = "'Cormorant Garamond', Georgia, serif";
const BEBAS = "'Bebas Neue', sans-serif";
const MUKTA = "'Mukta', system-ui, sans-serif";
const MONO  = "'JetBrains Mono', ui-monospace, monospace";

const EPISODES = [
  { id: 'gWmTicQNmH0', ep: '01' },
  { id: 'rht-XfzExho', ep: '02' },
  { id: 'iGI7_ZDXQII', ep: '03' },
  { id: 'NwtcF2WT89c', ep: '04' },
  { id: 'YmOyjbsxyRQ', ep: '05' },
];

function EpisodeCard({ id, ep, featured = false }: { id: string; ep: string; featured?: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontFamily: BEBAS, fontSize: featured ? '28px' : '20px', color: C.saffron, letterSpacing: '0.05em', lineHeight: 1 }}>
          EP {ep}
        </span>
        <span style={{ flex: 1, height: '1px', background: C.lineM }} />
        <span style={{ fontFamily: MONO, fontSize: '8px', letterSpacing: '0.16em', textTransform: 'uppercase', color: C.inkFaint }}>
          Yatra Nepalko
        </span>
      </div>
      <div style={{
        position: 'relative', width: '100%', paddingBottom: '56.25%', height: 0,
        borderRadius: '6px', overflow: 'hidden', background: C.ink,
        border: `1px solid ${C.line}`,
        boxShadow: featured ? '0 16px 48px rgba(10,26,46,0.14)' : '0 4px 20px rgba(10,26,46,0.08)',
      }}>
        <iframe
          src={`https://www.youtube.com/embed/${id}`}
          title={`Yatra Nepalko — Episode ${ep}`}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </div>
  );
}

export default function YatraNepalkoPage() {
  return (
    <div style={{ background: C.paper, minHeight: '100vh' }}>
      <NavBar />
      <style>{`
        .yn-ep-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
        @media (max-width: 860px) {
          .yn-hero-cols { flex-direction: column !important; }
          .yn-hero-right { width: 100% !important; }
          .yn-ep-grid   { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .yn-hero-pad  { padding: 48px 24px 56px !important; }
          .yn-ep-pad    { padding: 0 24px !important; }
          .yn-strip-pad { padding: 28px 24px !important; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section style={{
        background: C.cream2, paddingTop: '64px',
        borderBottom: `1px solid ${C.line}`, position: 'relative', overflow: 'hidden',
      }}>
        {/* Subtle warm glow */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(55% 70% at 100% 0%, rgba(31,77,138,0.06), transparent 60%)',
        }} />

        <div className="yn-hero-pad" style={{ maxWidth: '1320px', margin: '0 auto', padding: '72px 40px 80px', position: 'relative', zIndex: 1 }}>

          {/* Top eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '32px', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.28em', textTransform: 'uppercase', color: C.saffron }}>
              A Travel Talk Show
            </span>
            <span style={{ width: '28px', height: '1px', background: `rgba(31,77,138,0.35)` }} />
            <span style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: C.inkFaint }}>
              Developed by 0.5% Campaign Team
            </span>
          </div>

          {/* Two-column: title left, featured video right */}
          <div className="yn-hero-cols" style={{ display: 'flex', gap: '64px', alignItems: 'flex-start' }}>

            {/* Left */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <h1 style={{
                fontFamily: SERIF, fontWeight: 300,
                fontSize: 'clamp(56px, 7.5vw, 110px)',
                lineHeight: 0.88, letterSpacing: '-0.025em',
                color: C.ink, margin: '0 0 6px',
              }}>
                Yatra
              </h1>
              <h1 style={{
                fontFamily: SERIF, fontWeight: 300, fontStyle: 'italic',
                fontSize: 'clamp(56px, 7.5vw, 110px)',
                lineHeight: 0.88, letterSpacing: '-0.025em',
                color: C.saffron, margin: '0 0 36px',
              }}>
                Nepalko
              </h1>

              <p style={{
                fontFamily: MUKTA, fontSize: '17px', lineHeight: 1.85,
                fontWeight: 300, color: C.inkSoft,
                maxWidth: '46ch', margin: '0 0 32px',
              }}>
                World's popular personalities journey through Nepal — its ancient temples,
                soaring mountains, hidden villages, and living cultures — in conversation
                like you've never heard before.
              </p>

              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                borderTop: `1px solid ${C.lineM}`, paddingTop: '24px',
              }}>
                <span style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: C.inkFaint }}>
                  Watch all 5 episodes below
                </span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.inkFaint} strokeWidth="1.5">
                  <path d="M12 5v14M5 12l7 7 7-7"/>
                </svg>
              </div>
            </div>

            {/* Right: featured episode */}
            <div className="yn-hero-right" style={{ width: '48%', flexShrink: 0 }}>
              <div style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: C.inkFaint, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontFamily: BEBAS, fontSize: '20px', color: C.saffron }}>EP 01</span>
                <span style={{ flex: 1, height: '1px', background: C.lineM }} />
                <span>Featured</span>
              </div>
              <div style={{
                position: 'relative', width: '100%', paddingBottom: '56.25%', height: 0,
                borderRadius: '8px', overflow: 'hidden', background: C.ink,
                boxShadow: '0 20px 60px rgba(10,26,46,0.18)',
                border: `1px solid ${C.lineM}`,
              }}>
                <iframe
                  src="https://www.youtube.com/embed/gWmTicQNmH0?si=HwaAnv7zkQ8r2WFp"
                  title="Yatra Nepalko — Episode 01"
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── ABOUT STRIP ── */}
      <section style={{ background: C.ink, borderBottom: `1px solid rgba(234,247,238,0.07)` }}>
        <div className="yn-strip-pad" style={{ maxWidth: '1320px', margin: '0 auto', padding: '30px 40px', display: 'flex', alignItems: 'center', gap: '40px', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: SERIF, fontSize: '15px', fontStyle: 'italic', color: 'rgba(234,247,238,0.40)', flexShrink: 0 }}>
            About the show
          </span>
          <span style={{ width: '1px', height: '32px', background: 'rgba(234,247,238,0.12)', flexShrink: 0 }} className="yn-divider" />
          <p style={{ fontFamily: MUKTA, fontSize: '14px', lineHeight: 1.8, color: 'rgba(234,247,238,0.62)', flex: 1, margin: 0 }}>
            <em style={{ fontFamily: SERIF, fontSize: '16px', color: 'rgba(234,247,238,0.88)', fontStyle: 'italic' }}>Yatra Nepalko</em> is a travel talk show developed by the 0.5% Campaign Team —
            bringing the world's celebrated personalities to Nepal's most extraordinary places.
            Unscripted, authentic, unforgettable.
          </p>
        </div>
      </section>

      {/* ── ALL EPISODES ── */}
      <section style={{ background: C.paper, padding: '88px 0 100px' }}>
        <div className="yn-ep-pad" style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 40px' }}>

          {/* Section header */}
          <div style={{ marginBottom: '56px', borderBottom: `1px solid ${C.line}`, paddingBottom: '36px' }}>
            <div style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: C.saffron, marginBottom: '16px' }}>
              All Episodes
            </div>
            <h2 style={{ fontFamily: SERIF, fontWeight: 300, fontSize: 'clamp(36px, 4.5vw, 62px)', color: C.ink, lineHeight: 0.95, margin: 0 }}>
              Every journey,<br />
              <em style={{ fontStyle: 'italic', color: C.inkSoft }}>every story.</em>
            </h2>
          </div>

          {/* Episodes 2–5 in 2-column grid */}
          <div className="yn-ep-grid">
            {EPISODES.slice(1).map(ep => (
              <EpisodeCard key={ep.id} id={ep.id} ep={ep.ep} />
            ))}
          </div>

        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: C.cream2, padding: '80px 40px', borderTop: `1px solid ${C.line}` }}>
        <div style={{ maxWidth: '660px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.26em', textTransform: 'uppercase', color: C.saffron, marginBottom: '20px' }}>
            Be part of the journey
          </div>
          <h2 style={{ fontFamily: SERIF, fontWeight: 300, fontSize: 'clamp(34px, 4vw, 56px)', color: C.ink, lineHeight: 1.0, marginBottom: '16px' }}>
            Nepal is waiting.<br />
            <em style={{ fontStyle: 'italic', color: C.inkSoft }}>Are you?</em>
          </h2>
          <p style={{ fontFamily: MUKTA, fontSize: '15px', color: C.inkSoft, lineHeight: 1.8, marginBottom: '36px' }}>
            Inspired by what you watched? Plan your own Nepal journey with our AI travel guide.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/ai-guide" style={{ textDecoration: 'none' }}>
              <div style={{
                fontFamily: MONO, fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase',
                background: C.ink, color: C.cream, padding: '13px 32px', borderRadius: '2px', cursor: 'pointer',
              }}>
                Plan with Guide AI →
              </div>
            </a>
            <a href="/destinations" style={{ textDecoration: 'none' }}>
              <div style={{
                fontFamily: MONO, fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase',
                border: `1.5px solid ${C.lineM}`, color: C.inkSoft,
                padding: '13px 32px', borderRadius: '2px', cursor: 'pointer',
              }}>
                Explore Destinations
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
