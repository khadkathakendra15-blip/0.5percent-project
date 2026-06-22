import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* ─── design tokens ─────────────────────────────────────────────────────── */
const C = {
  ink:         '#F3F3F0',
  ink2:        '#F3F3F0',
  inkSoft:     '#9498A4',
  inkFaint:    '#5C606C',
  cream:       '#0E0F14',
  cream2:      '#15171E',
  paper:       '#0A0B0F',
  saffron:     '#C9FF3D',
  saffronBright: '#C9FF3D',   // sacred gold — accents on dark/light
  terra:       '#C9FF3D',     // heritage crimson — emphasis & action
  gold:        '#C9FF3D',     // deep gold — fine rules & labels
  goldBright:  '#C9FF3D',
  navy:        '#0A0B0F',     // deep navy — dark sections
  line:        'rgba(255,255,255,0.14)',
  lineS:       'rgba(255,255,255,0.08)',
};

const SERIF  = "'Bricolage Grotesque', Georgia, serif";
const BEBAS  = "'Bricolage Grotesque', sans-serif";
const MUKTA  = "'Space Grotesk', system-ui, sans-serif";
const MONO   = "'Space Mono', ui-monospace, monospace";

/* ─── image paths ───────────────────────────────────────────────────────── */
const IMG = {
  spiritual:            '/spirtual Distination.webp',
  nepaliArt:            '/nepali art.jpeg',
  dashrath:             '/Dashrat Sunar - founder.jpeg',
  vfyTalks:            '/Vfy Activities for this campaingn/Vfy Talks.jpeg',
  globalDiscourse:      '/Vfy Activities for this campaingn/Vfy global disscourse.jpeg',
  spiritualityDisc:     '/Vfy Activities for this campaingn/Global Disscourse about Sppirituality.jpeg',
  expedition:           '/Vfy Activities for this campaingn/Expeddition.jpeg',
  nepalRara:            '/Vfy Activities for this campaingn/Nepal Rara.jpeg',
  nepalKoYatra:         '/Vfy Activities for this campaingn/Nepal Ko Yatra.jpeg',
  nepaliCulture:        '/Vfy Activities for this campaingn/Nepali Culture.jpeg',
  meditation:           '/Buddhism.webp',
};

/* ─── Partner categories ─────────────────────────────────────────────────── */
const PARTNER_CATEGORIES = [
  {
    label: 'International Airlines',
    logos: [
      { src: '/logo/Nepal Airlines.jpg',  alt: 'Nepal Airlines' },
      { src: '/logo/Himaya Jet.webp',     alt: 'Himalaya Airlines' },
      { src: '/logo/Yeti Airlines.jpg',   alt: 'Yeti Airlines' },
      { src: '/logo/Budhha Air.jpg',      alt: 'Buddha Air' },
    ],
  },
  {
    label: 'Tourism & Industry Organizations',
    logos: [
      { src: '/logo/Lumbini Development trust.png', alt: 'Lumbini Development Trust' },
      { src: '/logo/Nepal Baudhha federation.webp', alt: 'Nepal Buddha Mahasangh' },
      { src: '/logo/Nepal Mounternering.png',       alt: 'Nepal Mountaineering Association' },
      { src: '/logo/Hotel Association nepal.jpg',   alt: 'Hotel Association Nepal' },
      { src: '/logo/TAAN-LOGO.png',                 alt: 'Trekking Agencies Association' },
    ],
  },
  {
    label: 'Travel Agencies',
    logos: [
      { src: '/logo/Hollywood trip Nepal.jpeg', alt: 'Hollywood Trip Nepal' },
    ],
  },
  {
    label: 'Media',
    logos: [
      { src: '/logo/vfy talks logo.jpeg', alt: 'VFY Talks' },
    ],
  },
  {
    label: 'Government & Tourism Authorities',
    logos: [
      { src: '/logo/Nepal Tourism Board.jpg',             alt: 'Nepal Tourism Board' },
      { src: '/logo/ministry-of-civil-aviation-logo.jpg', alt: 'Ministry of Culture, Tourism & Civil Aviation' },
      { src: '/logo/Kathmandu-Metropolitan.png',          alt: 'Kathmandu Metropolitan City' },
      { src: '/logo/Chagunarayan Municipality.webp',      alt: 'Changunarayan Municipality' },
      { src: '/logo/Lalitpur Metropolitan city.jpg',      alt: 'Lalitpur Metropolitan City' },
    ],
  },
  {
    label: 'Monasteries',
    logos: [
      { src: '/logo/Tergar monestry.webp', alt: 'Tergar Monastery' },
    ],
  },
  {
    label: 'Embassies',
    logos: [
      { src: '/logo/Nepal-China embassy.jpg', alt: 'Embassy of China in Nepal' },
      { src: '/logo/Indian Embassy.jpg',      alt: 'Embassy of India, Kathmandu' },
    ],
  },
  {
    label: 'Hotels',
    logos: [
      { src: '/logo/The Soaltee.jpg',    alt: 'The Soaltee Kathmandu' },
      { src: '/logo/Radisson hotel.png', alt: 'Radisson Hotel Kathmandu' },
      { src: '/logo/Dwarika Hotel.png',  alt: "Dwarika's Hotel" },
      { src: '/logo/Yak and Yeti.png',   alt: 'Hotel Yak and Yeti' },
      { src: '/logo/Marriott logo.jpg',  alt: 'Kathmandu Marriott Hotel' },
    ],
  },
];

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
      const progress = 1 - Math.pow(1 - step / steps, 3); // ease-out cubic
      if (step >= steps) { setValue(target); clearInterval(timer); }
      else setValue(target * progress);
    }, interval);
    return () => clearInterval(timer);
  }, [active, target, duration]);
  return value;
}

