import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const INK     = '#0A0B0F';
const CREAM   = '#F3F3F0';
const TERRA   = '#FFC000';
const GOLD    = '#FFC000';
const MUKTA   = "'Space Grotesk', system-ui, sans-serif";
const MONO    = "'Space Mono', ui-monospace, monospace";

const LINKS = [
  { label: 'Destinations', to: '/destinations' },
  { label: 'Stories',      to: '/blog'          },
  { label: 'Yatra Nepalko', to: '/yatra'          },
  { label: 'Embassies',    to: '/embassies'     },
  { label: 'AI Guide',     to: '/ai-guide'      },
  { label: 'Plan Trip',    to: '/booking'        },
  { label: 'About',        to: '/about'          },
];

export function NavBar() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 72);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Transparent over video hero on home page; solid everywhere else / after scroll
  const solid = scrolled || pathname !== '/';

  return (
    <>
      {/* ── main bar ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        height: '64px', display: 'flex', alignItems: 'center',
        background: solid ? '#0A0B0F' : 'rgba(10,7,4,0.35)',
        backdropFilter: solid ? 'none' : 'blur(8px)',
        borderBottom: solid ? '1px solid rgba(243,243,240,0.08)' : 'none',
        transition: 'background .35s ease, border-color .35s ease',
      }}>
        <div style={{
          maxWidth: '1320px', margin: '0 auto', padding: '0 40px',
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>

          {/* Logo — lime ½ badge + wordmark (matches reference) */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              width: '30px', height: '30px', borderRadius: '50%', background: '#FFC000',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: '13px', color: '#0A0B0F',
            }}>½</span>
            <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: '17px', letterSpacing: '-0.01em', color: '#F3F3F0' }}>
              0.5<span style={{ color: '#FFC000' }}>%</span>{' '}
              <span style={{ fontWeight: 500, opacity: 0.65 }}>Campaign</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="vfy-nav-links" style={{ display: 'flex', alignItems: 'center', gap: '34px' }}>
            {LINKS.map(l => {
              const active = pathname.startsWith(l.to);
              return (
                <Link key={l.to} to={l.to} style={{
                  textDecoration: 'none', fontFamily: MUKTA,
                  fontSize: '14px', letterSpacing: '0.03em',
                  color: active ? '#fff' : CREAM,
                  opacity: active ? 1 : 0.72,
                  borderBottom: active ? `1.5px solid ${GOLD}` : '1.5px solid transparent',
                  paddingBottom: '3px',
                  transition: 'color .25s, opacity .25s, border-color .25s',
                }}>
                  {l.label}
                </Link>
              );
            })}
          </div>

          {/* CTA button */}
          <div className="vfy-nav-cta" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <Link to="/booking" style={{ textDecoration: 'none' }}>
              <div style={{
                fontFamily: MONO, fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase',
                background: TERRA, color: INK, padding: '9px 20px', borderRadius: '100px',
                fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap',
              }}>
                Join the 0.5%
              </div>
            </Link>

            {/* Mobile hamburger */}
            <button
              className="vfy-hamburger"
              onClick={() => setMobileOpen(o => !o)}
              style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: CREAM }}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>
      </nav>

      {/* ── mobile drawer ── */}
      {mobileOpen && (
        <div style={{
          position: 'fixed', top: '64px', left: 0, right: 0, zIndex: 199,
          background: '#0A0B0F', borderBottom: '1px solid rgba(243,243,240,0.1)',
          padding: '24px 28px 28px',
        }}>
          {LINKS.map(l => (
            <Link
              key={l.to} to={l.to}
              onClick={() => setMobileOpen(false)}
              style={{
                display: 'block', textDecoration: 'none', fontFamily: MUKTA,
                fontSize: '18px', letterSpacing: '0.02em',
                color: pathname.startsWith(l.to) ? '#fff' : CREAM,
                padding: '14px 0', borderBottom: '1px solid rgba(243,243,240,0.07)',
              }}
            >
              {l.label}
            </Link>
          ))}
          <Link to="/booking" onClick={() => setMobileOpen(false)} style={{ textDecoration: 'none' }}>
            <div style={{
              marginTop: '20px', fontFamily: MONO, fontSize: '11px', letterSpacing: '0.2em',
              textTransform: 'uppercase', background: TERRA, color: INK, fontWeight: 700,
              padding: '13px 20px', borderRadius: '100px', textAlign: 'center',
            }}>
              Join the 0.5%
            </div>
          </Link>
        </div>
      )}
    </>
  );
}
