"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

// ─── Tokens ────────────────────────────────────────────────────────────────
const W = {
  // widget window — brand light theme (cream/ink palette)
  bg:      '#fafdfa',                      // paper
  surface: '#eaf7ee',                      // cream
  card:    '#d8f3e2',                      // card
  border:  'rgba(10,46,26,0.10)',
  borderH: 'rgba(31,138,77,0.40)',        // saffron focus ring

  // accent (saffron #1f8a4d replaces gold)
  gold:    '#1f8a4d',
  goldD:   '#0e995a',
  goldF:   'rgba(31,138,77,0.10)',

  // text (ink palette)
  text:    '#0a2e1a',                      // ink
  muted:   '#3d7855',
  faint:   '#82b395',

  // user bubble — saffron bg, white text
  userBg:  '#1f8a4d',
  userTxt: '#ffffff',

  serif: "'Cormorant Garamond', Georgia, serif",
  sans:  "'Mukta', system-ui, sans-serif",
  mono:  "'JetBrains Mono', ui-monospace, monospace",
};

type Chip = string;
type AiMsg = { text: string; chips?: Chip[]; options?: { label: string; value: string }[] };

const RESPONSES: Record<string, AiMsg> = {
  everest: {
    text: "Sagarmatha — the forehead of the sky 🏔\n\nEverest Base Camp trek takes 12–14 days from Lukla. Best in Spring & Autumn. Permits required: TIMS ($20) + Sagarmatha entry ($35).",
    chips: ['How much does it cost?', 'Best season', 'Book EBC trek', 'Packing list'],
  },
  annapurna: {
    text: "The Annapurna Circuit 🌄\n\n14–21 days, crossing Thorong La Pass at 5,416 m. Nepal's most diverse trek — forests, desert, Tibetan villages.",
    chips: ['Vs Everest', 'Best season', 'Book trek', 'Packing list'],
  },
  spiritual: {
    text: "Nepal is where heaven meets earth 🪷\n\nBegin at Boudhanath Stupa → Pashupatinath Temple → Lumbini (birthplace of Buddha). A path of light and stillness.",
    chips: ['Lumbini details', 'Meditation retreats', 'Temple etiquette', 'Book spiritual tour'],
  },
  culture: {
    text: "Over 120 ethnic groups, 7 UNESCO sites in one valley 🎭\n\nFrom Newari architecture to Tharu dances — culture in Nepal is alive, not a museum exhibit.",
    chips: ['Heritage walk', 'Festival calendar', 'Cultural homestays'],
  },
  trekking: {
    text: "The mountains call 🥾\n\nBest seasons: Spring (Mar–May) & Autumn (Sep–Nov). Popular routes:",
    options: [
      { label: '⛰ Everest Base Camp', value: 'Tell me about Everest Base Camp' },
      { label: '🏔 Annapurna Circuit', value: 'Tell me about Annapurna Circuit' },
      { label: '🌄 Poon Hill (4 days)', value: 'Tell me about Poon Hill trek' },
      { label: '🗻 Upper Mustang',     value: 'Tell me about Upper Mustang' },
    ],
  },
  budget: {
    text: "Nepal at every level 💰\n\n• Budget: $30–60/day (tea houses, local food)\n• Mid: $60–120/day (guides, boutique hotels)\n• Premium: $120–250/day (lodges, flights)\n\nFull EBC trek: $1,200–2,500 all-in.",
    chips: ['Cheapest routes', 'Best value treks', 'How to save'],
  },
  visa: {
    text: "Visa on arrival 📋\n\n• 15 days — $30\n• 30 days — $50\n• 90 days — $125\n• 🇮🇳 Indians — no visa!\n\nAlso needed: TIMS card ($20) + park fees.",
    chips: ['TIMS card', 'Restricted areas', 'Entry from India'],
  },
  weather: {
    text: "Best time to visit Nepal 🗓",
    options: [
      { label: '🌸 Spring (Mar–May)', value: 'Spring season details' },
      { label: '🌧 Monsoon (Jun–Aug)', value: 'Monsoon season details' },
      { label: '🍂 Autumn (Sep–Nov)', value: 'Autumn season details' },
      { label: '❄ Winter (Dec–Feb)',  value: 'Winter season details' },
    ],
  },
  spring:   { text: "🌸 Spring (Mar–May) ★★★★★\n\nPeak trekking season. Rhododendrons in full bloom, clear skies, comfortable temperatures. Best for EBC and Annapurna.", chips: ['Book spring trek', 'EBC in spring', 'Annapurna in spring'] },
  autumn:   { text: "🍂 Autumn (Sep–Nov) ★★★★★\n\nCrystal-clear skies, stable weather. The best season overall — ideal for high-altitude treks.", chips: ['Book autumn trek', 'EBC in autumn'] },
  monsoon:  { text: "🌧 Monsoon (Jun–Aug) ★★☆☆☆\n\nLush green landscapes but heavy rain on trails. Best for Mustang & Dolpo (rain shadow). Good for cultural trips.", chips: ['Mustang in monsoon', 'Cultural tour'] },
  winter:   { text: "❄ Winter (Dec–Feb) ★★★☆☆\n\nCold at altitude but peaceful — fewer crowds. Great for Kathmandu, Pokhara, Lumbini. Some passes close.", chips: ['Winter destinations', 'Pokhara in winter'] },
  campaign: {
    text: "The 0.5% Campaign 🌏\n\nIf just 0.5% of India & China travelers visit Nepal:\n• 14.2M potential visitors\n• $4.2B revenue\n• 820,000 new jobs\n\nYour trip rebuilds Nepal's future.",
    chips: ['How it works', 'Join the movement', 'Impact calculator'],
  },
  pokhara: {
    text: "Pokhara — City of Lakes 🏞\n\nWake to Machapuchare's reflection in Phewa Lake. Paraglide at sunrise. Watch mountains turn gold from Sarangkot. 3–5 days of magic.",
    chips: ['Paragliding', 'Day treks', 'Pokhara to Annapurna'],
  },
  poonhill: { text: "🌄 Poon Hill (4–5 days)\n\nThe most rewarding short trek in Nepal. 3,210 m summit, panoramic views of Annapurna & Dhaulagiri. Perfect for beginners.", chips: ['Book Poon Hill', 'Best season', 'Packing list'] },
  mustang:  { text: "🗻 Upper Mustang (10–14 days)\n\nThe Forbidden Kingdom. Arid desert landscapes, ancient caves, Lo Manthang walled city. Special permit required ($500/10 days).", chips: ['Book Mustang', 'Permits needed', 'Best season'] },
  default: {
    text: "Namaste! 🙏 I'm Guide AI — your Nepal travel companion.\n\nWhat would you like to explore?",
    options: [
      { label: '🥾 Plan a Trek',        value: 'I want to plan a trek' },
      { label: '🪷 Spiritual Journey',  value: 'Tell me about spiritual journeys' },
      { label: '📋 Visa & Permits',     value: 'What visa do I need?' },
      { label: '💰 Budget Planning',    value: 'How much does Nepal cost?' },
    ],
  },
};