/* ─── scroll-reveal hook ─────────────────────────────────────────────────── */
function useReveal(delay = 0, dir: 'up' | 'left' | 'right' = 'up') {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = '0';
    const tx = dir === 'left' ? '-38px' : dir === 'right' ? '38px' : '0px';
    const ty = dir === 'up' ? '32px' : '0px';
    const sc = dir === 'up' ? ' scale(0.97)' : '';
    el.style.transform = `translate(${tx}, ${ty})${sc}`;
    el.style.transition = `opacity .85s cubic-bezier(.2,.6,.2,1) ${delay}s, transform .85s cubic-bezier(.2,.6,.2,1) ${delay}s`;

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'none';
          obs.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -5% 0px' }
    );
    obs.observe(el);

    // failsafe
    const timer = setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    }, 1500);

    return () => { obs.disconnect(); clearTimeout(timer); };
  }, [delay, dir]);
  return ref;
}

/* ─── eyebrow ──────────────────────────────────────────────────────────── */
function Eyebrow({ children, light = false, center = false }: { children: React.ReactNode; light?: boolean; center?: boolean }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: '12px',
      fontSize: '11.5px', letterSpacing: '0.34em', textTransform: 'uppercase',
      fontWeight: 600, fontFamily: MONO,
      color: light ? C.goldBright : C.gold,
      justifyContent: center ? 'center' : undefined,
    }}>
      <span aria-hidden style={{
        width: '28px', height: '1px',
        background: light ? C.goldBright : C.gold,
        opacity: 0.7, display: 'inline-block',
      }} />
      {children}
    </div>
  );
}

