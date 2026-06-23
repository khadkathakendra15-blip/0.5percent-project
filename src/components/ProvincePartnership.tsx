"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SERIF = "'Bricolage Grotesque', Georgia, serif";
const MONO  = "'Space Mono', ui-monospace, monospace";
const MUKTA = "'Space Grotesk', system-ui, sans-serif";

const P = {
  koshi:         "/koshi province.jpg",
  madhesh:       "/Madhesh Province.webp",
  bagmati:       "/Bagmati Province photo.webp",
  gandaki:       "/Gandaki Province.jpg",
  lumbini:       "/lumbini province.webp",
  karnali:       "/Karnali province.jpg",
  // No dedicated Sudurpashchim photo yet — fall back to Karnali's far-western landscape
  sudurpashchim: "/Karnali province.jpg",
};

interface Province {
  id: number;
  name: string;
  nameNepali: string;
  headquarters: string;
  color: string;
  darkColor: string;
  photo: string;
}

const provinces: Province[] = [
  { id: 0, name: "Koshi",         nameNepali: "कोशी प्रदेश",       headquarters: "Biratnagar", color: "#FFC000", darkColor: "#15171E", photo: P.koshi },
  { id: 1, name: "Madhesh",       nameNepali: "मधेश प्रदेश",        headquarters: "Janakpur",   color: "#FFC000", darkColor: "#15171E", photo: P.madhesh },
  { id: 2, name: "Bagmati",       nameNepali: "बागमती प्रदेश",       headquarters: "Hetauda",    color: "#FFC000", darkColor: "#15171E", photo: P.bagmati },
  { id: 3, name: "Gandaki",       nameNepali: "गण्डकी प्रदेश",       headquarters: "Pokhara",    color: "#FFC000", darkColor: "#15171E", photo: P.gandaki },
  { id: 4, name: "Lumbini",       nameNepali: "लुम्बिनी प्रदेश",     headquarters: "Butwal",     color: "#FFC000", darkColor: "#15171E", photo: P.lumbini },
  { id: 5, name: "Karnali",       nameNepali: "कर्णाली प्रदेश",       headquarters: "Surkhet",    color: "#FFC000", darkColor: "#15171E", photo: P.karnali },
  { id: 6, name: "Sudurpashchim", nameNepali: "सुदूरपश्चिम प्रदेश",  headquarters: "Dhangadhi",  color: "#FFC000", darkColor: "#15171E", photo: P.sudurpashchim },
];