function getAiResponse(msg: string): AiMsg {
  const m = msg.toLowerCase();
  if (/everest|ebc|base camp|sagarmatha/.test(m))   return RESPONSES.everest;
  if (/annapurna|circuit|thorong/.test(m))           return RESPONSES.annapurna;
  if (/poon hill|ghorepani/.test(m))                 return RESPONSES.poonhill;
  if (/mustang|lo manthang/.test(m))                 return RESPONSES.mustang;
  if (/spirit|buddha|lumbini|temple|monastery|pray/.test(m)) return RESPONSES.spiritual;
  if (/cultur|festival|heritage|newari|dance/.test(m))       return RESPONSES.culture;
  if (/trek|hik|trail|climb|mountain|peak/.test(m))          return RESPONSES.trekking;
  if (/budget|cost|price|money|cheap|how much/.test(m))      return RESPONSES.budget;
  if (/visa|permit|tims|passport|entry/.test(m))             return RESPONSES.visa;
  if (/spring|march|april|may/.test(m))              return RESPONSES.spring;
  if (/autumn|september|october|november/.test(m))   return RESPONSES.autumn;
  if (/monsoon|june|july|august/.test(m))            return RESPONSES.monsoon;
  if (/winter|december|january|february/.test(m))    return RESPONSES.winter;
  if (/weather|season|best time|when.*visit|month/.test(m))  return RESPONSES.weather;
  if (/0\.5|campaign|movement|half percent/.test(m)) return RESPONSES.campaign;
  if (/pokhara|phewa|sarangkot/.test(m))             return RESPONSES.pokhara;
  return RESPONSES.default;
}

