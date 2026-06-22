"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// ─── Brand tokens ──────────────────────────────────────────────────────────
const G = {
  bg:         '#0A0B0F',
  surface:    '#0E0F14',
  card:       '#15171E',
  border:     'rgba(255,255,255,0.10)',
  borderHover:'rgba(255,255,255,0.26)',
  gold:       '#C9FF3D',
  goldFaint:  'rgba(138,78,18,0.09)',
  text:       '#F3F3F0',
  textMuted:  '#F3F3F0',
  textFaint:  '#9498A4',
  ink:        '#F3F3F0',
  cream:      '#0E0F14',
  serif:  "'Bricolage Grotesque', Georgia, serif",
  sans:   "'Space Grotesk', system-ui, sans-serif",
  mono:   "'Space Mono', ui-monospace, monospace",
  bebas:  "'Bricolage Grotesque', sans-serif",
  radius: '10px',
};

// ─── Assets ────────────────────────────────────────────────────────────────
const A = {
  himalayas: '/Himalayas Landscape.png',
  spiritual: '/spirtual Distination.webp',
  buddhism:  '/Buddhism.webp',
  nepaliArt: '/nepali art.jpeg',
};

// ─── AI Response engine (minimal, self-contained) ─────────────────────────
type MediaItem = { image: string; title: string; sub?: string };
type AiResponse = { text: string; media?: MediaItem[]; chips?: string[] };

const RESPONSES: Record<string, AiResponse> = {
  everest: {
    text: "Sagarmatha — the forehead of the sky. The Everest Base Camp trek (12–14 days from Lukla) is a pilgrimage through Sherpa villages, ancient monasteries, and humbling altitude. Spring and Autumn offer the clearest skies.\n\nShall I help plan this journey?",
    media: [{ image:'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=700&auto=format', title:'Everest Base Camp', sub:'5,364 m · Solukhumbu' }],
    chips: ['Best time to go?','How much does it cost?','Permits needed','Book now'],
  },
  annapurna: {
    text: "The Annapurna Circuit crosses Thorong La Pass at 5,416 m — Nepal's most diverse trek through subtropical forests, arid desert, and Tibetan villages. 14–21 days of transformation.",
    media: [{ image:'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=700&auto=format', title:'Annapurna Circuit', sub:'14–21 days · The Classic' }],
    chips: ['Compare with Everest','Best season','Book this trek'],
  },
  spiritual: {
    text: "Nepal is where heaven meets earth. Begin at Boudhanath Stupa in Kathmandu, continue to the sacred Pashupatinath temple, then journey south to Lumbini — the birthplace of Buddha. A path of light and stillness.",
    media: [{ image: A.buddhism, title:'Buddhist Heritage', sub:'The path of enlightenment' }, { image: A.spiritual, title:'Spiritual Nepal', sub:'Ancient temples & living traditions' }],
    chips: ['Tell me about Lumbini','Meditation retreats','Temple etiquette'],
  },
  culture: {
    text: "Over 120 ethnic groups, seven UNESCO World Heritage Sites in one valley — culture in Nepal is alive. From Newari architecture to Tharu dances, from prayer flags to living goddesses.",
    media: [{ image: A.nepaliArt, title:'Nepali Artistry', sub:'Living cultural traditions' }],
    chips: ['Heritage walk','Festival calendar','Cultural homestays'],
  },
  trekking: {
    text: "In Nepal, we say the mountains do not merely stand — they call. From the 4-day Poon Hill sunrise trek to the 14-day Everest Base Camp, there are paths for every soul. Best seasons: Spring (Mar–May) and Autumn (Sep–Nov).",
    media: [{ image: A.himalayas, title:'Himalayan Trails', sub:'Paths for every soul' }],
    chips: ['Best for beginners','Everest vs Annapurna','Trekking permits'],
  },
  budget: {
    text: "Nepal at every level:\n• Budget $30–60/day — tea houses, local food\n• Mid-range $60–120/day — boutique hotels, guides\n• Premium $120–250/day — luxury lodges, internal flights\n\nA full EBC trek: $1,200–2,500 all-in.",
    media: [{ image: A.himalayas, title:'Budget Planning', sub:'Value at every level' }],
    chips: ['Cheapest treks','Best value treks','Save money tips'],
  },
  visa: {
    text: "Tourist visa on arrival at Tribhuvan Airport:\n• 15 days — $30 USD\n• 30 days — $50 USD\n• 90 days — $125 USD\n• Indian citizens — no visa required\n\nAlso needed: TIMS card ($20) + park entry fees.",
    media: [{ image:'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=700&auto=format', title:'Entry Requirements', sub:'Visa & permits made simple' }],
    chips: ['TIMS card details','Restricted area permits'],
  },
  weather: {
    text: "🌸 Spring (Mar–May) — Peak trekking, rhododendrons bloom ★★★★★\n🌧 Monsoon (Jun–Aug) — Lush but wet ★★☆☆☆\n🍂 Autumn (Sep–Nov) — Crystal skies, the very best ★★★★★\n❄ Winter (Dec–Feb) — Quiet trails ★★★☆☆",
    media: [{ image: A.himalayas, title:'Four Seasons', sub:'Each reveals a different Nepal' }],
    chips: ['Best month for Everest','Winter in Kathmandu'],
  },
  campaign: {
    text: "If just 0.5% of travelers from India and China visit Nepal:\n• 14.2 million potential visitors\n• $4.2 billion in projected revenue\n• 820,000 new jobs created\n\nEvery trip booked through our platform contributes to Nepal's future.",
    chips: ['How does 0.5% work?','Impact calculator','Join the movement'],
  },
  pokhara: {
    text: "Pokhara — city of lakes, gateway to the Annapurnas. Wake to Machapuchare's reflection in Phewa Lake. Paraglide at sunrise. Watch the sun paint the Himalayas gold from Sarangkot. 3–5 days of pure magic.",
    media: [{ image:'https://images.unsplash.com/photo-1558799401-1dcba79834c2?w=700&auto=format', title:'Pokhara', sub:'City of Lakes' }],
    chips:['Paragliding info','Day treks from Pokhara'],
  },
  default: {
    text: "Namaste! I am your Guide AI for Nepal — from the peaks that touch the sky to the temples that touch the soul. Ask me anything: trekking routes, spiritual journeys, visa, budget, best time to visit, or booking help.\n\nWhat calls you to Nepal?",
    media: [{ image: A.himalayas, title:'Discover Nepal', sub:'Where every path leads to wonder' }],
    chips: ['Plan a trek','Spiritual journey','Best time to visit','Budget guide','About 0.5%'],
  },
};

