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
  ink:      '#F3F3F0',
  inkSoft:  '#9498A4',
  inkFaint: '#5C606C',
  cream:    '#0E0F14',
  cream2:   '#15171E',
  paper:    '#0A0B0F',
  saffron:  '#FFC000',
  saffronB: '#FFC000',
  terra:    '#FFC000',
  line:     'rgba(255,255,255,0.13)',
};

const SERIF = "'Bricolage Grotesque', system-ui, sans-serif";
const BEBAS = "'Bricolage Grotesque', sans-serif";
const MUKTA = "'Space Grotesk', sans-serif";
const MONO  = "'Space Mono', monospace";

const PANELS = [
  { id: 1, label: 'Himalayas',   src: '/Himalayas Landscape.png' },
  { id: 2, label: 'Spiritual',   src: '/spirtual Distination.webp' },
  { id: 3, label: 'Culture',     src: '/nepali art.jpeg' },
  { id: 4, label: 'Adventure',   src: '/sport tourism.png' },
  { id: 5, label: 'Cinema',      src: '/Cinema tourism.png' },
];

function Panel({ item, isActive, onEnter }: {
  item: typeof PANELS[0]; isActive: boolean; onEnter: () => void;
}) {
  return (
    <div
      onMouseEnter={onEnter}
      onClick={onEnter}
      style={{
        position: 'relative',
        height: '480px',
        borderRadius: '4px',
        overflow: 'hidden',
        flexShrink: 0,
        width: isActive ? '360px' : '58px',
        transition: 'width .7s cubic-bezier(.2,.6,.2,1)',
        cursor: 'pointer',
        background: '#0A0B0F',
      }}
    >
      <img
        src={item.src}
        alt={item.label}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .8s ease' }}
        onMouseEnter={e => { if (isActive) (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }}
      />
      {/* scrim */}
      <div style={{ position: 'absolute', inset: 0, background: isActive ? 'linear-gradient(180deg, rgba(8,6,4,0.08) 0%, rgba(8,6,4,0.72) 100%)' : 'rgba(8,6,4,0.55)' }} />

      {/* label */}
      <div style={{
        position: 'absolute',
        ...(isActive
          ? { left: '22px', bottom: '22px', writingMode: 'horizontal-tb' }
          : { bottom: '22px', left: '50%', transform: 'translateX(-50%) rotate(180deg)', writingMode: 'vertical-rl' }),
        transition: 'all .4s ease',
        color: '#fff',
        fontFamily: isActive ? SERIF : MUKTA,
        fontSize: isActive ? '22px' : '10px',
        fontWeight: isActive ? 400 : 500,
        letterSpacing: isActive ? '0.01em' : '0.22em',
        textTransform: isActive ? 'none' : 'uppercase',
        whiteSpace: 'nowrap',
      }}>
        {isActive
          ? <span style={{ fontStyle: 'italic' }}>{item.label}</span>
          : item.label
        }
      </div>

      {/* active index dot */}
      {isActive && (
        <div style={{
          position: 'absolute', top: '18px', left: '18px',
          width: '28px', height: '28px', borderRadius: '50%',
          background: C.terra, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontFamily: MONO, fontSize: '10px', color: '#0A0B0F', fontWeight: 700, letterSpacing: '0.05em' }}>
            0{item.id}
          </span>
        </div>
      )}
    </div>
  );
}

export function HalfPercentVisionSection() {
  const [active, setActive] = useState(0);
  const rLeft  = useReveal(0, 'left');
  const rRight = useReveal(0.14, 'right');

  return (
    <section style={{ background: C.paper, padding: '110px 0', position: 'relative', overflow: 'hidden' }}>
      {/* subtle warm glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(70% 60% at 0% 50%, rgba(12,26,50,0.05), transparent 55%)',
      }} />

      <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: '72px' }}>

          {/* ── left text ── */}
          <div ref={rLeft} style={{ width: '38%', flexShrink: 0 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase',
              fontWeight: 500, fontFamily: MUKTA, color: C.terra, marginBottom: '20px',
            }}>
              Nepal · Five Facets
            </div>

            <h2 style={{
              fontFamily: SERIF, fontWeight: 700,
              fontSize: 'clamp(38px, 4.2vw, 64px)',
              lineHeight: 1.0, letterSpacing: '-0.015em', color: C.ink,
              marginBottom: '28px',
            }}>
              Discover Nepal's<br />
              <em style={{ fontStyle: 'italic', color: C.terra }}>remarkable</em> facets.
            </h2>

            <p style={{ fontSize: '16px', lineHeight: 1.85, color: C.inkSoft, fontWeight: 400, fontFamily: MUKTA, marginBottom: '32px', maxWidth: '38ch' }}>
              From Himalayan peaks to ancient temples, from spiritual retreats to adrenaline trails
              Nepal offers the world a depth no single journey can exhaust.
            </p>

            {/* stat row */}
            <div style={{
              display: 'flex', gap: '0',
              borderTop: `1px solid ${C.line}`, paddingTop: '28px',
            }}>
              {[
                { num: '5', label: 'Distinct\nexperiences' },
                { num: '8,849', label: 'Metres\nEverest summit' },
                { num: '10+', label: 'UNESCO\nWorld Heritage' },
              ].map((s, i) => (
                <div key={i} style={{ flex: 1, paddingRight: i < 2 ? '20px' : '0', borderRight: i < 2 ? `1px solid ${C.line}` : 'none', paddingLeft: i > 0 ? '20px' : '0' }}>
                  <div style={{ fontFamily: BEBAS, fontSize: '36px', lineHeight: 0.9, color: C.terra, letterSpacing: '0.02em' }}>{s.num}</div>
                  <div style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: C.inkFaint, marginTop: '6px', lineHeight: 1.5, whiteSpace: 'pre-line' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── right accordion ── */}
          <div ref={rRight} style={{ flex: 1, overflow: 'hidden' }}>
            <div className="vfy-panels-row" style={{ display: 'flex', flexDirection: 'row', gap: '8px', alignItems: 'stretch' }}>
              {PANELS.map((item, i) => (
                <Panel key={item.id} item={item} isActive={i === active} onEnter={() => setActive(i)} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
