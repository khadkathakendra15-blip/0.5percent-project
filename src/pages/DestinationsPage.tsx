import * as React from "react"
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { Mountain, Compass, ArrowRight } from "lucide-react"
import { NavBar } from "@/components/ui/nav-bar"

/* ──────────────────────────────────────────────────────────────
   ScrollZoomHero — 3 portrait images that zoom in/out on scroll
   and follow the mouse cursor with subtle parallax tilt.
   The big headline stays overlaid on top.
─────────────────────────────────────────────────────────────── */
function ScrollZoomHero({ images, children }: { images: string[]; children: React.ReactNode }) {
  const sectionRef = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  // Mouse position (smoothed with spring for buttery cursor parallax)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 18, mass: 0.6 })
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 18, mass: 0.6 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5   // -0.5 → 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  // Scroll-driven zoom for each panel: from 1 → 1.4 (zoom in as you scroll down)
  const zoom = useTransform(scrollYProgress, [0, 1], [1, 1.4])
  // Headline scales down + fades out as you scroll past the hero
  const titleOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])
  const titleScale   = useTransform(scrollYProgress, [0, 0.55], [1, 0.9])
  const titleY       = useTransform(scrollYProgress, [0, 0.55], [0, -40])

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* Three portrait panels */}
      <div className="absolute inset-0 grid grid-cols-3 gap-2 p-2">
        {images.map((img, i) => {
          // Each panel reacts to cursor differently for depth
          const xMul = (i - 1) * 18      // -18, 0, +18 — panels shift opposite directions
          const yMul = 12
          const panelX = useTransform(smoothX, (v) => v * xMul)
          const panelY = useTransform(smoothY, (v) => v * yMul)

          return (
            <motion.div
              key={i}
              className="relative h-full overflow-hidden rounded-2xl"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.18, duration: 0.9, ease: [0.2, 0.6, 0.2, 1] }}
            >
              {/* Inner wrapper: scroll-zoom + cursor parallax */}
              <motion.img
                src={img}
                alt=""
                draggable={false}
                className="h-full w-full select-none object-cover"
                style={{
                  scale: zoom,
                  x: panelX,
                  y: panelY,
                }}
              />
              {/* Per-panel gradient for legibility behind the title */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
            </motion.div>
          )
        })}
      </div>

      {/* Vignette so headline pops */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_30%,_rgba(0,0,0,0.55)_100%)]" />

      {/* Headline (scaled / faded on scroll) */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 z-10 w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 px-6 text-center"
        style={{ opacity: titleOpacity, scale: titleScale, y: titleY }}
      >
        {children}
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-xs uppercase tracking-[0.32em] text-white/60"
        style={{ opacity: titleOpacity }}
      >
        <div className="flex flex-col items-center gap-2">
          <span>Scroll to explore</span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="block h-6 w-px bg-white/40"
          />
        </div>
      </motion.div>
    </section>
  )
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemFadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&auto=format&fit=crop",
]

const DESTINATIONS = [
  {
    name: "Kathmandu",
    province: "Bagmati Province · 1,400 m",
    title: "Living Museum",
    description: "Seven UNESCO World Heritage Sites in one valley. Durbar Squares, Boudhanath's golden dome, and the living goddess Kumari draw millions.",
    tags: ["Heritage", "Culture", "Temples"],
    image: "https://images.unsplash.com/photo-1571898223382-8f4f9a0c2d4c?w=600&auto=format&fit=crop",
  },
  {
    name: "Pokhara",
    province: "Gandaki Province · 822 m",
    title: "Lakeside Paradise",
    description: "Phewa Lake mirrors Machhapuchhre and the Annapurna massif. World-class paragliding, kayaking, and the gateway to Nepal's greatest trek.",
    tags: ["Lakes", "Adventure", "Views"],
    image: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=600&auto=format&fit=crop",
  },
  {
    name: "Everest Region",
    province: "Koshi Province · 8,848 m",
    title: "Roof of the World",
    description: "The Khumbu valley — Namche Bazaar, Tengboche monastery, glacial lakes — leads to base camp of the world's highest summit.",
    tags: ["Trekking", "Climbing", "Sherpa"],
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&auto=format&fit=crop",
  },
  {
    name: "Annapurna",
    province: "Gandaki Province · 8,091 m",
    title: "The Great Circuit",
    description: "The world's most popular trekking circuit. From sub-tropical jungle to the 5,416 m Thorong La pass — all within one magnificent loop.",
    tags: ["Trekking", "Diversity", "Passes"],
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&auto=format&fit=crop",
  },
  {
    name: "Chitwan",
    province: "Bagmati Province · 150 m",
    title: "Wild Nepal",
    description: "UNESCO-listed national park sheltering one-horned rhinos, Bengal tigers, gharial crocodiles, and over 700 species of wildlife.",
    tags: ["Wildlife", "Safari", "Jungle"],
    image: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=600&auto=format&fit=crop",
  },
  {
    name: "Lumbini",
    province: "Lumbini Province · 100 m",
    title: "Sacred Garden",
    description: "The birthplace of Siddhartha Gautama. The Maya Devi Temple, sacred Bodhi trees, and pilgrims from 80 nations make this Nepal's spiritual heart.",
    tags: ["Spiritual", "UNESCO", "Pilgrimage"],
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=600&auto=format&fit=crop",
  },
]

