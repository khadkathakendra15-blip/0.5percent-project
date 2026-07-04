import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavBar } from '@/components/ui/nav-bar';

// ─── Design tokens ────────────────────────────────────────────────────────────
const C = {
  cream:    '#0E0F14',
  paper:    '#0A0B0F',
  paper2:   '#15171E',
  ink:      '#F3F3F0',
  inkSoft:  '#9498A4',
  inkFaint: '#5C606C',
  terra:    '#FFC000',
  saffron:  '#FFC000',
  line:     'rgba(255,255,255,0.10)',
  lineSoft: 'rgba(255,255,255,0.06)',
};

const serif = "'Bricolage Grotesque', system-ui, sans-serif";
const sans  = "'Space Grotesk', system-ui, sans-serif";
const mono  = "'Space Mono', ui-monospace, monospace";

// ─── Embassies ────────────────────────────────────────────────────────────────
const embassies = [
  {
    country:  'China',
    flag:     '🇨🇳',
    name:     "Embassy of the People's Republic of China in Nepal",
    location: 'Hattisar, Kathmandu',
    pop:      '1.40B',
    side:     'Northern neighbour',
    logo:     '/logo/Nepal-China embassy.jpg',
    blurb:    "Partnering to open the gateway for Chinese travellers to discover the Himalayas, living Buddhist heritage and the serenity that begins where the mountains meet the sky.",
    focus:    ['Visa & travel facilitation', 'Buddhist & cultural exchange', 'Joint tourism promotion', 'Air-connectivity dialogue'],
  },
  {
    country:  'India',
    flag:     '🇮🇳',
    name:     'Embassy of India, Kathmandu',
    location: 'Kapurdhara Marg, Kathmandu',
    pop:      '1.44B',
    side:     'Southern neighbour',
    logo:     '/logo/Indian Embassy.jpg',
    blurb:    "Partnering to welcome Indian pilgrims and travellers to Pashupatinath, Lumbini and the shared cultural corridor that has bound our two nations for millennia.",
    focus:    ['Pilgrimage & spiritual tourism', 'Open-border travel promotion', 'Cross-cultural storytelling', 'Cross-border cultural events'],
  },
];

