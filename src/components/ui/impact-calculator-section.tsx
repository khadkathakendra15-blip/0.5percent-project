import { useState, useCallback, useEffect, useRef } from 'react';

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

/* ─── constants ──────────────────────────────────────────────────────────── */
const INDIA = 1_440_000_000;
const CHINA = 1_400_000_000;
const BASE  = 1_167_000;
const SPEND = 1_200;
const JR    = 5.8;

/* ─── formatters ─────────────────────────────────────────────────────────── */
function fmt(n: number) {
  if (n >= 1e6) return `${(n / 1e6).toFixed(n >= 1e7 ? 0 : 1)}M`;
  if (n >= 1e3) return `${Math.round(n / 1e3)}K`;
  return `${Math.round(n)}`;
}
function fmtG(n: number) {
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  return `$${(n / 1e6).toFixed(0)}M`;
}

/* ─── flash hook ─────────────────────────────────────────────────────────── */
function useFlash(value: string) {
  const ref = useRef<HTMLDivElement>(null);
  const prev = useRef(value);
  useEffect(() => {
    if (prev.current !== value && ref.current) {
      ref.current.style.animation = 'none';
      void ref.current.offsetWidth;
      ref.current.style.animation = 'calcFlash .35s ease';
    }
    prev.current = value;
  }, [value]);
  return ref;
}

/* ─── slider ─────────────────────────────────────────────────────────────── */
export function Slider({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const pct = ((value - 1) / (30 - 1)) * 100;
  const bg = `linear-gradient(to right, ${C.saffron} 0%, ${C.saffron} ${pct}%, ${C.cream2} ${pct}%, ${C.cream2} 100%)`;

  return (
    <div>
      <input
        type="range" min={1} max={30} value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{
          width: '100%', height: '3px', appearance: 'none',
          borderRadius: '100px', background: bg, outline: 'none', cursor: 'pointer',
        }}
      />
      <div style={{
        display: 'flex', justifyContent: 'space-between', marginTop: '7px',
        fontFamily: MONO, fontSize: '9px', color: C.inkFaint, letterSpacing: '0.12em',
      }}>
        <span>0.1%</span><span>1.0%</span><span>2.0%</span><span>3.0%</span>
      </div>
    </div>
  );
}

/* ─── outcome cell ───────────────────────────────────────────────────────── */
function OutcomeCell({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: '14px 16px', display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between', gap: '6px',
        background: hov ? C.paper : 'transparent',
        transition: 'background .2s',
      }}
    >
      <div style={{ color: C.inkFaint }}>{icon}</div>
      <div style={{ fontFamily: BEBAS, fontSize: 'clamp(28px, 3.4vw, 46px)', lineHeight: 0.9, letterSpacing: '0.02em', color: C.ink }}>{value}</div>
      <div style={{ fontSize: '11.5px', color: C.inkSoft, lineHeight: 1.4, fontFamily: MUKTA }}>{label}</div>
    </div>
  );
}

