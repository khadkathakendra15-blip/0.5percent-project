// ─── Partner data with logo paths ─────────────────────────────────────────────
const ROW1 = [
  { name: "Nepal Airlines",  logo: "/logo/Nepal Airlines.jpg",        color: "#DC2626", bg: "#FEF2F2" },
  { name: "Buddha Air",      logo: "/logo/Budhha Air.jpg",            color: "#EA580C", bg: "#FFF7ED" },
  { name: "Yeti Airlines",   logo: "/logo/Yeti Airlines.jpg",         color: "#16A34A", bg: "#F0FDF4" },
  { name: "The Soaltee",     logo: "/logo/The Soaltee.jpg",           color: "#B45309", bg: "#FFFBEB" },
  { name: "CG Hospitality",  logo: "/logo/Cg Hospitality.jpg",        color: "#1D4ED8", bg: "#EFF6FF" },
  { name: "Kantipur Media",  logo: "/logo/KMG.jpg",                   color: "#DC2626", bg: "#FEF2F2" },
  { name: "Onlinekhabar",    logo: "/logo/Online Khaber.jpg",         color: "#2563EB", bg: "#EFF6FF" },
];

const ROW2 = [
  { name: "Nepal Tourism Board",  logo: "/logo/Nepal Tourism Board.jpg",    color: "#0F766E", bg: "#F0FDFA" },
  { name: "Hotel Assoc. Nepal",   logo: "/logo/Hotel Association nepal.jpg", color: "#0369A1", bg: "#F0F9FF" },
  { name: "CG Corp Global",       logo: "/logo/Cg Corp Global.jpg",          color: "#1D4ED8", bg: "#EFF6FF" },
  { name: "Buddha Air",           logo: "/logo/Budhha Air.jpg",              color: "#EA580C", bg: "#FFF7ED" },
  { name: "Nepal Airlines",       logo: "/logo/Nepal Airlines.jpg",          color: "#DC2626", bg: "#FEF2F2" },
  { name: "Yeti Airlines",        logo: "/logo/Yeti Airlines.jpg",           color: "#16A34A", bg: "#F0FDF4" },
  { name: "Kantipur Media Group", logo: "/logo/KMG.jpg",                     color: "#DC2626", bg: "#FEF2F2" },
];

type Partner = (typeof ROW1)[0];

const repeat = (arr: Partner[], times = 5): Partner[] =>
  Array.from({ length: times }).flatMap(() => arr);

// ─── Logo badge ───────────────────────────────────────────────────────────────
function PartnerBadge({ partner }: { partner: Partner }) {
  return (
    <div
      title={partner.name}
      className="h-16 w-16 flex-shrink-0 rounded-full shadow-sm flex items-center justify-center border hover:scale-110 transition-transform duration-200 cursor-default overflow-hidden"
      style={{ background: "#fff", borderColor: partner.color + "25" }}
    >
      <img
        src={partner.logo}
        alt={partner.name}
        className="h-11 w-11 object-contain"
        onError={(e) => {
          // fallback: show colored circle with first letters
          (e.currentTarget as HTMLImageElement).style.display = "none";
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
  return (
    <section className="relative py-28 overflow-hidden bg-white">
      {/* Dot-grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.045)_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Amber glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(245,158,11,0.07) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2
          className="text-4xl md:text-5xl font-black text-gray-900 mb-12"
          style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
        >
          Partners &amp; Supporters
        </h2>

        {/* ── Scrolling rows ── */}
        <div className="overflow-hidden relative pb-2 space-y-5">
          {/* Row 1 — left */}
          <div className="flex gap-6 whitespace-nowrap animate-scroll-left">
            {repeat(ROW1, 5).map((p, i) => (
              <PartnerBadge key={i} partner={p} />
            ))}
          </div>

          {/* Row 2 — right */}
          <div className="flex gap-6 whitespace-nowrap animate-scroll-right">
            {repeat(ROW2, 5).map((p, i) => (
              <PartnerBadge key={i} partner={p} />
            ))}
          </div>

          {/* Fade edges */}
          <div className="absolute left-0 top-0 h-full w-28 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 h-full w-28 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
        </div>

      </div>
    </section>
  );
}
