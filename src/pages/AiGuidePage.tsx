import { useState, useEffect, useRef, useCallback } from 'react';
import { NavBar } from '@/components/ui/nav-bar';

// ─── VFY Design tokens (exact match to v2 design) ─────────────────────────
const VFY = {
  paper:      '#faf5ea',
  cream:      '#f4ede0',
  card:       '#ebe2d1',
  ink:        '#181410',
  gold:       '#8a4e12',
  goldFaint:  'rgba(138,78,18,0.09)',
  goldBorder: 'rgba(138,78,18,0.22)',
  saffron:    '#1e77c1',
  saffronF:   'rgba(30,119,193,0.08)',
  terra:      '#e03030',
  orange:     '#c94b10',
  text:       '#181410',
  muted:      '#3d342b',
  faint:      '#6b5c50',
  border:     'rgba(24,20,16,0.10)',
  borderH:    'rgba(24,20,16,0.26)',
  serif:  "'Cormorant Garamond', Georgia, serif",
  sans:   "'Mukta', system-ui, sans-serif",
  mono:   "'JetBrains Mono', ui-monospace, monospace",
  bebas:  "'Bebas Neue', sans-serif",
  radius:   '8px',
  radiusLg: '14px',
};

// ─── Assets ────────────────────────────────────────────────────────────────
const A = {
  himalayas: '/Himalayas Landscape.png',
  spiritual: '/spirtual Distination.webp',
  buddhism:  '/Buddhism.webp',
  nepaliArt: '/nepali art.jpeg',
  logo:      '/o.5 logo.png',
};

// ─── Data ──────────────────────────────────────────────────────────────────
const DESTINATIONS = [
  { id:'ebc',         name:'Everest Base Camp',          region:'Solukhumbu', type:['adventure','nature'],
    difficulty:'challenging', budget:'mid',     duration:'12–14 days', altitude:'5,364 m',
    bestSeason:['spring','autumn'],
    image:'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format',
    desc:'Walk in the footsteps of legends to the foot of the world\'s tallest peak.',
    highlights:['Namche Bazaar','Tengboche Monastery','Kala Patthar sunrise'] },
  { id:'abc',         name:'Annapurna Circuit',           region:'Annapurna',  type:['adventure','culture'],
    difficulty:'challenging', budget:'budget',  duration:'14–21 days', altitude:'5,416 m',
    bestSeason:['spring','autumn'],
    image:'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800&auto=format',
    desc:'The classic Nepal trek through diverse landscapes and cultures.',
    highlights:['Thorong La Pass','Muktinath Temple','Manang Valley'] },
  { id:'lumbini',     name:'Lumbini — Birthplace of Buddha', region:'Rupandehi', type:['spiritual','culture'],
    difficulty:'relaxed',    budget:'budget',  duration:'2–3 days',   altitude:'150 m',
    bestSeason:['spring','autumn','winter'],
    image: A.buddhism,
    desc:'Where the light of enlightenment first touched the world.',
    highlights:['Maya Devi Temple','World Peace Pagoda','Monastic zone'] },
  { id:'pokhara',     name:'Pokhara & Phewa Lake',        region:'Kaski',      type:['nature','adventure'],
    difficulty:'moderate',   budget:'mid',     duration:'3–5 days',   altitude:'822 m',
    bestSeason:['spring','autumn','winter'],
    image:'https://images.unsplash.com/photo-1558799401-1dcba79834c2?w=800&auto=format',
    desc:'The gateway to the Annapurnas — serene lakes and mountain views.',
    highlights:['Phewa Lake boating','Sarangkot sunrise','Paragliding'] },
  { id:'chitwan',     name:'Chitwan National Park',       region:'Chitwan',    type:['nature','adventure'],
    difficulty:'relaxed',    budget:'mid',     duration:'2–4 days',   altitude:'150 m',
    bestSeason:['spring','autumn','winter'],
    image:'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800&auto=format',
    desc:'Jungle safaris, one-horned rhinos and Bengal tigers in their natural habitat.',
    highlights:['Jungle safari','Canoe ride','Tharu cultural dance'] },
  { id:'ktm-heritage',name:'Kathmandu Heritage Walk',     region:'Kathmandu',  type:['culture','spiritual'],
    difficulty:'relaxed',    budget:'budget',  duration:'1–2 days',   altitude:'1,400 m',
    bestSeason:['spring','autumn','winter'],
    image:'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&auto=format',
    desc:'Seven UNESCO sites woven through the living heart of the city.',
    highlights:['Pashupatinath','Boudhanath Stupa','Durbar Square'] },
  { id:'mustang',     name:'Upper Mustang',               region:'Mustang',    type:['adventure','culture'],
    difficulty:'moderate',   budget:'premium', duration:'10–14 days', altitude:'3,840 m',
    bestSeason:['monsoon','spring','autumn'],
    image:'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800&auto=format',
    desc:'The forbidden kingdom — arid desert landscapes and ancient Lo Manthang.',
    highlights:['Lo Manthang walled city','Sky caves','Kali Gandaki gorge'] },
  { id:'poonhill',    name:'Poon Hill Trek',              region:'Annapurna',  type:['adventure','nature'],
    difficulty:'moderate',   budget:'budget',  duration:'4–5 days',   altitude:'3,210 m',
    bestSeason:['spring','autumn','winter'],
    image: A.himalayas,
    desc:'Short, rewarding trek with the greatest mountain panorama in Nepal.',
    highlights:['Poon Hill sunrise','Ghorepani village','Rhododendron forests'] },
];

const DEALS = [
  { id:'d1', title:'Spring Everest Trek',          dest:'ebc',         originalPrice:1400, price:1190, badge:'15% off',
    desc:'Full 14-day guided EBC trek, tea house stays, permits included.' },
  { id:'d2', title:'Lumbini Spiritual Retreat',     dest:'lumbini',     price:450,          badge:'New',
    desc:'3-day guided pilgrimage with meditation sessions and monastery visits.' },
  { id:'d3', title:'Annapurna + Chitwan Combo',     dest:'abc',         originalPrice:1800, price:1500, badge:'Save $300',
    desc:'Trek the mountains then explore the jungle — the ultimate Nepal combo.' },
  { id:'d4', title:'Kathmandu Heritage Walk',       dest:'ktm-heritage',price:85,           badge:'Best value',
    desc:'Full-day guided walk across all 7 UNESCO World Heritage Sites.' },
];

const WIZARD_STEPS = [
  { id:'interest', question:'What calls you to Nepal?', sub:'Choose the experience that speaks to your soul.',
    options:[
      { value:'adventure', label:'Adventure & Trekking', icon:'⛰', accent:'#1e77c1' },
      { value:'spiritual',  label:'Spiritual Journey',   icon:'🪷', accent:'#8a4e12' },
      { value:'culture',    label:'Cultural Immersion',  icon:'🎭', accent:'#c94b10' },
      { value:'nature',     label:'Nature & Wildlife',   icon:'🌿', accent:'#2d6a2d' },
    ] },
  { id:'duration', question:'How long will your journey be?', sub:'Longer stays allow deeper exploration.',
    options:[
      { value:'short',    label:'3–5 Days',   icon:'📅', sub:'Weekend escape' },
      { value:'week',     label:'One Week',   icon:'🗓', sub:'Most popular' },
      { value:'twoweek',  label:'Two Weeks',  icon:'🌙', sub:'Full experience' },
      { value:'month',    label:'A Month +',  icon:'🏔', sub:'Deep immersion' },
    ] },
  { id:'fitness', question:'Your comfort with physical activity?', sub:'Nepal has something for every level.',
    options:[
      { value:'relaxed',    label:'Relaxed & Easy',    icon:'🧘', sub:'City walks, gentle paths' },
      { value:'moderate',   label:'Moderate Walks',    icon:'🚶', sub:'Hill trails, short treks' },
      { value:'challenging',label:'Challenging Treks', icon:'🥾', sub:'High altitude, multi-day' },
      { value:'extreme',    label:'Extreme Adventure', icon:'🧗', sub:'Peak climbing, expeditions' },
    ] },
  { id:'budget', question:'Your daily budget comfort?', sub:'Nepal offers incredible value at every tier.',
    options:[
      { value:'budget',  label:'Budget',    icon:'💰', sub:'$30–60 / day' },
      { value:'mid',     label:'Mid-Range', icon:'💎', sub:'$60–120 / day' },
      { value:'premium', label:'Premium',   icon:'✨', sub:'$120–250 / day' },
      { value:'luxury',  label:'Luxury',    icon:'👑', sub:'$250+ / day' },
    ] },
  { id:'season', question:'When are you planning to visit?', sub:'Each season reveals a different Nepal.',
    options:[
      { value:'spring',  label:'Spring',  icon:'🌸', sub:'Mar – May · Peak trek' },
      { value:'monsoon', label:'Monsoon', icon:'🌧', sub:'Jun – Aug · Lush green' },
      { value:'autumn',  label:'Autumn',  icon:'🍂', sub:'Sep – Nov · Crystal skies' },
      { value:'winter',  label:'Winter',  icon:'❄',  sub:'Dec – Feb · Quiet trails' },
    ] },
];