// ─── Lotus icon ────────────────────────────────────────────────────────────
function Lotus({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" style={{ flexShrink: 0 }}>
      <circle cx="20" cy="20" r="18" fill="rgba(31,138,77,0.12)" stroke={W.gold} strokeWidth="1"/>
      <circle cx="20" cy="20" r="6"  fill="none" stroke={W.gold} strokeWidth="0.6" opacity="0.6"/>
      <path d="M20 6 Q25 14 20 20 Q15 14 20 6" fill="rgba(31,138,77,0.18)" stroke={W.gold} strokeWidth="0.5"/>
      <path d="M34 20 Q26 25 20 20 Q26 15 34 20" fill="rgba(31,138,77,0.18)" stroke={W.gold} strokeWidth="0.5"/>
      <path d="M20 34 Q15 26 20 20 Q25 26 20 34" fill="rgba(31,138,77,0.18)" stroke={W.gold} strokeWidth="0.5"/>
      <path d="M6 20 Q14 15 20 20 Q14 25 6 20" fill="rgba(31,138,77,0.18)" stroke={W.gold} strokeWidth="0.5"/>
    </svg>
  );
}

// ─── Typing dots ───────────────────────────────────────────────────────────
function TypingDots() {
  return (
    <div style={{ display:'flex', alignItems:'flex-end', gap:'8px' }}>
      <Lotus size={26} />
      <div style={{ background:W.card, border:`1px solid ${W.border}`, borderRadius:'14px 14px 14px 3px', padding:'10px 14px', display:'flex', gap:'4px', alignItems:'center' }}>
        {[0,1,2].map(i => (
          <div key={i} style={{ width:'6px', height:'6px', borderRadius:'50%', background:W.gold,
            animation:`fab-pulse 1.2s ease-in-out ${i*0.18}s infinite` }} />
        ))}
      </div>
    </div>
  );
}

// ─── Message bubble ────────────────────────────────────────────────────────
type Msg = { role:'user'|'ai'; text:string; chips?:Chip[]; options?:{label:string;value:string}[]; ts:number };

