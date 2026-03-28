import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const logoImg = "/logo.png";

export default function SplashScreen({ onDone }) {
  const [pct,     setPct]     = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    let logoReady = false;

    new Promise(res => {
      const img = new Image();
      img.onload = img.onerror = res;
      img.src = logoImg;
    }).then(() => { logoReady = true; });

    const timer = setInterval(() => {
      setPct(prev => {
        if (prev >= 75 && !logoReady) return prev;

        const next = prev + 1;

        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setExiting(true);
            setTimeout(onDone, 700);
          }, 900);
          return 100;
        }

        return next;
      });
    }, 35);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="splash"
          exit={{ scale: 18, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.55, 0, 1, 0.45] }}
          originX={0.5}
          originY={0.5}
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            userSelect: "none",
            background: "linear-gradient(160deg, #0a1220 0%, #0d1520 55%, #0f1828 100%)",
            willChange: "transform, opacity",
          }}
        >

          {/* Ambient glows */}
          <div style={{
            position: "absolute", pointerEvents: "none",
            top: "-15%", left: "-10%", width: "55vw", height: "55vw", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(56,189,248,0.18) 0%, transparent 60%)",
          }} />
          <div style={{
            position: "absolute", pointerEvents: "none",
            bottom: "-12%", right: "-8%", width: "48vw", height: "48vw", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 60%)",
          }} />

          {/* Contenuto */}
          <motion.div
            style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            transition={{ duration: 0.6, ease: [0.34, 1.1, 0.64, 1] }}
          >

            {/* Logo */}
            <div style={{
              position: "relative",
              width: "min(260px, 52vw)",
              height: "min(260px, 52vw)",
              marginBottom: "clamp(24px, 6vw, 48px)",
            }}>

              {/* Glow pulsante */}
              <motion.div
                style={{
                  position: "absolute",
                  top: "-30%", left: "-30%", right: "-30%", bottom: "-30%",
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(56,189,248,0.2) 0%, transparent 65%)",
                  pointerEvents: "none",
                }}
                animate={{ scale: [1, 1.14, 1], opacity: [0.4, 0.75, 0.4] }}
                transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
              />

              {/* Logo grigio base */}
              <img
                src={logoImg}
                alt=""
                draggable={false}
                style={{
                  position: "absolute", inset: 0,
                  width: "100%", height: "100%",
                  objectFit: "fill",
                  filter: "grayscale(1) brightness(0.3)",
                }}
              />

              {/* Logo a colori — reveal dal basso verso l'alto */}
              <img
                src={logoImg}
                alt="Dierre Impianti"
                draggable={false}
                style={{
                  position: "absolute", inset: 0,
                  width: "100%", height: "100%",
                  objectFit: "fill",
                  clipPath: `inset(${Math.max(0, 100 - pct * 0.9)}% 0 0 0)`,
                }}
              />

            </div>

            {/* Percentuale */}
            <motion.div
              style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {/* Label sistema */}
              <span style={{
                fontSize: 10,
                fontWeight: 500,
                fontFamily: "'Clash Display', sans-serif",
                letterSpacing: "0.28em",
                color: "#1e3a5f",
                textTransform: "uppercase",
                marginBottom: 4,
              }}>
                Avvio sistema
              </span>

              {/* Numero + % */}
              <div style={{
                display: "flex", alignItems: "flex-start", lineHeight: 1,
                background: "linear-gradient(90deg, #38bdf8, #e0f2fe)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                <span style={{
                  fontSize: "clamp(52px, 14vw, 120px)",
                  fontWeight: 700,
                  fontFamily: "'Clash Display', sans-serif",
                  letterSpacing: "-0.06em",
                  lineHeight: 0.9,
                }}>
                  {String(pct).padStart(2, "0")}
                </span>
                <span style={{
                  fontSize: "clamp(16px, 4vw, 32px)",
                  fontWeight: 400,
                  fontFamily: "'Clash Display', sans-serif",
                  marginTop: "clamp(5px, 1.2vw, 10px)",
                  marginLeft: 3,
                  lineHeight: 1,
                }}>
                  %
                </span>
              </div>

              {/* Barra sottile */}
              <div style={{
                marginTop: 16,
                width: 120,
                height: 1,
                background: "#1f2937",
                borderRadius: 1,
                overflow: "hidden",
              }}>
                <div style={{
                  height: "100%",
                  width: `${pct}%`,
                  background: "linear-gradient(90deg, #38bdf8, #0ea5e9)",
                  borderRadius: 1,
                  transition: "width 0.05s linear",
                }} />
              </div>

              {/* Tagline */}
              <span style={{
                marginTop: 20,
                fontSize: 10,
                fontWeight: 500,
                fontFamily: "'Clash Display', sans-serif",
                letterSpacing: "0.22em",
                color: "#1e3a5f",
                textTransform: "uppercase",
              }}>
                Impianti Elettrici · Padova
              </span>
            </motion.div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