// ─── Types ─────────────────────────────────────────────────────────────────
type Dest = typeof DESTINATIONS[0];
type Deal = typeof DEALS[0];
type Sels = Record<string, string>;
type Media = { image: string; title: string; sub?: string };
type AiResp = { text: string; media?: Media[]; deal?: Deal; chips?: string[] };

// ─── Recommendation engine ─────────────────────────────────────────────────
function getRecommendations(sel: Sels): (Dest & { score: number })[] {
  return DESTINATIONS.map(d => {
    let score = 0;
    if (d.type.includes(sel.interest)) score += 4;
    const fm: Record<string, string[]> = { relaxed:['relaxed'], moderate:['moderate','relaxed'], challenging:['challenging'], extreme:['challenging'] };
    if ((fm[sel.fitness] || []).includes(d.difficulty)) score += 3;
    if (d.budget === sel.budget) score += 2;
    if (d.bestSeason.includes(sel.season)) score += 3;
    const dm: Record<string,[number,number]> = { short:[1,5], week:[4,8], twoweek:[10,21], month:[14,60] };
    const [lo, hi] = dm[sel.duration] || [1,60];
    const days = parseInt(d.duration);
    if (!isNaN(days) && days >= lo && days <= hi) score += 2;
    return { ...d, score };
  }).sort((a,b) => b.score - a.score).slice(0, 3);
}

// ─── AI response engine ────────────────────────────────────────────────────
const AI_RESPONSES: Record<string, AiResp> = {
  everest: {
    text:"Ah, the great Sagarmatha — the forehead of the sky. The journey to Everest Base Camp is not merely a trek; it is a pilgrimage of body and spirit. The path takes you through Sherpa villages, ancient monasteries, and landscapes that humble even the most seasoned travelers.\n\nThe trek typically takes 12–14 days from Lukla. Spring and Autumn offer the clearest skies. Shall I help you plan this journey?",
    media:[{image:'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format',title:'Everest Base Camp',sub:'5,364 m · Solukhumbu'},{image:'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800&auto=format',title:'The Himalayan Trail',sub:'Trekking through the clouds'}],
    chips:['What permits do I need?','Best time to go?','How much does it cost?','Show me deals'], deal: DEALS[0] },
  annapurna: {
    text:"The Annapurna Circuit — a journey that circles the mighty Annapurna massif, crossing the Thorong La Pass at 5,416 meters. Nepal's most diverse trek: subtropical forests, arid highland desert, and ancient Tibetan villages.\n\n14–21 days of transformation. Every step tells a different story.",
    media:[{image:'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800&auto=format',title:'Annapurna Circuit',sub:'14–21 days · The Classic'},{image: A.himalayas,title:'Mountain Panorama',sub:'Views that change your perspective'}],
    chips:['Compare with Everest','Packing list','Best season','Book this trek'], deal: DEALS[2] },
  spiritual: {
    text:"Nepal is where heaven meets earth. The birthplace of Lord Buddha in Lumbini, the sacred Pashupatinath temple on the Bagmati River, the serene white dome of Boudhanath — each place carries centuries of devotion and wisdom.\n\nFor a spiritual journey, begin at Boudhanath Stupa in Kathmandu, then Pashupatinath, then journey south to Lumbini.",
    media:[{image: A.buddhism,title:'Buddhist Heritage',sub:'The path of enlightenment'},{image: A.spiritual,title:'Spiritual Nepal',sub:'Ancient temples & living traditions'}],
    chips:['Tell me about Lumbini','Meditation retreats','Temple etiquette','Spiritual tour package'], deal: DEALS[1] },
  culture: {
    text:"Nepal's cultural tapestry is woven from over 120 ethnic groups, each with their own language, dress, and traditions. The Kathmandu Valley alone holds seven UNESCO World Heritage Sites.\n\nFrom Newari architecture to Tharu dances, from prayer flags to living goddesses — culture in Nepal is alive.",
    media:[{image: A.nepaliArt,title:'Nepali Artistry',sub:'Living cultural traditions'},{image:'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&auto=format',title:'Kathmandu Heritage',sub:'Seven UNESCO sites'}],
    chips:['Heritage walk','Festival calendar','Traditional crafts','Cultural homestays'], deal: DEALS[3] },
  trekking: {
    text:"In Nepal, we say the mountains do not merely stand — they call. Whether you seek a gentle 4-day Poon Hill sunrise trek or the legendary 14-day Everest Base Camp journey, the Himalayas offer paths for every soul.\n\nBest seasons: Spring (Mar–May) and Autumn (Sep–Nov). All treks require a TIMS card and national park permits.",
    media:[{image: A.himalayas,title:'Himalayan Trails',sub:'Paths for every soul'}],
    chips:['Best trek for beginners','Everest vs Annapurna','Trekking permits','Packing essentials'] },
  wildlife: {
    text:"Chitwan National Park — a UNESCO World Heritage Site where one-horned rhinos graze in tall grasslands and Bengal tigers roam the sal forests. Best visited October to March.",
    media:[{image:'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800&auto=format',title:'Chitwan National Park',sub:'UNESCO World Heritage'}],
    chips:['Safari packages','Best time for wildlife','Bardia National Park'] },
  booking: {
    text:"Let me guide you through planning your Nepal trip:\n\n• **Visa**: On arrival at Tribhuvan Airport — $30 for 15 days\n• **Trekking permits**: TIMS card ($20) + park entry ($35–50)\n• **Guide options**: Self-guided, licensed guide ($45/day), or full package ($120/day)\n• **Accommodation**: Tea houses on treks, boutique hotels in cities",
    media:[{image:'https://images.unsplash.com/photo-1558799401-1dcba79834c2?w=800&auto=format',title:'Plan Your Journey',sub:'We handle the details'}],
    chips:['Guide options','Visa process','Book accommodation','Full package deals'] },
  budget: {
    text:"Nepal is one of Asia's most affordable destinations:\n\n• **Budget**: $30–60/day — tea houses, local food\n• **Mid-range**: $60–120/day — boutique hotels, guides\n• **Premium**: $120–250/day — luxury lodges, internal flights\n• **Luxury**: $250+/day — bespoke itineraries, helicopter tours\n\nA 14-day Everest Base Camp trek: $1,200–2,500 all-in.",
    media:[{image: A.himalayas,title:'Budget Planning',sub:'Value at every level'}],
    chips:['Show cheapest treks','Premium packages','How to save money'] },
  visa: {
    text:"Tourist visa on arrival at Tribhuvan International Airport:\n\n• **15 days** — $30 USD\n• **30 days** — $50 USD\n• **90 days** — $125 USD\n• **Indian citizens** — No visa required\n\nFor trekking: TIMS card ($20) + national park entry ($35–50). Upper Mustang requires a special permit ($500 for 10 days).",
    media:[{image:'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&auto=format',title:'Entry Requirements',sub:'Visa & permits made simple'}],
    chips:['TIMS card details','Restricted area permits','Entry from India'] },
  weather: {
    text:"Nepal's four seasons — each a different world:\n\n🌸 **Spring (Mar–May)** — Peak trekking. Rhododendrons, clear skies. ★★★★★\n🌧 **Monsoon (Jun–Aug)** — Lush but wet. Best for Mustang. ★★☆☆☆\n🍂 **Autumn (Sep–Nov)** — Crystal skies, the very best. ★★★★★\n❄ **Winter (Dec–Feb)** — Quiet trails, pleasant valleys. ★★★☆☆",
    media:[{image: A.himalayas,title:'Four Seasons',sub:'Each reveals a different Nepal'}],
    chips:['Best month for Everest','Monsoon trekking','Winter in Kathmandu'] },
  campaign: {
    text:"The 0.5% Campaign is a visionary movement: if just half a percent of travelers from India and China visit Nepal annually:\n\n• **14.2 million** potential visitors\n• **$4.2 billion** in projected revenue\n• **820,000** new jobs created\n\nYour journey through Guide AI contributes to Nepal's future. Travel with purpose.",
    chips:['How does 0.5% work?','Impact calculator','Join the movement','Book with purpose'] },
  pokhara: {
    text:"Pokhara — the city of lakes, the gateway to the Annapurnas. Wake to the reflection of Machapuchare in Phewa Lake. Paraglide at sunrise. Watch the sun paint the Himalayas gold from Sarangkot.\n\n3–5 days of pure magic.",
    media:[{image:'https://images.unsplash.com/photo-1558799401-1dcba79834c2?w=800&auto=format',title:'Pokhara',sub:'City of Lakes'}],
    chips:['Paragliding info','Day treks from Pokhara','Pokhara to Annapurna'] },
  food: {
    text:"The soul of Nepal is in its food. Dal Bhat — lentils, rice, vegetables and pickles, endlessly varied across regions. On every street corner, warm momos steam in the mornings.\n\nSeek out Newari cuisine in Kathmandu. In the mountains, yak butter tea warms the spirit when the wind bites cold.",
    media:[{image: A.nepaliArt,title:'Nepali Cuisine',sub:'Dal Bhat, momos & more'}],
    chips:['Best restaurants Kathmandu','Street food guide','Cooking classes'] },
  default: {
    text:"Namaste, traveler. I am Guide AI — your Nepal companion from the peaks that touch the sky to the temples that touch the soul.\n\nAsk me anything: trekking routes, spiritual journeys, cultural experiences, permits and visas, seasonal planning, or booking help. The path is yours to choose.",
    media:[{image: A.himalayas,title:'Discover Nepal',sub:'Where every path leads to wonder'}],
    chips:['Plan a trek','Spiritual journey','Best time to visit','Budget guide','Show deals','About 0.5%'] },
};

