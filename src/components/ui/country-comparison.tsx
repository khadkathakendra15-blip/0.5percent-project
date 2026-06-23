import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const countries = [
  {
    name: 'Nepal',
    flag: '🇳🇵',
    population: '30M',
    tourists: 1.1,
    touristsLabel: '1.1M',
    revenue: 0.8,
    revenueLabel: '$800M',
    gdp: 7,
    gdpLabel: '7%',
    color: '#FFC000',
    glow: 'rgba(245,158,11,0.35)',
    highlight: true,
    note: '0.5% target → 14.2M visitors',
  },
  {
    name: 'Bhutan',
    flag: '🇧🇹',
    population: '0.8M',
    tourists: 0.15,
    touristsLabel: '150K',
    revenue: 0.35,
    revenueLabel: '$350M',
    gdp: 12.5,
    gdpLabel: '12.5%',
    color: '#FFC000',
    glow: 'rgba(139,92,246,0.2)',
    highlight: false,
  },
  {
    name: 'Cambodia',
    flag: '🇰🇭',
    population: '17M',
    tourists: 6,
    touristsLabel: '6M',
    revenue: 3.6,
    revenueLabel: '$3.6B',
    gdp: 12,
    gdpLabel: '12%',
    color: '#FFC000',
    glow: 'rgba(6,182,212,0.2)',
    highlight: false,
  },
  {
    name: 'Laos',
    flag: '🇱🇦',
    population: '8M',
    tourists: 4,
    touristsLabel: '4M',
    revenue: 1,
    revenueLabel: '$1B',
    gdp: 9,
    gdpLabel: '9%',
    color: '#FFC000',
    glow: 'rgba(16,185,129,0.2)',
    highlight: false,
  },
];

const MAX_TOURISTS = 6;
const MAX_REVENUE = 3.6;
const MAX_GDP = 15;

// Animated counter hook
export function useCountUp(target: number, inView: boolean, duration = 1.4) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const steps = 60;
    const increment = target / steps;
    const interval = (duration * 1000) / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setValue(target); clearInterval(timer); }
      else setValue(start);
    }, interval);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return value;
}

// Animated bar
function StatBar({
  label, value, max, color, inView, delay, suffix = '',
}: {
  label: string; value: number; max: number; color: string;
  inView: boolean; delay: number; suffix?: string;
}) {
  const pct = (value / max) * 100;
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">{label}</span>
        <span className="text-[11px] font-bold" style={{ color }}>{suffix}</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-gray-200 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: inView ? `${pct}%` : 0 }}
          transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

// Single country card
function CountryCard({
  c, index, inView,
}: {
  c: (typeof countries)[0]; index: number; inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col rounded-2xl overflow-hidden"
      style={{
        background: c.highlight
          ? 'linear-gradient(160deg, #fffbf0 0%, #fff8e6 100%)'
          : '#ffffff',
        border: `1px solid ${c.highlight ? c.color + '50' : '#e5e7eb'}`,
        boxShadow: c.highlight ? `0 8px 40px ${c.glow}` : '0 2px 16px rgba(0,0,0,0.06)',
      }}
    >
      {/* Top accent line */}
      <div className="h-0.5 w-full" style={{ background: c.color }} />

      {/* Highlight badge */}
      {c.highlight && (
        <div
          className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest"
          style={{ background: c.color, color: '#000' }}
        >
          Nepal
        </div>
      )}

      <div className="p-5 flex flex-col gap-4 flex-1">
        {/* Header */}
        <div className="flex items-center gap-3">
          <span className="text-3xl">{c.flag}</span>
          <div>
            <h3 className="text-lg font-black text-gray-900 leading-none" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", letterSpacing: '0.06em' }}>
              {c.name}
            </h3>
            <p className="text-[10px] text-gray-400 font-medium mt-0.5">Pop. {c.population}</p>
          </div>
        </div>

        {/* Big tourist number */}
        <div
          className="text-4xl font-black leading-none"
          style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: c.color }}
        >
          {c.touristsLabel}
          <span className="text-sm font-semibold text-gray-400 ml-1" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
            tourists/yr
          </span>
        </div>

        {/* Bars */}
        <div className="space-y-3">
          <StatBar
            label="Tourists"
            value={c.tourists}
            max={MAX_TOURISTS}
            color={c.color}
            inView={inView}
            delay={index * 0.12 + 0.3}
            suffix={c.touristsLabel}
          />
          <StatBar
            label="Revenue"
            value={c.revenue}
            max={MAX_REVENUE}
            color={c.color}
            inView={inView}
            delay={index * 0.12 + 0.45}
            suffix={c.revenueLabel}
          />
          <StatBar
            label="Tourism % of GDP"
            value={c.gdp}
            max={MAX_GDP}
            color={c.color}
            inView={inView}
            delay={index * 0.12 + 0.6}
            suffix={c.gdpLabel}
          />
        </div>

        {/* Note for Nepal */}
        {c.note && (
          <div
            className="mt-auto pt-3 border-t text-[10px] font-bold uppercase tracking-widest"
            style={{ borderColor: c.color + '30', color: c.color }}
          >
            ✦ {c.note}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function CountryComparison() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className="relative py-24 px-4 overflow-hidden"
      style={{ background: '#FAFAFA' }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.4] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glow blob */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(245,158,11,0.08) 0%, transparent 70%)', filter: 'blur(60px)' }}
      />

      <div className="container mx-auto max-w-7xl relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 border"
            style={{ borderColor: 'rgba(245,158,11,0.3)', background: 'rgba(245,158,11,0.06)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-amber-400">Tourism Benchmark</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-gray-900 mb-4"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif", letterSpacing: '0.04em' }}
          >
            Small Nations.{' '}
            <span style={{ background: 'linear-gradient(90deg, #FFC000, #FFC000)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Massive Results.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base text-gray-500 max-w-2xl mx-auto leading-relaxed"
          >
            Countries far smaller than Nepal are unlocking extraordinary tourism potential.
            Nepal — with its Himalayas, spirituality, and culture — has every advantage to lead.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {countries.map((c, i) => (
            <CountryCard key={c.name} c={c} index={i} inView={inView} />
          ))}
        </div>

        {/* Bottom insight bar */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between gap-8"
          style={{
            background: '#f8f7f5',
            border: '1px solid rgba(28,25,23,0.10)',
            borderLeft: '3px solid #FFC000',
            borderRadius: '4px',
            padding: '32px 40px',
          }}
        >
          <div className="text-center md:text-left">
            <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#FFC000', marginBottom: '10px', fontFamily: "'Space Grotesk', sans-serif" }}>
              Key Insight
            </p>
            <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(20px, 2.2vw, 30px)', letterSpacing: '0.04em', color: '#1c1917', lineHeight: 1.2, fontWeight: 900 }}>
              Cambodia (17M people) gets{' '}
              <span style={{ color: '#FFC000' }}>6× more tourists</span>{' '}
              than Nepal (30M people).{' '}
              <span style={{ color: '#FFC000' }}>The 0.5% Campaign changes this.</span>
            </h3>
          </div>
          <div className="flex-shrink-0 text-center" style={{ borderLeft: '1px solid rgba(28,25,23,0.10)', paddingLeft: '40px' }}>
            <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: '64px', lineHeight: 1, color: '#FFC000', letterSpacing: '0.02em' }}>0.5%</div>
            <p style={{ fontSize: '10px', color: '#57534e', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', marginTop: '6px', fontFamily: "'Space Grotesk', sans-serif" }}>
              Can close this gap
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
