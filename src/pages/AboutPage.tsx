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

// ─── Partner logos ────────────────────────────────────────────────────────────
const partners = [
  { name: 'Nepal Airlines',       logo: '/logo/Nepal Airlines.jpg' },
  { name: 'Buddha Air',           logo: '/logo/Budhha Air.jpg' },
  { name: 'Yeti Airlines',        logo: '/logo/Yeti Airlines.jpg' },
  { name: 'The Soaltee',          logo: '/logo/The Soaltee.jpg' },
  { name: 'CG Hospitality',       logo: '/logo/Cg Hospitality.jpg' },
  { name: 'Kantipur Media Group', logo: '/logo/KMG.jpg' },
  { name: 'Nepal Tourism Board',  logo: '/logo/Nepal Tourism Board.jpg' },
  { name: 'CG Corp Global',       logo: '/logo/Cg Corp Global.jpg' },
];

// ─── Team ─────────────────────────────────────────────────────────────────────
const otherTeam = [
  {
    role:  'Social Media Algorithm Specialist',
    name:  'Thakendra Khadka',
    photo: '/Thakendra Khadka.jpeg',
    bio:   "Drives Nepal's digital presence with precision strategy, creative content and social media expertise.",
  },
  {
    role:  'Tourism Entrepreneur',
    name:  'Rohit Karki',
    photo: '/Rohit Karki.jpg',
    objectPosition: 'center 30%',
    bio:   "Connects Nepal's tourism potential with global opportunities — one journey and partnership at a time.",
  },
];

// ─── Reveal hook ─────────────────────────────────────────────────────────────
function useReveal() {
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
  return ref;
}

// ─── Reveal wrapper ───────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, style = {} }: {
  children: React.ReactNode; delay?: number; style?: React.CSSProperties;
}) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        transform: 'translateY(26px)',
        transition: `opacity 1s cubic-bezier(.2,.6,.2,1) ${delay}s, transform 1s cubic-bezier(.2,.6,.2,1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── Kicker ───────────────────────────────────────────────────────────────────
function Kicker({ children, center = false }: { children: React.ReactNode; center?: boolean }) {
  return (
    <div style={{
      fontFamily: sans, fontWeight: 500, fontSize: 12, letterSpacing: '0.34em',
      textTransform: 'uppercase', color: C.terra,
      display: 'inline-flex', alignItems: 'center', gap: 12,
      ...(center ? { justifyContent: 'center' } : {}),
    }}>
      {children}
    </div>
  );
}

// ─── Brand mark ──────────────────────────────────────────────────────────────
export function BrandMark() {
  return (
    <div style={{ textAlign: 'center', cursor: 'pointer' }}>
      <div style={{
        width: 34, height: 34, borderRadius: '50%', border: `1.5px solid ${C.terra}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px',
      }}>
        <div style={{ width: 11, height: 11, borderRadius: '50%', background: C.saffron }} />
      </div>
      <div style={{ fontFamily: serif, fontWeight: 600, fontSize: 25, letterSpacing: '0.06em', lineHeight: 1, color: C.ink }}>
        VFY <span style={{ color: C.terra }}>Talks</span>
      </div>
      <div style={{ fontSize: 10.5, letterSpacing: '0.42em', textTransform: 'uppercase', color: C.inkFaint, fontWeight: 500, marginTop: 2 }}>
        The 0.5% Campaign
      </div>
    </div>
  );
}

