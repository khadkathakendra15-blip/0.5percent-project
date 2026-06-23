import { useState } from 'react';
import { NavBar } from '@/components/ui/nav-bar';
import { CheckCircle, Calendar, FileText, Users, Bed, DollarSign, ChevronDown, ChevronUp, Mountain, Star } from 'lucide-react';

const C = {
  ink: '#F3F3F0', ink2: '#F3F3F0', inkSoft: '#9498A4', inkFaint: '#5C606C',
  cream: '#0E0F14', cream2: '#15171E', paper: '#0A0B0F',
  saffron: '#FFC000', terra: '#FFC000', lineS: 'rgba(255,255,255,0.08)',
};
const SERIF = "'Bricolage Grotesque', system-ui, sans-serif";
const BEBAS = "'Bricolage Grotesque', sans-serif";
const MUKTA = "'Space Grotesk', system-ui, sans-serif";
const MONO  = "'Space Mono', ui-monospace, monospace";

const SEASONS = [
  {
    name: 'Spring',
    months: 'Mar – May',
    rating: 5,
    gradient: 'linear-gradient(145deg,#1A0814 0%,#8C1E3D 50%,#1F0510 100%)',
    icon: <Star size={20} color="#FFC000" strokeWidth={1.5} fill="#FFC000" />,
    desc: 'Peak trekking season. Rhododendrons bloom, skies are clear, and most high passes are open. The busiest — and most rewarding — time to visit.',
    best: ['Everest BC','Annapurna Circuit','Langtang','All treks'],
  },
  {
    name: 'Monsoon',
    months: 'Jun – Aug',
    rating: 2,
    gradient: 'linear-gradient(145deg,#1a3a5c 0%,#FFC000 50%,#0d2240 100%)',
    icon: null,
    desc: 'Heavy rainfall across most of Nepal. Roads wash out. Best for rain-shadow areas: Mustang, Dolpo. Wildlife activity peaks in Chitwan.',
    best: ['Upper Mustang','Chitwan','Rafting'],
  },
  {
    name: 'Autumn',
    months: 'Sep – Nov',
    rating: 5,
    gradient: 'linear-gradient(145deg,#2E0810 0%,#7A1830 50%,#200810 100%)',
    icon: <Star size={20} color="#FFC000" strokeWidth={1.5} fill="#FFC000" />,
    desc: 'Arguably the best season. Crystal-clear skies after monsoon, stable weather, spectacular mountain views. All major treks in perfect condition.',
    best: ['All treks','Climbing','Festivals (Dashain, Tihar)'],
  },
  {
    name: 'Winter',
    months: 'Dec – Feb',
    rating: 3,
    gradient: 'linear-gradient(145deg,#0A0B0F 0%,#15171E 40%,#FFC000 100%)',
    icon: null,
    desc: 'Cold at altitude, but Kathmandu and Pokhara are pleasant. Low-altitude treks (Poon Hill, Ghorepani) are excellent. Fewer crowds, lower prices.',
    best: ['Poon Hill','Kathmandu','Lumbini','Chitwan'],
  },
];


const STEPS = [
  { n: '01', icon: <Mountain size={20} color={C.saffron} strokeWidth={1.5} />,  title: 'Choose your destination',  desc: 'Browse our Destinations page. Filter by region, activity type, or difficulty. Not sure? Take our 2-minute trip matcher quiz.' },
  { n: '02', icon: <Calendar size={20} color={C.saffron} strokeWidth={1.5} />,  title: 'Pick your dates',            desc: 'Spring (Mar–May) and Autumn (Sep–Nov) are peak seasons. Book at least 6 weeks ahead. Some restricted areas need 3-month lead time.' },
  { n: '03', icon: <FileText size={20} color={C.saffron} strokeWidth={1.5} />,  title: 'Sort permits & visa',        desc: 'Most nationalities get a visa on arrival (USD $30 for 15 days). Trekking permits (TIMS card + national park fees) are arranged for you.' },
  { n: '04', icon: <Users size={20} color={C.saffron} strokeWidth={1.5} />,    title: 'Book your guide',            desc: 'Choose from self-guided, licensed guide, or full-package options. All guides are NTB-certified and background-checked.' },
  { n: '05', icon: <Bed size={20} color={C.saffron} strokeWidth={1.5} />,      title: 'Arrange accommodation',      desc: 'Tea houses along treks, boutique hotels in cities, or luxury lodges — we have options at every budget, all pre-vetted for quality and safety.' },
  { n: '06', icon: <DollarSign size={20} color={C.saffron} strokeWidth={1.5} />, title: 'Budget & insurance',       desc: 'Budget $60–$120/day for mid-range trekking. Travel insurance with helicopter evacuation cover is mandatory for all trekking permits.' },
];

