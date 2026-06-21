import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ProvincePartnership } from '@/components/ProvincePartnership';
import { HalfPercentVisionSection } from '@/components/ui/half-percent-vision-section';
import { VFYHomeSections, PremiseSection, ActivitiesSection, ThreePillarsSection, MarqueeStrip } from '@/components/ui/vfy-home-sections';
import { CampaignApproachSection } from '@/components/ui/campaign-approach-section';
import { ImpactCalculatorSection } from '@/components/ui/impact-calculator-section';
import { CountryComparisonSection } from '@/components/ui/country-comparison-section';
import { TourismHistorySection } from '@/components/ui/tourism-history-section';
import { NavBar } from '@/components/ui/nav-bar';
import {
  Mountain,
  Sparkles,
  Users,
  TrendingUp,
  Hotel,
  Plane,
  MapPin,
  DollarSign,
  Heart,
  Flame,
  Cloud,
  Camera,
  Mic,
  Film,
  Globe,
  Music,
  Palette,
  TreePine,
  Compass,
} from 'lucide-react';

/* ─── design tokens (hero) ───────────────────────────────────────────────── */
const SERIF  = "'Cormorant Garamond', Georgia, serif";
const BEBAS  = "'Bebas Neue', sans-serif";
const MUKTA  = "'Mukta', system-ui, sans-serif";

/* ── Campaign Hero — full-screen video, dark fade, project text ──────────── */
const CampaignHero = () => (
  <section style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', background: '#051a0c' }}>

    {/* Video — full bleed */}
    <video
      autoPlay muted loop playsInline
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.82 }}
    >
      <source src="/MONTAGE.mp4" type="video/mp4" />
    </video>

    {/* Dark gradient overlays */}
    <div style={{
      position: 'absolute', inset: 0,
      background: 'linear-gradient(105deg, rgba(10,7,5,0.28) 0%, rgba(10,7,5,0.65) 50%, rgba(10,7,5,0.92) 100%)',
    }} />
    {/* Extra mobile-friendly bottom-up scrim for legibility */}
    <div style={{
      position: 'absolute', inset: 0,
      background: 'linear-gradient(to top, rgba(10,7,5,0.55) 0%, transparent 60%)',
    }} />

    {/* ── Text content — right-aligned, vertically centred ── */}
    <div className="vfy-hero-text" style={{
      position: 'absolute',
      right: 'clamp(32px, 7vw, 120px)',
      top: '50%',
      transform: 'translateY(-50%)',
      textAlign: 'right',
      color: '#fff',
      maxWidth: '620px',
    }}>

      {/* Main title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.45 }}
      >
        <div style={{
          fontFamily: BEBAS,
          fontSize: 'clamp(72px, 13vw, 180px)',
          lineHeight: 0.88,
          letterSpacing: '0.02em',
          color: '#fff',
          textShadow: '0 2px 24px rgba(0,0,0,0.55)',
        }}>
          0.5<span style={{ color: '#1f4d8a' }}>%</span>
        </div>
        <div style={{
          fontFamily: BEBAS,
          fontSize: 'clamp(28px, 4.8vw, 64px)',
          lineHeight: 1,
          letterSpacing: '0.12em',
          color: '#ffffff',
          marginTop: '6px',
          textShadow: '0 2px 16px rgba(0,0,0,0.50)',
        }}>
          Campaign
        </div>
      </motion.div>

      {/* Divider + tags */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.75 }}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
          gap: '14px', margin: '22px 0 20px',
          fontFamily: MUKTA, fontSize: '11px', letterSpacing: '0.28em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.78)',
          textShadow: '0 1px 8px rgba(0,0,0,0.50)',
        }}
      >
        {['Tourism', 'Spirituality', 'Culture', 'Media'].map((tag, i) => (
          <span key={tag} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {i > 0 && <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#1f4d8a', display: 'inline-block' }} />}
            {tag}
          </span>
        ))}
      </motion.div>

      {/* Italic tagline */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        style={{
          fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400,
          fontSize: 'clamp(18px, 2.2vw, 30px)', lineHeight: 1.3,
          color: '#1f4d8a',
          marginBottom: '36px',
          textShadow: '0 2px 12px rgba(0,0,0,0.45)',
        }}
      >
        From the Himalayas, to the world.
      </motion.p>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.05 }}
        style={{
          fontFamily: MUKTA, fontWeight: 400,
          fontSize: 'clamp(13px, 1.2vw, 16px)', lineHeight: 1.85,
          color: 'rgba(255,255,255,0.88)',
          maxWidth: '44ch', marginLeft: 'auto',
          textShadow: '0 1px 10px rgba(0,0,0,0.55)',
        }}
      >
        A movement to bring 0.5% of India and China's travellers to Nepal —
        transforming the nation's economy, identity and global story.
      </motion.p>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        style={{
          marginTop: '48px',
          display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px',
          fontFamily: MUKTA, fontSize: '10px', letterSpacing: '0.3em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.62)',
        }}
      >
        Scroll to explore
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ animation: 'heroScrollBounce 1.6s ease-in-out infinite' }}>
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </motion.div>
    </div>

    <style>{`
      @keyframes heroScrollBounce {
        0%, 100% { transform: translateY(0); }
        50%       { transform: translateY(5px); }
      }
    `}</style>
  </section>
);

