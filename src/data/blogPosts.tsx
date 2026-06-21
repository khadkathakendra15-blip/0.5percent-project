import type { ReactNode } from 'react';

const C = {
  ink: '#0a1a2e', ink2: '#144428', inkSoft: '#3d5578', inkFaint: '#82b395',
  cream: '#eaf0f8', cream2: '#dce8f5', paper: '#fafdfa',
  saffron: '#7599cb', terra: '#DC143C', lineS: 'rgba(10,26,46,0.08)',
};
const SERIF = "'Cormorant Garamond', Georgia, serif";
const MUKTA = "'Mukta', system-ui, sans-serif";
const MONO  = "'JetBrains Mono', ui-monospace, monospace";

export type BlogPost = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  cover: string;
  /** Body of the article — rendered inside a max-width container. */
  render: () => ReactNode;
};

/* ── Shared building blocks for article bodies ──────────────────────────── */

function SectionHeading({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div style={{ marginBottom: '40px' }}>
      <div style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.32em', textTransform: 'uppercase', color: C.terra, marginBottom: '14px' }}>
        {kicker}
      </div>
      <h2 style={{ fontFamily: SERIF, fontWeight: 300, fontSize: 'clamp(32px,4vw,52px)', lineHeight: 1.05, letterSpacing: '-0.015em', color: C.ink, margin: 0 }}>
        {title}
      </h2>
    </div>
  );
}

