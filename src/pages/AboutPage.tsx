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
    objectPosition: 'center 30%',
    bio:   "Drives Nepal's digital presence with precision strategy, creative content and social media expertise.",
  },
  {
    role:  'Tourism Entrepreneur',
    name:  'Rohit Karki',
    photo: '/Rohit Karki.jpg',
    objectPosition: 'center 38%',
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
          <article
            className="about-founder"
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,192,0,0.40)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 24px 60px rgba(0,0,0,0.45)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = C.lineSoft; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
            style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 56, alignItems: 'center', background: C.paper2, border: `1px solid ${C.lineSoft}`, borderRadius: 6, padding: 44, transition: 'border-color .4s ease, box-shadow .4s ease' }}
          >
            {/* Portrait */}
            <div className="about-founder-portrait" style={{ position: 'relative', height: 520, borderRadius: 4, overflow: 'hidden', background: C.paper }}>
              <img
                src="/Dashrat Sunar - founder.jpeg"
                alt="Dashrath Sunar"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 22%', display: 'block' }}
              />
              <div style={{ position: 'absolute', top: 16, left: 16, fontFamily: mono, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.terra, background: 'rgba(10,11,15,0.62)', backdropFilter: 'blur(4px)', padding: '6px 11px', borderRadius: 2 }}>
                Founder &amp; CEO
              </div>
            </div>
            {/* Meta */}
            <div>
              <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: C.terra, fontWeight: 700 }}>Founder</div>
              <h3 style={{ fontFamily: serif, fontWeight: 700, fontSize: 'clamp(38px, 4.4vw, 58px)', lineHeight: 1, margin: '14px 0 0', letterSpacing: '-0.02em', color: C.ink }}>
                Dashrath Sunar
              </h3>
              <p style={{ fontSize: 17, lineHeight: 1.85, color: C.inkSoft, margin: '24px 0 0', fontWeight: 400 }}>
                Dashrath Sunar is the visionary behind VFY Talks and the 0.5% Campaign — a movement
                dedicated to transforming Nepal's global tourism identity through powerful storytelling,
                media and cross-cultural conversations.
              </p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 28 }}>
                {['Media Entrepreneur', 'Traveller', 'Storyteller'].map(tag => (
                  <span key={tag} style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.ink, padding: '8px 15px', borderRadius: 100, background: C.cream, border: `1px solid ${C.line}`, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: C.saffron, flexShrink: 0 }} />
                    {tag}
                  </span>
                ))}
              </div>
              <blockquote style={{ margin: '32px 0 0', paddingLeft: 24, borderLeft: `2px solid ${C.terra}`, fontFamily: serif, fontStyle: 'italic', fontWeight: 500, fontSize: 23, lineHeight: 1.4, color: C.ink }}>
                "Nepal doesn't need to be discovered — it needs to be heard."
              </blockquote>
            </div>
          </article>
        </Reveal>

        {/* Other team */}
        <div className="about-team-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 28, marginTop: 28 }}>
          {otherTeam.map((m, i) => (
            <Reveal key={m.role} delay={i * 0.08}>
              <article
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,192,0,0.40)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 22px 50px rgba(0,0,0,0.45)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.borderColor = C.lineSoft; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
                style={{ display: 'flex', flexDirection: 'column', height: '100%', background: C.paper2, border: `1px solid ${C.lineSoft}`, borderRadius: 6, overflow: 'hidden', transition: 'transform .4s cubic-bezier(.2,.6,.2,1), border-color .4s ease, box-shadow .4s ease' }}
              >
                <div style={{ position: 'relative', height: 360, overflow: 'hidden', background: C.paper }}>
                  {m.photo ? (
                    <img
                      src={m.photo}
                      alt={m.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: (m as { objectPosition?: string }).objectPosition || 'center top', display: 'block' }}
                    />
                  ) : (
                    <PhPortrait height={360} label="Portrait" />
                  )}
                  <div style={{ position: 'absolute', top: 16, left: 16, fontFamily: mono, fontSize: 10.5, letterSpacing: '0.2em', color: C.terra, background: 'rgba(10,11,15,0.62)', backdropFilter: 'blur(4px)', padding: '5px 10px', borderRadius: 2 }}>
                    0{i + 1}
                  </div>
                </div>
                <div style={{ padding: '26px 28px 30px', flex: 1 }}>
                  <div style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.terra, fontWeight: 700 }}>{m.role}</div>
                  <h4 style={{ fontFamily: serif, fontWeight: 600, fontSize: 27, lineHeight: 1.05, margin: '11px 0 0', color: C.ink, letterSpacing: '-0.01em' }}>{m.name}</h4>
                  <p style={{ fontSize: 14.5, color: C.inkSoft, margin: '12px 0 0', fontWeight: 400, lineHeight: 1.7 }}>{m.bio}</p>
                </div>
              </article>
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