const PEAKS = [
  { rank: "#1", name: "Everest", height: "8,848 m" },
  { rank: "#3", name: "Kanchenjunga", height: "8,586 m" },
  { rank: "#4", name: "Lhotse", height: "8,516 m" },
  { rank: "#5", name: "Makalu", height: "8,485 m" },
  { rank: "#6", name: "Cho Oyu", height: "8,201 m" },
  { rank: "#7", name: "Dhaulagiri", height: "8,167 m" },
  { rank: "#8", name: "Manaslu", height: "8,163 m" },
  { rank: "#10", name: "Annapurna I", height: "8,091 m" },
]

const ZONES = [
  {
    name: "Tarai Plains",
    subtitle: "17% of Nepal",
    elevation: "60 – 305 m",
    description: "The fertile lowland belt bordering India. Dense jungle, national parks, and ancient pilgrimage cities define Nepal's tropical south.",
  },
  {
    name: "Midlands & Valleys",
    subtitle: "Heart of Nepal",
    elevation: "600 – 3,500 m",
    description: "The cultural and political core: Kathmandu's ancient squares, Pokhara's lakeside and the stepped terraces of the mid-hills.",
  },
  {
    name: "The Himalayas",
    subtitle: "Roof of the World",
    elevation: "3,000 m – 8,848 m",
    description: "Home to eight of Earth's fourteen 8,000-metre peaks. Trekking routes, Buddhist monasteries, and glaciers that feed Asia's great rivers.",
  },
]

const PEACE_PILLARS = [
  {
    stat: "623 BCE",
    title: "Birthplace of the Buddha",
    description: "Siddhartha Gautama was born in Lumbini. His teachings of compassion and non-violence have guided over 500 million people for 2,600 years.",
  },
  {
    stat: "Never colonised",
    title: "A Nation of Independence",
    description: "Nepal is one of the very few Asian nations that was never colonised. This heritage of independence shapes its peaceful diplomatic character.",
  },
  {
    stat: "10 UNESCO sites",
    title: "Spiritual Crossroads",
    description: "Hindu temples and Buddhist monasteries coexist in the same valley. Nepal's multi-faith harmony is a global model of religious coexistence.",
  },
  {
    stat: "Top in S. Asia",
    title: "Global Peace Index",
    description: "Consistently among South Asia's most peaceful nations, Nepal contributes more UN peacekeeping troops per capita than almost any other country.",
  },
]

const NATURAL_AC = [
  { value: "8–12°C", label: "Cooler than surrounding plains" },
  { value: "44.7%", label: "Forest cover — one of Asia's highest" },
  { value: "3,808", label: "Glaciers feeding rivers across Asia" },
  { value: "AQI < 30", label: "Air quality in high trekking regions" },
]

