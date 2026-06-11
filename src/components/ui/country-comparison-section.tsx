import { useRef, useEffect, useState } from 'react';

/* ─── tokens ─────────────────────────────────────────────────────────────── */
const C = {
  ink:      '#181410',
  inkSoft:  '#5a4f44',
  inkFaint: '#9b8f80',
  cream:    '#f4ede0',
  cream2:   '#ebe2d1',
  paper:    '#faf5ea',
  saffron:  '#1e77c1',
  saffronB: '#2d8ed4',
  terra:    '#ff0000',
  line:     'rgba(24,20,16,0.13)',
  lineS:    'rgba(24,20,16,0.07)',
};
const SERIF = "'Cormorant Garamond', serif";
const BEBAS = "'Bebas Neue', sans-serif";
const MUKTA = "'Mukta', sans-serif";
const MONO  = "'JetBrains Mono', monospace";

/* ─── country data ───────────────────────────────────────────────────────── */
const COUNTRIES = [
  {
    code: 'NP', name: 'Nepal', pop: '30M',
    tourists: '1.1M', revenue: '$800M', gdp: '7%',
    touristsPct: 18,  revenuePct: 22,  gdpPct: 47,
    touristsNum: 1.1, revenueNum: 800, gdpNum: 7,
    touristsFmt: (v: number) => `${v.toFixed(1)}M`,
    revenueFmt:  (v: number) => `$${Math.round(v)}M`,
    gdpFmt:      (v: number) => `${v.toFixed(0)}%`,
    color: C.terra, bg: C.cream, highlight: true,
    note: '0.5% target → 14.2M visitors', badge: 'Nepal',
  },
  {
    code: 'BT', name: 'Bhutan', pop: '0.8M',
    tourists: '150K', revenue: '$350M', gdp: '12.5%',
    touristsPct: 2.5, revenuePct: 10,  gdpPct: 83,
    touristsNum: 150, revenueNum: 350, gdpNum: 12.5,
    touristsFmt: (v: number) => `${Math.round(v)}K`,
    revenueFmt:  (v: number) => `$${Math.round(v)}M`,
    gdpFmt:      (v: number) => `${v.toFixed(1)}%`,
    color: '#7c6fcd', bg: C.paper, highlight: false, note: '', badge: '',
  },
  {
    code: 'KH', name: 'Cambodia', pop: '17M',
    tourists: '6M', revenue: '$3.6B', gdp: '12%',
    touristsPct: 100, revenuePct: 100, gdpPct: 80,
    touristsNum: 6,   revenueNum: 3.6, gdpNum: 12,
    touristsFmt: (v: number) => `${v.toFixed(0)}M`,
    revenueFmt:  (v: number) => `$${v.toFixed(1)}B`,
    gdpFmt:      (v: number) => `${v.toFixed(0)}%`,
    color: '#2a8fa8', bg: C.paper, highlight: false, note: '', badge: '',
  },
  {
    code: 'LA', name: 'Laos', pop: '8M',
    tourists: '4M', revenue: '$1B', gdp: '9%',
    touristsPct: 67, revenuePct: 28, gdpPct: 60,
    touristsNum: 4,  revenueNum: 1,  gdpNum: 9,
    touristsFmt: (v: number) => `${v.toFixed(0)}M`,
    revenueFmt:  (v: number) => `$${v.toFixed(0)}B`,
    gdpFmt:      (v: number) => `${v.toFixed(0)}%`,
    color: '#2a8f6a', bg: C.paper, highlight: false, note: '', badge: '',
  },
];

/* ─── scroll-reveal hook ─────────────────────────────────────────────────── */
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

/* ─── count-up hook ──────────────────────────────────────────────────────── */
function useCountUp(target: number, active: boolean, duration = 1.5) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    setValue(0);
    const steps = 72;
    const interval = (duration * 1000) / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      // ease-out curve: starts fast, slows at end
      const progress = 1 - Math.pow(1 - step / steps, 3);
      const current = target * progress;
      if (step >= steps) { setValue(target); clearInterval(timer); }
      else setValue(current);
    }, interval);
    return () => clearInterval(timer);
  }, [active, target, duration]);
  return value;
}

