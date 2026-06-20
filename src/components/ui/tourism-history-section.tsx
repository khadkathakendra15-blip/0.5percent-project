import { useEffect, useRef, useState } from 'react';
import { Chart, type ChartArea, type Plugin } from 'chart.js/auto';

/* ─── main theme tokens — matches surrounding sections exactly ───────────── */
const C = {
  ink:      '#0a2e1a',
  ink2:     '#144428',
  inkSoft:  '#3d7855',
  inkFaint: '#82b395',
  cream:    '#eaf7ee',
  cream2:   '#d8f3e2',
  paper:    '#fafdfa',
  saffron:  '#1f8a4d',
  terra:    '#DC143C',
  lineS:    'rgba(10,46,26,0.08)',
};
const SERIF = "'Cormorant Garamond', Georgia, serif";
const BEBAS = "'Bebas Neue', sans-serif";
const MUKTA = "'Mukta', system-ui, sans-serif";
const MONO  = "'JetBrains Mono', ui-monospace, monospace";

/* ─── chart data ─────────────────────────────────────────────────────────── */
const LABELS = [
  '1968','1972','1976','1980','1984','1988','1992','1996',
  '2000','2002','2004','2006','2008','2010','2012','2014',
  '2015','2016','2017','2018','2019','2020','2021','2022',
  '2023','2024','2025','2026',
];
const DATA = [
  12, 50, 95, 160, 195, 265, 334, 393,
  464, 275, 298, 384, 500, 603, 735, 790,
  538, 753, 940, 1173, 1197, 230, 150, 616,
  850, 1050, 780, 1100,
];
const DROP_IDX = [2, 7, 14, 16, 21, 22, 26];
const HIGH_IDX = [6, 11, 15, 20, 24, 27];
const MARKED   = [2, 6, 7, 11, 14, 15, 16, 20, 21, 22, 24, 26, 27];
const CRISIS_RANGES: [number,number][] = [[2,4],[7,10],[14,17],[21,23],[25,27]];
const isInCrisis = (i: number) => CRISIS_RANGES.some(([s,e]) => i>=s && i<=e);
const xPx = (chart: Chart, year: string) =>
  chart.scales.x.getPixelForValue(LABELS.indexOf(year));

/* ─── inline annotation plugin ───────────────────────────────────────────── */
const annotationPlugin: Plugin<'line'> = {
  id: 'crisisAnnotations',

  beforeDatasetsDraw(chart) {
    const { ctx, chartArea: a } = chart;
    if (!a) return;
    ctx.save();
    const boxes = [
      { x1:'1972', x2:'1976', bg:'rgba(255,0,0,0.05)',   border:'rgba(255,0,0,0.15)' },
      { x1:'1996', x2:'2004', bg:'rgba(255,0,0,0.05)',   border:'rgba(255,0,0,0.15)' },
      { x1:'2020', x2:'2022', bg:'rgba(255,0,0,0.08)',   border:'rgba(255,0,0,0.20)' },
    ];
    for (const b of boxes) {
      const x1=xPx(chart,b.x1), x2=xPx(chart,b.x2);
      ctx.fillStyle=b.bg;   ctx.fillRect(x1,a.top,x2-x1,a.bottom-a.top);
      ctx.strokeStyle=b.border; ctx.lineWidth=1;
      ctx.strokeRect(x1,a.top,x2-x1,a.bottom-a.top);
    }
    ctx.restore();
  },

  afterDraw(chart) {
    const { ctx, chartArea: a } = chart;
    if (!a) return;
    ctx.save();
    ctx.textBaseline = 'middle';

    // box labels
    const boxLabels = [
      { x1:'1972', x2:'1976', line1:'Cannabis ban',    pct:'−28%', color:C.terra  },
      { x1:'1996', x2:'2004', line1:'Maoist conflict', pct:'−30%', color:C.terra  },
      { x1:'2020', x2:'2022', line1:'COVID-19',        pct:'−80%', color:C.terra  },
    ];
    ctx.font=`600 10px ${MONO}`; ctx.textAlign='center';
    for (const bl of boxLabels) {
      const mx=(xPx(chart,bl.x1)+xPx(chart,bl.x2))/2;
      ctx.fillStyle=bl.color;
      ctx.fillText(bl.line1, mx, a.top+14);
      ctx.fillText(bl.pct,   mx, a.top+27);
    }

    // vertical dashed lines + pill labels
    const vLines = [
      { year:'2015', lineColor:'rgba(255,120,0,0.50)',  label:'Earthquake  −32%',  labelColor:'#DC143C' },
      { year:'2025', lineColor:'rgba(255,0,0,0.38)',    label:'2025 unrest  −26%', labelColor:C.terra   },
      { year:'2026', lineColor:'rgba(31,138,77,0.50)', label:'New era  +41%',      labelColor:C.saffron },
    ];
    ctx.font=`600 9.5px ${MONO}`;
    for (const vl of vLines) {
      const x=xPx(chart,vl.year);
      ctx.strokeStyle=vl.lineColor; ctx.lineWidth=1.5; ctx.setLineDash([4,3]);
      ctx.beginPath(); ctx.moveTo(x,a.top); ctx.lineTo(x,a.bottom); ctx.stroke();
      ctx.setLineDash([]);
      const tw=ctx.measureText(vl.label).width;
      const pad=4, lx=x+6, ly=a.top+20;
      // pill bg — use ink for contrast on light chart
      ctx.fillStyle='rgba(10,46,26,0.82)';
      ctx.beginPath(); ctx.roundRect(lx-pad,ly-9,tw+pad*2,16,3); ctx.fill();
      ctx.fillStyle=vl.labelColor; ctx.textAlign='left';
      ctx.fillText(vl.label,lx,ly);
    }
    ctx.restore();
  },
};