function generateAIResponse(msg: string): AiResp {
  const m = msg.toLowerCase();
  const patterns: [string, RegExp][] = [
    ['everest',  /everest|ebc|base camp|sagarmatha|khumbu/],
    ['annapurna',/annapurna|abc|circuit|thorong|poon hill/],
    ['spiritual',/spirit|meditat|buddha|lumbini|temple|monastery|pashupatinath|boudha|pray|enlighten/],
    ['culture',  /cultur|festival|heritage|art|music|dance|newari|tharu|durbar/],
    ['trekking', /trek|hik|walk|trail|climb|mountain|peak/],
    ['wildlife', /wildlife|chitwan|jungle|safari|tiger|rhino|bird|bardia/],
    ['booking',  /book|reserv|hotel|stay|accommodat|guide|porter/],
    ['budget',   /budget|cost|price|money|cheap|expens|afford|how much/],
    ['visa',     /visa|permit|tims|document|passport|entry/],
    ['weather',  /weather|season|rain|snow|temperature|when.*visit|best time|month/],
    ['campaign', /0\.5|campaign|movement|vfy|half percent|impact/],
    ['pokhara',  /pokhara|fewa|phewa|sarangkot|lakeside/],
    ['food',     /food|eat|cuisine|restaurant|dal bhat|momo|cook/],
  ];
  for (const [key, rx] of patterns) if (rx.test(m)) return { ...AI_RESPONSES[key] };
  return { ...AI_RESPONSES.default };
}

// ─── Lotus Avatar ──────────────────────────────────────────────────────────
function LotusAvatar({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" style={{ flexShrink: 0 }}>
      <circle cx="20" cy="20" r="18" fill="rgba(138,78,18,0.12)" stroke={VFY.gold} strokeWidth="0.8"/>
      <circle cx="20" cy="20" r="6"  fill="none" stroke={VFY.gold} strokeWidth="0.5" opacity="0.6"/>
      <path d="M20 6 Q25 14 20 20 Q15 14 20 6"   fill="rgba(138,78,18,0.22)" stroke={VFY.gold} strokeWidth="0.4"/>
      <path d="M34 20 Q26 25 20 20 Q26 15 34 20" fill="rgba(138,78,18,0.22)" stroke={VFY.gold} strokeWidth="0.4"/>
      <path d="M20 34 Q15 26 20 20 Q25 26 20 34" fill="rgba(138,78,18,0.22)" stroke={VFY.gold} strokeWidth="0.4"/>
      <path d="M6 20 Q14 15 20 20 Q14 25 6 20"   fill="rgba(138,78,18,0.22)" stroke={VFY.gold} strokeWidth="0.4"/>
      <path d="M10 10 Q16 16 20 20 Q14 14 10 10" fill="rgba(138,78,18,0.13)" stroke={VFY.gold} strokeWidth="0.3"/>
      <path d="M30 10 Q24 16 20 20 Q26 14 30 10" fill="rgba(138,78,18,0.13)" stroke={VFY.gold} strokeWidth="0.3"/>
      <path d="M30 30 Q24 24 20 20 Q26 26 30 30" fill="rgba(138,78,18,0.13)" stroke={VFY.gold} strokeWidth="0.3"/>
      <path d="M10 30 Q16 24 20 20 Q14 26 10 30" fill="rgba(138,78,18,0.13)" stroke={VFY.gold} strokeWidth="0.3"/>
    </svg>
  );
}

// ─── Typing Dots ───────────────────────────────────────────────────────────
function TypingDots() {
  return (
    <div style={{ display:'flex', alignItems:'flex-start', gap:'8px', padding:'2px 0' }}>
      <LotusAvatar size={28} />
      <div style={{ background:VFY.cream, border:`1px solid ${VFY.border}`, borderRadius:'10px 10px 10px 2px', padding:'12px 16px', display:'flex', gap:'5px', alignItems:'center' }}>
        {[0,1,2].map(i => (
          <div key={i} style={{ width:'6px', height:'6px', borderRadius:'50%', background:VFY.gold,
            animation:`guideAI2-pulse 1.2s ease-in-out ${i*0.2}s infinite` }} />
        ))}
      </div>
    </div>
  );
}

// ─── Message Bubble ────────────────────────────────────────────────────────
type Msg = { id: string; role: 'ai'|'user'; text: string; ts: number };