const FAQS = [
  { q: 'Do I need a visa to enter Nepal?', a: 'Yes. Most nationalities can obtain a tourist visa on arrival at Tribhuvan International Airport or land borders. 15-day visa costs USD $30, 30 days costs $50, 90 days costs $125. Citizens of India do not need a visa.' },
  { q: 'What permits do I need for trekking?', a: 'Most trekking areas require a TIMS (Trekkers\' Information Management System) card (USD $20) and national park entrance fees ($35–50). Restricted areas like Upper Mustang require a special permit ($500 for the first 10 days).' },
  { q: 'What is the best month to trek Everest Base Camp?', a: 'April–May (spring) and October–November (autumn) offer the clearest skies and most stable conditions. October is considered the absolute best month for EBC.' },
  { q: 'Is Nepal safe for solo travellers?', a: "Nepal is one of the safer destinations in Asia for solo travel. The main risks on treks are altitude sickness and weather. Hiring a guide significantly reduces both. Keep your guide agency's emergency number saved." },
  { q: 'How do I book through the 0.5% Campaign portal?', a: 'Our booking portal connects you directly with NTB-verified guides and operators. 0.5% of every booking goes directly into the national tourism development fund — your trip literally rebuilds Nepal\'s tourism infrastructure.' },
];

function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${C.lineS}` }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '20px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
        }}
      >
        <span style={{ fontFamily: MUKTA, fontSize: '16px', fontWeight: 500, color: C.ink, paddingRight: '20px' }}>{q}</span>
        {open ? <ChevronUp size={18} color={C.saffron} /> : <ChevronDown size={18} color={C.inkFaint} />}
      </button>
      {open && (
        <p style={{ fontFamily: MUKTA, fontSize: '14px', lineHeight: 1.85, color: C.inkSoft, paddingBottom: '20px', paddingRight: '32px' }}>
          {a}
        </p>
      )}
    </div>
  );
}

export default function BookingPage() {
  return (
    <div style={{ background: C.paper, minHeight: '100vh' }}>
      <NavBar />

      {/* ── HERO ── */}
      <section style={{
        background: C.cream2, paddingTop: '64px', minHeight: '62vh',
        display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden',
        borderBottom: `1px solid ${C.lineS}`,
      }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '80px 40px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
                <span style={{ fontFamily: MONO, fontSize: '11px', letterSpacing: '0.32em', textTransform: 'uppercase', color: C.inkFaint }}>Plan your trip</span>
              </div>
              <h1 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(44px,5.5vw,88px)', lineHeight: 0.92, letterSpacing: '-0.02em', color: C.ink, marginBottom: '28px' }}>
                Your Nepal journey,<br />
                <em style={{ color: C.inkSoft, fontStyle: 'italic' }}>perfectly planned</em>.
              </h1>
              <p style={{ fontFamily: MUKTA, fontSize: '17px', lineHeight: 1.85, fontWeight: 400, color: C.inkSoft, maxWidth: '46ch' }}>
                From permits to porters, tea houses to temples — our booking guide covers everything you need to plan a seamless Nepal experience.
              </p>
            </div>
            {/* quick facts */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[
                { v: '$30',    l: 'Visa on arrival (15 days)' },
                { v: '$20',    l: 'TIMS trekking card' },
                { v: '~$60',   l: 'Mid-range daily budget' },
                { v: '6 hrs',  l: 'Direct flight from Delhi' },
              ].map(f => (
                <div key={f.l} style={{ background: C.paper, border: `1px solid ${C.lineS}`, borderRadius: '4px', padding: '22px 20px' }}>
                  <div style={{ fontFamily: BEBAS, fontSize: '36px', lineHeight: 0.9, color: C.ink }}>{f.v}</div>
                  <div style={{ fontFamily: MUKTA, fontSize: '13px', color: C.inkFaint, marginTop: '8px', lineHeight: 1.4 }}>{f.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SEASONS ── */}
      <section style={{ background: C.cream, padding: '100px 0', borderTop: `1px solid ${C.lineS}` }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 40px' }}>
          <div style={{ marginBottom: '52px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span style={{ fontFamily: MONO, fontSize: '11px', letterSpacing: '0.32em', textTransform: 'uppercase', color: C.saffron }}>When to visit</span>
            </div>
            <h2 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(36px,4vw,60px)', color: C.ink }}>Four seasons, four Nepal's.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px' }}>
            {SEASONS.map(s => (
              <div key={s.name} style={{ borderRadius: '6px', overflow: 'hidden', border: `1px solid ${C.lineS}` }}>
                <div style={{ height: '100px', background: s.gradient, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '16px' }}>
                  <div style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(243,243,240,0.5)' }}>{s.months}</div>
                  <div style={{ fontFamily: SERIF, fontSize: '24px', color: C.cream, lineHeight: 1.1, marginTop: '2px' }}>{s.name}</div>
                </div>
                <div style={{ background: C.paper, padding: '18px 20px' }}>
                  <div style={{ display: 'flex', gap: '3px', marginBottom: '10px' }}>
                    {[1,2,3,4,5].map(i => (
                      <div key={i} style={{ width: '14px', height: '4px', borderRadius: '2px', background: i <= s.rating ? C.saffron : C.cream2 }} />
                    ))}
                  </div>
                  <p style={{ fontFamily: MUKTA, fontSize: '13px', lineHeight: 1.75, color: C.inkSoft, marginBottom: '12px' }}>{s.desc}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {s.best.map(b => (
                      <div key={b} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <CheckCircle size={11} color={C.saffron} strokeWidth={2} />
                        <span style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.12em', color: C.inkFaint }}>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6 STEPS ── */}
      <section style={{ background: C.cream, padding: '100px 0', borderTop: `1px solid ${C.lineS}` }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 40px' }}>
          <div style={{ marginBottom: '60px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span style={{ fontFamily: MONO, fontSize: '11px', letterSpacing: '0.32em', textTransform: 'uppercase', color: C.inkFaint }}>The process</span>
            </div>
            <h2 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(36px,4vw,60px)', color: C.ink }}>
              Six steps to your perfect trip.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '2px', background: C.lineS }}>
            {STEPS.map((s, i) => (
              <div key={s.n} style={{ background: i % 2 === 0 ? C.cream : C.cream2, padding: '32px 28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <span style={{ fontFamily: BEBAS, fontSize: '36px', color: 'rgba(255,255,255,0.10)', lineHeight: 1 }}>{s.n}</span>
                  {s.icon}
                </div>
                <div style={{ fontFamily: SERIF, fontSize: '20px', fontWeight: 400, color: C.ink, marginBottom: '10px' }}>{s.title}</div>
                <p style={{ fontFamily: MUKTA, fontSize: '14px', lineHeight: 1.8, color: C.inkSoft }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: C.cream, padding: '100px 0', borderTop: `1px solid ${C.lineS}` }}>
        <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 40px' }}>
          <div style={{ marginBottom: '52px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span style={{ fontFamily: MONO, fontSize: '11px', letterSpacing: '0.32em', textTransform: 'uppercase', color: C.terra }}>FAQ</span>
            </div>
            <h2 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(36px,4vw,60px)', color: C.ink }}>Common questions.</h2>
          </div>
          {FAQS.map(f => <FAQ key={f.q} q={f.q} a={f.a} />)}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ background: C.paper, padding: '80px 40px', textAlign: 'center', borderTop: `1px solid ${C.lineS}` }}>
        <h2 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(32px,4vw,56px)', color: C.ink, marginBottom: '16px' }}>
          Ready to be part of Nepal's 0.5% future?
        </h2>
        <p style={{ fontFamily: MUKTA, fontSize: '16px', color: C.inkSoft, marginBottom: '36px', maxWidth: '48ch', margin: '0 auto 36px' }}>
          Every trip booked through our platform contributes directly to Nepal's national tourism development fund.
        </p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '36px' }}>
          <a href="/destinations" style={{ textDecoration: 'none' }}>
            <div style={{ fontFamily: MONO, fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', background: C.ink, color: C.cream, padding: '14px 32px', borderRadius: '2px', cursor: 'pointer' }}>
              Browse destinations →
            </div>
          </a>
          <a href="/blog" style={{ textDecoration: 'none' }}>
            <div style={{ fontFamily: MONO, fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', border: `1.5px solid ${C.lineS}`, color: C.inkSoft, padding: '14px 32px', borderRadius: '2px', cursor: 'pointer' }}>
              Read our stories
            </div>
          </a>
        </div>
      </section>
    </div>
  );
}