/* ─── scroll-reveal ──────────────────────────────────────────────────────── */
function useReveal(delay=0, dir:'up'|'left'|'right'='up') {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const el=ref.current; if(!el) return;
    el.style.opacity='0';
    const tx=dir==='left'?'-36px':dir==='right'?'36px':'0px';
    const ty=dir==='up'?'28px':'0px';
    el.style.transform=`translate(${tx},${ty})`;
    el.style.transition=`opacity .85s cubic-bezier(.2,.6,.2,1) ${delay}s,transform .85s cubic-bezier(.2,.6,.2,1) ${delay}s`;
    const obs=new IntersectionObserver(
      ([e])=>{ if(e.isIntersecting){ el.style.opacity='1'; el.style.transform='none'; obs.disconnect(); }},
      {threshold:0.06,rootMargin:'0px 0px -4% 0px'},
    );
    obs.observe(el);
    const t=setTimeout(()=>{ el.style.opacity='1'; el.style.transform='none'; },1600);
    return ()=>{ obs.disconnect(); clearTimeout(t); };
  },[delay,dir]);
  return ref;
}

/* ─── stat card ──────────────────────────────────────────────────────────── */
function StatCard({label,value,sub,accent}:
  {label:string;value:string;sub:string;accent:'crisis'|'growth'}) {
  const color=accent==='crisis'?C.terra:C.saffron;
  return (
    <div className="tourism-stat-card" style={{padding:'16px 20px', background:C.paper,
      border:`1px solid ${C.lineS}`, borderRadius:'4px'}}>
      <div className="tourism-stat-label" style={{fontFamily:MONO,fontSize:'10px',letterSpacing:'0.24em',
        textTransform:'uppercase',color:C.inkFaint,marginBottom:'6px'}}>{label}</div>
      <div className="tourism-stat-val" style={{fontFamily:BEBAS,fontSize:'40px',lineHeight:0.9,color}}>{value}</div>
      <div style={{fontFamily:MUKTA,fontSize:'12px',color:C.inkSoft,
        marginTop:'6px',lineHeight:1.4}}>{sub}</div>
    </div>
  );
}