function MessageBubble({ msg }: { msg: Msg }) {
  const isAI = msg.role === 'ai';
  return (
    <div style={{ display:'flex', alignItems:'flex-start', gap:'8px', padding:'2px 0', flexDirection: isAI ? 'row' : 'row-reverse' }}>
      {isAI && <LotusAvatar size={28} />}
      <div style={{
        maxWidth: isAI ? '84%' : '76%',
        background: isAI ? VFY.cream : VFY.ink,
        border: isAI ? `1px solid ${VFY.border}` : 'none',
        borderRadius: isAI ? '10px 10px 10px 2px' : '10px 10px 2px 10px',
        padding:'13px 16px',
        borderLeft: isAI ? `2px solid ${VFY.goldBorder}` : 'none',
      }}>
        {isAI && (
          <div style={{ fontFamily:VFY.mono, fontSize:'8px', letterSpacing:'0.12em', color:VFY.gold, marginBottom:'5px', textTransform:'uppercase' }}>
            Guide AI
          </div>
        )}
        <div style={{ fontFamily:VFY.sans, fontSize:'14px', lineHeight:1.75, whiteSpace:'pre-wrap', color: isAI ? VFY.text : VFY.cream }}>
          {msg.text.split(/(\*\*.*?\*\*)/g).map((p, i) =>
            p.startsWith('**') && p.endsWith('**')
              ? <strong key={i} style={{ color: isAI ? VFY.gold : '#ebe2d1', fontWeight:600 }}>{p.slice(2,-2)}</strong>
              : p
          )}
        </div>
        <div style={{ fontFamily:VFY.mono, fontSize:'8px', color: isAI ? VFY.faint : 'rgba(244,237,224,0.4)', marginTop:'6px', letterSpacing:'0.03em' }}>
          {new Date(msg.ts).toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' })}
        </div>
      </div>
    </div>
  );
}

// ─── Quick Chips ───────────────────────────────────────────────────────────
function QuickChips({ chips, onSelect }: { chips: string[]; onSelect: (c:string)=>void }) {
  if (!chips?.length) return null;
  return (
    <div style={{ display:'flex', flexWrap:'wrap', gap:'6px', padding:'4px 0 4px 36px' }}>
      {chips.map(c => (
        <button key={c} onClick={() => onSelect(c)} style={{
          fontFamily:VFY.sans, fontSize:'11px', color:VFY.gold, background:VFY.goldFaint,
          border:`1px solid ${VFY.border}`, borderRadius:'16px', padding:'5px 13px',
          cursor:'pointer', transition:'all 0.18s', whiteSpace:'nowrap',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = VFY.gold; (e.currentTarget as HTMLButtonElement).style.background = 'rgba(138,78,18,0.14)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = VFY.border; (e.currentTarget as HTMLButtonElement).style.background = VFY.goldFaint; }}
        >{c}</button>
      ))}
    </div>
  );
}

// ─── Media Panel ───────────────────────────────────────────────────────────
function MediaPanel({ media, deal }: { media: Media[] | null; deal: Deal | null }) {
  if (!media?.length && !deal) {
    return (
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100%', padding:'40px', opacity:0.5 }}>
        <LotusAvatar size={50} />
        <div style={{ fontFamily:VFY.serif, fontSize:'16px', fontStyle:'italic', color:VFY.muted, marginTop:'14px', textAlign:'center', lineHeight:1.6 }}>
          Media & recommendations<br/>appear as you chat
        </div>
      </div>
    );
  }
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
      {media?.map((item, i) => (
        <div key={i} style={{ borderRadius:VFY.radius, overflow:'hidden', border:`1px solid ${VFY.border}`, background:VFY.cream, transition:'border-color 0.25s' }}
          onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = VFY.borderH}
          onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = VFY.border}
        >
          <img src={item.image} alt={item.title} style={{ width:'100%', height:'140px', objectFit:'cover', display:'block' }} />
          <div style={{ padding:'11px 14px' }}>
            <div style={{ fontFamily:VFY.serif, fontSize:'15px', fontWeight:500, color:VFY.text }}>{item.title}</div>
            {item.sub && <div style={{ fontFamily:VFY.mono, fontSize:'9px', color:VFY.faint, marginTop:'3px', letterSpacing:'0.04em' }}>{item.sub}</div>}
          </div>
        </div>
      ))}
      {deal && (
        <div style={{ background:`linear-gradient(135deg, rgba(138,78,18,0.07), rgba(201,75,16,0.04))`, border:`1px solid ${VFY.borderH}`, borderRadius:VFY.radius, padding:'16px 18px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'6px' }}>
            <div style={{ fontFamily:VFY.mono, fontSize:'8px', letterSpacing:'0.14em', textTransform:'uppercase', color:VFY.gold }}>Featured Deal</div>
            <span style={{ fontFamily:VFY.mono, fontSize:'8px', background:VFY.orange, color:'#fff', padding:'2px 7px', borderRadius:'2px' }}>{deal.badge}</span>
          </div>
          <div style={{ fontFamily:VFY.serif, fontSize:'17px', fontWeight:500, color:VFY.text, marginBottom:'5px' }}>{deal.title}</div>
          <p style={{ fontFamily:VFY.sans, fontSize:'12px', color:VFY.muted, margin:'0 0 10px', lineHeight:1.6 }}>{deal.desc}</p>
          <div style={{ display:'flex', alignItems:'baseline', gap:'8px' }}>
            <span style={{ fontFamily:VFY.bebas, fontSize:'22px', color:VFY.gold }}>${deal.price}</span>
            {deal.originalPrice && <span style={{ fontFamily:VFY.mono, fontSize:'10px', color:VFY.faint, textDecoration:'line-through' }}>${deal.originalPrice}</span>}
          </div>
          <button style={{ marginTop:'10px', width:'100%', fontFamily:VFY.mono, fontSize:'9px', letterSpacing:'0.14em', textTransform:'uppercase', background:VFY.ink, color:VFY.cream, border:'none', borderRadius:'3px', padding:'9px 0', cursor:'pointer' }}>
            Book This Deal →
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Mini Chat Widget (for landing hero preview) ───────────────────────────
function MiniChatWidget({ onOpen }: { onOpen: ()=>void }) {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [chips, setChips] = useState<string[]>([]);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMsgs([{ id:'g', role:'ai', ts: Date.now(), text:"Namaste! I'm Guide AI — ask me anything about Nepal: treks, spiritual journeys, visa, or best time to visit." }]);
    setChips(['Plan a trek','Spiritual journey','Visa & permits','Budget guide']);
  }, []);

  useEffect(() => {
    if (endRef.current?.parentElement) endRef.current.parentElement.scrollTop = endRef.current.parentElement.scrollHeight;
  }, [msgs, typing]);

  const send = useCallback((text: string) => {
    if (!text.trim()) return;
    setMsgs(p => [...p, { id: Date.now()+'', role:'user', ts: Date.now(), text: text.trim() }]);
    setInput(''); setChips([]); setTyping(true);
    setTimeout(() => {
      const r = generateAIResponse(text);
      setMsgs(p => [...p, { id: (Date.now()+1)+'', role:'ai', ts: Date.now(), text: r.text }]);
      setChips(r.chips?.slice(0,3) || []);
      setTyping(false);
    }, 800 + Math.random() * 800);
  }, []);

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', background:VFY.paper, borderRadius:'12px', overflow:'hidden', border:`1px solid ${VFY.border}`, boxShadow:'0 4px 32px rgba(24,20,16,0.10)' }}>
      {/* Header */}
      <div style={{ padding:'12px 16px', display:'flex', alignItems:'center', justifyContent:'space-between', borderBottom:`1px solid ${VFY.border}`, background:VFY.cream, flexShrink:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:'9px' }}>
          <LotusAvatar size={26} />
          <div>
            <div style={{ fontFamily:VFY.serif, fontSize:'15px', fontWeight:500, color:VFY.text, lineHeight:1.1 }}>Guide AI</div>
            <div style={{ fontFamily:VFY.mono, fontSize:'8px', letterSpacing:'0.08em', color:VFY.gold, display:'flex', alignItems:'center', gap:'4px' }}>
              <span style={{ width:'5px', height:'5px', borderRadius:'50%', background:'#4ade80', display:'inline-block' }}/>
              Online · Nepal expert
            </div>
          </div>
        </div>
        <button onClick={onOpen} style={{ fontFamily:VFY.mono, fontSize:'8px', letterSpacing:'0.10em', textTransform:'uppercase', background:'transparent', color:VFY.gold, border:`1px solid ${VFY.border}`, borderRadius:'3px', padding:'4px 10px', cursor:'pointer' }}>
          Full Page ↗
        </button>
      </div>

      {/* Messages */}
      <div style={{ flex:1, overflowY:'auto', padding:'12px 14px', display:'flex', flexDirection:'column', gap:'6px', background:VFY.paper }}>
        {msgs.map(m => {
          const isAI = m.role === 'ai';
          return (
            <div key={m.id} style={{ display:'flex', alignItems:'flex-start', gap:'7px', flexDirection: isAI ? 'row' : 'row-reverse' }}>
              {isAI && <LotusAvatar size={24} />}
              <div style={{ maxWidth:'84%', background: isAI ? VFY.cream : VFY.ink, border: isAI ? `1px solid ${VFY.border}` : 'none', borderLeft: isAI ? `2px solid ${VFY.goldBorder}` : 'none', borderRadius: isAI ? '9px 9px 9px 2px' : '9px 9px 2px 9px', padding:'10px 13px' }}>
                {isAI && <div style={{ fontFamily:VFY.mono, fontSize:'7px', letterSpacing:'0.1em', color:VFY.gold, marginBottom:'4px', textTransform:'uppercase' }}>Guide AI</div>}
                <div style={{ fontFamily:VFY.sans, fontSize:'12px', lineHeight:1.7, color: isAI ? VFY.text : VFY.cream, whiteSpace:'pre-wrap' }}>
                  {m.text.length > 120 ? m.text.slice(0,120) + '…' : m.text}
                </div>
              </div>
            </div>
          );
        })}
        {typing && (
          <div style={{ display:'flex', alignItems:'center', gap:'7px' }}>
            <LotusAvatar size={24} />
            <div style={{ background:VFY.cream, border:`1px solid ${VFY.border}`, borderRadius:'9px', padding:'10px 14px', display:'flex', gap:'4px' }}>
              {[0,1,2].map(i => <div key={i} style={{ width:'5px', height:'5px', borderRadius:'50%', background:VFY.gold, animation:`guideAI2-pulse 1.2s ease-in-out ${i*0.2}s infinite` }} />)}
            </div>
          </div>
        )}
        {chips.length > 0 && (
          <div style={{ display:'flex', flexWrap:'wrap', gap:'5px', paddingLeft:'31px' }}>
            {chips.map(c => (
              <button key={c} onClick={() => send(c)} style={{ fontFamily:VFY.sans, fontSize:'10px', color:VFY.gold, background:VFY.goldFaint, border:`1px solid ${VFY.border}`, borderRadius:'14px', padding:'4px 11px', cursor:'pointer', whiteSpace:'nowrap' }}>{c}</button>
            ))}
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div style={{ padding:'10px 12px', borderTop:`1px solid ${VFY.border}`, background:VFY.cream, flexShrink:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:'6px', background:VFY.paper, border:`1px solid ${VFY.border}`, borderRadius:'8px', padding:'4px 6px 4px 12px' }}>
          <input ref={inputRef} type="text" value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key==='Enter' && !e.shiftKey) { e.preventDefault(); send(input); } }}
            placeholder="Ask about Nepal…"
            style={{ flex:1, background:'none', border:'none', outline:'none', color:VFY.text, fontFamily:VFY.sans, fontSize:'12px', padding:'6px 0', caretColor:VFY.gold }}
          />
          <button onClick={() => send(input)} disabled={!input.trim()} style={{ background: input.trim() ? VFY.ink : VFY.card, border:'none', borderRadius:'6px', width:'28px', height:'28px', display:'flex', alignItems:'center', justifyContent:'center', cursor: input.trim() ? 'pointer' : 'default', flexShrink:0 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={input.trim() ? VFY.cream : VFY.faint} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Landing Page ──────────────────────────────────────────────────────────
function LandingPage({ onNavigate }: { onNavigate: (p:string)=>void }) {
  return (
    <div style={{ background:VFY.paper }}>

      {/* ── HERO ── */}
      <div className="guide-inner-pad" style={{ maxWidth:'1320px', margin:'0 auto', padding:'0 40px' }}>
        <div className="guide-hero-grid" style={{ display:'grid', gridTemplateColumns:'1fr 440px', gap:'60px', alignItems:'center', padding:'80px 0 72px' }}>

          {/* Left: Editorial copy */}
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'20px' }}>
              <span style={{ fontFamily:VFY.mono, fontSize:'10px', letterSpacing:'0.24em', textTransform:'uppercase', color:VFY.gold }}>
                Powered by AI · 0.5% Campaign
              </span>
            </div>

            <div style={{ lineHeight:0.88, marginBottom:'0px' }}>
              <div style={{ fontFamily:VFY.bebas, fontSize:'clamp(80px,12vw,160px)', letterSpacing:'0.02em', color:VFY.ink, lineHeight:0.9 }}>GUIDE</div>
              <div style={{ fontFamily:VFY.bebas, fontSize:'clamp(80px,12vw,160px)', letterSpacing:'0.02em', color:VFY.saffron, lineHeight:0.9 }}>AI.</div>
            </div>

            <div style={{ width:'64px', height:'2px', background:VFY.border, margin:'28px 0' }}/>

            <p style={{ fontFamily:VFY.serif, fontStyle:'italic', fontSize:'clamp(20px,2.4vw,30px)', fontWeight:400, color:VFY.muted, lineHeight:1.35, margin:'0 0 18px' }}>
              Your personal Nepal companion —<br/>from the peaks to the temples.
            </p>

            <p style={{ fontFamily:VFY.sans, fontWeight:300, fontSize:'15px', lineHeight:1.85, color:VFY.faint, maxWidth:'44ch', margin:'0 0 40px' }}>
              Plan treks, explore culture, discover spiritual destinations, book permits and get personalised deals — all through a calm, wise AI guide available 24/7.
            </p>

            <div style={{ display:'flex', gap:'12px', flexWrap:'wrap' }}>
              <button onClick={() => onNavigate('wizard')} style={{
                fontFamily:VFY.mono, fontSize:'10px', letterSpacing:'0.18em', textTransform:'uppercase',
                background:VFY.ink, color:VFY.cream, border:'none', borderRadius:'3px',
                padding:'14px 32px', cursor:'pointer', display:'flex', alignItems:'center', gap:'8px', transition:'opacity 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.opacity = '0.82'}
              onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.opacity = '1'}
              >
                🧭 Start Destination Wizard
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
              <button onClick={() => onNavigate('chat')} style={{
                fontFamily:VFY.mono, fontSize:'10px', letterSpacing:'0.18em', textTransform:'uppercase',
                background:'transparent', color:VFY.saffron, border:`1.5px solid ${VFY.saffron}`, borderRadius:'3px',
                padding:'14px 28px', cursor:'pointer', transition:'all 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = VFY.saffronF}
              onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'transparent'}
              >
                💬 Open Chat
              </button>
            </div>
          </div>

          {/* Right: Live mini chat */}
          <div className="guide-hero-chat-col" style={{ height:'560px', position:'sticky', top:'84px' }}>
            <MiniChatWidget onOpen={() => onNavigate('chat')} />
          </div>
        </div>
      </div>

      {/* ── STATS BAND (ink) ── */}
      <div style={{ background:VFY.ink }}>
        <div style={{ maxWidth:'1320px', margin:'0 auto', padding:'0 40px' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1px 1fr 1px 1fr', alignItems:'stretch', borderTop:'1px solid rgba(244,237,224,0.08)', borderBottom:'1px solid rgba(244,237,224,0.08)' }}>
            {[
              { num:'14.2M', label:'Potential Visitors',  sub:'From India & China combined' },
              null,
              { num:'$4.2B', label:'Annual Revenue',      sub:'Projected at 0.5% penetration' },
              null,
              { num:'820K',  label:'New Jobs Created',    sub:'Direct & indirect employment' },
            ].map((stat, i) => stat === null ? (
              <div key={i} className="guide-stats-divider" style={{ width:'1px', background:'rgba(244,237,224,0.08)' }} />
            ) : (
              <div key={i} className="guide-stat-cell" style={{ padding:'44px 40px' }}>
                <div style={{ fontFamily:VFY.bebas, fontSize:'clamp(44px,5vw,68px)', color:VFY.cream, letterSpacing:'0.02em', lineHeight:0.9, marginBottom:'10px' }}>{stat.num}</div>
                <div style={{ fontFamily:VFY.mono, fontSize:'9px', letterSpacing:'0.18em', textTransform:'uppercase', color:VFY.saffron, marginBottom:'5px' }}>{stat.label}</div>
                <div style={{ fontFamily:VFY.sans, fontSize:'12px', color:'rgba(244,237,224,0.45)', lineHeight:1.5 }}>{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CAPABILITIES ── */}
      <div className="guide-inner-pad guide-section-pad" style={{ maxWidth:'1320px', margin:'0 auto', padding:'90px 40px 80px' }}>
        <div style={{ marginBottom:'48px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'14px' }}>
            <span style={{ fontFamily:VFY.mono, fontSize:'10px', letterSpacing:'0.22em', textTransform:'uppercase', color:VFY.gold }}>What Guide AI Does</span>
          </div>
          <h2 style={{ fontFamily:VFY.serif, fontSize:'clamp(34px,4.5vw,58px)', fontWeight:400, color:VFY.ink, lineHeight:1.05, margin:0 }}>
            Plan. Discover. Book.<br/>
            <em style={{ color:VFY.gold }}>All in one place.</em>
          </h2>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1px', background:VFY.border, border:`1px solid ${VFY.border}`, borderRadius:VFY.radius, overflow:'hidden' }}>
          {[
            { icon:'🧭', num:'01', title:'Destination Wizard', desc:'A 5-step quiz that matches your interests, fitness level, budget and season to the perfect Nepal experience — from high-altitude treks to spiritual retreats.', cta:'Start Wizard', target:'wizard' },
            { icon:'💬', num:'02', title:'Live Chat Guide',    desc:'Ask anything, anytime. Guide AI responds with calm wisdom — trekking routes, visa requirements, cultural guidance, booking help and seasonal advice.', cta:'Open Chat', target:'chat' },
            { icon:'🎁', num:'03', title:'Deals & Bookings',  desc:'Personalised packages surface as you chat. From budget tea-house treks to premium lodge experiences — curated deals matched to your preferences.', cta:'See Deals', target:'chat' },
          ].map(f => (
            <div key={f.title} style={{ background:VFY.paper, padding:'36px 32px', display:'flex', flexDirection:'column', gap:'16px', transition:'background 0.25s' }}
              onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = VFY.cream}
              onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = VFY.paper}
            >
              <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between' }}>
                <span style={{ fontSize:'28px', lineHeight:1 }}>{f.icon}</span>
                <span style={{ fontFamily:VFY.bebas, fontSize:'48px', color:VFY.border, letterSpacing:'0.02em', lineHeight:1 }}>{f.num}</span>
              </div>
              <div style={{ fontFamily:VFY.serif, fontSize:'22px', fontWeight:500, color:VFY.text, lineHeight:1.15 }}>{f.title}</div>
              <p style={{ fontFamily:VFY.sans, fontSize:'14px', color:VFY.muted, lineHeight:1.75, margin:0, flex:1 }}>{f.desc}</p>
              <button onClick={() => onNavigate(f.target)} style={{
                fontFamily:VFY.mono, fontSize:'9px', letterSpacing:'0.16em', textTransform:'uppercase',
                background:'transparent', color:VFY.gold, border:'none', padding:0, cursor:'pointer',
                display:'flex', alignItems:'center', gap:'6px', alignSelf:'flex-start', transition:'gap 0.18s',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.gap = '10px'}
              onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.gap = '6px'}
              >
                {f.cta}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── QUICK TOPICS ── */}
      <div style={{ background:VFY.cream, borderTop:`1px solid ${VFY.border}`, borderBottom:`1px solid ${VFY.border}` }}>
        <div className="guide-inner-pad" style={{ maxWidth:'1320px', margin:'0 auto', padding:'52px 40px' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'24px', flexWrap:'wrap', gap:'12px' }}>
            <span style={{ fontFamily:VFY.mono, fontSize:'9px', letterSpacing:'0.2em', textTransform:'uppercase', color:VFY.faint }}>Ask Guide AI about</span>
            <button onClick={() => onNavigate('chat')} style={{ fontFamily:VFY.mono, fontSize:'9px', letterSpacing:'0.14em', textTransform:'uppercase', color:VFY.saffron, background:'transparent', border:'none', cursor:'pointer' }}>
              Open full chat →
            </button>
          </div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'10px' }}>
            {['Everest Base Camp','Annapurna Circuit','Spiritual Pilgrimage','Visa & Permits','Best Season','Budget Planning','Wildlife Safari','Pokhara Lakes','Cultural Heritage','0.5% Campaign'].map(q => (
              <button key={q} onClick={() => onNavigate('chat')} style={{
                fontFamily:VFY.sans, fontSize:'13px', color:VFY.muted, background:VFY.paper,
                border:`1px solid ${VFY.border}`, borderRadius:'20px', padding:'8px 18px',
                cursor:'pointer', transition:'all 0.18s',
              }}
              onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.color = VFY.gold; b.style.borderColor = VFY.gold; b.style.background = VFY.goldFaint; }}
              onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.color = VFY.muted; b.style.borderColor = VFY.border; b.style.background = VFY.paper; }}
              >{q}</button>
            ))}
          </div>
        </div>
      </div>

      {/* ── DEALS ── */}
      <div className="guide-inner-pad guide-section-pad" style={{ maxWidth:'1320px', margin:'0 auto', padding:'80px 40px' }}>
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:'36px', flexWrap:'wrap', gap:'16px' }}>
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'12px' }}>
              <span style={{ fontFamily:VFY.mono, fontSize:'10px', letterSpacing:'0.22em', textTransform:'uppercase', color:VFY.gold }}>Guide AI Deals</span>
            </div>
            <h2 style={{ fontFamily:VFY.serif, fontSize:'clamp(28px,3.5vw,46px)', fontWeight:400, color:VFY.ink, margin:0, lineHeight:1.1 }}>
              Top Packages, Curated for You
            </h2>
          </div>
          <button onClick={() => onNavigate('chat')} style={{
            fontFamily:VFY.mono, fontSize:'9px', letterSpacing:'0.16em', textTransform:'uppercase',
            color:VFY.saffron, background:'transparent', border:`1px solid rgba(30,119,193,0.3)`,
            borderRadius:'3px', padding:'8px 18px', cursor:'pointer',
          }}>
            Get personalised deals via chat →
          </button>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))', gap:'1px', background:VFY.border, border:`1px solid ${VFY.border}`, borderRadius:VFY.radius, overflow:'hidden' }}>
          {DEALS.map(deal => (
            <div key={deal.id} style={{ background:VFY.paper, padding:'28px 26px', display:'flex', flexDirection:'column', gap:'10px', cursor:'pointer', transition:'background 0.25s' }}
              onClick={() => onNavigate('chat')}
              onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = VFY.cream}
              onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = VFY.paper}
            >
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                <span style={{ fontFamily:VFY.serif, fontSize:'19px', fontWeight:500, color:VFY.text, lineHeight:1.2, flex:1, paddingRight:'10px' }}>{deal.title}</span>
                <span style={{ fontFamily:VFY.mono, fontSize:'8px', letterSpacing:'0.08em', background:VFY.orange, color:'#fff', padding:'3px 7px', borderRadius:'2px', whiteSpace:'nowrap', flexShrink:0 }}>{deal.badge}</span>
              </div>
              <p style={{ fontFamily:VFY.sans, fontSize:'13px', color:VFY.muted, margin:0, lineHeight:1.65, flex:1 }}>{deal.desc}</p>
              <div style={{ display:'flex', alignItems:'baseline', gap:'8px', paddingTop:'6px', borderTop:`1px solid ${VFY.border}` }}>
                <span style={{ fontFamily:VFY.bebas, fontSize:'26px', color:VFY.gold }}>${deal.price}</span>
                {deal.originalPrice && <span style={{ fontFamily:VFY.mono, fontSize:'10px', color:VFY.faint, textDecoration:'line-through' }}>${deal.originalPrice}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA BANNER ── */}
      <div style={{ background:VFY.ink }}>
        <div className="guide-inner-pad guide-cta-inner" style={{ maxWidth:'1320px', margin:'0 auto', padding:'80px 40px', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'32px' }}>
          <div>
            <div style={{ fontFamily:VFY.serif, fontStyle:'italic', fontSize:'clamp(28px,3.5vw,48px)', fontWeight:400, color:VFY.cream, lineHeight:1.1, marginBottom:'12px' }}>
              Ready to plan your journey?
            </div>
            <p style={{ fontFamily:VFY.sans, fontSize:'14px', color:'rgba(244,237,224,0.5)', margin:0, lineHeight:1.7 }}>
              Guide AI is available 24/7. Start with the Destination Wizard or jump straight into chat.
            </p>
          </div>
          <div style={{ display:'flex', gap:'12px', flexWrap:'wrap' }}>
            <button onClick={() => onNavigate('wizard')} style={{
              fontFamily:VFY.mono, fontSize:'10px', letterSpacing:'0.18em', textTransform:'uppercase',
              background:VFY.terra, color:VFY.cream, border:'none', borderRadius:'3px',
              padding:'14px 28px', cursor:'pointer', transition:'opacity 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.opacity = '0.85'}
            onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.opacity = '1'}
            >Start Wizard →</button>
            <button onClick={() => onNavigate('chat')} style={{
              fontFamily:VFY.mono, fontSize:'10px', letterSpacing:'0.18em', textTransform:'uppercase',
              background:'transparent', color:'rgba(244,237,224,0.6)', border:'1px solid rgba(244,237,224,0.18)',
              borderRadius:'3px', padding:'14px 28px', cursor:'pointer', transition:'all 0.2s',
            }}
            onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.color = VFY.cream; b.style.borderColor = 'rgba(244,237,224,0.4)'; }}
            onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.color = 'rgba(244,237,224,0.6)'; b.style.borderColor = 'rgba(244,237,224,0.18)'; }}
            >Open Chat</button>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <div style={{ background:VFY.ink, borderTop:'1px solid rgba(244,237,224,0.06)' }}>
        <div className="guide-inner-pad" style={{ maxWidth:'1320px', margin:'0 auto', padding:'24px 40px', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'12px' }}>
          <img src={A.logo} alt="0.5% Campaign" style={{ height:'32px', objectFit:'contain', opacity:0.7 }} />
          <span style={{ fontFamily:VFY.mono, fontSize:'9px', letterSpacing:'0.12em', color:'rgba(244,237,224,0.3)' }}>
            Guide AI · Part of the 0.5% Campaign · Nepal
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Wizard ────────────────────────────────────────────────────────────────
function WizardProgress({ current, total }: { current: number; total: number }) {
  return (
    <div style={{ display:'flex', gap:'5px' }}>
      {Array.from({ length: total }, (_,i) => (
        <div key={i} style={{ height:'3px', flex:1, borderRadius:'2px', background: i <= current ? VFY.gold : VFY.border, transition:'background 0.4s ease' }} />
      ))}
    </div>
  );
}

function WizardOptionCard({ opt, selected, onSelect }: { opt: { value:string; label:string; icon:string; sub?:string; accent?:string }; selected: string; onSelect: (v:string)=>void }) {
  const isSel = selected === opt.value;
  return (
    <button onClick={() => onSelect(opt.value)} style={{
      cursor:'pointer', background: isSel ? VFY.cream : VFY.paper,
      border: isSel ? `1.5px solid ${VFY.gold}` : `1px solid ${VFY.border}`,
      borderLeft: isSel ? `4px solid ${opt.accent || VFY.gold}` : `4px solid ${opt.accent || VFY.border}`,
      borderRadius:VFY.radius, padding:'22px 20px',
      display:'flex', flexDirection:'column', alignItems:'flex-start',
      textAlign:'left', transition:'all 0.25s ease',
      transform: isSel ? 'translateY(-2px)' : 'translateY(0)',
      boxShadow: isSel ? '0 4px 16px rgba(24,20,16,0.08)' : 'none',
      position:'relative',
    }}>
      <div style={{ fontSize:'26px', marginBottom:'10px', lineHeight:1 }}>{opt.icon}</div>
      <div style={{ fontFamily:VFY.serif, fontSize:'20px', fontWeight:500, color:VFY.text, lineHeight:1.2, marginBottom: opt.sub ? '5px' : 0 }}>{opt.label}</div>
      {opt.sub && <div style={{ fontFamily:VFY.mono, fontSize:'10px', letterSpacing:'0.06em', color: isSel ? VFY.gold : VFY.faint }}>{opt.sub}</div>}
      {isSel && (
        <div style={{ position:'absolute', top:'10px', right:'10px', width:'20px', height:'20px', borderRadius:'50%', background:VFY.gold, display:'flex', alignItems:'center', justifyContent:'center' }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={VFY.paper} strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
      )}
    </button>
  );
}

function ResultDestCard({ dest, rank }: { dest: Dest & { score: number }; rank: number }) {
  return (
    <div style={{ background:VFY.paper, border:`1px solid ${VFY.border}`, borderRadius:VFY.radiusLg, overflow:'hidden', display:'flex', flexDirection:'column', transition:'all 0.3s ease' }}
      onMouseEnter={e => { const d = e.currentTarget as HTMLDivElement; d.style.borderColor = VFY.gold; d.style.transform = 'translateY(-4px)'; d.style.boxShadow = '0 8px 28px rgba(24,20,16,0.10)'; }}
      onMouseLeave={e => { const d = e.currentTarget as HTMLDivElement; d.style.borderColor = VFY.border; d.style.transform = 'translateY(0)'; d.style.boxShadow = 'none'; }}
    >
      <div style={{ position:'relative', height:'160px', overflow:'hidden' }}>
        <img src={dest.image} alt={dest.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, transparent 30%, rgba(24,20,16,0.70) 100%)' }} />
        <div style={{ position:'absolute', top:'10px', left:'10px', background:VFY.gold, color:VFY.paper, fontFamily:VFY.mono, fontSize:'8px', letterSpacing:'0.12em', fontWeight:700, padding:'3px 9px', borderRadius:'3px' }}>
          #{rank} MATCH
        </div>
        <div style={{ position:'absolute', bottom:'10px', left:'14px', right:'14px' }}>
          <div style={{ fontFamily:VFY.serif, fontSize:'21px', fontWeight:500, color:'#faf5ea', lineHeight:1.1 }}>{dest.name}</div>
          <div style={{ fontFamily:VFY.mono, fontSize:'9px', color:'rgba(250,245,234,0.70)', letterSpacing:'0.05em', marginTop:'3px' }}>{dest.region} · {dest.altitude}</div>
        </div>
      </div>
      <div style={{ padding:'16px 18px', flex:1, display:'flex', flexDirection:'column', gap:'10px' }}>
        <p style={{ fontFamily:VFY.sans, fontSize:'13px', lineHeight:1.7, color:VFY.muted, margin:0, flex:1 }}>{dest.desc}</p>
        <div style={{ display:'flex', flexWrap:'wrap', gap:'5px' }}>
          {dest.highlights.map(h => (
            <span key={h} style={{ fontFamily:VFY.mono, fontSize:'9px', letterSpacing:'0.05em', color:VFY.gold, background:VFY.goldFaint, padding:'3px 9px', borderRadius:'3px' }}>{h}</span>
          ))}
        </div>
        <div style={{ borderTop:`1px solid ${VFY.border}`, paddingTop:'10px' }}>
          <span style={{ fontFamily:VFY.mono, fontSize:'9px', color:VFY.faint, letterSpacing:'0.03em' }}>
            {dest.duration} · {dest.bestSeason.map(s => s[0].toUpperCase()+s.slice(1)).join(', ')}
          </span>
        </div>
      </div>
    </div>
  );
}

function WizardFlow({ onNavigate }: { onNavigate: (p:string)=>void }) {
  const [step, setStep] = useState(0);
  const [sel, setSel] = useState<Sels>({});
  const [showResult, setShowResult] = useState(false);
  const [visible, setVisible] = useState(true);

  const cur = WIZARD_STEPS[step];
  const canGo = sel[cur?.id];

  function transition(fn: ()=>void) {
    setVisible(false);
    setTimeout(() => { fn(); setVisible(true); }, 240);
  }

  const recs = showResult ? getRecommendations(sel) : [];
  const relDeals = showResult ? DEALS.filter(d => recs.some(r => r.id === d.dest)) : [];

  return (
    <div style={{ minHeight:'calc(100vh - 64px)', background:VFY.paper, display:'flex', flexDirection:'column' }}>

      {/* Header bar */}
      <div className="guide-wizard-header" style={{ padding:'16px 32px', display:'flex', alignItems:'center', justifyContent:'space-between', borderBottom:`1px solid ${VFY.border}`, background:VFY.cream, flexShrink:0 }}>
        <button onClick={() => {
          if (showResult) transition(() => setShowResult(false));
          else if (step > 0) transition(() => setStep(s => s - 1));
          else onNavigate('landing');
        }} style={{ background:'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:'7px', fontFamily:VFY.sans, fontSize:'14px', color:VFY.muted }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Back
        </button>
        {!showResult ? (
          <div style={{ flex:1, maxWidth:'360px', margin:'0 20px' }}>
            <WizardProgress current={step} total={WIZARD_STEPS.length} />
          </div>
        ) : (
          <div style={{ fontFamily:VFY.mono, fontSize:'9px', letterSpacing:'0.16em', textTransform:'uppercase', color:VFY.gold }}>✧ Your Perfect Destinations ✧</div>
        )}
        <div style={{ fontFamily:VFY.mono, fontSize:'9px', color:VFY.faint, letterSpacing:'0.08em' }}>
          {showResult ? 'Results' : `${step+1} / ${WIZARD_STEPS.length}`}
        </div>
      </div>

      {/* Content */}
      <div className="guide-wizard-content" style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'40px 28px 36px', maxWidth:'840px', margin:'0 auto', width:'100%', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(10px)', transition:'opacity 0.28s ease, transform 0.28s ease' }}>
        {!showResult ? (
          <>
            <div style={{ textAlign:'center', marginBottom:'36px' }}>
              <div style={{ fontFamily:VFY.mono, fontSize:'9px', letterSpacing:'0.2em', textTransform:'uppercase', color:VFY.faint, marginBottom:'10px' }}>
                Step {step+1} — Destination Wizard
              </div>
              <h2 style={{ fontFamily:VFY.serif, fontSize:'clamp(26px,4vw,42px)', fontWeight:400, color:VFY.text, margin:'0 0 8px', lineHeight:1.15 }}>{cur.question}</h2>
              <p style={{ fontFamily:VFY.sans, fontSize:'14px', color:VFY.muted, margin:0 }}>{cur.sub}</p>
            </div>

            <div className="guide-wizard-options" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(180px, 1fr))', gap:'12px', width:'100%' }}>
              {cur.options.map(opt => (
                <WizardOptionCard key={opt.value} opt={opt} selected={sel[cur.id] || ''} onSelect={v => setSel(p => ({ ...p, [cur.id]: v }))} />
              ))}
            </div>

            <button onClick={() => {
              if (step < WIZARD_STEPS.length - 1) transition(() => setStep(s => s + 1));
              else transition(() => setShowResult(true));
            }} disabled={!canGo} style={{
              marginTop:'36px', fontFamily:VFY.mono, fontSize:'10px', letterSpacing:'0.18em', textTransform:'uppercase',
              background: canGo ? VFY.ink : VFY.card, color: canGo ? VFY.cream : VFY.faint,
              border:'none', borderRadius:'3px', padding:'13px 44px', cursor: canGo ? 'pointer' : 'default',
              transition:'all 0.25s', opacity: canGo ? 1 : 0.5,
            }}>
              {step === WIZARD_STEPS.length-1 ? 'See My Destinations' : 'Continue'} →
            </button>
          </>
        ) : (
          <>
            <div style={{ textAlign:'center', marginBottom:'32px' }}>
              <h2 style={{ fontFamily:VFY.serif, fontSize:'clamp(26px,4vw,44px)', fontWeight:400, color:VFY.text, margin:'0 0 8px', lineHeight:1.1 }}>Your Perfect Destinations</h2>
              <p style={{ fontFamily:VFY.sans, fontSize:'14px', color:VFY.muted, margin:0 }}>Matched to your interests, pace, budget and season</p>
            </div>

            <div className="guide-result-grid" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(240px, 1fr))', gap:'18px', width:'100%' }}>
              {recs.map((d, i) => <ResultDestCard key={d.id} dest={d} rank={i+1} />)}
            </div>

            <div style={{ display:'flex', gap:'12px', marginTop:'36px', flexWrap:'wrap', justifyContent:'center' }}>
              <button onClick={() => onNavigate('chat')} style={{ fontFamily:VFY.mono, fontSize:'10px', letterSpacing:'0.16em', textTransform:'uppercase', background:VFY.ink, color:VFY.cream, border:'none', borderRadius:'3px', padding:'13px 32px', cursor:'pointer' }}>
                💬 Talk to Guide AI
              </button>
              <button onClick={() => { setShowResult(false); setStep(0); setSel({}); }} style={{ fontFamily:VFY.mono, fontSize:'10px', letterSpacing:'0.16em', textTransform:'uppercase', background:'transparent', color:VFY.muted, border:`1px solid ${VFY.border}`, borderRadius:'3px', padding:'13px 32px', cursor:'pointer' }}>
                ↺ Start Over
              </button>
            </div>

            {relDeals.length > 0 && (
              <div style={{ marginTop:'44px', width:'100%' }}>
                <div style={{ fontFamily:VFY.mono, fontSize:'9px', letterSpacing:'0.2em', textTransform:'uppercase', color:VFY.gold, marginBottom:'14px', display:'flex', alignItems:'center', gap:'10px' }}>
                  Featured Deals for Your Trip
                </div>
                <div className="guide-deals-related" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(240px, 1fr))', gap:'12px' }}>
                  {relDeals.map(deal => (
                    <div key={deal.id} style={{ background:VFY.cream, border:`1px solid ${VFY.border}`, borderRadius:VFY.radius, padding:'16px 18px' }}>
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'6px' }}>
                        <span style={{ fontFamily:VFY.serif, fontSize:'17px', fontWeight:500, color:VFY.text, flex:1, paddingRight:'8px', lineHeight:1.2 }}>{deal.title}</span>
                        <span style={{ fontFamily:VFY.mono, fontSize:'8px', letterSpacing:'0.08em', background:VFY.orange, color:'#fff', padding:'3px 7px', borderRadius:'2px', whiteSpace:'nowrap', flexShrink:0 }}>{deal.badge}</span>
                      </div>
                      <p style={{ fontFamily:VFY.sans, fontSize:'12px', color:VFY.muted, margin:'0 0 10px', lineHeight:1.6 }}>{deal.desc}</p>
                      <div style={{ display:'flex', alignItems:'baseline', gap:'7px' }}>
                        <span style={{ fontFamily:VFY.bebas, fontSize:'22px', color:VFY.gold }}>${deal.price}</span>
                        {deal.originalPrice && <span style={{ fontFamily:VFY.mono, fontSize:'10px', color:VFY.faint, textDecoration:'line-through' }}>${deal.originalPrice}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ─── Chat Interface ────────────────────────────────────────────────────────
function ChatInterface({ onNavigate }: { onNavigate: (p:string)=>void }) {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [media, setMedia] = useState<Media[] | null>(null);
  const [deal, setDeal] = useState<Deal | null>(null);
  const [chips, setChips] = useState<string[]>([]);
  const [listening, setListening] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMsgs([{ id:'g', role:'ai', ts: Date.now(), text:'Namaste, traveler. I am Guide AI — your companion through the lands of Nepal, from the peaks that touch the sky to the temples that touch the soul.\n\nWhat would you like to explore today?' }]);
    setChips(['Plan a trek','Spiritual journey','Best time to visit','Budget guide','Show deals','About 0.5%']);
    setMedia([{ image: A.himalayas, title:'Discover Nepal', sub:'Where every path leads to wonder' }]);
  }, []);

  useEffect(() => {
    if (endRef.current?.parentElement) endRef.current.parentElement.scrollTop = endRef.current.parentElement.scrollHeight;
  }, [msgs, isTyping]);

  const send = useCallback((text: string) => {
    if (!text.trim()) return;
    setMsgs(p => [...p, { id: Date.now()+'', role:'user', ts: Date.now(), text: text.trim() }]);
    setInput(''); setChips([]); setIsTyping(true);
    setTimeout(() => {
      const r = generateAIResponse(text);
      setMsgs(p => [...p, { id: (Date.now()+1)+'', role:'ai', ts: Date.now(), text: r.text }]);
      setMedia(r.media || null);
      setDeal(r.deal || null);
      setChips(r.chips || []);
      setIsTyping(false);
    }, 900 + Math.random() * 1000);
  }, []);

  function handleVoice() {
    setListening(true);
    setTimeout(() => {
      const s = ['Tell me about Everest Base Camp','What is the best time to visit Nepal?','I want a spiritual journey','Show me budget options'];
      setInput(s[Math.floor(Math.random()*s.length)]);
      setListening(false);
      inputRef.current?.focus();
    }, 1800);
  }

  return (
    <div className="guide-chat-layout" style={{ display:'flex', height:'calc(100vh - 64px)', background:VFY.paper, overflow:'hidden' }}>

      {/* Chat column */}
      <div className="guide-chat-col" style={{ flex:1, display:'flex', flexDirection:'column', minWidth:0 }}>
        {/* Header */}
        <div className="guide-wizard-header" style={{ padding:'14px 24px', display:'flex', alignItems:'center', justifyContent:'space-between', borderBottom:`1px solid ${VFY.border}`, background:VFY.cream, flexShrink:0 }}>
          <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
            <button onClick={() => onNavigate('landing')} style={{ background:'none', border:'none', cursor:'pointer', color:VFY.muted, padding:'4px', display:'flex' }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            </button>
            <LotusAvatar size={28} />
            <div>
              <div style={{ fontFamily:VFY.serif, fontSize:'16px', fontWeight:500, color:VFY.text, lineHeight:1.1 }}>Guide AI</div>
              <div style={{ fontFamily:VFY.mono, fontSize:'8px', letterSpacing:'0.08em', color:VFY.gold, display:'flex', alignItems:'center', gap:'4px' }}>
                <span style={{ width:'5px', height:'5px', borderRadius:'50%', background:'#4ade80', display:'inline-block' }}/>
                Online · Nepal expert
              </div>
            </div>
          </div>
          <button onClick={() => onNavigate('wizard')} style={{ fontFamily:VFY.mono, fontSize:'8px', letterSpacing:'0.12em', textTransform:'uppercase', background:'transparent', color:VFY.gold, border:`1px solid ${VFY.border}`, borderRadius:'3px', padding:'5px 11px', cursor:'pointer', transition:'all 0.18s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = VFY.gold; (e.currentTarget as HTMLButtonElement).style.background = VFY.goldFaint; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = VFY.border; (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
          >🧭 Destination Wizard</button>
        </div>

        {/* Messages */}
        <div className="guide-chat-messages" style={{ flex:1, overflowY:'auto', padding:'18px 22px', display:'flex', flexDirection:'column', gap:'7px', background:VFY.paper }}>
          {/* spacer pushes content to bottom like a real chat app */}
          <div style={{ flex:1, minHeight:'8px' }} />
          {msgs.map(m => <MessageBubble key={m.id} msg={m} />)}
          {isTyping && <TypingDots />}
          <QuickChips chips={chips} onSelect={send} />
          <div ref={endRef} />
        </div>

        {/* Input */}
        <div style={{ padding:'12px 22px', borderTop:`1px solid ${VFY.border}`, background:VFY.cream, flexShrink:0 }}>
          <div style={{ display:'flex', alignItems:'center', gap:'8px', background:VFY.paper, border:`1px solid ${VFY.border}`, borderRadius:'10px', padding:'5px 7px 5px 14px', transition:'border-color 0.2s' }}
            onFocus={e => (e.currentTarget as HTMLDivElement).style.borderColor = VFY.borderH}
            onBlur={e => (e.currentTarget as HTMLDivElement).style.borderColor = VFY.border}
          >
            <button onClick={handleVoice} disabled={listening} style={{ background:'none', border:'none', cursor:'pointer', color: listening ? VFY.orange : VFY.faint, padding:'3px', display:'flex', flexShrink:0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                <line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
              </svg>
            </button>
            <input ref={inputRef} type="text" value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key==='Enter' && !e.shiftKey) { e.preventDefault(); send(input); } }}
              placeholder={listening ? 'Listening…' : 'Ask about Nepal — treks, culture, visa, deals…'}
              style={{ flex:1, background:'none', border:'none', outline:'none', color:VFY.text, fontFamily:VFY.sans, fontSize:'13px', padding:'7px 0', caretColor:VFY.gold }}
            />
            <button onClick={() => send(input)} disabled={!input.trim()} style={{
              background: input.trim() ? VFY.ink : VFY.card, border:'none', borderRadius:'7px',
              width:'32px', height:'32px', display:'flex', alignItems:'center', justifyContent:'center',
              cursor: input.trim() ? 'pointer' : 'default', transition:'all 0.18s', flexShrink:0,
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={input.trim() ? VFY.cream : VFY.faint} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>
          {listening && (
            <div style={{ fontFamily:VFY.mono, fontSize:'9px', color:VFY.orange, textAlign:'center', marginTop:'6px', letterSpacing:'0.08em' }}>
              🎙 Listening…
            </div>
          )}
        </div>
      </div>

      {/* Media panel */}
      <div className="guide-chat-media" style={{ width:'310px', flexShrink:0, borderLeft:`1px solid ${VFY.border}`, background:VFY.cream, overflowY:'auto', padding:'18px' }}>
        <div style={{ fontFamily:VFY.mono, fontSize:'9px', letterSpacing:'0.16em', textTransform:'uppercase', color:VFY.gold, marginBottom:'14px', display:'flex', alignItems:'center', gap:'8px' }}>
          Related
        </div>
        <MediaPanel media={media} deal={deal} />
      </div>
    </div>
  );
}

// ─── Keyframes + responsive CSS ────────────────────────────────────────────
const STYLES = `
  @keyframes guideAI2-pulse {
    0%, 100% { opacity: 0.35; transform: scale(0.82); }
    50%       { opacity: 1;    transform: scale(1); }
  }

  /* ── Guide AI — Responsive Layout ── */

  /* Tablet ≤1024px: hero 2-col → 1-col */
  @media (max-width: 1024px) {
    .guide-hero-grid {
      grid-template-columns: 1fr !important;
      gap: 36px !important;
      padding: 56px 0 48px !important;
    }
    .guide-hero-chat-col {
      height: 420px !important;
      position: static !important;
      top: auto !important;
    }
    .guide-inner-pad {
      padding-left: 24px !important;
      padding-right: 24px !important;
    }
  }

  /* Mobile ≤768px */
  @media (max-width: 768px) {
    .guide-hero-grid {
      padding: 36px 0 24px !important;
      gap: 24px !important;
    }
    .guide-hero-chat-col {
      height: 360px !important;
    }
    .guide-inner-pad {
      padding-left: 16px !important;
      padding-right: 16px !important;
    }
    /* Stats band: hide dividers, reduce padding */
    .guide-stats-divider { display: none !important; }
    .guide-stat-cell { padding: 28px 20px !important; }
    /* CTA banner: stack */
    .guide-cta-inner {
      flex-direction: column !important;
      gap: 24px !important;
      align-items: flex-start !important;
    }
    .guide-cta-inner > div:last-child {
      width: 100% !important;
    }
    /* Section vertical rhythm */
    .guide-section-pad { padding: 56px 0 !important; }
  }

  /* Chat interface: hide 310px media panel on ≤900px */
  @media (max-width: 900px) {
    .guide-chat-layout {
      flex-direction: column !important;
      height: calc(100vh - 64px) !important;
      overflow: hidden !important;
    }
    .guide-chat-media { display: none !important; }
    .guide-chat-col   { min-width: 0 !important; flex: 1 !important; display: flex !important; flex-direction: column !important; overflow: hidden !important; }
    .guide-chat-messages {
      flex: 1 !important;
      overflow-y: auto !important;
      max-height: none !important;
    }
  }

  /* Wizard: reduce padding on mobile */
  @media (max-width: 768px) {
    .guide-wizard-header { padding: 12px 16px !important; }
    .guide-wizard-content {
      padding: 28px 16px 24px !important;
      justify-content: flex-start !important;
    }
    .guide-wizard-options {
      grid-template-columns: 1fr 1fr !important;
    }
    .guide-result-grid {
      grid-template-columns: 1fr !important;
    }
    .guide-deals-related {
      grid-template-columns: 1fr !important;
    }
  }
  @media (max-width: 480px) {
    .guide-wizard-options {
      grid-template-columns: 1fr !important;
    }
  }
`;

// ─── Root Page ─────────────────────────────────────────────────────────────
export default function AiGuidePage() {
  const [page, setPage] = useState<'landing'|'wizard'|'chat'>(() =>
    (localStorage.getItem('guideai-page') as 'landing'|'wizard'|'chat') || 'landing'
  );

  function navigate(p: string) {
    const pg = p as 'landing'|'wizard'|'chat';
    setPage(pg);
    localStorage.setItem('guideai-page', p);
    window.scrollTo(0, 0);
  }

  return (
    <>
      <style>{STYLES}</style>
      <div style={{ fontFamily: VFY.sans, color: VFY.text }}>
        <NavBar />
        <div style={{ paddingTop:'64px' }}>
          {page === 'landing' && <LandingPage  onNavigate={navigate} />}
          {page === 'wizard'  && <WizardFlow   onNavigate={navigate} />}
          {page === 'chat'    && <ChatInterface onNavigate={navigate} />}
        </div>
      </div>
    </>
  );
}