function getResponse(message: string): AiResponse {
  const m = message.toLowerCase();
  const patterns: [string, RegExp][] = [
    ['everest',   /everest|ebc|base camp|sagarmatha/],
    ['annapurna', /annapurna|circuit|thorong|poon hill/],
    ['spiritual', /spirit|meditat|buddha|lumbini|temple|monastery|pray/],
    ['culture',   /cultur|festival|heritage|art|dance|newari|durbar/],
    ['trekking',  /trek|hik|trail|climb|mountain|peak/],
    ['budget',    /budget|cost|price|money|cheap|how much/],
    ['visa',      /visa|permit|tims|passport|entry/],
    ['weather',   /weather|season|rain|snow|best time|when.*visit|month/],
    ['campaign',  /0\.5|campaign|movement|half percent/],
    ['pokhara',   /pokhara|phewa|sarangkot|lakeside/],
  ];
  for (const [key, rx] of patterns) if (rx.test(m)) return RESPONSES[key];
  return RESPONSES.default;
}

// ─── Lotus SVG ─────────────────────────────────────────────────────────────
function Lotus({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" style={{ flexShrink: 0 }}>
      <circle cx="20" cy="20" r="18" fill="rgba(138,78,18,0.10)" stroke={G.gold} strokeWidth="0.8"/>
      <circle cx="20" cy="20" r="6"  fill="none" stroke={G.gold} strokeWidth="0.5" opacity="0.6"/>
      <path d="M20 6 Q25 14 20 20 Q15 14 20 6" fill="rgba(138,78,18,0.22)" stroke={G.gold} strokeWidth="0.4"/>
      <path d="M34 20 Q26 25 20 20 Q26 15 34 20" fill="rgba(138,78,18,0.22)" stroke={G.gold} strokeWidth="0.4"/>
      <path d="M20 34 Q15 26 20 20 Q25 26 20 34" fill="rgba(138,78,18,0.22)" stroke={G.gold} strokeWidth="0.4"/>
      <path d="M6 20 Q14 15 20 20 Q14 25 6 20" fill="rgba(138,78,18,0.22)" stroke={G.gold} strokeWidth="0.4"/>
    </svg>
  );
}