/* ─── animated bar ───────────────────────────────────────────────────────── */
function Bar({ pct, color, label, displayValue, animated, delay }: {
  pct: number; color: string; label: string; displayValue: string;
  animated: boolean; delay: number;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontFamily: MONO, fontSize: '9.5px', letterSpacing: '0.2em', textTransform: 'uppercase', color: C.inkFaint }}>{label}</span>
        <span style={{
          fontFamily: BEBAS, fontSize: '15px', letterSpacing: '0.03em', color: C.ink,
          transition: 'opacity .3s',
          opacity: animated ? 1 : 0.3,
        }}>{displayValue}</span>
      </div>
      <div style={{ height: '3px', background: C.cream2, borderRadius: '100px', overflow: 'hidden' }}>
        <div style={{
          height: '100%', borderRadius: '100px',
          background: color,
          width: animated ? `${pct}%` : '0%',
          transition: `width 1.4s cubic-bezier(.2,.6,.2,1) ${delay}s`,
        }} />
      </div>
    </div>
  );
}

/* ─── country card ───────────────────────────────────────────────────────── */
function CountryCard({ country, animated, cardDelay }: {
  country: typeof COUNTRIES[0]; animated: boolean; cardDelay: number;
}) {
  const [hov, setHov] = useState(false);
  const ref = useReveal(cardDelay);

  // Incrementing counters
  const tVal = useCountUp(country.touristsNum, animated, 1.5);
  const rVal = useCountUp(country.revenueNum,  animated, 1.6);
  const gVal = useCountUp(country.gdpNum,      animated, 1.4);

  const displayTourists = animated ? country.touristsFmt(tVal) : country.tourists;
  const displayRevenue  = animated ? country.revenueFmt(rVal)  : country.revenue;
  const displayGdp      = animated ? country.gdpFmt(gVal)      : country.gdp;

  return (
    <div ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', flexDirection: 'column',
        background: hov && !country.highlight ? '#fff' : country.bg,
        position: 'relative',
        transition: 'background .3s',
        height: '100%',
      }}
    >
      {/* accent top line */}
      <div style={{ height: '3px', width: '100%', background: country.color }} />

      {/* badge */}
      {country.badge && (
        <div style={{
          position: 'absolute', top: '14px', right: '14px',
          fontFamily: MONO, fontSize: '9px', letterSpacing: '0.28em',
          textTransform: 'uppercase', fontWeight: 600,
          padding: '5px 10px', borderRadius: '100px',
          background: country.color, color: '#fff',
        }}>
          {country.badge}
        </div>
      )}

      {/* body */}
      <div style={{ padding: '22px 22px 24px', display: 'flex', flexDirection: 'column', flex: 1, gap: 0 }}>
        {/* header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '20px' }}>
          <div style={{ fontFamily: BEBAS, fontSize: '38px', lineHeight: 0.85, letterSpacing: '0.04em', color: country.color, flexShrink: 0 }}>
            {country.code}
          </div>
          <div style={{ paddingTop: '2px' }}>
            <div style={{ fontFamily: SERIF, fontWeight: 500, fontSize: '20px', lineHeight: 1, letterSpacing: '0.01em', color: C.ink }}>{country.name}</div>
            <div style={{ fontFamily: MONO, fontSize: '9.5px', letterSpacing: '0.2em', textTransform: 'uppercase', color: C.inkFaint, marginTop: '4px' }}>Pop. {country.pop}</div>
          </div>
        </div>

        {/* big animated tourist count */}
        <div style={{ marginBottom: '22px' }}>
          <div style={{
            fontFamily: BEBAS, fontSize: 'clamp(44px, 5vw, 64px)',
            lineHeight: 0.85, letterSpacing: '0.02em', color: country.color,
            transition: 'opacity .2s',
          }}>
            {displayTourists}
          </div>
          <div style={{ fontFamily: MUKTA, fontSize: '12px', letterSpacing: '0.16em', textTransform: 'uppercase', color: C.inkFaint, marginTop: '3px' }}>
            tourists / yr
          </div>
        </div>

        {/* animated bars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
          <Bar pct={country.touristsPct} color={country.color} label="Tourists"         displayValue={displayTourists} animated={animated} delay={0} />
          <Bar pct={country.revenuePct}  color={country.color} label="Revenue"          displayValue={displayRevenue}  animated={animated} delay={0.1} />
          <Bar pct={country.gdpPct}      color={country.color} label="Tourism % of GDP" displayValue={displayGdp}      animated={animated} delay={0.2} />
        </div>

        {/* note */}
        {country.note && (
          <div style={{
            marginTop: '20px', paddingTop: '16px',
            borderTop: `1px dashed ${C.lineS}`,
            fontFamily: MONO, fontSize: '9.5px', letterSpacing: '0.16em',
            textTransform: 'uppercase', color: C.terra,
            display: 'flex', alignItems: 'center', gap: '8px', lineHeight: 1.55,
          }}>
            <span style={{ fontSize: '11px' }}>↗</span>
            {country.note}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── main section ───────────────────────────────────────────────────────── */
export function CountryComparisonSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [animated, setAnimated] = useState(false);
  const rLeft   = useReveal(0, 'left');
  const rRight  = useReveal(0.12, 'right');
  const rInsight = useReveal(0.5);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const trigger = () => { if (!animated) setAnimated(true); };
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) { trigger(); return; }
    const io = new IntersectionObserver(
      entries => { entries.forEach(e => { if (e.isIntersecting) trigger(); }); },
      { threshold: 0.12 }
    );
    io.observe(el);
    const timer = setTimeout(trigger, 1200);
    return () => { io.disconnect(); clearTimeout(timer); };
  }, [animated]);

  return (
    <section ref={sectionRef} style={{ padding: '80px 0 72px', position: 'relative', overflow: 'hidden', background: C.cream }}>
      {/* bg glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `
          radial-gradient(80% 60% at 20% 0%, rgba(30,119,193,0.06), transparent 55%),
          radial-gradient(60% 50% at 80% 100%, rgba(255,0,0,0.04), transparent 55%)`,
      }} />

      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 40px', position: 'relative', zIndex: 1 }}>

        {/* ── head ── */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px',
          alignItems: 'end', paddingBottom: '36px',
          borderBottom: `1px solid ${C.line}`, marginBottom: '40px',
        }}>
          <div ref={rLeft}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase',
              fontWeight: 500, fontFamily: MUKTA, color: C.terra, marginBottom: '16px',
            }}>
              Tourism benchmark
            </div>
            <h2 style={{
              fontFamily: SERIF, fontWeight: 300,
              fontSize: 'clamp(34px, 4vw, 58px)', lineHeight: 1.0,
              letterSpacing: '-0.015em', color: C.ink,
            }}>
              Small nations.<br />
              <em style={{ fontStyle: 'italic', color: C.terra }}>Massive results.</em>
            </h2>
          </div>
          <div ref={rRight} style={{ paddingBottom: '4px' }}>
            <p style={{ fontSize: '14.5px', lineHeight: 1.75, color: C.inkSoft, maxWidth: '44ch', fontFamily: MUKTA, fontWeight: 300 }}>
              Countries far smaller than Nepal are unlocking extraordinary tourism potential. Nepal — with its Himalayas, spirituality and culture — has every advantage to lead.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '16px', fontFamily: MONO, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: C.inkFaint }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: C.saffron, display: 'inline-block' }} />
              04 nations · live comparison
            </div>
          </div>
        </div>

        {/* ── 4-card grid ── */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          border: `1px solid ${C.line}`, borderRadius: '4px', overflow: 'hidden',
        }}>
          {COUNTRIES.map((country, i) => (
            <div key={i} style={{ borderRight: i < 3 ? `1px solid ${C.line}` : 'none' }}>
              <CountryCard country={country} animated={animated} cardDelay={i * 0.09} />
            </div>
          ))}
        </div>

        {/* ── insight bar ── */}
        <div ref={rInsight} style={{
          marginTop: '24px',
          display: 'grid', gridTemplateColumns: '1fr auto', gap: '32px', alignItems: 'center',
          background: C.ink, color: C.cream,
          padding: '24px 32px', borderRadius: '4px',
        }}>
          <div>
            <div style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: C.saffron, marginBottom: '8px' }}>
              Key insight
            </div>
            <h3 style={{
              fontFamily: SERIF, fontWeight: 300,
              fontSize: 'clamp(18px, 2vw, 26px)', lineHeight: 1.25, color: C.cream,
            }}>
              Cambodia (17M people) gets{' '}
              <em style={{ fontStyle: 'italic', color: C.saffronB }}>6× more tourists</em>
              {' '}than Nepal (30M people). The 0.5% Campaign changes this.
            </h3>
          </div>
          <div style={{ textAlign: 'center', flexShrink: 0 }}>
            <div style={{ fontFamily: BEBAS, fontSize: 'clamp(56px, 7vw, 96px)', lineHeight: 0.85, letterSpacing: '0.02em', color: C.saffronB }}>
              0.5%
            </div>
            <div style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(244,237,224,0.45)', marginTop: '6px' }}>
              Can close this gap
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