function BubbleRow({ msg, onOption }: { msg: Msg; onOption:(v:string)=>void }) {
  const isAI = msg.role === 'ai';
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'6px', alignItems: isAI ? 'flex-start' : 'flex-end' }}>
      {/* Avatar + bubble */}
      <div style={{ display:'flex', alignItems:'flex-end', gap:'8px', maxWidth:'88%', flexDirection: isAI ? 'row' : 'row-reverse' }}>
        {isAI && <Lotus size={26} />}
        <div style={{
          background: isAI ? W.card : W.userBg,
          border: isAI ? `1px solid ${W.border}` : 'none',
          borderRadius: isAI ? '14px 14px 14px 3px' : '14px 14px 3px 14px',
          padding:'11px 14px',
          borderLeft: isAI ? `2px solid rgba(31,138,77,0.28)` : 'none',
        }}>
          {isAI && (
            <div style={{ fontFamily:W.mono, fontSize:'8px', letterSpacing:'0.12em', color:W.gold, marginBottom:'4px', textTransform:'uppercase' }}>
              Guide AI
            </div>
          )}
          <div style={{ fontFamily:W.sans, fontSize:'13px', lineHeight:1.7, whiteSpace:'pre-wrap', color: isAI ? W.text : W.userTxt }}>
            {msg.text.split(/(\*\*.*?\*\*)/g).map((p,i) =>
              p.startsWith('**') && p.endsWith('**')
                ? <strong key={i} style={{ color: isAI ? W.gold : W.userTxt, fontWeight:600 }}>{p.slice(2,-2)}</strong>
                : p
            )}
          </div>
          <div style={{ fontFamily:W.mono, fontSize:'8px', color: isAI ? W.faint : 'rgba(255,255,255,0.65)', marginTop:'5px', letterSpacing:'0.03em' }}>
            {new Date(msg.ts).toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' })}
          </div>
        </div>
      </div>

      {/* Option buttons (wizard-style, like screenshot) */}
      {isAI && msg.options && msg.options.length > 0 && (
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'7px', paddingLeft:'34px', width:'100%', maxWidth:'320px' }}>
          {msg.options.map(opt => (
            <button key={opt.value} onClick={() => onOption(opt.value)} style={{
              fontFamily:W.sans, fontSize:'12px', color:W.text,
              background:'transparent', border:`1px solid ${W.border}`,
              borderRadius:'8px', padding:'9px 10px', cursor:'pointer',
              textAlign:'left', transition:'all 0.18s', lineHeight:1.3,
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = W.gold; (e.currentTarget as HTMLButtonElement).style.background = W.goldF; (e.currentTarget as HTMLButtonElement).style.color = W.gold; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = W.border; (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = W.text; }}
            >{opt.label}</button>
          ))}
        </div>
      )}

      {/* Quick chips */}
      {isAI && msg.chips && msg.chips.length > 0 && (
        <div style={{ display:'flex', flexWrap:'wrap', gap:'5px', paddingLeft:'34px', maxWidth:'320px' }}>
          {msg.chips.map(c => (
            <button key={c} onClick={() => onOption(c)} style={{
              fontFamily:W.sans, fontSize:'11px', color:W.gold,
              background:'rgba(31,138,77,0.08)', border:`1px solid rgba(31,138,77,0.25)`,
              borderRadius:'14px', padding:'5px 12px', cursor:'pointer', transition:'all 0.18s', whiteSpace:'nowrap',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(31,138,77,0.15)'; (e.currentTarget as HTMLButtonElement).style.borderColor = W.gold; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(31,138,77,0.08)'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(31,138,77,0.25)'; }}
            >{c}</button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Chat window ───────────────────────────────────────────────────────────
function ChatWindow({ onClose }: { onClose:()=>void }) {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const r = RESPONSES.default;
    setMsgs([{ role:'ai', text: r.text, options: r.options, ts: Date.now() }]);
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView?.({ behavior:'smooth', block:'end' });
  }, [msgs, typing]);

  const send = useCallback((text: string) => {
    if (!text.trim()) return;
    setMsgs(prev => [...prev, { role:'user', text: text.trim(), ts: Date.now() }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      const r = getAiResponse(text);
      setMsgs(prev => [...prev, { role:'ai', text: r.text, chips: r.chips, options: r.options, ts: Date.now() }]);
      setTyping(false);
    }, 800 + Math.random() * 800);
  }, []);

  return (
    <div className="fab-chat-window" style={{
      position:'fixed', bottom:'84px', right:'24px', zIndex:9999,
      width:'360px', height:'520px',
      background:W.bg, border:`1px solid ${W.border}`,
      borderRadius:'18px', overflow:'hidden',
      display:'flex', flexDirection:'column',
      boxShadow:'0 20px 60px rgba(10,46,26,0.18), 0 4px 16px rgba(10,46,26,0.10)',
      animation:'fab-slideUp 0.28s cubic-bezier(0.34,1.56,0.64,1)',
    }}>

      {/* Header */}
      <div style={{ padding:'14px 16px', display:'flex', alignItems:'center', justifyContent:'space-between', background:W.surface, borderBottom:`1px solid ${W.border}`, flexShrink:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
          <Lotus size={30} />
          <div>
            <div style={{ fontFamily:W.sans, fontSize:'14px', fontWeight:600, color:W.text, lineHeight:1.1 }}>Guide AI</div>
            <div style={{ fontFamily:W.mono, fontSize:'8px', letterSpacing:'0.08em', color:W.gold, display:'flex', alignItems:'center', gap:'4px', marginTop:'2px' }}>
              <span style={{ width:'5px', height:'5px', borderRadius:'50%', background:'#2ec56b', display:'inline-block', flexShrink:0 }}/>
              Online · Nepal expert
            </div>
          </div>
        </div>
        <button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', color:W.muted, padding:'4px', display:'flex', borderRadius:'6px', transition:'color 0.15s' }}
          onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.color = W.text}
          onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.color = W.muted}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>

      {/* Messages */}
      <div style={{ flex:1, overflowY:'auto', padding:'14px 14px 8px', display:'flex', flexDirection:'column', gap:'10px', scrollbarWidth:'thin', scrollbarColor:`${W.faint} transparent` }}>
        {msgs.map((m, i) => <BubbleRow key={i} msg={m} onOption={send} />)}
        {typing && <TypingDots />}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div style={{ padding:'10px 12px 12px', background:W.surface, borderTop:`1px solid ${W.border}`, flexShrink:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:'8px', background:W.card, border:`1px solid ${W.border}`, borderRadius:'12px', padding:'5px 6px 5px 14px', transition:'border-color 0.2s' }}
          onFocus={e => (e.currentTarget as HTMLDivElement).style.borderColor = W.borderH}
          onBlur={e => (e.currentTarget as HTMLDivElement).style.borderColor = W.border}
        >
          <input ref={inputRef} type="text" value={input} className="fab-chat-input"
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key==='Enter' && !e.shiftKey) { e.preventDefault(); send(input); } }}
            placeholder="Ask about Nepal…"
            style={{ flex:1, background:'none', border:'none', outline:'none', color:W.text, fontFamily:W.sans, fontSize:'13px', padding:'6px 0', caretColor:W.gold }}
          />
          <button onClick={() => send(input)} disabled={!input.trim()} style={{
            background: input.trim() ? W.gold : W.surface, border:'none', borderRadius:'9px',
            width:'32px', height:'32px', display:'flex', alignItems:'center', justifyContent:'center',
            cursor: input.trim() ? 'pointer' : 'default', transition:'all 0.18s', flexShrink:0,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={input.trim() ? '#ffffff' : W.faint} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── FAB button ────────────────────────────────────────────────────────────
function FabButton({ open, onClick, hasUnread }: { open:boolean; onClick:()=>void; hasUnread:boolean }) {
  return (
    <button onClick={onClick} style={{
      position:'fixed', bottom:'24px', right:'24px', zIndex:9999,
      width:'54px', height:'54px', borderRadius:'50%',
      background: open ? W.gold : '#0a2e1a',
      border:`1.5px solid ${open ? W.gold : 'rgba(10,46,26,0.25)'}`,
      cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
      boxShadow: open ? `0 0 0 4px rgba(31,138,77,0.15), 0 8px 24px rgba(10,46,26,0.25)` : '0 6px 20px rgba(10,46,26,0.25)',
      transition:'all 0.25s cubic-bezier(0.34,1.56,0.64,1)',
      transform: open ? 'scale(0.94)' : 'scale(1)',
    }}
    onMouseEnter={e => { if (!open) { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.08)'; (e.currentTarget as HTMLButtonElement).style.borderColor = W.gold; } }}
    onMouseLeave={e => { if (!open) { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(10,46,26,0.25)'; } }}
    >
      {open ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      ) : (
        <Lotus size={30} />
      )}
      {/* Unread dot */}
      {hasUnread && !open && (
        <span style={{ position:'absolute', top:'4px', right:'4px', width:'10px', height:'10px', borderRadius:'50%', background:'#2ec56b', border:'2px solid #0a2e1a' }} />
      )}
    </button>
  );
}

// ─── Root widget ───────────────────────────────────────────────────────────
export function FloatingGuideAI() {
  const [open, setOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const location = useLocation();

  // Hide on /ai-guide page (full page is already there)
  if (location.pathname === '/ai-guide') return null;

  function toggle() {
    setOpen(o => !o);
    if (!open) setHasUnread(false);
  }

  return (
    <>
      <style>{`
        @keyframes fab-pulse {
          0%, 100% { opacity: 0.35; transform: scale(0.82); }
          50%       { opacity: 1;    transform: scale(1); }
        }
        @keyframes fab-slideUp {
          from { opacity: 0; transform: translateY(16px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .fab-chat-scroll::-webkit-scrollbar { width: 4px; }
        .fab-chat-scroll::-webkit-scrollbar-track { background: transparent; }
        .fab-chat-scroll::-webkit-scrollbar-thumb { background: rgba(31,138,77,0.22); border-radius: 4px; }
        .fab-chat-input::placeholder { color: rgba(10,46,26,0.38); }

        /* Mobile: adapt window to viewport width */
        @media (max-width: 440px) {
          .fab-chat-window {
            width: calc(100vw - 32px) !important;
            right: 16px !important;
            bottom: 80px !important;
            height: min(480px, 78vh) !important;
            border-radius: 14px !important;
          }
        }
        /* FAB button: keep above bottom nav on iOS */
        @media (max-width: 768px) {
          .fab-chat-window {
            bottom: 80px !important;
          }
        }
      `}</style>

      {open && <ChatWindow onClose={() => setOpen(false)} />}
      <FabButton open={open} onClick={toggle} hasUnread={hasUnread} />
    </>
  );
}
