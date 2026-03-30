import { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";

const logoImg = "/logo-white.png";
const EXPO    = [0.16, 1, 0.3, 1];

const GRAD = "linear-gradient(90deg, #f5c430 0%, #38bdf8 100%)";

/* ── Batteria orizzontale ── */
function Battery({ pctMV }) {
  const containerRadius = "clamp(6px, 1.5vw, 9px)";

  // Animazione accelerata via GPU che mantiene l'arrotondamento perfetto
  const clipPathMV = useTransform(pctMV, v => {
    return `inset(0 ${100 - v}% 0 0 round ${containerRadius})`;
  });

  const terminalBg   = useTransform(pctMV, v => v >= 99.5 ? "#38bdf8" : "#2a3d54");
  const boltFill     = useTransform(pctMV, v => v > 50 ? "#0d1520" : "#8aa4c0");

  return (
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>

      {/* Corpo */}
      <div style={{
        width:        "clamp(160px, 42vw, 240px)",
        height:       "clamp(36px,  9vw,  52px)",
        border:       "1.5px solid #2a3d54",
        borderRadius: containerRadius,
        background:   "#1a2436",
        position:     "relative",
        overflow:     "hidden",
        // Evita artefatti visivi durante il ridimensionamento
        transform:    "translateZ(0)",
      }}>

        {/* Gradiente di riempimento */}
        <motion.div style={{
          position: "absolute",
          inset: 0,
          background: GRAD,
          clipPath: clipPathMV,
          // Suggerisce al browser di ottimizzare questa specifica animazione sulla GPU
          willChange: "clip-path",
        }} />

        {/* Divisori verticali */}
        {[0.33, 0.66].map(t => (
          <div key={t} style={{
            position: "absolute",
            left: `${t * 100}%`,
            top: 0, bottom: 0,
            width: 1,
            background: "#0d1520",
            zIndex: 1,
          }} />
        ))}

        {/* Fulmine */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 2,
        }}>
          <svg viewBox="0 0 24 40" style={{ width: "clamp(12px, 3vw, 17px)", height: "auto" }}>
            <motion.path
              d="M 15,1 L 4,22 L 11,22 L 9,39 L 20,18 L 13,18 Z"
              style={{ fill: boltFill }}
            />
          </svg>
        </div>

      </div>

      {/* Terminale destro */}
      <motion.div style={{
        width:        "clamp(5px, 1.4vw, 7px)",
        height:       "clamp(14px, 3.5vw, 20px)",
        background:   terminalBg,
        borderRadius: "0 3px 3px 0",
      }} />

    </div>
  );
}

/* ══════════════════════════════════════════
   SPLASH SCREEN
══════════════════════════════════════════ */
export default function SplashScreen({ onDone }) {
  const pctMV        = useMotionValue(0);
  
  const formattedPct = useTransform(pctMV, v => String(Math.floor(v)).padStart(2, "0"));
  
  const [exiting, setEx] = useState(false);
  const [lit, setLit]    = useState(false);

  useEffect(() => {
    const tLit = setTimeout(() => setLit(true), 420);

    /* Precarica logo */
    let logoReady = false;
    const logoPromise = new Promise(res => {
      const img = new Image();
      img.onload = img.onerror = res;
      img.src = logoImg;
    }).then(() => { logoReady = true; });

    /* Fase 1 — 0 → 75 in ~2.2s */
    let ctrl;
    ctrl = animate(pctMV, 75, {
      duration: 2.2,
      ease: "linear",
      onComplete: () => {
        /* Fase 2 — 75 → 100 dopo che il logo è pronto */
        const run2 = () => {
          ctrl = animate(pctMV, 100, {
            duration: 0.9,
            ease: [0.4, 0, 0.2, 1],
            onComplete: () => {
              setTimeout(() => { setEx(true); setTimeout(onDone, 800); }, 700);
            },
          });
        };
        logoReady ? run2() : logoPromise.then(run2);
      },
    });

    return () => {
      ctrl?.stop?.();
      clearTimeout(tLit);
    };
  }, [pctMV, onDone]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="splash"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.75, ease: "easeInOut" }}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            background: "#0d1520",
            userSelect: "none", overflow: "hidden",
            paddingTop:    "env(safe-area-inset-top)",
            paddingBottom: "env(safe-area-inset-bottom)",
          }}
        >

          {/* Grain */}
          <div aria-hidden style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`,
            opacity: 0.03, mixBlendMode: "overlay",
          }} />

          {/* Glow blu in alto */}
          <div aria-hidden style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "radial-gradient(ellipse 90% 50% at 50% 0%, rgba(56,189,248,0.09) 0%, transparent 60%)",
          }} />

          {/* ── Centro ── */}
          <div style={{
            display: "flex", flexDirection: "column",
            alignItems: "center", position: "relative", zIndex: 1,
            gap: 0,
          }}>

            {/* Logo */}
            <motion.div
              style={{ marginBottom: "clamp(24px, 5.5vw, 40px)", display: "flex" }}
              animate={lit
                ? { opacity: 1, scale: 1 }
                : { opacity: [0, 0.7, 0.12, 1, 0.42, 1], scale: [0.94, 1, 0.97, 1] }
              }
              initial={{ opacity: 0, scale: 0.94 }}
              transition={lit
                ? { duration: 0.2, ease: "easeOut" }
                : { duration: 0.44, ease: "easeOut", times: [0, 0.13, 0.3, 0.58, 0.76, 1] }
              }
            >
              <img
                src={logoImg}
                alt="Dierre Impianti"
                draggable={false}
                style={{
                  display: "block",
                  width:  "clamp(180px, 46vw, 280px)",
                  height: "clamp(180px, 46vw, 280px)",
                  objectFit: "contain",
                }}
              />
            </motion.div>

            {/* Batteria */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.44, duration: 0.6, ease: EXPO }}
            >
              <Battery pctMV={pctMV} />
            </motion.div>

            {/* Percentuale */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              style={{
                marginTop: "clamp(12px, 3vw, 18px)",
                display: "flex", alignItems: "baseline", gap: 2,
              }}
            >
              <motion.span style={{
                fontSize: "clamp(26px, 7vw, 42px)",
                fontWeight: 800,
                fontFamily: "'Poppins', system-ui, sans-serif",
                letterSpacing: "-0.03em",
                lineHeight: 1,
                background: GRAD,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                {formattedPct}
              </motion.span>
              <span style={{
                fontSize: "clamp(12px, 3vw, 18px)",
                fontWeight: 600,
                fontFamily: "'Poppins', system-ui, sans-serif",
                color: "#546e89",
                marginBottom: 2,
              }}>
                %
              </span>
            </motion.div>

          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}