// ─── Typing dots ───────────────────────────────────────────────────────────
function TypingDots() {
  return (
    <div style={{ display:'flex', alignItems:'flex-start', gap:'8px', padding:'2px 0' }}>
      <Lotus size={28} />
      <div style={{ background:G.surface, border:`1px solid ${G.border}`, borderRadius:'10px 10px 10px 2px', padding:'12px 16px', display:'flex', gap:'5px', alignItems:'center' }}>
        {[0,1,2].map(i => (
          <div key={i} style={{ width:'6px', height:'6px', borderRadius:'50%', background:G.gold,
            animation:`guideAI-pulse 1.2s ease-in-out ${i*0.2}s infinite` }} />
        ))}
      </div>
    </div>
  );
}

// ─── Message bubble ────────────────────────────────────────────────────────
function Bubble({ msg }: { msg: { role:string; text:string; ts:number } }) {
  const isAI = msg.role === 'ai';
  return (
    <div style={{ display:'flex', alignItems:'flex-start', gap:'8px', padding:'2px 0', flexDirection: isAI ? 'row' : 'row-reverse' }}>
      {isAI && <Lotus size={28} />}
      <div style={{
        maxWidth:'82%',
        background: isAI ? G.surface : G.ink,
        border: isAI ? `1px solid ${G.border}` : 'none',
        borderRadius: isAI ? '10px 10px 10px 2px' : '10px 10px 2px 10px',
        padding:'12px 16px',
        borderLeft: isAI ? `2px solid rgba(138,78,18,0.28)` : 'none',
      }}>
        {isAI && (
          <div style={{ fontFamily:G.mono, fontSize:'8px', letterSpacing:'0.12em', color:G.gold, marginBottom:'5px', textTransform:'uppercase' }}>
            Guide AI
          </div>
        )}
        <div style={{ fontFamily:G.sans, fontSize:'13px', lineHeight:1.75, whiteSpace:'pre-wrap', color: isAI ? G.text : G.cream }}>
          {msg.text.split(/(\*\*.*?\*\*)/g).map((p, i) =>
            p.startsWith('**') && p.endsWith('**')
              ? <strong key={i} style={{ color: isAI ? G.gold : '#15171E', fontWeight:600 }}>{p.slice(2,-2)}</strong>
              : p
          )}
        </div>
        <div style={{ fontFamily:G.mono, fontSize:'8px', color: isAI ? G.textFaint : 'rgba(243,243,240,0.4)', marginTop:'6px', letterSpacing:'0.03em' }}>
          {new Date(msg.ts).toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' })}
        </div>
      </div>
    </div>
  );
}

// ─── Quick chips ───────────────────────────────────────────────────────────
function Chips({ chips, onPick }: { chips: string[]; onPick:(c:string)=>void }) {
  if (!chips?.length) return null;
  return (
    <div style={{ display:'flex', flexWrap:'wrap', gap:'6px', padding:'4px 0 4px 36px' }}>
      {chips.map(c => (
        <button key={c} onClick={() => onPick(c)} style={{
          fontFamily:G.sans, fontSize:'11px', color:G.gold, background:G.goldFaint,
          border:`1px solid ${G.border}`, borderRadius:'16px', padding:'5px 13px',
          cursor:'pointer', transition:'all 0.18s', whiteSpace:'nowrap',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = G.gold; (e.currentTarget as HTMLButtonElement).style.background = 'rgba(138,78,18,0.14)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = G.border; (e.currentTarget as HTMLButtonElement).style.background = G.goldFaint; }}
        >{c}</button>
      ))}
    </div>
  );
}

// ─── Media card ────────────────────────────────────────────────────────────
export function MediaCard({ item }: { item: MediaItem }) {
  return (
    <div style={{ borderRadius:G.radius, overflow:'hidden', border:`1px solid ${G.border}`, background:G.surface, flexShrink:0 }}>
      <img src={item.image} alt={item.title} style={{ width:'100%', height:'110px', objectFit:'cover', display:'block' }} />
      <div style={{ padding:'9px 12px' }}>
        <div style={{ fontFamily:G.serif, fontSize:'14px', fontWeight:500, color:G.text }}>{item.title}</div>
        {item.sub && <div style={{ fontFamily:G.mono, fontSize:'9px', color:G.textFaint, marginTop:'2px', letterSpacing:'0.03em' }}>{item.sub}</div>}
      </div>
    </div>
  );
}

// ─── Wizard quick-start strip ─────────────────────────────────────────────
const QUICK_DEST = [
  { label:'Everest Base Camp', icon:'⛰', q:'Tell me about Everest Base Camp' },
  { label:'Spiritual Journey', icon:'🪷', q:'I want a spiritual journey in Nepal' },
  { label:'Annapurna Circuit', icon:'🏔', q:'Tell me about Annapurna Circuit' },
  { label:'Visa & Permits',    icon:'📋', q:'What visa do I need for Nepal?' },
  { label:'Best Time to Visit',icon:'🗓', q:'When is the best time to visit Nepal?' },
  { label:'Budget Guide',      icon:'💰', q:'How much does a Nepal trip cost?' },
];

// ─── Main chat widget ──────────────────────────────────────────────────────
function ChatWidget({ onFullPageClick: _onFullPageClick }: { onFullPageClick: ()=>void }) {
  const [msgs, setMsgs] = useState<{ role:string; text:string; ts:number }[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [chips, setChips] = useState<string[]>([]);
  const [_media, setMedia] = useState<MediaItem[]>([]);
  const [listening, setListening] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMsgs([{ role:'ai', ts: Date.now(),
      text:'Namaste! I am Guide AI — your personal Nepal travel assistant.\n\nAsk me anything: treks, culture, visa, budget, or spiritual journeys. What calls you to Nepal?' }]);
    setChips(['Plan a trek','Spiritual journey','Visa & permits','Best time to visit','Budget guide']);
    setMedia([{ image: A.himalayas, title:'Discover Nepal', sub:'Where every path leads to wonder' }]);
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView?.({ behavior:'smooth', block:'end' });
  }, [msgs, typing]);

  const send = useCallback((text: string) => {
    if (!text.trim()) return;
    setMsgs(prev => [...prev, { role:'user', text: text.trim(), ts: Date.now() }]);
    setInput('');
    setChips([]);
    setTyping(true);
    setTimeout(() => {
      const r = getResponse(text);
      setMsgs(prev => [...prev, { role:'ai', text: r.text, ts: Date.now() }]);
      setMedia(r.media || []);
      setChips(r.chips || []);
      setTyping(false);
    }, 900 + Math.random() * 900);
  }, []);

  function handleVoice() {
    setListening(true);
    setTimeout(() => {
      const samples = ['Tell me about Everest Base Camp','What is the best time to visit Nepal?','I want a spiritual journey','Show me budget options'];
      setInput(samples[Math.floor(Math.random() * samples.length)]);
      setListening(false);
      inputRef.current?.focus();
    }, 1800);
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', background:G.bg, borderRadius:'12px', overflow:'hidden', border:`1px solid ${G.border}` }}>

      {/* Chat header */}
      <div style={{ padding:'12px 18px', display:'flex', alignItems:'center', justifyContent:'space-between', borderBottom:`1px solid ${G.border}`, background:G.surface, flexShrink:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
          <Lotus size={28} />
          <div>
            <div style={{ fontFamily:G.serif, fontSize:'15px', fontWeight:500, color:G.text, lineHeight:1.1 }}>Guide AI</div>
            <div style={{ fontFamily:G.mono, fontSize:'8px', letterSpacing:'0.08em', color:G.gold, display:'flex', alignItems:'center', gap:'4px' }}>
              <span style={{ width:'5px', height:'5px', borderRadius:'50%', background:'#C9FF3D', display:'inline-block' }}/>
              Online · Nepal travel expert
            </div>
          </div>
        </div>
        <Link to="/ai-guide" style={{ textDecoration:'none' }}>
          <button style={{ fontFamily:G.mono, fontSize:'8px', letterSpacing:'0.12em', textTransform:'uppercase', background:'transparent', color:G.gold, border:`1px solid ${G.border}`, borderRadius:'5px', padding:'5px 11px', cursor:'pointer', whiteSpace:'nowrap', transition:'all 0.2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = G.gold; (e.currentTarget as HTMLButtonElement).style.background = G.goldFaint; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = G.border; (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
          >
            Full Page ↗
          </button>
        </Link>
      </div>

      {/* Messages */}
      <div style={{ flex:1, overflowY:'auto', padding:'14px 16px', display:'flex', flexDirection:'column', gap:'6px', background:G.bg }}>
        {msgs.map((m, i) => <Bubble key={i} msg={m} />)}
        {typing && <TypingDots />}
        <Chips chips={chips} onPick={send} />
        <div ref={endRef} />
      </div>

      {/* Input bar */}
      <div style={{ padding:'10px 14px', borderTop:`1px solid ${G.border}`, background:G.surface, flexShrink:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:'8px', background:G.bg, border:`1px solid ${G.border}`, borderRadius:'10px', padding:'5px 7px 5px 14px', transition:'border-color 0.2s' }}
          onFocus={e => (e.currentTarget as HTMLDivElement).style.borderColor = G.borderHover}
          onBlur={e => (e.currentTarget as HTMLDivElement).style.borderColor = G.border}
        >
          <button onClick={handleVoice} disabled={listening} style={{ background:'none', border:'none', cursor:'pointer', color: listening ? '#C9FF3D' : G.textFaint, padding:'3px', display:'flex', flexShrink:0 }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
              <line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
            </svg>
          </button>
          <input ref={inputRef} type="text" value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key==='Enter' && !e.shiftKey) { e.preventDefault(); send(input); } }}
            placeholder={listening ? 'Listening…' : 'Ask about Nepal — treks, culture, visa, permits…'}
            style={{ flex:1, background:'none', border:'none', outline:'none', color:G.text, fontFamily:G.sans, fontSize:'13px', padding:'6px 0', caretColor:G.gold }}
          />
          <button onClick={() => send(input)} disabled={!input.trim()} style={{
            background: input.trim() ? G.ink : G.card, border:'none', borderRadius:'7px',
            width:'32px', height:'32px', display:'flex', alignItems:'center', justifyContent:'center',
            cursor: input.trim() ? 'pointer' : 'default', transition:'all 0.18s', flexShrink:0,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={input.trim() ? G.cream : G.textFaint} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
        {listening && (
          <div style={{ fontFamily:G.mono, fontSize:'9px', color:'#C9FF3D', textAlign:'center', marginTop:'5px', letterSpacing:'0.08em' }}>🎙 Listening…</div>
        )}
      </div>
    </div>
  );
}

// ─── Exported Section ──────────────────────────────────────────────────────
export function GuideAISection() {
  return (
    <>
      <style>{`
        @keyframes guideAI-pulse {
          0%, 100% { opacity: 0.35; transform: scale(0.85); }
          50%       { opacity: 1;    transform: scale(1); }
        }
        .guide-ai-dest-chip:hover {
          border-color: #C9FF3D !important;
          background: rgba(138,78,18,0.08) !important;
          transform: translateY(-2px);
        }
      `}</style>

      <section style={{ background:G.bg, borderTop:'1px solid rgba(255,255,255,0.08)', padding:'80px 0 72px' }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'0 40px' }}>

          {/* Section header */}
          <motion.div
            initial={{ opacity:0, y:20 }}
            whileInView={{ opacity:1, y:0 }}
            transition={{ duration:0.6 }}
            viewport={{ once:true }}
            style={{ marginBottom:'48px' }}
          >
            <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'14px' }}>
              <span style={{ fontFamily:G.mono, fontSize:'10px', letterSpacing:'0.22em', textTransform:'uppercase', color:G.gold }}>
                Powered by AI
              </span>
            </div>
            <h2 style={{ fontFamily:G.serif, fontSize:'clamp(38px,5vw,64px)', fontWeight:400, color:G.text, lineHeight:1.05, margin:'0 0 14px', letterSpacing:'-0.01em' }}>
              Meet Guide AI —<br/>
              <em style={{ color:G.gold }}>your Nepal companion.</em>
            </h2>
            <p style={{ fontFamily:G.sans, fontSize:'16px', color:G.textMuted, lineHeight:1.8, maxWidth:'52ch', margin:0 }}>
              Plan treks, explore culture, book permits, and discover Nepal's best destinations — all through a calm, wise AI guide available 24/7.
            </p>
          </motion.div>

          {/* Main two-column layout */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 420px', gap:'32px', alignItems:'start' }}>

            {/* LEFT: Info + quick start chips + media */}
            <motion.div
              initial={{ opacity:0, x:-20 }}
              whileInView={{ opacity:1, x:0 }}
              transition={{ duration:0.6, delay:0.1 }}
              viewport={{ once:true }}
              style={{ display:'flex', flexDirection:'column', gap:'28px' }}
            >
              {/* Quick-start destination chips */}
              <div>
                <div style={{ fontFamily:G.mono, fontSize:'9px', letterSpacing:'0.18em', textTransform:'uppercase', color:G.textFaint, marginBottom:'14px' }}>
                  Quick start — ask about
                </div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:'10px' }}>
                  {QUICK_DEST.map(d => (
                    <div key={d.label} className="guide-ai-dest-chip" style={{
                      display:'flex', alignItems:'center', gap:'8px', padding:'10px 16px',
                      background:G.surface, border:`1px solid ${G.border}`, borderRadius:'8px',
                      fontFamily:G.sans, fontSize:'13px', color:G.textMuted, cursor:'default',
                      transition:'all 0.2s', userSelect:'none',
                    }}>
                      <span style={{ fontSize:'16px' }}>{d.icon}</span>
                      {d.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Feature list */}
              <div style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
                {[
                  { icon:'🧭', title:'Destination Wizard', desc:'5-step quiz matches you to your perfect Nepal experience — trekking, spiritual, cultural, wildlife.' },
                  { icon:'💬', title:'Live Chat Guide',    desc:'Ask anything in English, नेपाली or हिंदी. Spiritual mentor tone, calm and wise.' },
                  { icon:'🗺', title:'Expert Insights',   desc:'Seasonal tips, cultural etiquette, packing guides, visa requirements and expert knowledge — everything for a perfect trip.' },
                ].map(f => (
                  <div key={f.title} style={{ display:'flex', alignItems:'flex-start', gap:'14px', padding:'16px', background:G.surface, borderRadius:'10px', border:`1px solid ${G.border}` }}>
                    <span style={{ fontSize:'22px', lineHeight:1, marginTop:'2px' }}>{f.icon}</span>
                    <div>
                      <div style={{ fontFamily:G.serif, fontSize:'18px', fontWeight:500, color:G.text, marginBottom:'4px' }}>{f.title}</div>
                      <div style={{ fontFamily:G.sans, fontSize:'13px', color:G.textMuted, lineHeight:1.65 }}>{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA to full page */}
              <Link to="/ai-guide" style={{ textDecoration:'none', alignSelf:'flex-start' }}>
                <button style={{
                  fontFamily:G.mono, fontSize:'10px', letterSpacing:'0.18em', textTransform:'uppercase',
                  background:G.ink, color:G.cream, border:'none', borderRadius:'5px',
                  padding:'13px 28px', cursor:'pointer', display:'flex', alignItems:'center', gap:'9px', transition:'opacity 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.opacity = '0.82'}
                onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.opacity = '1'}
                >
                  Open Full AI Guide
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </Link>
            </motion.div>

            {/* RIGHT: Live chat widget */}
            <motion.div
              initial={{ opacity:0, x:20 }}
              whileInView={{ opacity:1, x:0 }}
              transition={{ duration:0.6, delay:0.15 }}
              viewport={{ once:true }}
              style={{ height:'580px', position:'sticky', top:'84px' }}
            >
              <ChatWidget onFullPageClick={() => {}} />
            </motion.div>
          </div>

        </div>
      </section>
    </>
  );
}