const BEST_REASONS = [
  { n: "01", title: "Highest peaks", desc: "8 of Earth's 14 eight-thousanders — including Everest — stand on Nepali soil." },
  { n: "02", title: "Deepest diversity", desc: "From 60 m jungle to 8,848 m glacier within 200 km — no country matches this range." },
  { n: "03", title: "Living culture", desc: "125 ethnic groups, 123 languages, and festivals celebrated every week of the year." },
  { n: "04", title: "Spiritual capital", desc: "Home to Pashupatinath, Boudhanath, Lumbini — three of Asia's most sacred sites." },
  { n: "05", title: "Accessible adventure", desc: "World-class trekking from USD $30/day. No experience needed for many major routes." },
  { n: "06", title: "Warmest hospitality", desc: "\"Atithi Devo Bhava\" — the guest is God. This value lives in every teahouse and home." },
]

/* ── Brand tokens (kept as JS constants so every inline override is consistent) ── */
const B = {
  ink:     '#181410', ink2: '#2a231c', inkSoft: '#5a4f44', inkFaint: '#9b8f80',
  cream:   '#f4ede0', cream2: '#ebe2d1', paper: '#faf5ea',
  saffron: '#1e77c1', terra: '#ff0000', green: '#1D9E75',
  lineS:   'rgba(24,20,16,0.08)', lineW: 'rgba(244,237,224,0.08)',
}
const F = {
  serif: "'Cormorant Garamond', Georgia, serif",
  bebas: "'Bebas Neue', sans-serif",
  mukta: "'Mukta', system-ui, sans-serif",
  mono:  "'JetBrains Mono', ui-monospace, monospace",
}

/* Tiny re-usable label pill matching the rest of the site */
function SectionPill({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
      <span style={{ width: '24px', height: '1px', background: color, opacity: 0.8 }} />
      <span style={{ fontFamily: F.mono, fontSize: '10px', letterSpacing: '0.30em', textTransform: 'uppercase', color }}>{children}</span>
    </div>
  )
}