/* ─── main component ─────────────────────────────────────────────────────── */
export function ImpactCalculatorSection() {
  const [indiaRate, setIndiaRate] = useState(5);
  const [chinaRate, setChinaRate] = useState(5);

  const ip = indiaRate / 10;
  const cp = chinaRate / 10;
  const iv = INDIA * ip / 100;
  const cv = CHINA * cp / 100;
  const tot = iv + cv;
  const gdp = tot * SPEND;
  const jobs = tot * JR / 100;
  const multi = tot / BASE;
  const rooms = tot * 0.003;
  const guides = tot * 0.002;
  const flights = tot / 150_000;
  const rural = jobs * 2.2;

  const totalStr = fmt(tot);
  const multiStr = `${multi.toFixed(1)}×`;

  const totalRef = useFlash(totalStr);
  const multiRef = useFlash(multiStr);

  const reset = useCallback(() => { setIndiaRate(5); setChinaRate(5); }, []);

  return (
    <section className="calc-section" style={{ background: C.cream, padding: '0 40px' }}>
      <style>{`
        @keyframes calcFlash { 0%{opacity:1} 40%{opacity:.4} 100%{opacity:1} }
        .calc-slider::-webkit-slider-thumb {
          appearance: none; width: 18px; height: 18px; border-radius: 50%;
          background: ${C.saffron}; border: 3px solid ${C.cream};
          box-shadow: 0 0 0 1.5px ${C.saffron}; cursor: pointer; transition: transform .2s;
        }
        .calc-slider::-webkit-slider-thumb:hover { transform: scale(1.15); }
        .calc-slider::-moz-range-thumb {
          width: 18px; height: 18px; border-radius: 50%;
          background: ${C.saffron}; border: 3px solid ${C.cream};
          box-shadow: 0 0 0 1.5px ${C.saffron}; cursor: pointer;
        }
        @media (max-width: 768px) {
          .calc-section { padding: 0 18px !important; }
          .calc-top-bar { flex-direction: column !important; align-items: flex-start !important; gap: 10px !important; padding: 20px 0 16px !important; }
          .calc-title { white-space: normal !important; font-size: clamp(18px,4.5vw,24px) !important; }
          .calc-grid { grid-template-columns: 1fr !important; }
          .calc-divider-v { display: none !important; }
          .calc-col-l { padding-right: 0 !important; padding-bottom: 20px !important; border-bottom: 1px solid rgba(24,20,16,0.12); }
          .calc-col-m { padding: 20px 0 !important; border-bottom: 1px solid rgba(24,20,16,0.12); }
          .calc-col-r { padding-left: 0 !important; padding-top: 20px !important; }
          .calc-big-num { font-size: clamp(64px,16vw,96px) !important; }
          .calc-ledger-val { font-size: 22px !important; }
          .calc-outcome-grid { flex: none !important; min-height: 0 !important; height: auto !important; }
        }
      `}</style>

      <div style={{ maxWidth: '1320px', margin: '0 auto' }}>

        {/* ── top bar ── */}
        <div className="calc-top-bar" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: '32px', padding: '28px 0 22px',
          borderBottom: `1px solid ${C.line}`, flexWrap: 'wrap',
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase',
            fontWeight: 500, fontFamily: MUKTA, color: C.terra, whiteSpace: 'nowrap',
          }}>
            <span style={{ width: '22px', height: '1px', background: C.terra, display: 'inline-block' }} />
            Interactive calculator
          </div>

          <h2 className="calc-title" style={{
            fontFamily: SERIF, fontWeight: 300,
            fontSize: 'clamp(22px, 2.4vw, 36px)', lineHeight: 1, letterSpacing: '-0.01em',
            whiteSpace: 'nowrap', color: C.ink,
          }}>
            Adjust the percentage.{' '}
            <em style={{ fontStyle: 'italic', color: C.terra }}>Watch Nepal transform.</em>
          </h2>

          <div style={{ fontSize: '12.5px', color: C.inkFaint, maxWidth: '30ch', lineHeight: 1.6, fontWeight: 300, fontFamily: MUKTA, textAlign: 'right' }}>
            Slide to see economic &amp; employment impact at different penetration rates.
          </div>

          <button
            onClick={reset}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '9px 16px', borderRadius: '100px',
              background: C.ink, color: C.cream, border: 'none',
              fontSize: '10.5px', letterSpacing: '0.2em', textTransform: 'uppercase',
              fontWeight: 600, fontFamily: MUKTA, cursor: 'pointer',
              transition: 'background .2s',
              whiteSpace: 'nowrap', flexShrink: 0,
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = C.saffron; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = C.ink; }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>
            </svg>
            Reset
          </button>
        </div>

        {/* ── three columns ── */}
        <div className="calc-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1px 1fr 1px 1fr',
          padding: '28px 0 24px',
          minHeight: 0,
        }}>

          {/* LEFT — hero + ledger */}
          <div className="calc-col-l" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingRight: '36px', gap: '32px' }}>
            {/* big number */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.26em', textTransform: 'uppercase', color: C.inkFaint }}>
                Combined visitors · India + China
              </div>
              <div ref={totalRef} className="calc-big-num" style={{ fontFamily: BEBAS, fontSize: 'clamp(80px, 11vw, 160px)', lineHeight: 0.85, letterSpacing: '0.01em', color: C.terra }}>
                {totalStr}
              </div>
              <div style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(16px, 1.5vw, 22px)', color: C.inkSoft, marginTop: '6px' }}>
                at an average of{' '}
                <span style={{ color: C.terra, fontStyle: 'normal' }}>{((ip + cp) / 2).toFixed(1)}%</span>
                {' '}penetration
              </div>
            </div>

            {/* ledger rows */}
            <div>
              {[
                { idx: '01', label: 'From India', pop: '1.44B', val: fmt(iv), hi: true },
                { idx: '02', label: 'From China', pop: '1.40B', val: fmt(cv), hi: true },
                { idx: '03', label: 'GDP impact · annual', pop: '', val: fmtG(gdp), hi: false },
                { idx: '04', label: 'Jobs created', pop: '', val: fmt(jobs), hi: false },
              ].map((row, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                  gap: '12px', padding: '11px 0',
                  borderBottom: `1px dashed ${C.lineS}`,
                  borderTop: i === 0 ? `1px solid ${C.line}` : 'none',
                }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', fontSize: '13px', color: C.inkSoft, fontWeight: 400, fontFamily: MUKTA }}>
                    <span style={{ fontFamily: MONO, fontSize: '9.5px', color: C.inkFaint, letterSpacing: '0.14em' }}>{row.idx}</span>
                    {row.label}
                    {row.pop && <span style={{ color: C.inkFaint, fontSize: '11px' }}>· {row.pop}</span>}
                  </div>
                  <div className="calc-ledger-val" style={{ fontFamily: BEBAS, fontSize: '26px', letterSpacing: '0.02em', lineHeight: 1, color: row.hi ? C.saffronB : C.ink }}>
                    {row.val}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* divider */}
          <div className="calc-divider-v" style={{ background: C.line }} />

          {/* MIDDLE — sliders */}
          <div className="calc-col-m" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '0 36px', gap: '0' }}>
            {/* India slider */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '10px' }}>
                <div>
                  <div style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 'clamp(24px, 2.8vw, 38px)', lineHeight: 1, color: C.ink }}>India</div>
                  <div style={{ fontFamily: MUKTA, fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: C.inkFaint, marginTop: '3px' }}>Population · 1.44B</div>
                </div>
                <div style={{ fontFamily: BEBAS, fontSize: 'clamp(36px, 4.4vw, 58px)', lineHeight: 0.9, color: C.terra, letterSpacing: '0.02em' }}>
                  {ip.toFixed(1)}<span style={{ fontSize: '0.5em', color: C.saffron }}>%</span>
                </div>
              </div>
              <div style={{ fontFamily: MONO, fontSize: '10.5px', letterSpacing: '0.16em', textTransform: 'uppercase', color: C.inkFaint, marginBottom: '10px' }}>
                ≈ {fmt(iv)} visitors
              </div>
              <input
                className="calc-slider"
                type="range" min={1} max={30} value={indiaRate}
                onChange={e => setIndiaRate(Number(e.target.value))}
                style={{
                  width: '100%', height: '3px', appearance: 'none', borderRadius: '100px',
                  background: `linear-gradient(to right, ${C.saffron} 0%, ${C.saffron} ${((indiaRate - 1) / 29) * 100}%, ${C.cream2} ${((indiaRate - 1) / 29) * 100}%, ${C.cream2} 100%)`,
                  outline: 'none', cursor: 'pointer',
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '7px', fontFamily: MONO, fontSize: '9px', color: C.inkFaint, letterSpacing: '0.12em' }}>
                <span>0.1%</span><span>1.0%</span><span>2.0%</span><span>3.0%</span>
              </div>
            </div>

            {/* China slider */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '10px', borderTop: `1px solid ${C.line}`, paddingTop: '22px', marginTop: '22px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '10px' }}>
                <div>
                  <div style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 'clamp(24px, 2.8vw, 38px)', lineHeight: 1, color: C.ink }}>China</div>
                  <div style={{ fontFamily: MUKTA, fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: C.inkFaint, marginTop: '3px' }}>Population · 1.40B</div>
                </div>
                <div style={{ fontFamily: BEBAS, fontSize: 'clamp(36px, 4.4vw, 58px)', lineHeight: 0.9, color: C.terra, letterSpacing: '0.02em' }}>
                  {cp.toFixed(1)}<span style={{ fontSize: '0.5em', color: C.saffron }}>%</span>
                </div>
              </div>
              <div style={{ fontFamily: MONO, fontSize: '10.5px', letterSpacing: '0.16em', textTransform: 'uppercase', color: C.inkFaint, marginBottom: '10px' }}>
                ≈ {fmt(cv)} visitors
              </div>
              <input
                className="calc-slider"
                type="range" min={1} max={30} value={chinaRate}
                onChange={e => setChinaRate(Number(e.target.value))}
                style={{
                  width: '100%', height: '3px', appearance: 'none', borderRadius: '100px',
                  background: `linear-gradient(to right, ${C.saffron} 0%, ${C.saffron} ${((chinaRate - 1) / 29) * 100}%, ${C.cream2} ${((chinaRate - 1) / 29) * 100}%, ${C.cream2} 100%)`,
                  outline: 'none', cursor: 'pointer',
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '7px', fontFamily: MONO, fontSize: '9px', color: C.inkFaint, letterSpacing: '0.12em' }}>
                <span>0.1%</span><span>1.0%</span><span>2.0%</span><span>3.0%</span>
              </div>
            </div>
          </div>

          {/* divider */}
          <div className="calc-divider-v" style={{ background: C.line }} />

          {/* RIGHT — multiplier + outcomes */}
          <div className="calc-col-r" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingLeft: '36px', gap: '16px' }}>
            {/* multiplier box */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              background: C.ink, color: C.cream,
              padding: '14px 18px', borderRadius: '3px',
            }}>
              <div>
                <div style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500, fontFamily: MUKTA }}>Multiplier vs. today</div>
                <div style={{ fontSize: '10px', color: 'rgba(244,237,224,0.5)', letterSpacing: '0.16em', marginTop: '3px', fontFamily: MUKTA }}>Baseline: 1.167M visitors</div>
              </div>
              <div ref={multiRef} style={{ fontFamily: BEBAS, fontSize: 'clamp(44px, 5vw, 72px)', lineHeight: 0.9, color: C.saffronB, letterSpacing: '0.02em' }}>
                {multi.toFixed(1)}<span style={{ fontSize: '0.5em', opacity: 0.8 }}>×</span>
              </div>
            </div>

            {/* outcomes label */}
            <div style={{
              fontFamily: MONO, fontSize: '10px', letterSpacing: '0.26em',
              textTransform: 'uppercase', color: C.inkFaint,
              display: 'flex', alignItems: 'center', gap: '12px',
            }}>
              Projected outcomes
              <span style={{ flex: 1, height: '1px', background: C.line, display: 'inline-block' }} />
            </div>

            {/* 2×2 outcomes grid */}
            <div className="calc-outcome-grid" style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              border: `1px solid ${C.line}`, borderRadius: '3px',
              flex: 1, overflow: 'hidden',
            }}>
              {[
                {
                  val: fmt(rooms), label: 'Hotel rooms needed',
                  icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M3 20V8h18v12M3 14h18M7 14V8M17 14V8"/></svg>,
                  border: { borderRight: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` },
                },
                {
                  val: fmt(guides), label: 'Trekking guides',
                  icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 20l6-9 4 5 3-4 5 8z"/></svg>,
                  border: { borderBottom: `1px solid ${C.line}` },
                },
                {
                  val: String(Math.round(flights)), label: 'Daily flight routes',
                  icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17l8-3-3-8 2-1 5 7 5-1 1 2-5 2 3 8-2 1-4-6z"/></svg>,
                  border: { borderRight: `1px solid ${C.line}` },
                },
                {
                  val: fmt(rural), label: 'Rural beneficiaries',
                  icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="3"/><path d="M3 21c0-4 4-7 9-7s9 3 9 7"/></svg>,
                  border: {},
                },
              ].map((cell, i) => (
                <OutcomeCell key={i} icon={cell.icon} value={cell.val} label={cell.label} />
              ))}
            </div>

            {/* source */}
            <div style={{ fontFamily: MONO, fontSize: '9.5px', letterSpacing: '0.14em', textTransform: 'uppercase', color: C.inkFaint }}>
              NTB &amp; World Bank baselines · 2025
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