/* ─── display heading ──────────────────────────────────────────────────── */
function Display({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <h2 style={{
      fontFamily: SERIF, fontWeight: 700,
      fontSize: 'clamp(44px, 6vw, 88px)',
      lineHeight: 1, letterSpacing: '-0.015em',
      color: light ? C.cream : C.ink,
      marginTop: '22px',
    }}>
      {children}
    </h2>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   1. MARQUEE STRIP
══════════════════════════════════════════════════════════════════════════ */
export function MarqueeStrip() {
  const words = ['Tourism','Spirituality','Culture','Storytelling','Media','Global Conversation'];
  const items = [...words, ...words];
  return (
    <div aria-hidden="true" style={{
      background: '#C9FF3D', overflow: 'hidden',
      borderTop: '1px solid #0A0B0F', borderBottom: '1px solid #0A0B0F',
    }}>
      <div className="vfy-marquee-track" style={{
        display: 'flex', gap: '34px', padding: '22px 0',
        width: 'max-content', whiteSpace: 'nowrap',
        fontFamily: SERIF, fontWeight: 700, letterSpacing: '-0.01em',
        fontSize: '21px', color: '#0A0B0F',
      }}>
        {items.map((w, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '34px' }}>
            {w}
            <span style={{ fontSize: '13px' }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   2. VISION SECTION
══════════════════════════════════════════════════════════════════════════ */
export function VisionSection() {
  const r1 = useReveal(0, 'left');
  const r2 = useReveal(0.14, 'right');
  return (
    <section id="vfy-vision" style={{ background: C.cream, padding: '140px 0', position: 'relative' }}>
      <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 40px' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1.3fr',
          gap: '80px', alignItems: 'start',
        }}>
          {/* left */}
          <div ref={r1}>
            <Eyebrow>Our vision</Eyebrow>
            <Display>
              A movement built on{' '}
              <em style={{ fontStyle: 'italic', color: C.terra, fontWeight: 400 }}>storytelling</em>.
            </Display>
          </div>

          {/* right */}
          <div ref={r2} style={{ paddingTop: '18px' }}>
            <p style={{ fontSize: '19px', lineHeight: 1.85, color: C.inkSoft, marginBottom: '24px', fontWeight: 400, fontFamily: MUKTA }}>
              Nepal is one of the world's most beautiful and spiritually significant countries — from the Himalayas to ancient heritage, from the birthplace of{' '}
              <strong style={{ color: C.ink, fontWeight: 500 }}>Buddha</strong>{' '}
              to a rich tapestry of cultures. And yet, Nepal remains underrepresented in global tourism.
            </p>
            <p style={{ fontSize: '19px', lineHeight: 1.85, color: C.inkSoft, marginBottom: '36px', fontWeight: 400, fontFamily: MUKTA }}>
              VFY Talks exists to change that. Through honest media, cinematic storytelling and cross-cultural conversation, we share Nepal's voice with the world — and invite the world to listen.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {[['01','Tourism'],['02','Spirituality'],['03','Culture'],['04','Media']].map(([n, label]) => (
                <span key={label} style={{
                  fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase',
                  fontWeight: 500, padding: '10px 18px',
                  border: `1px solid ${C.line}`, borderRadius: '100px',
                  background: C.paper, fontFamily: MUKTA,
                }}>
                  <strong style={{ color: C.saffron, fontWeight: 600, marginRight: '6px' }}>{n}</strong>
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   3. 0.5% PREMISE SECTION
══════════════════════════════════════════════════════════════════════════ */
const PREMISE_STATS = [
  { label: 'India',        target: 1.44,  fmt: (v: number) => `${v.toFixed(2)}B`, note: 'Population — our southern neighbour', accent: false, dur: 1.4 },
  { label: 'China',        target: 1.40,  fmt: (v: number) => `${v.toFixed(2)}B`, note: 'Population — our northern neighbour', accent: false, dur: 1.4 },
  { label: '0.5% of both', target: 14.2,  fmt: (v: number) => `${v.toFixed(1)}M`,  note: 'Visitors that could change Nepal forever', accent: true, dur: 1.6 },
];

function PremiseStat({ stat, active, padStyle, borderRight }: {
  stat: typeof PREMISE_STATS[0]; active: boolean;
  padStyle: string; borderRight: boolean;
}) {
  const val = useCountUp(stat.target, active, stat.dur);
  return (
    <div style={{
      padding: padStyle,
      borderRight: borderRight ? `1px solid ${C.lineS}` : 'none',
    }}>
      <div style={{ fontSize: '11px', letterSpacing: '0.28em', textTransform: 'uppercase', color: C.inkFaint, fontWeight: 500, marginBottom: '14px', fontFamily: MUKTA }}>
        {stat.label}
      </div>
      <div className="premise-stat-val" style={{ fontFamily: BEBAS, fontSize: '64px', lineHeight: 0.9, color: stat.accent ? C.terra : C.ink, letterSpacing: '0.01em' }}>
        {stat.fmt(val)}
      </div>
      <div style={{ fontSize: '13px', color: C.inkSoft, marginTop: '10px', lineHeight: 1.55, fontFamily: MUKTA }}>
        {stat.note}
      </div>
    </div>
  );
}

function PremiseSection() {
  const r1 = useReveal(0, 'left');
  const r2 = useReveal(0.12, 'right');
  const stripRef = useRef<HTMLDivElement>(null);
  const [statsActive, setStatsActive] = useState(false);

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStatsActive(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    const t = setTimeout(() => setStatsActive(true), 2000);
    return () => { obs.disconnect(); clearTimeout(t); };
  }, []);

  // reveal for the strip container (fade-up)
  const r3 = useReveal(0.22);

  return (
    <section id="vfy-premise" style={{
      background: C.paper, padding: '140px 0',
      borderTop: `1px solid ${C.lineS}`, borderBottom: `1px solid ${C.lineS}`,
      position: 'relative',
    }}>
      <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '80px', alignItems: 'center' }}>
          {/* huge number */}
          <div ref={r1}>
            <Eyebrow>The premise</Eyebrow>
            <div className="vfy-premise-num" style={{
              fontFamily: SERIF, fontWeight: 700,
              fontSize: 'clamp(180px, 28vw, 440px)',
              lineHeight: 0.78, color: C.terra,
              letterSpacing: '-0.03em', display: 'inline-block',
              marginTop: '24px',
            }}>
              0<span style={{ color: C.saffron }}>.</span>5
              <span style={{ fontSize: '0.38em', verticalAlign: 'top', color: C.saffron, fontWeight: 400 }}>%</span>
            </div>
          </div>

          {/* right copy */}
          <div ref={r2}>
            <h3 style={{
              fontFamily: SERIF, fontWeight: 700,
              fontSize: 'clamp(32px, 3.4vw, 46px)', lineHeight: 1.08,
              letterSpacing: '-0.01em', marginBottom: '24px', color: C.ink,
            }}>
              It doesn't take the world. It takes{' '}
              <em style={{ fontStyle: 'italic', color: C.terra }}>half of one percent</em>.
            </h3>
            <p style={{ fontSize: '17px', lineHeight: 1.85, color: C.inkSoft, fontWeight: 400, fontFamily: MUKTA }}>
              If only 0.5% of travellers from India and China visit Nepal each year, the country's economy, employment and global identity transform. A small percentage — with a profound, generational ripple.
            </p>
          </div>
        </div>

        {/* stat strip — counts up on scroll */}
        <div className="vfy-stat-strip" ref={(node) => {
          // attach both the reveal ref and the intersection ref
          (r3 as React.MutableRefObject<HTMLDivElement | null>).current = node;
          (stripRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }} style={{
          marginTop: '60px', paddingTop: '36px',
          borderTop: `1px solid ${C.lineS}`,
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        }}>
          {PREMISE_STATS.map((stat, i) => (
            <PremiseStat
              key={i}
              stat={stat}
              active={statsActive}
              padStyle={i === 0 ? '0 28px 0 0' : i === 2 ? '0 0 0 28px' : '0 28px'}
              borderRight={i < 2}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   4. THREE PILLARS (dark triptych)
══════════════════════════════════════════════════════════════════════════ */
function ThreePillarsSection() {
  const rHead = useReveal(0, 'left');
  const rDesc = useReveal(0.14, 'right');

  const pillars = [
    {
      img: IMG.spiritual,
      num: '01  PEACE',
      title: 'Land of Peace',
      sub: 'Where ancient wisdom meets pristine nature, and quiet is felt in every breath.',
      delay: 0,
    },
    {
      img: IMG.nepaliArt,
      num: '02  DHARMA',
      title: 'Hinduism',
      sub: 'Pashupatinath, the rituals, the rivers — Nepal as a living seat of devotion.',
      delay: 0.1,
    },
    {
      img: IMG.meditation,
      num: '03  BODHI',
      title: 'Buddhism',
      sub: 'In Lumbini, the light of enlightenment first touched the world. The path still walks.',
      delay: 0.2,
    },
  ];

  return (
    <section id="vfy-pillars" style={{ background: C.cream, padding: '140px 0', position: 'relative' }}>
      <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 40px' }}>
        {/* head */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'end', marginBottom: '70px' }}>
          <div ref={rHead}>
            <Eyebrow>The soul of Nepal</Eyebrow>
            <Display>
              Three pillars.<br />One{' '}
              <em style={{ fontStyle: 'italic', color: C.terra, fontWeight: 400 }}>destination</em>.
            </Display>
          </div>
          <p ref={rDesc} style={{ fontSize: '17px', color: C.inkSoft, maxWidth: '48ch', lineHeight: 1.85, fontFamily: MUKTA, fontWeight: 400 }}>
            Nepal's gift to the world is not a single thing. It is a layered, living inheritance — held in its peaks, its prayers, and its people.
          </p>
        </div>

        {/* triptych */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {pillars.map((p) => (
            <PillarCard key={p.num} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PillarCard({ img, num, title, sub, delay }: { img: string; num: string; title: string; sub: string; delay: number }) {
  const ref = useReveal(delay);
  return (
    <div ref={ref} style={{ position: 'relative', overflow: 'hidden', borderRadius: '4px', aspectRatio: '3/4.2', background: '#F3F3F0', cursor: 'pointer', transition: 'transform .45s cubic-bezier(.22,1,.36,1), box-shadow .45s ease' }}
      onMouseEnter={e => { (e.currentTarget.querySelector('img') as HTMLImageElement).style.transform = 'scale(1.06)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-8px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 24px 60px rgba(0,0,0,0.35)'; }}
      onMouseLeave={e => { (e.currentTarget.querySelector('img') as HTMLImageElement).style.transform = 'scale(1)'; (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
      className="vfy-pillar-card"
    >
      <img src={img} alt={title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 1.2s ease', display: 'block' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.05) 30%, rgba(8,6,4,0.85) 100%)' }} />
      <div style={{ position: 'absolute', left: '28px', right: '28px', bottom: '28px', color: '#fff', zIndex: 2 }}>
        <div style={{ fontFamily: BEBAS, fontSize: '14px', letterSpacing: '0.3em', color: C.saffronBright }}>{num}</div>
        <h3 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: '42px', lineHeight: 1, marginTop: '6px' }}>{title}</h3>
        <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginTop: '10px', lineHeight: 1.6, fontWeight: 400, fontFamily: MUKTA }}>{sub}</div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   5. ACTIVITIES — VIDEO SHOWCASE
══════════════════════════════════════════════════════════════════════════ */
const VIDEO_EMBEDS = [
  'https://www.youtube.com/embed/M1IzzysN9m8?si=dvWUHVXb_2X5j4wI',
  'https://www.youtube.com/embed/bM2CjlDVgs4?si=EuZYpCXn8P_4_AeF',
];

function ActivitiesSection() {
  const rHead    = useReveal(0, 'left');
  const rDisplay = useReveal(0.1, 'left');
  const rDesc    = useReveal(0.16, 'right');
  const rVideos  = useReveal(0.26);

  return (
    <section id="vfy-activities" style={{ background: C.paper, padding: '140px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Faint decorative rule */}
      <div style={{ position: 'absolute', top: 0, left: '40px', right: '40px', height: '1px', background: C.lineS }} />

      <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 40px' }}>
        {/* head */}
        <div ref={rHead} style={{ marginBottom: '20px' }}>
          <Eyebrow>Campaign initiatives</Eyebrow>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'flex-end', marginBottom: '64px' }}>
          <div ref={rDisplay}>
            <Display>
              How we carry the{' '}
              <em style={{ fontStyle: 'italic', color: C.terra, fontWeight: 400 }}>story</em>.
            </Display>
          </div>
          <div ref={rDesc}>
            <p style={{ maxWidth: '42ch', color: C.inkSoft, fontSize: '17px', lineHeight: 1.85, fontWeight: 400, fontFamily: MUKTA, borderLeft: `2px solid ${C.terra}`, paddingLeft: '24px' }}>
              The 0.5% Campaign moves through podcasts, films, expeditions, conversations and culture — a mosaic of voices, all pointed toward Nepal.
            </p>
          </div>
        </div>

        {/* Our work so far — video row */}
        <div ref={rVideos}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '36px' }}>
            <span style={{
              fontFamily: MUKTA, fontSize: '11px', letterSpacing: '0.32em',
              textTransform: 'uppercase', fontWeight: 600, color: C.inkFaint,
              whiteSpace: 'nowrap',
            }}>
              Our work so far
            </span>
            <div style={{ flex: 1, height: '1px', background: C.lineS }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            {VIDEO_EMBEDS.map((src, i) => (
              <div key={i} style={{
                position: 'relative',
                paddingBottom: '56.25%',
                height: 0,
                overflow: 'hidden',
                borderRadius: '6px',
                background: C.ink,
                boxShadow: '0 8px 40px rgba(255,255,255,0.16)',
              }}>
                <iframe
                  src={src}
                  title={`VFY Campaign Video ${i + 1}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  style={{
                    position: 'absolute',
                    top: 0, left: 0,
                    width: '100%', height: '100%',
                    border: 'none',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   6. FOUNDER STRIP
══════════════════════════════════════════════════════════════════════════ */
export function FounderSection() {
  const navigate = useNavigate();
  const r1 = useReveal(0, 'left');
  const r2 = useReveal(0.14, 'right');

  return (
    <section style={{ background: C.paper, padding: '140px 0', borderTop: `1px solid ${C.lineS}`, position: 'relative' }}>
      <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: '80px', alignItems: 'center' }}>
          {/* portrait */}
          <div ref={r1} style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden', borderRadius: '4px', background: C.cream2 }}>
            <img
              src={IMG.dashrath}
              alt="Dashrath Sunar, Founder & CEO"
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 60%, rgba(8,6,4,0.35))', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', left: '24px', bottom: '24px', color: '#fff' }}>
              <div style={{ fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', color: C.saffronBright, fontWeight: 600, fontFamily: MUKTA }}>Founder &amp; CEO</div>
              <div style={{ fontFamily: SERIF, fontSize: '30px', lineHeight: 1, marginTop: '6px' }}>Dashrath Sunar</div>
            </div>
          </div>

          {/* copy */}
          <div ref={r2}>
            <Eyebrow>Behind the movement</Eyebrow>

            <blockquote style={{
              fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400,
              fontSize: 'clamp(28px, 3.6vw, 46px)', lineHeight: 1.18, color: C.ink,
              borderLeft: `2px solid ${C.terra}`, paddingLeft: '30px',
              marginTop: '24px', marginBottom: '36px',
            }}>
              "Nepal doesn't need to be discovered — it needs to be heard."
            </blockquote>

            <div>
              <p style={{ fontSize: '17px', lineHeight: 1.85, color: C.inkSoft, marginBottom: '18px', fontWeight: 400, fontFamily: MUKTA }}>
                Dashrath Sunar is the visionary behind VFY Talks and the 0.5% Campaign — a movement dedicated to transforming Nepal's global tourism identity through powerful storytelling, media and cross-cultural conversations.
              </p>
              <p style={{ fontSize: '17px', lineHeight: 1.85, color: C.inkSoft, fontWeight: 400, fontFamily: MUKTA }}>
                A media entrepreneur, traveller and storyteller.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '24px' }}>
              {['Media Entrepreneur', 'Traveller', 'Storyteller'].map(tag => (
                <span key={tag} style={{
                  fontSize: '12.5px', letterSpacing: '0.06em', color: C.ink,
                  padding: '9px 18px', borderRadius: '100px', background: C.cream,
                  border: `1px solid ${C.line}`, display: 'inline-flex', alignItems: 'center', gap: '8px',
                  fontFamily: MUKTA,
                }}>
                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: C.saffron, display: 'inline-block' }} />
                  {tag}
                </span>
              ))}
            </div>

            <button
              onClick={() => navigate('/about')}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '12px',
                marginTop: '36px', fontSize: '13px', letterSpacing: '0.18em',
                textTransform: 'uppercase', fontWeight: 500, color: C.ink,
                background: 'none', border: 'none', borderBottom: `1px solid ${C.ink}`, paddingBottom: '6px',
                cursor: 'pointer', fontFamily: MUKTA,
                transition: 'gap .2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.gap = '18px'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.gap = '12px'; }}
            >
              Read the full story
              <svg width="16" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   7. PARTNERS — categorised grid
══════════════════════════════════════════════════════════════════════════ */

type LogoItem = { src: string; alt: string };

function LogoBadge({ src, alt }: LogoItem) {
  return (
    <div title={alt} style={{
      width: '72px', height: '72px', borderRadius: '12px', flexShrink: 0,
      background: '#fff', border: `1px solid ${C.lineS}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden', boxShadow: '0 1px 6px rgba(255,255,255,0.06)',
    }}>
      <img
        src={src} alt={alt} loading="lazy"
        style={{ width: '56px', height: '56px', objectFit: 'contain', opacity: 0.90 }}
        onError={e => {
          (e.currentTarget as HTMLImageElement).style.display = 'none';
          const p = e.currentTarget.parentElement!;
          p.style.background = C.cream2;
          p.innerHTML = `<span style="font-family:'Bricolage Grotesque',sans-serif;font-size:10px;color:${C.inkFaint};letter-spacing:.08em;text-align:center;padding:4px">${alt.slice(0, 5).toUpperCase()}</span>`;
        }}
      />
    </div>
  );
}

function PartnersGridSection() {
  const rHead = useReveal(0);

  return (
    <section style={{ background: C.paper, padding: '100px 0', borderTop: `1px solid ${C.lineS}`, position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>

        {/* ── Header ── */}
        <div ref={rHead} style={{ marginBottom: '56px' }}>
          <Eyebrow>In good company</Eyebrow>
          <Display>
            Partners &amp;{' '}
            <em style={{ fontStyle: 'italic', color: C.terra, fontWeight: 400 }}>Supporters</em>.
          </Display>
          <p style={{ marginTop: '18px', color: C.inkSoft, fontSize: '16px', fontFamily: MUKTA, fontWeight: 400, maxWidth: '52ch' }}>
            Airlines, embassies, hotels, government bodies and media organisations carrying Nepal's story to the world.
          </p>
        </div>

        {/* ── Single horizontal marquee with category dividers ── */}
        <div style={{
          position: 'relative', overflow: 'hidden',
          borderTop: `1px solid ${C.lineS}`,
          borderBottom: `1px solid ${C.lineS}`,
          padding: '32px 0',
        }}>
          {(() => {
            // Flatten all categories into a single track, with the category
            // label rendered inline before each group as a moving divider.
            type Item =
              | { kind: 'label'; label: string }
              | { kind: 'logo'; src: string; alt: string };

            const oneRun: Item[] = PARTNER_CATEGORIES.flatMap(cat => [
              { kind: 'label' as const, label: cat.label },
              ...cat.logos.map(l => ({ kind: 'logo' as const, src: l.src, alt: l.alt })),
            ]);
            // Duplicate so translateX(-50%) loops seamlessly.
            const tiles = [...oneRun, ...oneRun];

            return (
              <div
                className="animate-scroll-left"
                style={{ display: 'flex', gap: '18px', width: 'max-content', alignItems: 'center' }}
              >
                {tiles.map((item, i) =>
                  item.kind === 'logo' ? (
                    <LogoBadge key={i} src={item.src} alt={item.alt} />
                  ) : (
                    <div key={i} style={{
                      flexShrink: 0,
                      padding: '0 18px 0 6px',
                      fontFamily: MUKTA, fontSize: '10px', letterSpacing: '0.22em',
                      textTransform: 'uppercase', color: C.inkFaint, fontWeight: 600,
                      lineHeight: 1.4, whiteSpace: 'nowrap',
                      borderLeft: `1px solid ${C.lineS}`,
                    }}>
                      {item.label}
                    </div>
                  )
                )}
              </div>
            );
          })()}

          {/* Edge fades */}
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: '64px',
            background: `linear-gradient(to right, ${C.paper}, transparent)`,
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', right: 0, top: 0, bottom: 0, width: '64px',
            background: `linear-gradient(to left, ${C.paper}, transparent)`,
            pointerEvents: 'none',
          }} />
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   8. CTA SECTION
══════════════════════════════════════════════════════════════════════════ */
function CTASection() {
  const r1 = useReveal(0);
  const r2 = useReveal(0.1);
  const r3 = useReveal(0.2);
  const r4 = useReveal(0.3);

  return (
    <section id="vfy-join" style={{ background: C.cream, position: 'relative', overflow: 'hidden', borderTop: `1px solid ${C.lineS}` }}>
      {/* Subtle red glow top-right */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(55% 70% at 85% 10%, rgba(201,255,61,0.06), transparent 60%),
                     radial-gradient(45% 60% at 15% 90%, rgba(12,26,50,0.05), transparent 60%)`,
      }} />
      {/* Decorative large number */}
      <div className="vfy-cta-watermark" style={{
        position: 'absolute', right: '-30px', top: '50%', transform: 'translateY(-50%)',
        fontFamily: SERIF, fontWeight: 700,
        fontSize: 'clamp(200px, 28vw, 400px)', lineHeight: 1,
        color: `rgba(201,255,61,0.04)`, letterSpacing: '-0.04em',
        userSelect: 'none', pointerEvents: 'none',
      }}>0.5</div>
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '140px 40px', maxWidth: '1320px', margin: '0 auto' }}>
        <div ref={r1} style={{ display: 'flex', justifyContent: 'center', marginBottom: '22px' }}>
          <Eyebrow center>Join the movement</Eyebrow>
        </div>
        <h2 ref={r2} style={{
          fontFamily: SERIF, fontWeight: 700,
          fontSize: 'clamp(44px, 6.4vw, 108px)', lineHeight: 0.98,
          letterSpacing: '-0.015em', color: C.ink, textAlign: 'center',
        }}>
          From the Himalayas,<br />
          to the{' '}
          <em style={{ fontStyle: 'italic', color: C.terra, fontWeight: 400 }}>world</em>.
        </h2>
        <p ref={r3} style={{ maxWidth: '54ch', margin: '30px auto 0', fontSize: '18px', lineHeight: 1.85, color: C.inkSoft, fontWeight: 400, fontFamily: MUKTA }}>
          Partner with us. Tell a story. Walk the trail. Help carry Nepal's voice into the global conversation it deserves.
        </p>
        <div ref={r4} style={{ display: 'flex', gap: '14px', justifyContent: 'center', marginTop: '48px', flexWrap: 'wrap' }}>
          <a
            href="mailto:vfytalks@gmail.com"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              padding: '16px 36px', borderRadius: '100px',
              fontSize: '12.5px', letterSpacing: '0.22em', textTransform: 'uppercase',
              fontWeight: 700, fontFamily: MONO,
              background: C.terra, color: '#0A0B0F',
              transition: 'transform .2s, background .2s',
              textDecoration: 'none',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#D8FF6B'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = C.terra; (e.currentTarget as HTMLElement).style.transform = 'none'; }}
          >
            Become a partner
          </a>
          <a
            href="#vfy-vision"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              padding: '16px 36px', borderRadius: '100px',
              fontSize: '12.5px', letterSpacing: '0.22em', textTransform: 'uppercase',
              fontWeight: 600, fontFamily: MUKTA,
              background: 'transparent', color: C.ink,
              border: `1px solid ${C.line}`,
              transition: 'transform .2s, border-color .2s',
              textDecoration: 'none',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = C.ink; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = C.line; (e.currentTarget as HTMLElement).style.transform = 'none'; }}
          >
            Explore the campaign
          </a>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   9. SITE FOOTER
══════════════════════════════════════════════════════════════════════════ */
const FOOTER_NAV = [
  { label: 'Destinations',  to: '/destinations' },
  { label: 'Stories',       to: '/blog' },
  { label: 'Yatra Nepalko', to: '/yatra' },
  { label: 'AI Guide',      to: '/ai-guide' },
  { label: 'Plan Trip',     to: '/booking' },
  { label: 'About',         to: '/about' },
];

export function SiteFooter() {
  const navigate = useNavigate();
  return (
    <footer style={{ background: '#0A0B0F', color: 'rgba(243,243,240,0.65)' }}>
      {/* upper */}
      <div className="vfy-footer-upper" style={{
        maxWidth: '1320px', margin: '0 auto', padding: '64px 40px 48px',
        display: 'flex', justifyContent: 'space-between', gap: '48px', flexWrap: 'wrap',
        borderBottom: '1px solid rgba(243,243,240,0.08)',
      }}>
        {/* brand block */}
        <div style={{ maxWidth: '380px' }}>
          <button onClick={() => navigate('/')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              width: '28px', height: '28px', borderRadius: '50%', background: '#C9FF3D',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: SERIF, fontWeight: 800, fontSize: '12px', color: '#0A0B0F',
            }}>½</span>
            <span style={{ fontFamily: SERIF, fontWeight: 700, fontSize: '16px', color: '#F3F3F0' }}>
              0.5<span style={{ color: '#C9FF3D' }}>%</span> Campaign
            </span>
          </button>
          <p style={{ fontFamily: SERIF, fontSize: '19px', fontStyle: 'italic', fontWeight: 400, color: 'rgba(243,243,240,0.85)', lineHeight: 1.45, margin: '0 0 14px' }}>
            If just 0.5% of travelers from India and China choose Nepal — everything changes.
          </p>
          <p style={{ fontFamily: MUKTA, fontSize: '13px', fontWeight: 400, lineHeight: 1.75, color: 'rgba(243,243,240,0.42)', margin: 0 }}>
            A national tourism movement for Nepal's future. Travel with purpose.
          </p>
        </div>

        {/* explore links */}
        <div>
          <div style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.26em', textTransform: 'uppercase', color: C.saffronBright, marginBottom: '20px' }}>
            Explore
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {FOOTER_NAV.map(l => (
              <button key={l.to} onClick={() => navigate(l.to)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left',
                  fontFamily: MUKTA, fontSize: '14px', fontWeight: 400, letterSpacing: '0.02em',
                  color: 'rgba(243,243,240,0.62)', transition: 'color .2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = C.cream; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(243,243,240,0.62)'; }}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        {/* campaign block */}
        <div style={{ maxWidth: '280px' }}>
          <div style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.26em', textTransform: 'uppercase', color: C.saffronBright, marginBottom: '20px' }}>
            The Movement
          </div>
          <p style={{ fontFamily: MUKTA, fontSize: '13px', fontWeight: 400, lineHeight: 1.8, color: 'rgba(243,243,240,0.42)', margin: '0 0 22px' }}>
            14.2 million potential visitors. $4.2 billion in projected revenue. 820,000 new jobs.
          </p>
          <button onClick={() => navigate('/booking')}
            style={{
              fontFamily: MONO, fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase',
              background: '#C9FF3D', color: C.cream, border: 'none', borderRadius: '2px',
              padding: '12px 26px', cursor: 'pointer', transition: 'opacity .2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.85'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
          >
            Join the 0.5%
          </button>
        </div>
      </div>

      {/* lower */}
      <div className="vfy-footer-lower" style={{
        maxWidth: '1320px', margin: '0 auto', padding: '22px 40px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '14px', flexWrap: 'wrap',
      }}>
        <span style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.1em', color: 'rgba(243,243,240,0.30)' }}>
          © 2026 The 0.5% Campaign · Nepal
        </span>
        <span style={{ fontFamily: SERIF, fontSize: '13px', fontStyle: 'italic', color: 'rgba(243,243,240,0.30)' }}>
          From the peaks that touch the sky to the temples that touch the soul.
        </span>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   ROOT EXPORT
══════════════════════════════════════════════════════════════════════════ */
export { PremiseSection, ActivitiesSection, ThreePillarsSection };

export function VFYHomeSections() {
  return (
    <>
      <PartnersGridSection />
      <CTASection />
    </>
  );
}