// ─── Reveal ───────────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, style = {} }: {
  children: React.ReactNode; delay?: number; style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'none'; obs.disconnect(); } },
      { threshold: 0.08, rootMargin: '0px 0px -6% 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: 0, transform: 'translateY(26px)',
      transition: `opacity 1s cubic-bezier(.2,.6,.2,1) ${delay}s, transform 1s cubic-bezier(.2,.6,.2,1) ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function EmbassyPage() {
  const navigate = useNavigate();

  return (
    <div style={{ margin: 0, background: C.paper, color: C.ink, fontFamily: sans, fontWeight: 400, lineHeight: 1.7, WebkitFontSmoothing: 'antialiased', overflowX: 'hidden', minHeight: '100vh' }}>

      <NavBar />

      {/* ── Hero ── */}
      <section style={{ padding: '150px 40px 90px', maxWidth: 1180, margin: '0 auto', position: 'relative' }}>
        {/* subtle gold glow */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(60% 60% at 80% 0%, rgba(255,192,0,0.06), transparent 60%)' }} />
        <div style={{ position: 'relative', maxWidth: 900 }}>
          <Reveal>
            <div style={{ fontFamily: mono, fontSize: 11.5, letterSpacing: '0.34em', textTransform: 'uppercase', color: C.terra, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 26 }}>
              <span style={{ width: 28, height: 1, background: C.terra, display: 'inline-block' }} />
              Diplomatic Partnerships
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 style={{ fontFamily: serif, fontWeight: 700, fontSize: 'clamp(44px, 6.4vw, 92px)', lineHeight: 0.98, letterSpacing: '-0.03em', color: C.ink, margin: 0 }}>
              In partnership with our{' '}
              <span style={{ color: C.terra }}>two great neighbours</span>.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p style={{ fontSize: 19, lineHeight: 1.8, color: C.inkSoft, margin: '30px 0 0', maxWidth: '60ch', fontWeight: 400 }}>
              The entire 0.5% premise rests on two nations — <strong style={{ color: C.ink, fontWeight: 500 }}>India</strong> and{' '}
              <strong style={{ color: C.ink, fontWeight: 500 }}>China</strong>. We are working hand in hand with their
              embassies in Nepal to turn diplomatic goodwill into real journeys, shared culture and lasting friendship.
            </p>
          </Reveal>
        </div>
      </section>

      {/* divider */}
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 40px' }}>
        <div style={{ height: 1, background: C.lineSoft }} />
      </div>

      {/* ── Embassy cards ── */}
      <section style={{ padding: '90px 40px 40px', maxWidth: 1180, margin: '0 auto' }}>
        <div className="embassy-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 28 }}>
          {embassies.map((e, i) => (
            <Reveal key={e.country} delay={i * 0.1}>
              <article
                onMouseEnter={ev => { (ev.currentTarget as HTMLElement).style.transform = 'translateY(-6px)'; (ev.currentTarget as HTMLElement).style.borderColor = 'rgba(255,192,0,0.40)'; (ev.currentTarget as HTMLElement).style.boxShadow = '0 22px 50px rgba(0,0,0,0.45)'; }}
                onMouseLeave={ev => { (ev.currentTarget as HTMLElement).style.transform = 'none'; (ev.currentTarget as HTMLElement).style.borderColor = C.lineSoft; (ev.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
                style={{ display: 'flex', flexDirection: 'column', height: '100%', background: C.paper2, border: `1px solid ${C.lineSoft}`, borderRadius: 6, overflow: 'hidden', transition: 'transform .4s cubic-bezier(.2,.6,.2,1), border-color .4s ease, box-shadow .4s ease' }}
              >
                {/* accent bar */}
                <div style={{ height: 3, background: C.terra }} />

                <div style={{ padding: '34px 34px 36px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  {/* header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 24 }}>
                    <div style={{ width: 76, height: 76, borderRadius: 12, background: '#fff', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: `1px solid ${C.line}` }}>
                      <img
                        src={e.logo}
                        alt={`${e.name} logo`}
                        loading="lazy"
                        style={{ width: 60, height: 60, objectFit: 'contain' }}
                        onError={ev => {
                          (ev.currentTarget as HTMLImageElement).style.display = 'none';
                          const p = ev.currentTarget.parentElement!;
                          p.style.background = C.cream;
                          p.innerHTML = `<span style="font-size:26px">${e.flag}</span>`;
                        }}
                      />
                    </div>
                    <div>
                      <div style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.terra, fontWeight: 700 }}>
                        {e.flag} {e.side}
                      </div>
                      <h2 style={{ fontFamily: serif, fontWeight: 700, fontSize: 30, lineHeight: 1, margin: '8px 0 0', letterSpacing: '-0.02em', color: C.ink }}>
                        {e.country}
                      </h2>
                    </div>
                    <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                      <div style={{ fontFamily: serif, fontWeight: 700, fontSize: 26, lineHeight: 1, color: C.terra }}>{e.pop}</div>
                      <div style={{ fontFamily: mono, fontSize: 8.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: C.inkFaint, marginTop: 5 }}>Population</div>
                    </div>
                  </div>

                  {/* full name */}
                  <div style={{ fontSize: 13.5, color: C.ink, fontWeight: 500, lineHeight: 1.5 }}>{e.name}</div>
                  <div style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.inkFaint, marginTop: 6, display: 'flex', alignItems: 'center', gap: 7 }}>
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: C.saffron, display: 'inline-block' }} />
                    {e.location}
                  </div>

                  {/* blurb */}
                  <p style={{ fontSize: 15, color: C.inkSoft, margin: '20px 0 26px', lineHeight: 1.75, fontWeight: 400 }}>{e.blurb}</p>

                  {/* focus list */}
                  <div style={{ marginTop: 'auto', paddingTop: 22, borderTop: `1px dashed ${C.line}` }}>
                    <div style={{ fontFamily: mono, fontSize: 9.5, letterSpacing: '0.24em', textTransform: 'uppercase', color: C.inkFaint, marginBottom: 16 }}>
                      Areas of partnership
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 18px' }}>
                      {e.focus.map(f => (
                        <div key={f} style={{ display: 'flex', gap: 9, alignItems: 'flex-start', fontSize: 13, color: C.ink, lineHeight: 1.45 }}>
                          <span style={{ flexShrink: 0, marginTop: 6, width: 5, height: 5, borderRadius: '50%', background: C.saffron, display: 'inline-block' }} />
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Closing note ── */}
      <section style={{ padding: '60px 40px 120px', maxWidth: 1180, margin: '0 auto' }}>
        <Reveal>
          <div style={{ background: C.terra, borderRadius: 6, padding: '40px 44px', display: 'grid', gridTemplateColumns: '1fr auto', gap: 32, alignItems: 'center' }} className="embassy-cta">
            <div>
              <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(10,11,15,0.6)', marginBottom: 10 }}>
                Together
              </div>
              <h3 style={{ fontFamily: serif, fontWeight: 700, fontSize: 'clamp(22px, 2.6vw, 34px)', lineHeight: 1.15, margin: 0, color: '#0A0B0F', letterSpacing: '-0.01em' }}>
                Diplomacy opens the door. Tourism walks through it.
              </h3>
            </div>
            <a
              href="mailto:vfytalks@gmail.com"
              style={{ fontFamily: mono, fontSize: 11.5, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, background: '#0A0B0F', color: C.terra, padding: '15px 32px', borderRadius: 100, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}
            >
              Partner with us
            </a>
          </div>
        </Reveal>
      </section>

      {/* ── Back home ── */}
      <div style={{ padding: '0 40px 80px', textAlign: 'center' }}>
        <button
          onClick={() => navigate('/')}
          style={{
            fontFamily: sans, fontSize: 12, letterSpacing: '0.26em', textTransform: 'uppercase',
            fontWeight: 500, color: C.inkSoft, background: 'none', border: `1px solid ${C.line}`,
            padding: '12px 32px', borderRadius: 100, cursor: 'pointer', transition: 'background .2s, color .2s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = C.ink; (e.currentTarget as HTMLElement).style.color = C.cream; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none'; (e.currentTarget as HTMLElement).style.color = C.inkSoft; }}
        >
          ← Back to Home
        </button>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 860px) {
          .embassy-grid { grid-template-columns: 1fr !important; }
          .embassy-cta { grid-template-columns: 1fr !important; text-align: center; }
          .embassy-cta a { justify-self: center; }
        }
      `}</style>
    </div>
  );
}