function ExploreNepal() {
  return (
    <div style={{ background: B.paper, minHeight: '100vh' }}>
      <NavBar />

      {/* ── HERO — photos + scroll-zoom (stays dark, it's images) ── */}
      <ScrollZoomHero images={HERO_IMAGES}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.4 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', background: 'rgba(250,245,234,0.12)', border: '1px solid rgba(250,245,234,0.25)', borderRadius: '999px', padding: '7px 18px', marginBottom: '24px' }}>
            <Mountain size={13} color={B.cream} strokeWidth={2.2} />
            <span style={{ fontFamily: F.mono, fontSize: '10px', letterSpacing: '0.30em', textTransform: 'uppercase', color: B.cream }}>Explore Nepal</span>
          </div>
          <h1 style={{ fontFamily: F.serif, fontWeight: 300, fontSize: 'clamp(52px,8vw,112px)', lineHeight: 0.9, letterSpacing: '-0.02em', color: B.cream, marginBottom: '24px', filter: 'drop-shadow(0 4px 24px rgba(0,0,0,0.55))' }}>
            Three worlds.<br />
            <em style={{ fontStyle: 'italic', color: 'rgba(244,237,224,0.7)' }}>One kingdom.</em>
          </h1>
          <p style={{ fontFamily: F.mukta, fontSize: 'clamp(14px,1.8vw,18px)', lineHeight: 1.85, fontWeight: 300, color: 'rgba(244,237,224,0.65)', maxWidth: '52ch', margin: '0 auto', filter: 'drop-shadow(0 2px 12px rgba(0,0,0,0.5))' }}>
            Spanning 60 metres at its lowest to 8,848 metres at its peak, Nepal packs more geographic and cultural diversity into 147,516 km² than almost any nation on Earth.
          </p>
        </motion.div>
      </ScrollZoomHero>

      {/* ── STATS ─────────────────────────────────────────────────── */}
      <section style={{ background: B.cream2, borderTop: `1px solid ${B.lineS}`, padding: '72px 0' }}>
        <div className="container mx-auto px-4">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1px', background: B.lineS }}>
            {[
              { value: "147,516", label: "km²",      sublabel: "Total area"         },
              { value: "8",       label: "peaks",    sublabel: "8,000 m+"           },
              { value: "6,000+",  label: "rivers",   sublabel: "Snow-fed rivers"    },
              { value: "163",     label: "wetlands", sublabel: "Ramsar sites incl." },
            ].map((s, i) => (
              <motion.div key={i} variants={itemFadeIn} style={{ background: B.cream2, padding: '36px 24px', textAlign: 'center' }}>
                <div style={{ fontFamily: F.bebas, fontSize: '48px', color: B.ink, lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontFamily: F.mono, fontSize: '9px', letterSpacing: '0.20em', textTransform: 'uppercase', color: B.inkFaint, marginTop: '6px' }}>{s.label}</div>
                <div style={{ fontFamily: F.mukta, fontSize: '12px', color: B.inkFaint, marginTop: '3px', opacity: 0.7 }}>{s.sublabel}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── GLOBAL PEACE DESTINATION ──────────────────────────────── */}
      <section style={{ background: B.paper, padding: '96px 0', borderTop: `1px solid ${B.lineS}` }}>
        <div className="container mx-auto px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            style={{ maxWidth: '680px', margin: '0 auto 64px', textAlign: 'center' }}>
            <SectionPill color={B.inkFaint}>Global Recognition</SectionPill>
            <h2 style={{ fontFamily: F.serif, fontWeight: 300, fontSize: 'clamp(34px,4vw,64px)', lineHeight: 1, color: B.ink, marginBottom: '18px' }}>
              Nepal: A Global<br /><em style={{ fontStyle: 'italic', color: B.inkSoft }}>Peace Destination</em>
            </h2>
            <p style={{ fontFamily: F.mukta, fontSize: '16px', lineHeight: 1.85, color: B.inkSoft }}>
              Long before tourism existed, Nepal was a sanctuary. The birthplace of the Buddha, a land that conquered no neighbour, and a crossroads of faiths — Nepal's gift to the world has always been peace.
            </p>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid gap-5 md:grid-cols-2">
            {PEACE_PILLARS.map((p, i) => (
              <motion.div key={i} variants={itemFadeIn} whileHover={{ y: -4 }}
                style={{ background: B.cream, border: `1px solid ${B.lineS}`, borderRadius: '6px', padding: '32px 28px' }}>
                <div style={{ fontFamily: F.mono, fontSize: '10px', letterSpacing: '0.22em', color: B.inkFaint, marginBottom: '10px', textTransform: 'uppercase' }}>{p.stat}</div>
                <h3 style={{ fontFamily: F.serif, fontWeight: 400, fontSize: '26px', color: B.ink, marginBottom: '10px', lineHeight: 1.1 }}>{p.title}</h3>
                <p style={{ fontFamily: F.mukta, fontSize: '14px', lineHeight: 1.85, color: B.inkSoft }}>{p.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── NATURAL AC ────────────────────────────────────────────── */}
      <section style={{ background: B.cream, padding: '96px 0', borderTop: `1px solid ${B.lineS}` }}>
        <div className="container mx-auto px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            style={{ maxWidth: '680px', margin: '0 auto 64px', textAlign: 'center' }}>
            <SectionPill color={B.inkFaint}>Natural Climate</SectionPill>
            <h2 style={{ fontFamily: F.serif, fontWeight: 300, fontSize: 'clamp(34px,4vw,64px)', lineHeight: 1, color: B.ink, marginBottom: '18px' }}>
              Nepal: The World's<br /><em style={{ fontStyle: 'italic', color: B.inkSoft }}>Natural AC</em>
            </h2>
            <p style={{ fontFamily: F.mukta, fontSize: '16px', lineHeight: 1.85, color: B.inkSoft }}>
              The Himalayas intercept warm monsoon air, glaciers feed rivers that cool an entire continent, and forests breathe out moisture that refreshes every valley below — Earth's original air conditioning, at zero carbon cost.
            </p>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid gap-4 md:grid-cols-4">
            {NATURAL_AC.map((f, i) => (
              <motion.div key={i} variants={itemFadeIn} whileHover={{ scale: 1.03 }}
                style={{ background: B.paper, border: `1px solid ${B.lineS}`, borderRadius: '6px', padding: '28px 20px', textAlign: 'center' }}>
                <div style={{ fontFamily: F.bebas, fontSize: '38px', color: B.ink, lineHeight: 1, marginBottom: '6px' }}>{f.value}</div>
                <div style={{ fontFamily: F.mukta, fontSize: '13px', color: B.inkSoft, lineHeight: 1.5 }}>{f.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── GEOGRAPHIC ZONES ──────────────────────────────────────── */}
      <section style={{ background: B.cream2, padding: '96px 0', borderTop: `1px solid ${B.lineS}` }}>
        <div className="container mx-auto px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} style={{ marginBottom: '52px' }}>
            <SectionPill color={B.inkFaint}>Geographic zones</SectionPill>
            <h2 style={{ fontFamily: F.serif, fontWeight: 300, fontSize: 'clamp(34px,4vw,60px)', color: B.ink, lineHeight: 1 }}>From jungle to glacier</h2>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid gap-5 md:grid-cols-3">
            {ZONES.map((zone, i) => (
              <motion.div key={i} variants={itemFadeIn} whileHover={{ y: -5 }}
                style={{ background: B.paper, border: `1px solid ${B.lineS}`, borderRadius: '6px' }}>
                <div style={{ padding: '26px 24px 28px' }}>
                  <h3 style={{ fontFamily: F.serif, fontWeight: 500, fontSize: '24px', color: B.ink, marginBottom: '4px' }}>{zone.name}</h3>
                  <div style={{ fontFamily: F.mono, fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', color: B.inkFaint, marginBottom: '4px' }}>{zone.subtitle}</div>
                  <div style={{ fontFamily: F.bebas, fontSize: '17px', color: B.inkSoft, letterSpacing: '0.04em', marginBottom: '12px' }}>{zone.elevation}</div>
                  <p style={{ fontFamily: F.mukta, fontSize: '14px', lineHeight: 1.78, color: B.inkSoft }}>{zone.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── DESTINATIONS ──────────────────────────────────────────── */}
      <section style={{ background: B.paper, padding: '96px 0', borderTop: `1px solid ${B.lineS}` }}>
        <div className="container mx-auto px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px' }}>
            <div>
              <SectionPill color={B.inkFaint}>Must-visit</SectionPill>
              <h2 style={{ fontFamily: F.serif, fontWeight: 300, fontSize: 'clamp(34px,4vw,60px)', color: B.ink, lineHeight: 1 }}>Nine defining destinations</h2>
            </div>
            <span style={{ fontFamily: F.mono, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: B.inkFaint }}>NTB · recommended</span>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {DESTINATIONS.map((dest, i) => (
              <motion.div key={i} variants={itemFadeIn} whileHover={{ y: -8 }} className="group"
                style={{ borderRadius: '6px', overflow: 'hidden', border: `1px solid ${B.lineS}` }}>
                <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                  <img src={dest.image} alt={dest.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,7,4,0.72) 0%, transparent 55%)' }} />
                  <div style={{ position: 'absolute', bottom: '14px', left: '16px', right: '16px' }}>
                    <div style={{ fontFamily: F.mono, fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(244,237,224,0.5)', marginBottom: '3px' }}>{dest.province}</div>
                    <h3 style={{ fontFamily: F.serif, fontWeight: 300, fontSize: '26px', color: B.cream, lineHeight: 1 }}>{dest.name}</h3>
                    <div style={{ fontFamily: F.mukta, fontSize: '12px', color: 'rgba(244,237,224,0.6)' }}>{dest.title}</div>
                  </div>
                </div>
                <div style={{ background: B.paper, padding: '18px 20px 20px' }}>
                  <p style={{ fontFamily: F.mukta, fontSize: '13.5px', lineHeight: 1.75, color: B.inkSoft, marginBottom: '14px' }}>{dest.description}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {dest.tags.map((tag, j) => (
                      <span key={j} style={{ fontFamily: F.mono, fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', background: B.cream2, color: B.inkSoft, padding: '4px 10px', borderRadius: '2px' }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── EIGHT-THOUSANDERS ─────────────────────────────────────── */}
      <section style={{ background: B.cream, padding: '96px 0', borderTop: `1px solid ${B.lineS}` }}>
        <div className="container mx-auto px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            style={{ maxWidth: '600px', margin: '0 auto 60px', textAlign: 'center' }}>
            <SectionPill color={B.inkFaint}>Eight-thousanders</SectionPill>
            <h2 style={{ fontFamily: F.serif, fontWeight: 300, fontSize: 'clamp(34px,4vw,62px)', color: B.ink, lineHeight: 1, marginBottom: '16px' }}>
              Eight summits above <em style={{ color: B.inkSoft, fontStyle: 'italic' }}>8,000 m</em>.
            </h2>
            <p style={{ fontFamily: F.mukta, fontSize: '15px', lineHeight: 1.85, color: B.inkSoft }}>
              Of Earth's 14 peaks above 8,000 metres, Nepal is home to eight — more than any other country.
            </p>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
            {PEAKS.map((peak, i) => (
              <motion.div key={i} variants={itemFadeIn} whileHover={{ scale: 1.04 }}
                style={{ background: B.paper, border: `1px solid ${B.lineS}`, borderRadius: '6px', padding: '24px', textAlign: 'center' }}>
                <div style={{ fontFamily: F.mono, fontSize: '9px', letterSpacing: '0.18em', color: B.inkFaint, marginBottom: '8px' }}>{peak.rank}</div>
                <div style={{ fontFamily: F.serif, fontWeight: 400, fontSize: '22px', color: B.ink, marginBottom: '4px' }}>{peak.name}</div>
                <div style={{ fontFamily: F.bebas, fontSize: '20px', letterSpacing: '0.04em', color: B.inkSoft }}>{peak.height}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── WHY NEPAL IS THE BEST ──────────────────────────────────── */}
      <section style={{ background: B.cream2, padding: '96px 0', borderTop: `1px solid ${B.lineS}` }}>
        <div className="container mx-auto px-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
            style={{ maxWidth: '680px', margin: '0 auto 64px', textAlign: 'center' }}>
            <SectionPill color={B.inkFaint}>The case for Nepal</SectionPill>
            <h2 style={{ fontFamily: F.serif, fontWeight: 300, fontSize: 'clamp(34px,4vw,64px)', color: B.ink, lineHeight: 1, marginBottom: '18px' }}>
              Why Nepal is the<br /><em style={{ fontStyle: 'italic', color: B.inkSoft }}>best place on Earth</em>
            </h2>
            <p style={{ fontFamily: F.mukta, fontSize: '16px', lineHeight: 1.85, color: B.inkSoft }}>
              No single superlative captures it — altitude records, biodiversity, cultural density, and spiritual heritage, all within a country smaller than California.
            </p>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '2px', background: B.lineS }}>
            {BEST_REASONS.map((r, i) => (
              <motion.div key={i} variants={itemFadeIn} whileHover={{ background: B.paper }}
                style={{ background: B.cream2, padding: '34px 28px', transition: 'background .25s' }}>
                <div style={{ fontFamily: F.bebas, fontSize: '40px', color: 'rgba(24,20,16,0.12)', lineHeight: 1, marginBottom: '10px' }}>{r.n}</div>
                <h3 style={{ fontFamily: F.serif, fontWeight: 500, fontSize: '22px', color: B.ink, marginBottom: '10px' }}>{r.title}</h3>
                <p style={{ fontFamily: F.mukta, fontSize: '14px', lineHeight: 1.8, color: B.inkSoft }}>{r.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section style={{ background: B.paper, padding: '80px 40px', textAlign: 'center', borderTop: `1px solid ${B.lineS}` }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
          style={{ maxWidth: '640px', margin: '0 auto' }}>
          <Compass size={36} color={B.inkFaint} strokeWidth={1.3} style={{ margin: '0 auto 20px', display: 'block' }} />
          <h2 style={{ fontFamily: F.serif, fontWeight: 300, fontSize: 'clamp(30px,4vw,54px)', color: B.ink, marginBottom: '14px', lineHeight: 1.05 }}>
            Ready to experience Nepal?
          </h2>
          <p style={{ fontFamily: F.mukta, fontSize: '16px', color: B.inkSoft, marginBottom: '34px', lineHeight: 1.75 }}>
            Peace, nature, adventure, and culture — Nepal gives you all four.
          </p>
          <a href="/booking" style={{ textDecoration: 'none' }}>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontFamily: F.mono, fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', background: B.ink, color: B.cream, padding: '14px 36px', borderRadius: '3px', cursor: 'pointer' }}>
              Plan my trip <ArrowRight size={13} strokeWidth={2.5} />
            </motion.div>
          </a>
        </motion.div>
      </section>

    </div>
  )
}

export default ExploreNepal