/* ─── chart ──────────────────────────────────────────────────────────────── */
function TourismChart() {
  const canvasRef=useRef<HTMLCanvasElement>(null);
  const chartRef =useRef<Chart|null>(null);
  const [err,setErr]=useState('');

  useEffect(()=>{
    try {
      const canvas=canvasRef.current; if(!canvas) return;
      Chart.getChart(canvas)?.destroy();
      chartRef.current?.destroy(); chartRef.current=null;
      const ctx2d=canvas.getContext('2d'); if(!ctx2d) return;

      const ptBg =DATA.map((_,i)=>DROP_IDX.includes(i)?C.terra:HIGH_IDX.includes(i)?C.saffron:'transparent');
      const ptBdr=DATA.map((_,i)=>DROP_IDX.includes(i)?C.terra:HIGH_IDX.includes(i)?C.saffron:'transparent');
      const ptR  =DATA.map((_,i)=>MARKED.includes(i)?6:0);

      chartRef.current=new Chart(canvas,{
        type:'line',
        plugins:[annotationPlugin],
        data:{
          labels:LABELS,
          datasets:[{
            label:'Tourist arrivals (thousands)',
            data:DATA,
            borderWidth:2.5, tension:0.35, fill:true,
            backgroundColor:(context:{chart:Chart})=>{
              const {ctx:c,chartArea}=context.chart;
              if(!chartArea) return 'transparent';
              const g=(c as CanvasRenderingContext2D).createLinearGradient(
                0,(chartArea as ChartArea).top,0,(chartArea as ChartArea).bottom);
              g.addColorStop(0,'rgba(31,138,77,0.12)');
              g.addColorStop(1,'rgba(31,138,77,0.01)');
              return g;
            },
            pointBackgroundColor:ptBg,
            pointBorderColor:ptBdr,
            pointBorderWidth:2, pointRadius:ptR, pointHoverRadius:8,
            segment:{
              borderColor:(seg:{p1DataIndex:number})=>
                isInCrisis(seg.p1DataIndex)?C.terra:C.saffron,
            },
          }],
        },
        options:{
          responsive:true, maintainAspectRatio:false,
          interaction:{mode:'index',intersect:false},
          plugins:{
            legend:{display:false},
            tooltip:{
              backgroundColor:C.ink2,
              titleColor:C.cream2,
              bodyColor:'rgba(234,247,238,0.55)',
              borderColor:'rgba(10,46,26,0.15)',
              borderWidth:1, padding:12,
              titleFont:{family:BEBAS,size:15,weight:'normal'} as never,
              bodyFont: {family:MUKTA, size:12} as never,
              callbacks:{label:(item)=>`  ${(item.parsed.y ?? 0).toLocaleString()}K visitors`},
            },
          },
          scales:{
            x:{
              grid:{display:false},
              border:{display:false},
              ticks:{color:C.inkFaint,font:{size:11},maxRotation:45,autoSkip:true,maxTicksLimit:14},
            },
            y:{
              min:0,max:1350,
              grid:{color:'rgba(10,46,26,0.07)',lineWidth:0.5},
              border:{display:false},
              ticks:{
                color:C.inkFaint,font:{size:11},
                callback:(v)=>Number(v)>=1000?(Number(v)/1000).toFixed(1)+'M':Number(v)+'K',
              },
              title:{display:true,text:'Arrivals',color:C.inkFaint,font:{size:11}},
            },
          },
        },
      });
    } catch(e){ setErr(String(e)); }
    return ()=>{ chartRef.current?.destroy(); chartRef.current=null; };
  },[]);

  if(err) return(
    <div style={{height:'380px',display:'flex',flexDirection:'column',alignItems:'center',
      justifyContent:'center',gap:'8px',color:C.inkFaint,fontFamily:MONO,fontSize:'11px'}}>
      <span>Chart error</span>
      <span style={{fontSize:'9px',maxWidth:'420px',textAlign:'center',opacity:0.6}}>{err}</span>
    </div>
  );
  return <div style={{position:'relative',width:'100%',height:'380px'}}><canvas ref={canvasRef}/></div>;
}

