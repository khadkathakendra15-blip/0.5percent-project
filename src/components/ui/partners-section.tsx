// ─── Partner data with logo paths ─────────────────────────────────────────────
const ROW1 = [
  { name: "Nepal Airlines",  logo: "/logo/Nepal Airlines.jpg",        color: "#DC143C", bg: "#fdf2f4" },
  { name: "Buddha Air",      logo: "/logo/Budhha Air.jpg",            color: "#DC143C", bg: "#fdf4f7" },
  { name: "Yeti Airlines",   logo: "/logo/Yeti Airlines.jpg",         color: "#1f4d8a", bg: "#eaeeff" },
  { name: "The Soaltee",     logo: "/logo/The Soaltee.jpg",           color: "#0a4a25", bg: "#eaeeff" },
  { name: "CG Hospitality",  logo: "/logo/Cg Hospitality.jpg",        color: "#1f4d8a", bg: "#eaeeff" },
  { name: "Kantipur Media",  logo: "/logo/KMG.jpg",                   color: "#DC143C", bg: "#fdf2f4" },
  { name: "Onlinekhabar",    logo: "/logo/Online Khaber.jpg",         color: "#1f4d8a", bg: "#eaeeff" },
];

const ROW2 = [
  { name: "Nepal Tourism Board",  logo: "/logo/Nepal Tourism Board.jpg",    color: "#0a4a25", bg: "#eaeeff" },
  { name: "Hotel Assoc. Nepal",   logo: "/logo/Hotel Association nepal.jpg", color: "#1f4d8a", bg: "#eaeeff" },
  { name: "CG Corp Global",       logo: "/logo/Cg Corp Global.jpg",          color: "#1f4d8a", bg: "#eaeeff" },
  { name: "Buddha Air",           logo: "/logo/Budhha Air.jpg",              color: "#DC143C", bg: "#fdf4f7" },
  { name: "Nepal Airlines",       logo: "/logo/Nepal Airlines.jpg",          color: "#DC143C", bg: "#fdf2f4" },
  { name: "Yeti Airlines",        logo: "/logo/Yeti Airlines.jpg",           color: "#1f4d8a", bg: "#eaeeff" },
  { name: "Kantipur Media Group", logo: "/logo/KMG.jpg",                     color: "#DC143C", bg: "#fdf2f4" },
];

type Partner = (typeof ROW1)[0];

// Duplicate each row (2 identical copies) so translateX(-50%) creates a seamless loop
const repeat = (arr: Partner[], times = 4): Partner[] =>
  Array.from({ length: times }).flatMap(() => arr);

const BADGE_SIZE = 72;
const GAP        = 20;

const SERIF_F = "'Cormorant Garamond', Georgia, serif";
const MUKTA_F = "'Mukta', system-ui, sans-serif";

// ─── Logo badge (all inline styles — no Tailwind) ─────────────────────────────
function PartnerBadge({ partner }: { partner: Partner }) {
  return (
    <div
      title={partner.name}
      style={{
        width:        `${BADGE_SIZE}px`,
        height:       `${BADGE_SIZE}px`,
        borderRadius: '50%',
        flexShrink:   0,
        border:       `1.5px solid ${partner.color}28`,
        background:   '#fff',
        boxShadow:    '0 1px 4px rgba(0,0,0,0.07)',
        display:      'flex',
        alignItems:   'center',
        justifyContent: 'center',
        overflow:     'hidden',
        cursor:       'default',
      }}
    >
      <img
        src={partner.logo}
        alt={partner.name}
        style={{ width: '52px', height: '52px', objectFit: 'contain' }}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = 'none';
          const parent = e.currentTarget.parentElement!;
          parent.style.background = partner.bg;
          parent.innerHTML = `<span style="color:${partner.color};font-family:'Bebas Neue',sans-serif;font-size:14px;font-weight:900;letter-spacing:0.05em">${partner.name.slice(0, 3).toUpperCase()}</span>`;
        }}
      />
    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────
export function PartnersSection() {
  const row1 = repeat(ROW1, 4);
  const row2 = repeat(ROW2, 4);

  return (
    <section style={{
      position:   'relative',
      padding:    '80px 0',
      overflow:   'hidden',
      background: '#fff',
    }}>
      {/* Dot-grid texture */}
      <div style={{
        position:            'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage:     'radial-gradient(circle, rgba(0,0,0,0.045) 1px, transparent 1px)',
        backgroundSize:      '24px 24px',
      }} />

      {/* Amber glow centred */}
      <div style={{
        position:   'absolute', left: '50%', top: '50%',
        transform:  'translate(-50%, -50%)',
        width:      '700px', height: '300px', borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(245,158,11,0.07) 0%, transparent 70%)',
        filter:     'blur(60px)', pointerEvents: 'none',
      }} />

      {/* ── Content ── */}
      <div style={{ position: 'relative', maxWidth: '1320px', margin: '0 auto', padding: '0 40px', textAlign: 'center' }}>

        {/* Eyebrow */}
        <div style={{
          display:       'inline-flex', alignItems: 'center', gap: '12px', marginBottom: '18px',
          fontSize:      '12px', letterSpacing: '0.32em', textTransform: 'uppercase',
          fontWeight:    500, fontFamily: MUKTA_F, color: '#DC143C',
        }}>
          In good company
        </div>

        {/* Heading */}
        <h2 style={{
          fontFamily:     SERIF_F, fontWeight: 300,
          fontSize:       'clamp(36px, 5vw, 62px)', lineHeight: 1.05,
          letterSpacing:  '-0.015em', color: '#0a1a2e', marginBottom: '12px',
        }}>
          Partners &amp;{' '}
          <em style={{ fontStyle: 'italic', color: '#DC143C' }}>Supporters</em>.
        </h2>

        <p style={{
          fontFamily: MUKTA_F, fontSize: '15px', color: '#3d5578',
          fontWeight: 300, maxWidth: '44ch', margin: '0 auto 48px', lineHeight: 1.8,
        }}>
          Organisations, airlines, hotels and media houses helping carry Nepal's story to the world.
        </p>

        {/* ── Scrolling marquee ── */}
        <div style={{ overflow: 'hidden', position: 'relative' }}>

          {/* Row 1 — scrolls left */}
          <div style={{ marginBottom: `${GAP}px` }}>
            <div
              className="animate-scroll-left"
              style={{ display: 'flex', gap: `${GAP}px`, width: 'max-content' }}
            >
              {row1.map((p, i) => <PartnerBadge key={i} partner={p} />)}
            </div>
          </div>

          {/* Row 2 — scrolls right */}
          <div>
            <div
              className="animate-scroll-right"
              style={{ display: 'flex', gap: `${GAP}px`, width: 'max-content' }}
            >
              {row2.map((p, i) => <PartnerBadge key={i} partner={p} />)}
            </div>
          </div>

          {/* Fade-out edges */}
          <div style={{
            position: 'absolute', left: 0, top: 0, height: '100%', width: '80px',
            background: 'linear-gradient(to right, white, transparent)',
            pointerEvents: 'none', zIndex: 10,
          }} />
          <div style={{
            position: 'absolute', right: 0, top: 0, height: '100%', width: '80px',
            background: 'linear-gradient(to left, white, transparent)',
            pointerEvents: 'none', zIndex: 10,
          }} />
        </div>
      </div>
    </section>
  );
}