export const ImpactCalculator = () => {
  const [indiaRate, setIndiaRate] = useState(5);
  const [chinaRate, setChinaRate] = useState(5);

  const INDIA_POP = 1440000000;
  const CHINA_POP = 1400000000;
  const CURRENT_TOURISTS = 1167000;
  const AVG_SPENDING = 1200;
  const JOBS_PER_100_TOURISTS = 5.8;

  const indiaVisitors = Math.round((INDIA_POP * (indiaRate / 10)) / 100);
  const chinaVisitors = Math.round((CHINA_POP * (chinaRate / 10)) / 100);
  const totalVisitors = indiaVisitors + chinaVisitors;
  const gdpImpact = ((totalVisitors * AVG_SPENDING) / 1000000000).toFixed(2);
  const jobsCreated = Math.round((totalVisitors * JOBS_PER_100_TOURISTS) / 100);
  const multiplier = (totalVisitors / CURRENT_TOURISTS).toFixed(1);
  const hotelRooms = Math.round(totalVisitors * 0.003);
  const guides = Math.round(totalVisitors * 0.002);
  const flights = Math.round(totalVisitors / 150000);
  const ruralBeneficiaries = Math.round(jobsCreated * 2.2);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  return (
    <section className="relative py-24 px-4 bg-gradient-to-b from-background to-muted/20 overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-4 py-2 mb-6"
          >
            <Sparkles className="w-4 h-4 text-brand" />
            <span className="text-xs font-semibold uppercase tracking-wider">
              Interactive Calculator
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-transparent"
          >
            Adjust the percentage.
            <br />
            <span className="italic text-brand">Watch Nepal transform.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Slide to see the economic and employment impact at different tourism penetration rates.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-8"
        >
          <div className="relative rounded-3xl border border-brand/20 bg-gradient-to-br from-brand/5 via-background to-brand/5 p-8 backdrop-blur-xl shadow-2xl">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 h-40 w-40 rounded-full bg-brand/20 blur-3xl" />

            <div className="relative space-y-6">
              <div className="text-center pb-6 border-b border-brand/20">
                <div className="text-6xl font-bold bg-gradient-to-r from-brand to-brand-foreground bg-clip-text text-transparent mb-2">
                  {formatNumber(totalVisitors)}
                </div>
                <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Combined visitors from India + China
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-background/50 backdrop-blur">
                  <span className="font-medium text-foreground flex items-center gap-2">
                    <Users className="w-4 h-4 text-brand" />
                    From India (1.44B)
                  </span>
                  <span className="text-xl font-bold text-brand">{formatNumber(indiaVisitors)}</span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-background/50 backdrop-blur">
                  <span className="font-medium text-foreground flex items-center gap-2">
                    <Users className="w-4 h-4 text-brand" />
                    From China (1.40B)
                  </span>
                  <span className="text-xl font-bold text-brand">{formatNumber(chinaVisitors)}</span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-background/50 backdrop-blur">
                  <span className="font-medium text-foreground flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-brand" />
                    GDP impact
                  </span>
                  <span className="text-xl font-bold text-brand">${gdpImpact}B</span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-background/50 backdrop-blur">
                  <span className="font-medium text-foreground flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-brand" />
                    Jobs created
                  </span>
                  <span className="text-xl font-bold text-brand">{formatNumber(jobsCreated)}</span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-brand/10 backdrop-blur border border-brand/30">
                  <span className="font-medium text-foreground flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-brand" />
                    Multiplier vs. today
                  </span>
                  <span className="text-2xl font-bold text-brand">{multiplier}×</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="relative rounded-3xl border border-brand/20 bg-gradient-to-br from-background to-muted/30 p-8 backdrop-blur-xl shadow-xl">
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
                    India penetration rate
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="1"
                      max="30"
                      value={indiaRate}
                      onChange={(e) => setIndiaRate(Number(e.target.value))}
                      className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, var(--brand) 0%, var(--brand) ${(indiaRate / 30) * 100}%, var(--muted) ${(indiaRate / 30) * 100}%, var(--muted) 100%)`,
                      }}
                    />
                    <span className="text-2xl font-bold text-brand min-w-[80px] text-right">
                      {(indiaRate / 10).toFixed(1)}%
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
                    China penetration rate
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="1"
                      max="30"
                      value={chinaRate}
                      onChange={(e) => setChinaRate(Number(e.target.value))}
                      className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, var(--brand) 0%, var(--brand) ${(chinaRate / 30) * 100}%, var(--muted) ${(chinaRate / 30) * 100}%, var(--muted) 100%)`,
                      }}
                    />
                    <span className="text-2xl font-bold text-brand min-w-[80px] text-right">
                      {(chinaRate / 10).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative rounded-3xl border border-brand/20 bg-gradient-to-br from-background to-muted/30 p-8 backdrop-blur-xl shadow-xl">
              <h3 className="text-sm font-semibold text-foreground mb-6 uppercase tracking-wider">
                Projected Outcomes
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-brand/5 border border-brand/10 text-center hover:bg-brand/10 transition-colors">
                  <div className="flex justify-center mb-2">
                    <Hotel className="w-5 h-5 text-brand" />
                  </div>
                  <div className="text-2xl font-bold text-brand mb-1">{formatNumber(hotelRooms)}</div>
                  <div className="text-xs text-muted-foreground font-medium">Hotel rooms needed</div>
                </div>

                <div className="p-4 rounded-xl bg-brand/5 border border-brand/10 text-center hover:bg-brand/10 transition-colors">
                  <div className="flex justify-center mb-2">
                    <Mountain className="w-5 h-5 text-brand" />
                  </div>
                  <div className="text-2xl font-bold text-brand mb-1">{formatNumber(guides)}</div>
                  <div className="text-xs text-muted-foreground font-medium">Trekking guides employed</div>
                </div>

                <div className="p-4 rounded-xl bg-brand/5 border border-brand/10 text-center hover:bg-brand/10 transition-colors">
                  <div className="flex justify-center mb-2">
                    <Plane className="w-5 h-5 text-brand" />
                  </div>
                  <div className="text-2xl font-bold text-brand mb-1">{flights}</div>
                  <div className="text-xs text-muted-foreground font-medium">Daily flight routes needed</div>
                </div>

                <div className="p-4 rounded-xl bg-brand/5 border border-brand/10 text-center hover:bg-brand/10 transition-colors">
                  <div className="flex justify-center mb-2">
                    <MapPin className="w-5 h-5 text-brand" />
                  </div>
                  <div className="text-2xl font-bold text-brand mb-1">{formatNumber(ruralBeneficiaries)}</div>
                  <div className="text-xs text-muted-foreground font-medium">Rural income beneficiaries</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        input[type='range'].slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--brand);
          cursor: pointer;
          box-shadow: 0 0 0 4px color-mix(in oklch, var(--brand) 20%, transparent);
          transition: all 0.2s;
        }
        input[type='range'].slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 0 0 6px color-mix(in oklch, var(--brand) 30%, transparent);
        }
        input[type='range'].slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--brand);
          cursor: pointer;
          border: none;
          box-shadow: 0 0 0 4px color-mix(in oklch, var(--brand) 20%, transparent);
          transition: all 0.2s;
        }
        input[type='range'].slider::-moz-range-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 0 0 6px color-mix(in oklch, var(--brand) 30%, transparent);
        }
      `}</style>
    </section>
  );
};

export const HeroStats = () => {
  const stats = [
    {
      value: '12×',
      label: 'Multiplier Effect',
      description:
        'Current visitor volume would need to multiply 12 times to reach the full 0.5% target from India + China combined.',
      source: 'Based on 2025 baseline of 1.16M total visitors',
      icon: TrendingUp,
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      value: '$4.2B',
      label: 'Annual Tourism Revenue',
      description:
        "Projected annual tourism revenue at 0.5% penetration — roughly 4× Nepal's current annual tourism earnings.",
      source: 'Nepal Tourism Board + World Bank projections',
      icon: DollarSign,
      gradient: 'from-emerald-500 to-teal-500',
    },
    {
      value: '820K',
      label: 'New Employment',
      description:
        'New direct and indirect employment positions across hospitality, trekking, transport, and rural enterprises.',
      source: 'Modeled on regional tourism multiplier effects',
      icon: Users,
      gradient: 'from-blue-500 to-indigo-500',
    },
  ];

  return (
    <section className="relative py-32 px-4 bg-gradient-to-b from-background via-muted/10 to-background overflow-hidden">
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-5 py-2 mb-8"
          >
            <Sparkles className="w-5 h-5 text-brand" />
            <span className="text-sm font-bold uppercase tracking-wider">What 0.5% Actually Means</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-transparent"
          >
            Small Percentage.
            <br />
            <span className="italic bg-gradient-to-r from-amber-500 via-orange-500 to-brand bg-clip-text text-transparent">
              Massive Impact.
            </span>
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="relative rounded-3xl border border-brand/20 bg-gradient-to-br from-background via-muted/5 to-background p-8 h-full hover:border-brand/40 transition-all duration-500 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                <div className="relative mb-6">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${stat.gradient} shadow-lg`}>
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                <div className="relative mb-4">
                  <div className={`text-6xl md:text-7xl font-black bg-gradient-to-br ${stat.gradient} bg-clip-text text-transparent mb-2`}>
                    {stat.value}
                  </div>
                  <div className="text-xl font-bold text-foreground uppercase tracking-wide">{stat.label}</div>
                </div>

                <p className="relative text-base text-muted-foreground leading-relaxed mb-4">{stat.description}</p>

                <div className="relative pt-4 border-t border-brand/10">
                  <p className="text-xs text-muted-foreground/70 italic">{stat.source}</p>
                </div>

                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-gradient-to-br from-brand/10 to-transparent rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const ThreePillars = () => {
  const pillars = [
    {
      title: 'Land of Peace',
      subtitle: 'Tranquility in the Himalayas',
      description:
        "Where ancient wisdom meets pristine nature. Nepal offers sanctuary from the chaos of modern life, a place where peace is not just found—it's felt in every breath.",
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&auto=format&fit=crop&q=80',
      icon: Cloud,
      color: 'from-sky-400 to-blue-500',
    },
    {
      title: 'Hinduism',
      subtitle: 'Eternal Dharma',
      description:
        'Home to Pashupatinath and countless sacred sites, Nepal is where Hindu spirituality thrives. Experience ancient rituals, sacred temples, and the timeless flow of devotion.',
      image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&auto=format&fit=crop&q=80',
      icon: Flame,
      color: 'from-orange-400 to-red-500',
    },
    {
      title: 'Buddhism',
      subtitle: 'Birthplace of Buddha',
      description:
        'In Lumbini, the light of enlightenment first touched the world. Walk the path of dharma through monasteries, stupas, and meditation centers that inspire inner peace.',
      image: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=1200&auto=format&fit=crop&q=80',
      icon: Heart,
      color: 'from-amber-400 to-yellow-500',
    },
  ];

  return (
    <section className="relative py-32 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-5 py-2 mb-8"
          >
            <Mountain className="w-5 h-5 text-brand" />
            <span className="text-sm font-bold uppercase tracking-wider">Three Sacred Pillars</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            <span className="bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-transparent">
              The Soul of
            </span>
            <br />
            <span className="italic bg-gradient-to-r from-amber-500 via-orange-500 to-brand bg-clip-text text-transparent">
              Nepal
            </span>
          </motion.h2>
        </div>

        <div className="space-y-32">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-brand/20 to-transparent rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
                  <div className="relative overflow-hidden rounded-3xl border border-brand/20 shadow-2xl">
                    <img
                      src={pillar.image}
                      alt={pillar.title}
                      className="w-full h-[500px] object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  </div>
                </div>
              </div>

              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${pillar.color}`}>
                  <pillar.icon className="w-10 h-10 text-white" />
                </div>

                <div>
                  <h3 className="text-5xl md:text-6xl font-bold mb-3 bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-transparent">
                    {pillar.title}
                  </h3>
                  <p className={`text-xl font-semibold bg-gradient-to-r ${pillar.color} bg-clip-text text-transparent mb-6`}>
                    {pillar.subtitle}
                  </p>
                </div>

                <p className="text-lg text-muted-foreground leading-relaxed">{pillar.description}</p>

                <div className="pt-4">
                  <div className={`h-1 w-24 rounded-full bg-gradient-to-r ${pillar.color}`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const CampaignApproach = () => {
  const approaches = [
    {
      icon: Mic,
      title: 'Podcasts & Interviews',
      description: "International interviews and podcast series featuring Nepal's culture and stories",
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Camera,
      title: 'Travel Vlogs',
      description: 'Visual storytelling through immersive travel content and creator partnerships',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Film,
      title: 'Documentaries & Films',
      description: "Cinematic productions showcasing Nepal's breathtaking landscapes and heritage",
      color: 'from-red-500 to-orange-500',
    },
    {
      icon: Music,
      title: 'Cultural Festivals',
      description: 'Musical concerts and cultural celebrations connecting Nepal with the world',
      color: 'from-blue-500 to-indigo-500',
    },
    {
      icon: Globe,
      title: 'Digital Campaigns',
      description: "Global collaborations and social media movements amplifying Nepal's voice",
      color: 'from-indigo-500 to-purple-500',
    },
    {
      icon: Users,
      title: 'Influencer Experiences',
      description: "Inviting celebrities and creators to experience and share Nepal's magic",
      color: 'from-amber-500 to-yellow-500',
    },
  ];

  return (
    <section className="relative py-32 px-4 bg-gradient-to-b from-muted/20 via-background to-muted/20 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-brand/5 via-transparent to-brand/5" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-5 py-2 mb-8"
          >
            <Compass className="w-5 h-5 text-brand" />
            <span className="text-sm font-bold uppercase tracking-wider">Campaign Approach</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            <span className="bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-transparent">
              Promote Nepal
            </span>
            <br />
            <span className="italic bg-gradient-to-r from-brand via-amber-500 to-orange-500 bg-clip-text text-transparent">
              Through Global Media
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-muted-foreground max-w-3xl mx-auto"
          >
            The 0.5% Campaign leverages modern storytelling and digital platforms to share Nepal's wonders with billions of potential travelers worldwide.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {approaches.map((approach, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="relative rounded-3xl border border-brand/10 bg-gradient-to-br from-background to-muted/30 p-8 h-full hover:border-brand/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                <div className={`absolute inset-0 bg-gradient-to-br ${approach.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`} />

                <div className="relative space-y-4">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${approach.color} shadow-lg`}>
                    <approach.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-foreground">{approach.title}</h3>

                  <p className="text-muted-foreground leading-relaxed">{approach.description}</p>

                  <div className={`h-1 w-16 rounded-full bg-gradient-to-r ${approach.color}`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const WhatWePromote = () => {
  const features = [
    {
      icon: Mountain,
      title: 'Natural Beauty',
      description: 'Himalayan landscapes and pristine wilderness',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&auto=format&fit=crop&q=80',
    },
    {
      icon: Heart,
      title: 'Spiritual Destinations',
      description: 'Sacred pilgrimage sites and meditation centers',
      image: '/spirtual.webp',
    },
    {
      icon: Sparkles,
      title: 'Cultural Heritage',
      description: 'Ancient civilizations and living traditions',
      image: 'https://images.unsplash.com/photo-1558799401-1dcba79834c2?w=600&auto=format&fit=crop&q=80',
    },
    {
      icon: Compass,
      title: 'Adventure Tourism',
      description: 'Trekking routes and outdoor expeditions',
      image: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=600&auto=format&fit=crop&q=80',
    },
    {
      icon: TreePine,
      title: 'Wildlife & Villages',
      description: 'Rural lifestyles and natural habitats',
      image: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=600&auto=format&fit=crop&q=80',
    },
    {
      icon: Palette,
      title: 'Arts & Creativity',
      description: 'Music, art, food, and creative industries',
      image: '/nepali art.jpeg',
    },
  ];

  return (
    <section className="relative py-32 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-5 py-2 mb-8"
          >
            <Globe className="w-5 h-5 text-brand" />
            <span className="text-sm font-bold uppercase tracking-wider">What We Promote</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            <span className="bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-transparent">
              Experience
            </span>
            <br />
            <span className="italic bg-gradient-to-r from-brand to-amber-500 bg-clip-text text-transparent">
              Nepal Beyond Borders
            </span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-3xl border border-brand/10 hover:border-brand/30 transition-all duration-500"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              </div>

              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="mb-3">
                  <feature.icon className="w-8 h-8 text-brand" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-white/80">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const CoreMessage = () => {
  return (
    <section className="relative py-40 px-4 bg-gradient-to-b from-muted/20 via-brand/5 to-background overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-5 py-2 mb-8">
            <Heart className="w-5 h-5 text-brand" />
            <span className="text-sm font-bold uppercase tracking-wider">Core Message</span>
          </div>

          <h2 className="text-5xl md:text-6xl lg:text-8xl font-black mb-8">
            <span className="bg-gradient-to-r from-brand via-amber-500 to-orange-500 bg-clip-text text-transparent">
              0.5% Can Change Nepal
            </span>
          </h2>

          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-2xl md:text-3xl font-semibold text-foreground leading-relaxed">
              Nepal does not need the entire world to transform its tourism industry.
            </p>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Even attracting just 0.5% of travelers from neighboring populations can create extraordinary national impact across economy, employment, and global recognition.
            </p>
          </div>

          <div className="pt-12 flex flex-wrap justify-center gap-4">
            <div className="px-8 py-4 rounded-full bg-gradient-to-r from-brand to-brand-foreground text-white font-bold text-lg shadow-2xl">
              Small Percentage. Massive Impact.
            </div>
            <div className="px-8 py-4 rounded-full border-2 border-brand text-brand font-bold text-lg">
              From the Himalayas to the World
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export const Introduction = () => {
  const paragraphs = [
    {
      text: 'Nepal is one of the world\'s most beautiful and spiritually significant countries. From the Himalayas to ancient heritage sites, from the birthplace of Buddha to diverse cultures and traditions, Nepal possesses extraordinary tourism potential.',
    },
    {
      text: 'Despite this richness, Nepal remains underrepresented in global tourism markets.',
      highlight: true,
    },
    {
      text: 'The 0.5% Campaign is a visionary tourism movement based on one powerful idea: "If only 0.5% of travelers from neighboring countries like India and China visit Nepal annually, Nepal\'s economy and global image can transform dramatically."',
    },
    {
      text: 'To amplify this vision internationally, we propose the production of a powerful documentary film that highlights Nepal\'s spiritual, cultural, natural, and human stories.',
    },
  ];

  return (
    <section className="relative py-32 px-4 overflow-hidden bg-gradient-to-b from-background via-amber-950/5 to-background">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-16"
        >
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg shadow-amber-500/30 flex-shrink-0">
            <span className="text-white font-black text-lg">0.5</span>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand mb-0.5">Introduction</p>
            <h2 className="text-3xl md:text-4xl font-black text-foreground">The 0.5% Vision</h2>
          </div>
        </motion.div>

        {/* Big pull quote */}
        <motion.blockquote
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
          className="relative mb-16 pl-8 border-l-4 border-amber-500"
        >
          <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-snug">
            If only{' '}
            <span className="text-amber-500">0.5%</span>{' '}
            of travelers from India and China visit Nepal,{' '}
            <span className="italic text-brand">Nepal transforms.</span>
          </p>
        </motion.blockquote>

        {/* Body paragraphs */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {paragraphs.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              viewport={{ once: true }}
              className={`rounded-2xl p-6 ${
                p.highlight
                  ? 'bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20'
                  : 'bg-muted/30 border border-border'
              }`}
            >
              <p className={`text-base leading-relaxed ${p.highlight ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}>
                {p.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-4 rounded-3xl border border-brand/20 bg-gradient-to-r from-brand/5 via-amber-500/5 to-brand/5 p-8"
        >
          {[
            { value: '2.84B', label: 'Potential travelers\nfrom India + China' },
            { value: '0.5%', label: 'Target tourism\npenetration rate' },
            { value: '14.2M', label: 'Visitors that could\nchange Nepal forever' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-black text-brand mb-2">{stat.value}</div>
              <div className="text-xs text-muted-foreground font-medium whitespace-pre-line leading-relaxed">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <CampaignHero />
      <MarqueeStrip />
      <div>
        <PremiseSection />
        <ThreePillarsSection />
        <HalfPercentVisionSection />
        <ActivitiesSection />
        <TourismHistorySection />
        <CountryComparisonSection />
        <ImpactCalculatorSection />
        <CampaignApproachSection />

        {/* ── 7 Province Partnership ── */}
        <section className="relative py-24 px-4 bg-background border-t border-border">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-14">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-4 py-2 mb-6"
              >
                <span className="text-xs font-semibold uppercase tracking-wider">7 Provinces</span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-transparent"
              >
                In partnership with<br />
                <span className="italic text-brand">all of Nepal.</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-lg text-muted-foreground max-w-2xl mx-auto"
              >
                The 0.5% Campaign operates across every province — from the eastern Koshi hills to the far-western Sudurpashchim plains.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <ProvincePartnership defaultSelected={0} />
            </motion.div>
          </div>
        </section>

        <VFYHomeSections />
      </div>
    </div>
  );
}
