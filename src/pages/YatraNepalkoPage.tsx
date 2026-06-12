import { NavBar } from '@/components/ui/nav-bar';

const C = {
  ink:      '#181410',
  ink2:     '#2a231c',
  inkSoft:  '#5a4f44',
  inkFaint: '#9b8f80',
  cream:    '#f4ede0',
  cream2:   '#ebe2d1',
  paper:    '#faf5ea',
  saffron:  '#1e77c1',
  terra:    '#ff0000',
  line:     'rgba(24,20,16,0.08)',
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

export default function YatraNepalkoPage() {
  return (
    <div style={{ background: C.paper, minHeight: '100vh' }}>
      <NavBar />
      <style>{`
        .yn-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
        .yn-ep-grid   { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
        .yn-ep-solo   { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 28px; }
        .yn-featured  { grid-column: 1 / -1; }
        .yn-frame-wrap {
          position: relative; width: 100%; padding-bottom: 56.25%; height: 0;
          border-radius: 8px; overflow: hidden; background: #0a0705;
        }
        .yn-frame-wrap iframe {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          border: none; border-radius: 8px;
        }
        @media (max-width: 900px) {
          .yn-hero-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
          .yn-ep-grid   { grid-template-columns: 1fr !important; }
          .yn-ep-solo   { grid-template-columns: 1fr !important; }
          .yn-featured  { grid-column: 1 !important; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section style={{
        background: C.ink, paddingTop: '64px', position: 'relative', overflow: 'hidden',
        borderBottom: `1px solid rgba(244,237,224,0.08)`,
      }}>
        {/* background texture */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(60% 80% at 100% 50%, rgba(30,119,193,0.08), transparent 60%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(40% 60% at 0% 100%, rgba(255,0,0,0.05), transparent 55%)',
        }} />

        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '80px 40px 88px', position: 'relative', zIndex: 1 }}>
          <div className="yn-hero-grid">

            {/* Left: text */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <span style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.28em', textTransform: 'uppercase', color: C.saffron }}>
                  A Travel Talk Show
                </span>
                <span style={{ width: '32px', height: '1px', background: `rgba(30,119,193,0.5)` }} />
                <span style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(244,237,224,0.35)' }}>
                  Developed by 0.5% Vision
                </span>
              </div>

              <h1 style={{
                fontFamily: SERIF, fontWeight: 300,
                fontSize: 'clamp(52px, 7vw, 100px)',
                lineHeight: 0.92, letterSpacing: '-0.02em',
                color: C.cream, marginBottom: '10px',
              }}>
                Yatra
              </h1>
              <h1 style={{
                fontFamily: SERIF, fontWeight: 300,
                fontSize: 'clamp(52px, 7vw, 100px)',
                lineHeight: 0.92, letterSpacing: '-0.02em',
                color: C.cream, marginBottom: '32px', fontStyle: 'italic',
              }}>
                <em style={{ color: C.saffron }}>Nepalko</em>
              </h1>

              <p style={{
                fontFamily: MUKTA, fontSize: '17px', lineHeight: 1.85,
                fontWeight: 300, color: 'rgba(244,237,224,0.70)',
                maxWidth: '44ch', marginBottom: '36px',
              }}>
                Nepal's most celebrated personalities take to the road — discovering hidden trails,
                ancient temples, mountain villages, and the untold stories of their own homeland.
              </p>

              <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
                {[
                  { n: '5+', l: 'Episodes' },
                  { n: 'Celebrity', l: 'Guests' },
                  { n: 'Nepal', l: 'Destinations' },
                ].map(s => (
                  <div key={s.l}>
                    <div style={{ fontFamily: BEBAS, fontSize: '32px', color: C.saffron, lineHeight: 0.9, letterSpacing: '0.04em' }}>{s.n}</div>
                    <div style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(244,237,224,0.38)', marginTop: '6px' }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: featured first episode */}
            <div>
              <div style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(244,237,224,0.35)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontFamily: BEBAS, fontSize: '18px', color: C.saffron, letterSpacing: '0.04em' }}>EP 01</span>
                <span style={{ flex: 1, height: '1px', background: 'rgba(244,237,224,0.1)' }} />
                Latest Episode
              </div>
              <div className="yn-frame-wrap" style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.5)' }}>
                <iframe
                  src="https://www.youtube.com/embed/gWmTicQNmH0?si=HwaAnv7zkQ8r2WFp"
                  title="Yatra Nepalko — Episode 01"
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
      <section style={{ background: C.cream2, borderBottom: `1px solid ${C.line}` }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '32px 40px', display: 'flex', alignItems: 'center', gap: '48px', flexWrap: 'wrap' }}>
          <div style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: C.inkFaint, flexShrink: 0 }}>
            About the show
          </div>
          <p style={{ fontFamily: MUKTA, fontSize: '15px', lineHeight: 1.75, color: C.inkSoft, flex: 1, margin: 0 }}>
            <em style={{ fontFamily: SERIF, fontSize: '17px', color: C.ink, fontStyle: 'italic' }}>Yatra Nepalko</em> pairs Nepal's popular celebrities with the country's most breathtaking destinations.
            Each episode is an unscripted journey — part conversation, part adventure, entirely Nepal.
          </p>
        </div>
      </section>

      {/* ── ALL EPISODES ── */}
      <section style={{ background: C.paper, padding: '88px 0' }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 40px' }}>

          {/* Section header */}
          <div style={{ marginBottom: '52px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: C.saffron }}>All Episodes</span>
              <span style={{ flex: 1, maxWidth: '60px', height: '1px', background: `rgba(30,119,193,0.3)` }} />
            </div>
            <h2 style={{ fontFamily: SERIF, fontWeight: 300, fontSize: 'clamp(36px,4.5vw,64px)', color: C.ink, margin: 0, lineHeight: 1.0 }}>
              Every journey,<br />
              <em style={{ fontStyle: 'italic', color: C.inkSoft }}>every story.</em>
            </h2>
          </div>

          {/* Episodes 2–5 in 2×2 grid + centered 5th */}
          <div className="yn-ep-grid">
            {EPISODES.slice(1).map(ep => (
              <div key={ep.id}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <span style={{ fontFamily: BEBAS, fontSize: '22px', color: C.saffron, letterSpacing: '0.04em', lineHeight: 1 }}>EP {ep.ep}</span>
                  <span style={{ flex: 1, height: '1px', background: C.line }} />
                  <span style={{ fontFamily: MONO, fontSize: '8px', letterSpacing: '0.14em', textTransform: 'uppercase', color: C.inkFaint }}>Yatra Nepalko</span>
                </div>
                <div className="yn-frame-wrap" style={{ boxShadow: '0 8px 32px rgba(24,20,16,0.10)', border: `1px solid ${C.line}` }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${ep.id}`}
                    title={`Yatra Nepalko — Episode ${ep.ep}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: C.ink, padding: '80px 40px', textAlign: 'center' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <div style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.24em', textTransform: 'uppercase', color: C.saffron, marginBottom: '20px' }}>
            Be part of the journey
          </div>
          <h2 style={{ fontFamily: SERIF, fontWeight: 300, fontSize: 'clamp(32px,4vw,54px)', color: C.cream, lineHeight: 1.05, marginBottom: '16px' }}>
            Nepal is waiting.<br />
            <em style={{ fontStyle: 'italic', color: 'rgba(244,237,224,0.50)' }}>Are you?</em>
          </h2>
          <p style={{ fontFamily: MUKTA, fontSize: '15px', color: 'rgba(244,237,224,0.55)', lineHeight: 1.8, marginBottom: '36px' }}>
            Inspired by what you saw? Start planning your own Nepal adventure with our AI travel guide.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/ai-guide" style={{ textDecoration: 'none' }}>
              <div style={{
                fontFamily: MONO, fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase',
                background: C.saffron, color: C.cream, padding: '13px 32px', borderRadius: '2px', cursor: 'pointer',
              }}>
                Plan with Guide AI →
              </div>
            </a>
            <a href="/destinations" style={{ textDecoration: 'none' }}>
              <div style={{
                fontFamily: MONO, fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase',
                border: `1.5px solid rgba(244,237,224,0.18)`, color: 'rgba(244,237,224,0.65)',
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