export function ProvincePartnership({ defaultSelected = 0 }: { defaultSelected?: number }) {
  const [selected, setSelected] = useState(defaultSelected);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 768);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const prov = provinces[selected];
  const orbitRadius = isMobile ? 105 : 170;
  const orbitMinH   = isMobile ? '290px' : '440px';

  return (
    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 340px', gap: '16px', alignItems: 'stretch', width: '100%', maxWidth: '960px', margin: '0 auto' }}>

      {/* ── LEFT: Radial orbit ── */}
      <div style={{
        position: 'relative', borderRadius: '12px', overflow: 'hidden',
        border: '1px solid var(--border)',
        background: `radial-gradient(circle at 50% 50%, ${prov.color}0e 0%, transparent 65%), var(--background)`,
      }}>
        {/* Colour wash */}
        <AnimatePresence>
          <motion.div
            key={selected}
            style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
              background: `radial-gradient(circle at 50% 50%, ${prov.color}12 0%, transparent 65%)` }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>

        {/* Orbit */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: orbitMinH, padding: isMobile ? '16px' : '32px' }}>

          {/* Centre hub */}
          <motion.div
            style={{ position: 'absolute', width: isMobile ? 96 : 136, height: isMobile ? 96 : 136, borderRadius: '50%', border: '3px solid', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            animate={{ borderColor: prov.color, background: `linear-gradient(135deg, ${prov.color}20, ${prov.color}08)`, boxShadow: `0 0 36px ${prov.color}38` }}
            transition={{ duration: 0.3 }}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: SERIF, fontSize: '30px', fontWeight: 700, color: prov.color, lineHeight: 1 }}>0.5%</div>
              <div style={{ fontFamily: MONO, fontSize: '8px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--muted-foreground)', marginTop: '5px' }}>Campaign</div>
              <div style={{ fontFamily: MONO, fontSize: '7.5px', color: 'var(--muted-foreground)', opacity: 0.5, marginTop: '2px' }}>7 Provinces</div>
            </div>
          </motion.div>

          {/* Province circles */}
          {provinces.map((province, index) => {
            const angle  = (index / provinces.length) * 2 * Math.PI - Math.PI / 2;
            const radius = orbitRadius;
            const x      = Math.cos(angle) * radius;
            const y      = Math.sin(angle) * radius;
            const isSel  = selected === index;

            return (
              <motion.div
                key={province.id}
                style={{ position: 'absolute', left: '50%', top: '50%', x: x - 36, y: y - 36, cursor: 'pointer' }}
                onClick={() => setSelected(index)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Connection line */}
                <svg style={{
                  position: 'absolute', left: '50%', top: '50%', pointerEvents: 'none',
                  width: Math.abs(x) || 1, height: Math.abs(y) || 1,
                  transform: `translate(${x > 0 ? '-100%' : '0%'}, ${y > 0 ? '-100%' : '0%'})`,
                }}>
                  <motion.line
                    x1={x > 0 ? '100%' : '0%'} y1={y > 0 ? '100%' : '0%'}
                    x2={x > 0 ? '0%' : '100%'}  y2={y > 0 ? '0%' : '100%'}
                    stroke={province.color} strokeWidth="1.5" strokeDasharray="4 4"
                    animate={{ opacity: isSel ? 0.65 : 0.18 }}
                    transition={{ duration: 0.3 }}
                  />
                </svg>

                <motion.div
                  style={{ width: isMobile ? 52 : 72, height: isMobile ? 52 : 72, borderRadius: '50%', border: `2px solid ${province.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  animate={{
                    backgroundColor: isSel ? province.color : `${province.color}30`,
                    scale: isSel ? 1.14 : 1,
                    boxShadow: isSel ? `0 0 26px ${province.color}55, 0 0 52px ${province.color}22` : `0 0 8px ${province.color}18`,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {isSel && Array.from({ length: 8 }).map((_, i) => {
                    const da = (i / 8) * 2 * Math.PI;
                    return (
                      <motion.div key={i} style={{ position: 'absolute', width: 6, height: 6, borderRadius: '50%', backgroundColor: province.color, left: '50%', top: '50%', x: Math.cos(da) * 42 - 3, y: Math.sin(da) * 42 - 3 }}
                        initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.35, delay: i * 0.05 }}
                      />
                    );
                  })}
                  <div style={{ fontFamily: MUKTA, fontSize: '10.5px', fontWeight: 700, lineHeight: 1.2, textAlign: 'center', padding: '0 4px', color: isSel ? '#fff' : province.darkColor }}>
                    {province.name}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── RIGHT: Portrait photo ── */}
      <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', border: `2px solid ${prov.color}40`, minHeight: isMobile ? '260px' : '440px' }}>

        {/* Photo cross-fade */}
        <AnimatePresence mode="sync">
          <motion.img
            key={`photo-${selected}`}
            src={prov.photo}
            alt={prov.name}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            initial={{ opacity: 0, scale: 1.07 }}
            animate={{ opacity: 1,  scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          />
        </AnimatePresence>

        {/* Gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.12) 55%, transparent 100%)', pointerEvents: 'none' }} />

        {/* Province colour strip top */}
        <motion.div
          animate={{ backgroundColor: prov.color }}
          transition={{ duration: 0.3 }}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px' }}
        />

        {/* Text overlay bottom */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`txt-${selected}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32, delay: 0.12 }}
            style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '22px 20px' }}
          >
            <div style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: prov.color, marginBottom: '5px' }}>
              {prov.nameNepali}
            </div>
            <div style={{ fontFamily: SERIF, fontSize: '26px', fontWeight: 400, color: '#fff', lineHeight: 1, marginBottom: '4px' }}>
              {prov.name}
            </div>
            <div style={{ fontFamily: MUKTA, fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>
              HQ · {prov.headquarters}
            </div>
          </motion.div>
        </AnimatePresence>

      </div>

    </div>
  );
}