/* ─── main section ───────────────────────────────────────────────────────── */
export function TourismHistorySection() {
  const rHead =useReveal(0,   'left');
  const rDesc =useReveal(0.12,'right');
  const rChart=useReveal(0.22);
  const rCards=useReveal(0.36);

  // isMobile state — used to set inline grid styles that can't be overridden
  const [isMobile, setIsMobile] = useState(()=> typeof window!=='undefined' && window.innerWidth<=768);
  useEffect(()=>{
    const check=()=>setIsMobile(window.innerWidth<=768);
    window.addEventListener('resize',check);
    return ()=>window.removeEventListener('resize',check);
  },[]);

  return (
    <section style={{
      background: C.cream,          /* matches CountryComparisonSection */
      padding:'120px 0 100px',
      borderTop:`1px solid ${C.lineS}`,
      position:'relative', overflow:'hidden',
    }}>

      {/* top accent bar: terra → transparent → saffron */}
      <div style={{
        position:'absolute',top:0,left:0,right:0,height:'2px',
        background:`linear-gradient(90deg,${C.terra} 0%,transparent 45%,${C.saffron} 100%)`,
      }}/>

      <div className="tourism-section-inner" style={{maxWidth:'1320px',margin:'0 auto',padding:'0 40px',position:'relative',zIndex:1}}>

        {/* ── header ── */}
        <div style={{
          display:'grid',gridTemplateColumns:'1fr 1.2fr',gap:'60px',alignItems:'end',
          paddingBottom:'40px',borderBottom:`1px solid ${C.lineS}`,marginBottom:'48px',
        }}>
          <div ref={rHead}>
            <div style={{
              display:'inline-flex',alignItems:'center',gap:'12px',marginBottom:'22px',
              fontSize:'12px',letterSpacing:'0.32em',textTransform:'uppercase',
              fontWeight:500,fontFamily:MUKTA,color:C.terra,
            }}>
              Tourism history
            </div>

            <h2 style={{
              fontFamily:SERIF,fontWeight:300,
              fontSize:'clamp(40px,5vw,78px)',lineHeight:1.0,letterSpacing:'-0.015em',
              color:C.ink,
            }}>
              Every crisis.<br/>
              Every{' '}
              <em style={{fontStyle:'italic',color:C.saffron,fontWeight:400}}>comeback</em>.
            </h2>
          </div>

          <div ref={rDesc} style={{paddingBottom:'6px'}}>
            <p style={{
              fontSize:'16px',lineHeight:1.85,fontWeight:300,fontFamily:MUKTA,
              color:C.inkSoft,maxWidth:'46ch',marginBottom:'24px',
            }}>
              Nepal's tourism has faced wars, earthquakes, pandemics — and recovered every time.
              The 0.5% Campaign builds on this resilience: not just a recovery, but a transformation.
            </p>

            {/* 4-item legend */}
            <div style={{display:'flex',flexWrap:'wrap',gap:'16px'}}>
              {([
                {swatch:'line',color:C.saffron,label:'Growth period'      },
                {swatch:'line',color:C.terra,  label:'Crisis / decline'   },
                {swatch:'dot', color:C.terra,  label:'Drop event'         },
                {swatch:'dot', color:C.saffron,label:'Recovery / new high'},
              ] as const).map(({swatch,color,label})=>(
                <div key={label} style={{
                  display:'flex',alignItems:'center',gap:'7px',fontFamily:MONO,
                  fontSize:'10px',letterSpacing:'0.18em',textTransform:'uppercase',
                  color:C.inkFaint,
                }}>
                  {swatch==='line'
                    ?<span style={{width:'14px',height:'2.5px',background:color,borderRadius:'2px',display:'inline-block'}}/>
                    :<span style={{width:'10px',height:'10px',background:color,borderRadius:'50%', display:'inline-block'}}/>}
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── chart ── */}
        <div ref={rChart} className="tourism-chart-box" style={{
          background:C.paper, border:`1px solid ${C.lineS}`,
          borderRadius:'4px', padding:'28px 24px 20px', marginBottom:'20px',
        }}>
          <TourismChart/>
        </div>

        {/* ── stat cards: 4-col row — use minmax so CSS attribute selectors can't override ── */}
        <div ref={rCards} className="tourism-stat-grid" style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(4, minmax(0, 1fr))' : 'repeat(4,1fr)',
          gap: isMobile ? '6px' : '12px',
        }}>
          <StatCard label="Worst single drop"         value="−80%"   sub="COVID-19 (2019→2020)"       accent="crisis"/>
          <StatCard label="Longest disruption"        value="10 yrs" sub="Maoist conflict (1996–2006)" accent="crisis"/>
          <StatCard label="Peak arrivals"             value="1.17M"  sub="2019 — all-time high"         accent="growth"/>
          <StatCard label="0.5% target (India+China)" value="14M+"   sub="Potential annual visitors"   accent="growth"/>
        </div>

        {/* footnote */}
        <div style={{
          marginTop:'24px',display:'flex',alignItems:'center',gap:'14px',
          fontFamily:MONO,fontSize:'9.5px',letterSpacing:'0.18em',
          textTransform:'uppercase',color:C.inkFaint,
        }}>
          <span style={{width:'22px',height:'1px',background:C.lineS}}/>
          Data: Nepal Tourism Board · NTB Annual Statistical Reports · 2026 projected
        </div>

      </div>
    </section>
  );
}