// ─── Placeholder portrait ────────────────────────────────────────────────────
function PhPortrait({ height, label }: { height: number | string; label: string }) {
  return (
    <div style={{
      height, borderRadius: 3, background: C.paper2, border: `1px solid ${C.lineSoft}`,
      backgroundImage: 'repeating-linear-gradient(135deg, rgba(255,0,0,0.05) 0 2px, transparent 2px 13px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.inkFaint, background: C.paper, padding: '7px 14px', border: `1px solid ${C.line}`, borderRadius: 2 }}>
        {label}
      </span>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div style={{ margin: 0, background: C.paper, color: C.ink, fontFamily: sans, fontWeight: 400, lineHeight: 1.7, WebkitFontSmoothing: 'antialiased', overflowX: 'hidden', minHeight: '100vh' }}>

      <NavBar />

      {/* ── Vision ── */}
      <section style={{ padding: '130px 40px 100px', maxWidth: 1180, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '80px', alignItems: 'start' }}>
          {/* left */}
          <Reveal>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', fontSize: '12px', letterSpacing: '0.32em', textTransform: 'uppercase', fontWeight: 500, fontFamily: sans, color: C.terra, marginBottom: '22px' }}>
              Our vision
            </div>
            <h2 style={{ fontFamily: serif, fontWeight: 700, fontSize: 'clamp(40px, 6vw, 82px)', lineHeight: 1, letterSpacing: '-0.015em', color: C.ink, marginTop: '0' }}>
              A movement built on{' '}
              <em style={{ fontStyle: 'italic', color: C.terra, fontWeight: 400 }}>storytelling</em>.
            </h2>
          </Reveal>
          {/* right */}
          <Reveal delay={0.1} style={{ paddingTop: '18px' }}>
            <p style={{ fontSize: '19px', lineHeight: 1.85, color: C.inkSoft, marginBottom: '24px', fontWeight: 400, fontFamily: sans }}>
              Nepal is one of the world's most beautiful and spiritually significant countries — from the Himalayas to ancient heritage, from the birthplace of{' '}
              <strong style={{ color: C.ink, fontWeight: 500 }}>Buddha</strong>{' '}
              to a rich tapestry of cultures. And yet, Nepal remains underrepresented in global tourism.
            </p>
            <p style={{ fontSize: '19px', lineHeight: 1.85, color: C.inkSoft, marginBottom: '36px', fontWeight: 400, fontFamily: sans }}>
              VFY Talks exists to change that. Through honest media, cinematic storytelling and cross-cultural conversation, we share Nepal's voice with the world — and invite the world to listen.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {[['01','Tourism'],['02','Spirituality'],['03','Culture'],['04','Media']].map(([n, label]) => (
                <span key={label} style={{
                  fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase',
                  fontWeight: 500, padding: '10px 18px',
                  border: `1px solid ${C.line}`, borderRadius: '100px',
                  background: C.paper, fontFamily: sans,
                }}>
                  <strong style={{ color: C.saffron, fontWeight: 600, marginRight: '6px' }}>{n}</strong>
                  {label}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* divider */}
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 40px' }}>
        <div style={{ height: '1px', background: C.lineSoft }} />
      </div>

      {/* ── 0.5% Moment ── */}
      <section style={{ textAlign: 'center', padding: '140px 40px 130px', maxWidth: 1180, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal><Kicker center>The premise</Kicker></Reveal>
        <Reveal delay={0.08}>
          <div className="about-0pt5" style={{ fontFamily: serif, fontWeight: 700, fontSize: 'clamp(140px, 26vw, 360px)', lineHeight: 0.82, color: C.terra, letterSpacing: '-0.02em', display: 'inline-block' }}>
            0.5<span style={{ fontSize: '0.42em', verticalAlign: 'super', fontWeight: 400, color: C.saffron }}>%</span>
          </div>
        </Reveal>
        <Reveal delay={0.16}>
          <p style={{ margin: '36px auto 0', maxWidth: '48ch', fontSize: 19, lineHeight: 1.8, color: C.inkSoft, fontWeight: 400 }}>
            That's all it takes. Mobilising just <strong style={{ color: C.ink, fontWeight: 500 }}>half of one percent</strong> of travellers from
            neighbouring nations would transform Nepal's place on the world's map — a quiet number
            with a profound ripple.
          </p>
        </Reveal>
      </section>

      <div style={{ height: 1, background: C.line, maxWidth: 1180, margin: '0 auto' }} />

      {/* ── Team ── */}
      <section style={{ padding: '130px 40px', maxWidth: 1180, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <div style={{ textAlign: 'center', maxWidth: '62ch', margin: '0 auto 70px' }}>
            <Kicker center>The team</Kicker>
            <h2 style={{ fontFamily: serif, fontWeight: 700, fontSize: 'clamp(40px, 5.4vw, 72px)', lineHeight: 1.02, margin: '20px 0 0', letterSpacing: '-0.01em' }}>
              The people behind the voice.
            </h2>
            <p style={{ fontSize: 17, color: C.inkSoft, margin: '22px auto 0', fontWeight: 400, maxWidth: '48ch' }}>
              A small team of storytellers, travellers and builders carrying Nepal's narrative forward.
            </p>
          </div>
        </Reveal>

        {/* Featured founder */}
        <Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: '0.92fr 1.08fr', gap: 64, alignItems: 'center', background: C.paper, border: `1px solid ${C.lineSoft}`, borderRadius: 4, padding: 44 }}>
            {/* Portrait */}
            <div className="about-founder-portrait" style={{ height: 520, borderRadius: 3, overflow: 'hidden' }}>
              <img
                src="/Dashrat Sunar - founder.jpeg"
                alt="Dashrath Sunar"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }}
              />
            </div>
            {/* Meta */}
            <div>
              <div style={{ fontSize: 12, letterSpacing: '0.28em', textTransform: 'uppercase', color: C.terra, fontWeight: 600 }}>Founder</div>
              <h3 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(40px, 4.4vw, 60px)', lineHeight: 1, margin: '14px 0 0', letterSpacing: '-0.01em' }}>
                Dashrath Sunar
              </h3>
              <p style={{ fontSize: 17.5, lineHeight: 1.85, color: C.inkSoft, margin: '26px 0 0', fontWeight: 400 }}>
                Dashrath Sunar is the visionary behind VFY Talks and the 0.5% Campaign — a movement
                dedicated to transforming Nepal's global tourism identity through powerful storytelling,
                media and cross-cultural conversations.
              </p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 30 }}>
                {['Media Entrepreneur', 'Traveller', 'Storyteller'].map(tag => (
                  <span key={tag} style={{ fontSize: 12.5, letterSpacing: '0.06em', color: C.ink, padding: '8px 16px', borderRadius: 100, background: C.cream, border: `1px solid ${C.line}`, display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 400 }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: C.saffron, flexShrink: 0 }} />
                    {tag}
                  </span>
                ))}
              </div>
              <blockquote style={{ margin: '34px 0 0', paddingLeft: 24, borderLeft: `2px solid ${C.terra}`, fontFamily: serif, fontStyle: 'italic', fontWeight: 400, fontSize: 24, lineHeight: 1.4, color: C.ink }}>
                "Nepal doesn't need to be discovered — it needs to be heard."
              </blockquote>
            </div>
          </div>
        </Reveal>

        {/* Other team */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 40, marginTop: 60, maxWidth: 800 }}>
          {otherTeam.map((m, i) => (
            <Reveal key={m.role} delay={i * 0.08}>
              <div>
                {m.photo ? (
                  <div style={{ height: 340, borderRadius: 3, overflow: 'hidden', background: C.paper2 }}>
                    <img
                      src={m.photo}
                      alt={m.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: (m as { objectPosition?: string }).objectPosition || 'top', display: 'block' }}
                    />
                  </div>
                ) : (
                  <PhPortrait height={340} label="Portrait" />
                )}
                <div style={{ marginTop: 22 }}>
                  <div style={{ fontSize: 11.5, letterSpacing: '0.26em', textTransform: 'uppercase', color: C.terra, fontWeight: 600 }}>{m.role}</div>
                  <h4 style={{ fontFamily: serif, fontWeight: 500, fontSize: 28, lineHeight: 1.05, margin: '9px 0 0' }}>{m.name}</h4>
                  <p style={{ fontSize: 15, color: C.inkSoft, margin: '12px 0 0', fontWeight: 400, lineHeight: 1.7 }}>{m.bio}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Partners ── */}
      <section style={{ background: C.cream, borderTop: `1px solid ${C.lineSoft}`, borderBottom: `1px solid ${C.lineSoft}`, padding: '130px 40px' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', maxWidth: '62ch', margin: '0 auto 56px' }}>
              <Kicker center>Partners</Kicker>
              <h2 style={{ fontFamily: serif, fontWeight: 700, fontSize: 'clamp(34px, 4.4vw, 56px)', lineHeight: 1.02, margin: '20px 0 0', letterSpacing: '-0.01em' }}>
                In good company.
              </h2>
              <p style={{ fontSize: 17, color: C.inkSoft, margin: '22px auto 0', fontWeight: 400 }}>
                Organisations and voices helping carry Nepal's story to the world.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0, border: `1px solid ${C.line}`, borderRadius: 4, overflow: 'hidden', background: C.cream }}>
              {partners.map((p, i) => (
                <div key={p.name} style={{
                  height: 150, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRight: (i + 1) % 4 === 0 ? 'none' : `1px solid ${C.line}`,
                  borderBottom: i >= partners.length - 4 ? 'none' : `1px solid ${C.line}`,
                  background: C.paper, padding: 20,
                }}>
                  <img
                    src={p.logo}
                    alt={p.name}
                    style={{ maxHeight: 80, maxWidth: 120, objectFit: 'contain', filter: 'grayscale(20%)' }}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = 'none';
                      const span = document.createElement('span');
                      span.style.cssText = `font-size:10.5px;letter-spacing:0.2em;text-transform:uppercase;color:${C.inkFaint};font-family:ui-monospace,monospace`;
                      span.textContent = p.name;
                      e.currentTarget.parentElement!.appendChild(span);
                    }}
                  />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Back home ── */}
      <div style={{ padding: '60px 40px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <button
          onClick={() => navigate('/')}
          style={{
            fontFamily: sans, fontSize: 12, letterSpacing: '0.26em', textTransform: 'uppercase',
            fontWeight: 500, color: C.inkSoft, background: 'none', border: `1px solid ${C.line}`,
            padding: '12px 32px', borderRadius: 100, cursor: 'pointer',
            transition: 'background .2s, color .2s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = C.ink; (e.currentTarget as HTMLElement).style.color = C.cream; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none'; (e.currentTarget as HTMLElement).style.color = C.inkSoft; }}
        >
          ← Back to Home
        </button>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 900px) {
          .about-mission { grid-template-columns: 1fr !important; gap: 40px !important; }
          .about-founder { grid-template-columns: 1fr !important; gap: 36px !important; padding: 28px !important; }
          .about-team-grid { grid-template-columns: 1fr 1fr !important; gap: 26px !important; }
          .about-logo-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 768px) {
          /* Show full founder photo — no cropping */
          .about-founder-portrait { height: auto !important; overflow: visible !important; }
          .about-founder-portrait img { height: auto !important; object-fit: contain !important; object-position: center top !important; border-radius: 3px; }
        }
        @media (max-width: 560px) {
          .about-team-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
