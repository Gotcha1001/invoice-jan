// import { ReactNode } from "react";

// export default function AuthLayout({ children }: { children: ReactNode }) {
//   return (
//     <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
//       {/* Radial Gradient Backgrounds */}
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.15)_0%,transparent_50%)]"></div>
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(168,85,247,0.15)_0%,transparent_50%)]"></div>
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(126,34,206,0.1)_0%,transparent_50%)]"></div>

//       {/* Animated particles */}
//       <div className="absolute top-20 left-20 w-2 h-2 bg-purple-500 rounded-full blur-sm animate-pulse"></div>
//       <div
//         className="absolute top-40 right-32 w-3 h-3 bg-purple-400 rounded-full blur-sm animate-pulse"
//         style={{ animationDelay: "1s" }}
//       ></div>
//       <div
//         className="absolute bottom-40 left-1/4 w-2 h-2 bg-purple-600 rounded-full blur-sm animate-pulse"
//         style={{ animationDelay: "2s" }}
//       ></div>

//       {/* Content */}
//       <div className="relative z-10 w-full flex items-center justify-center p-4">
//         {children}
//       </div>
//     </div>
//   );
// }
"use client";

import { ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

// ─── Smoke Wisp ───────────────────────────────────────────────
interface Wisp {
  id: number;
  x: number;
  startY: number;
  width: number;
  height: number;
  duration: number;
  delay: number;
  driftX: number;
  blur: number;
  opacity: number;
  color: string;
}

const SMOKE_COLORS = [
  "rgba(139,92,246,OP)",
  "rgba(167,139,250,OP)",
  "rgba(109,40,217,OP)",
  "rgba(192,132,252,OP)",
  "rgba(76,29,149,OP)",
  "rgba(221,214,254,OP)",
];

function generateWisps(count: number): Wisp[] {
  return Array.from({ length: count }, (_, i) => {
    const op = randomBetween(0.04, 0.14);
    const color = SMOKE_COLORS[
      Math.floor(Math.random() * SMOKE_COLORS.length)
    ].replace("OP", String(op));
    return {
      id: i,
      x: randomBetween(0, 100),
      startY: randomBetween(60, 110),
      width: randomBetween(120, 380),
      height: randomBetween(80, 220),
      duration: randomBetween(14, 32),
      delay: randomBetween(0, 12),
      driftX: randomBetween(-60, 60),
      blur: randomBetween(28, 70),
      opacity: op,
      color,
    };
  });
}

function SmokeWisp({ w }: { w: Wisp }) {
  const riseAmount = randomBetween(80, 200);
  const rotateTo = randomBetween(-15, 15);

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${w.x}%`,
        top: `${w.startY}%`,
        width: w.width,
        height: w.height,
        background: w.color,
        filter: `blur(${w.blur}px)`,
        translateX: "-50%",
        translateY: "-50%",
      }}
      initial={{ opacity: 0, scaleX: 0.4, scaleY: 0.6 }}
      animate={{
        opacity: [0, w.opacity * 8, w.opacity * 5, w.opacity * 9, 0],
        y: [0, -riseAmount * 0.4, -riseAmount * 0.75, -riseAmount],
        x: [0, w.driftX * 0.3, w.driftX * 0.7, w.driftX],
        scaleX: [0.5, 1.2, 0.9, 1.4],
        scaleY: [0.6, 1.1, 1.4, 0.9],
        rotate: [0, rotateTo * 0.5, rotateTo, rotateTo * 0.3],
      }}
      transition={{
        duration: w.duration,
        delay: w.delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

// ─── Deep Pulsing Core Orb ────────────────────────────────────
function CoreOrb({
  x,
  y,
  size,
  color,
  duration,
  delay,
}: {
  x: string;
  y: string;
  size: number;
  color: string;
  duration: number;
  delay: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        background: color,
        filter: "blur(100px)",
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        scale: [1, 1.18, 0.92, 1.12, 1],
        opacity: [0.5, 0.85, 0.45, 0.75, 0.5],
        x: [0, 18, -12, 8, 0],
        y: [0, -14, 20, -8, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

// ─── Tiny Glowing Embers ──────────────────────────────────────
interface Ember {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  riseY: number;
  driftX: number;
}

function generateEmbers(count: number): Ember[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: randomBetween(5, 95),
    y: randomBetween(20, 90),
    size: randomBetween(1.5, 3.5),
    duration: randomBetween(4, 10),
    delay: randomBetween(0, 10),
    riseY: randomBetween(20, 60),
    driftX: randomBetween(-15, 15),
  }));
}

function Ember({ e }: { e: Ember }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${e.x}%`,
        top: `${e.y}%`,
        width: e.size,
        height: e.size,
        background: "rgba(216,180,254,0.95)",
        boxShadow: `0 0 ${e.size * 4}px rgba(216,180,254,0.8), 0 0 ${e.size * 9}px rgba(167,139,250,0.5)`,
      }}
      animate={{
        opacity: [0, 1, 0.5, 0.9, 0],
        scale: [0, 1, 0.7, 1.1, 0],
        y: [0, -e.riseY],
        x: [0, e.driftX],
      }}
      transition={{
        duration: e.duration,
        delay: e.delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
    />
  );
}

// ─── Layout ───────────────────────────────────────────────────
export default function AuthLayout({ children }: { children: ReactNode }) {
  const [wisps, setWisps] = useState<Wisp[]>(generateWisps(18));
  const [embers, setEmbers] = useState<Ember[]>(generateEmbers(24));
  const [mounted, setMounted] = useState(true);

  return (
    <div className="min-h-screen bg-[#05020e] relative overflow-hidden flex items-center justify-center">
      {/* Deep nebula base */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(88,28,220,0.25)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_20%_50%,rgba(109,40,217,0.12)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_20%,rgba(139,92,246,0.1)_0%,transparent_55%)]" />

      {/* Slow drifting core orbs */}
      <CoreOrb
        x="30%"
        y="70%"
        size={600}
        color="rgba(88,28,220,0.18)"
        duration={20}
        delay={0}
      />
      <CoreOrb
        x="70%"
        y="50%"
        size={480}
        color="rgba(139,92,246,0.14)"
        duration={26}
        delay={4}
      />
      <CoreOrb
        x="50%"
        y="90%"
        size={400}
        color="rgba(109,40,217,0.20)"
        duration={16}
        delay={8}
      />

      {/* Edge vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(5,2,14,0.88)_100%)]" />

      {/* Smoke wisps */}
      {mounted && wisps.map((w) => <SmokeWisp key={w.id} w={w} />)}

      {/* Floating embers */}
      {mounted && embers.map((e) => <Ember key={e.id} e={e} />)}

      {/* Page content */}
      <motion.div
        className="relative z-10 w-full flex items-center justify-center p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