function GroupBlock({ title, items, accent }: { title: string; items: string[]; accent: string }) {
  return (
    <div style={{
      background: C.paper, border: `1px solid ${C.lineS}`, borderRadius: '6px',
      padding: '24px 26px', display: 'flex', flexDirection: 'column', gap: '14px',
      borderTop: `3px solid ${accent}`,
    }}>
      <h3 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: '22px', lineHeight: 1.2, color: C.ink, margin: 0 }}>
        {title}
      </h3>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {items.map((it, i) => (
          <li key={i} style={{ fontFamily: MUKTA, fontSize: '14.5px', lineHeight: 1.7, color: C.inkSoft, display: 'flex', gap: '10px' }}>
            <span style={{ flexShrink: 0, marginTop: '8px', width: '6px', height: '6px', borderRadius: '50%', background: accent, display: 'inline-block' }} />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Post: Why Nepal Can Become a Global Tourism Hub ────────────────────── */

const OPPORTUNITIES = [
  { title: 'Wellness, Holiness & Healing Tourism', items: [
    'Spiritual retreats and mindfulness experiences',
    'Yoga, meditation, and holistic healing programs',
    'Mental wellness and personal transformation journeys',
  ]},
  { title: 'Nepali Art & Cultural Tourism', items: [
    'Traditional arts, crafts, architecture, and heritage',
    'Living cultural experiences and local traditions',
    'Festivals and cultural immersion programs',
  ]},
  { title: 'Sports & Fitness Tourism', items: [
    'Adventure sports, endurance events, and training camps',
    'High-altitude fitness and performance programs',
    'Outdoor recreation and active lifestyle experiences',
  ]},
  { title: 'Medical Tourism', items: [
    'Affordable healthcare services',
    'Recovery and wellness-focused treatment packages',
    'Integration of modern and traditional healing approaches',
  ]},
  { title: 'Freelancing & Digital Nomad Tourism', items: [
    'Cost-effective living environment',
    'Growing digital infrastructure',
    'Inspiring work-life balance surrounded by nature',
  ]},
  { title: 'Cinema & Creative Industry Tourism', items: [
    'Diverse landscapes for film production',
    'Cultural diversity for storytelling and content creation',
    'Development of a vibrant creative ecosystem',
  ]},
  { title: 'Volunteer & Charity Tourism', items: [
    'Meaningful community engagement opportunities',
    'Educational and social impact programs',
    'Sustainable development initiatives',
  ]},
  { title: 'Knowledge, Philosophy & Learning Tourism', items: [
    'Eastern philosophy and Buddhist teachings',
    'Life lessons rooted in resilience and simplicity',
    'Opportunities for personal growth and self-discovery',
  ]},
];

const STRENGTHS = [
  { title: 'Peace & Safety', items: [
    'A peaceful nation with a reputation for hospitality',
    'Safe environment for international visitors',
    'Strong sense of community and social harmony',
  ]},
  { title: 'Strategic Global Position', items: [
    'Non-aligned diplomatic tradition',
    'Positive international image and credibility',
    'Welcoming to people from all nations and cultures',
  ]},
  { title: 'Cost Advantage', items: [
    'Affordable accommodation, food, transportation, and services',
    'Strong value for money compared to many international destinations',
    'Attractive purchasing power for foreign visitors',
  ]},
  { title: 'Climate Diversity', items: [
    'Multiple climate zones within a short travel distance',
    'Year-round tourism opportunities',
    'Seasonal tourism experiences across different regions',
  ]},
  { title: 'Growing Infrastructure', items: [
    'Expanding digital connectivity and internet penetration',
    'Increasing availability of modern facilities and services',
    'Improving transportation and tourism infrastructure',
  ]},
  { title: 'Easy Communication', items: [
    'A large portion of young Nepalese speak English',
    'Friendly and approachable local population',
    'Ease of interaction for international travelers',
  ]},
  { title: 'Cultural Tolerance', items: [
    'Respect for diverse beliefs, cultures, and lifestyles',
    'Inclusive and welcoming social environment',
    'Rich multicultural experiences',
  ]},
  { title: 'Entertainment & Lifestyle', items: [
    'Growing entertainment and creative industries',
    'Vibrant urban culture alongside traditional heritage',
    'Unique blend of modernity and authenticity',
  ]},
  { title: 'Sustainable Living', items: [
    'Strong connection to nature and local communities',
    'Sustainable lifestyle practices',
    'Opportunities to experience simple and meaningful living',
  ]},
  { title: 'Trust & Credibility', items: [
    'Global reputation for honesty and resilience',
    'Strong interpersonal trust and hospitality',
    'Positive international perception of Nepalese people',
  ]},
  { title: 'Digital Accessibility', items: [
    'Expanding internet access across the country',
    'Increasing opportunities for remote work and digital tourism',
    'Growing technology adoption',
  ]},
  { title: 'Financial Convenience', items: [
    'Improving digital payment systems',
    'Expanding financial services for visitors',
    'Potential for comprehensive travel insurance support',
  ]},
];

const FUTURE_ACTIONS = ['Heal', 'Learn', 'Invest', 'Create', 'Volunteer', 'Connect', 'Transform their lives'];

function NepalTourismHubBody() {
  return (
    <>
      {/* Intro pull-quote */}
      <section style={{ padding: '80px 40px 40px', background: C.cream }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <p style={{
            fontFamily: SERIF, fontStyle: 'italic', fontWeight: 400,
            fontSize: 'clamp(20px,2vw,26px)', lineHeight: 1.55,
            color: C.ink2, margin: 0, borderLeft: `3px solid ${C.terra}`, paddingLeft: '24px',
          }}>
            If even half a percent of global travellers choose Nepal each year, the impact on
            its economy, employment, innovation and global influence could be transformational.
            This is not a fantasy — it's a strategy built on real, measurable strengths.
          </p>
        </div>
      </section>

      {/* Opportunities */}
      <section style={{ padding: '60px 40px 80px', background: C.cream }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <SectionHeading kicker="Eight pillars" title="Tourism Opportunities" />
          <p style={{ fontFamily: MUKTA, fontSize: '16px', lineHeight: 1.85, color: C.inkSoft, maxWidth: '62ch', marginBottom: '40px' }}>
            Beyond the well-known trekking and mountaineering circuits, Nepal can credibly compete in
            eight distinct, high-margin tourism segments. Each draws on assets the country already has.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '20px' }}>
            {OPPORTUNITIES.map((g, i) => (
              <GroupBlock key={i} title={g.title} items={g.items} accent={C.saffron} />
            ))}
          </div>
        </div>
      </section>

      {/* Strengths */}
      <section style={{ padding: '90px 40px', background: C.paper, borderTop: `1px solid ${C.lineS}` }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <SectionHeading kicker="Structural advantages" title="Why Nepal Can Become a Tourism Hub" />
          <p style={{ fontFamily: MUKTA, fontSize: '16px', lineHeight: 1.85, color: C.inkSoft, maxWidth: '62ch', marginBottom: '40px' }}>
            Twelve structural advantages set Nepal apart from most emerging destinations — together
            they form the foundation of a credible global tourism strategy.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' }}>
            {STRENGTHS.map((g, i) => (
              <GroupBlock key={i} title={g.title} items={g.items} accent={C.terra} />
            ))}
          </div>
        </div>
      </section>

      {/* Future Vision */}
      <section style={{ padding: '110px 40px', background: C.ink, color: C.cream }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.32em', textTransform: 'uppercase', color: C.terra, marginBottom: '18px' }}>
            Future vision
          </div>
          <h2 style={{ fontFamily: SERIF, fontWeight: 300, fontSize: 'clamp(34px,4.4vw,60px)', lineHeight: 1.05, letterSpacing: '-0.015em', color: C.cream, margin: 0 }}>
            A place people come <em style={{ fontStyle: 'italic', color: '#f4a8b3' }}>not just to travel</em>,<br />
            but to live, build and become.
          </h2>
          <p style={{ fontFamily: MUKTA, fontSize: '17px', lineHeight: 1.85, fontWeight: 300, color: 'rgba(234,247,238,0.7)', maxWidth: '60ch', margin: '28px auto 0' }}>
            Nepal has the potential to become a destination where people arrive not only as
            tourists, but as participants in something larger:
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', marginTop: '40px' }}>
            {FUTURE_ACTIONS.map((a, i) => (
              <span key={i} style={{
                fontFamily: SERIF, fontStyle: 'italic', fontSize: '22px', fontWeight: 400,
                color: C.cream,
                padding: '10px 22px', border: `1px solid rgba(234,247,238,0.18)`,
                borderRadius: '100px', background: 'rgba(234,247,238,0.04)',
              }}>
                {a}
              </span>
            ))}
          </div>
          <p style={{ fontFamily: MUKTA, fontSize: '15.5px', lineHeight: 1.85, fontWeight: 300, color: 'rgba(234,247,238,0.6)', maxWidth: '60ch', margin: '52px auto 0' }}>
            A dedicated <strong style={{ color: C.cream, fontWeight: 500 }}>Tourism Investment Summit</strong> and a
            data-driven tourism strategy can help position Nepal as a leading global tourism hub for the future.
          </p>
        </div>
      </section>

      {/* Closing CTA */}
      <section style={{ padding: '100px 40px', background: C.cream2, textAlign: 'center', borderTop: `1px solid ${C.lineS}` }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(72px,10vw,140px)', lineHeight: 1, color: C.terra, letterSpacing: '-0.04em', marginBottom: '8px' }}>
            0.5%
          </div>
          <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 'clamp(22px,2.6vw,32px)', fontWeight: 400, color: C.ink, lineHeight: 1.35, margin: '0 0 24px' }}>
            If just a tiny fraction of global travellers choose Nepal — everything changes.
          </p>
          <p style={{ fontFamily: MUKTA, fontSize: '16px', lineHeight: 1.85, color: C.inkSoft, margin: 0 }}>
            Project 0.5% is built on a simple vision: even a small percentage of global travellers
            choosing Nepal can transform the country's economy, employment, innovation and global standing.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '40px', flexWrap: 'wrap' }}>
            <a href="/booking" style={{
              padding: '14px 32px', borderRadius: '100px',
              fontFamily: MUKTA, fontSize: '12px', letterSpacing: '0.22em', textTransform: 'uppercase',
              fontWeight: 600, background: C.terra, color: '#fff', textDecoration: 'none',
            }}>
              Plan your Nepal trip
            </a>
            <a href="/about" style={{
              padding: '14px 32px', borderRadius: '100px',
              fontFamily: MUKTA, fontSize: '12px', letterSpacing: '0.22em', textTransform: 'uppercase',
              fontWeight: 600, background: 'transparent', color: C.ink,
              border: `1px solid ${C.ink}`, textDecoration: 'none',
            }}>
              About the campaign
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

/* ── Posts registry ─────────────────────────────────────────────────────── */

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'why-nepal-can-become-a-global-tourism-hub',
    category: 'Vision',
    title: 'Why Nepal Can Become a Global Tourism Hub',
    excerpt:
      "Nepal's tourism potential extends far beyond mountains and trekking. Eight high-margin segments and twelve structural advantages could position it as a world-class destination.",
    author: 'Project 0.5%',
    date: 'June 2026',
    readTime: '14 min read',
    cover: 'url("/Himalayas Landscape.png") center/cover no-repeat, #0b1a0f',
    render: NepalTourismHubBody,
  },
];

export function getPostBySlug(slug: string | undefined): BlogPost | undefined {
  return BLOG_POSTS.find(p => p.slug === slug);
}
