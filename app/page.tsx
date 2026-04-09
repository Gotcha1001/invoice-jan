// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
//       Hello
//     </div>
//   );
// }

"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: EASE },
  }),
};

const features = [
  {
    icon: "⚡",
    title: "Instant Invoices",
    desc: "Create polished, professional invoices in under 60 seconds.",
  },
  {
    icon: "🌍",
    title: "Multi-Currency",
    desc: "Bill clients in any currency with live exchange rates built in.",
  },
  {
    icon: "📊",
    title: "Smart Analytics",
    desc: "Track revenue, overdue payments, and cash flow at a glance.",
  },
  {
    icon: "🔁",
    title: "Auto Reminders",
    desc: "Never chase a client again — automated nudges do the work.",
  },
  {
    icon: "🔒",
    title: "Bank-Grade Security",
    desc: "Your data is encrypted end-to-end and never shared.",
  },
  {
    icon: "🎨",
    title: "Custom Branding",
    desc: "Add your logo, colors, and signature look to every invoice.",
  },
];

const testimonials = [
  {
    quote:
      "Switched from spreadsheets — never looking back. Invoicing is actually fun now.",
    name: "Amara Osei",
    role: "Freelance Designer",
    avatar: "AO",
  },
  {
    quote:
      "Our studio went from chasing payments to getting paid on time, every time.",
    name: "Luca Ferretti",
    role: "Creative Director",
    avatar: "LF",
  },
  {
    quote:
      "The cleanest invoicing tool I've ever used. My accountant loves it too.",
    name: "Priya Nair",
    role: "Independent Consultant",
    avatar: "PN",
  },
];

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <main
      className="min-h-screen font-sans overflow-x-hidden"
      style={{ background: "#05040a", color: "#f0ecff" }}
    >
      {/* ── Nav ── */}
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
        style={{ backdropFilter: "blur(18px)", background: "rgba(5,4,10,0.6)" }}
      >
        <div className="flex items-center gap-2">
          <span
            className="text-xl font-black tracking-tight"
            style={{
              background: "linear-gradient(135deg,#a78bfa,#60a5fa,#f472b6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Billflow
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <a href="#features" className="hover:text-white transition-colors">
            Features
          </a>
          <a
            href="#testimonials"
            className="hover:text-white transition-colors"
          >
            Reviews
          </a>
          <a href="#pricing" className="hover:text-white transition-colors">
            Pricing
          </a>
        </div>
        <Link href="/login">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="text-sm font-semibold px-5 py-2 rounded-full"
            style={{
              background: "linear-gradient(135deg,#7c3aed,#3b82f6)",
              color: "#fff",
              boxShadow: "0 0 20px rgba(124,58,237,0.4)",
            }}
          >
            Sign In →
          </motion.button>
        </Link>
      </motion.nav>

      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-16 overflow-hidden"
      >
        {/* Gradient orbs */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(124,58,237,0.35) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 80% 60%, rgba(59,130,246,0.25) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 20% 70%, rgba(244,114,182,0.2) 0%, transparent 70%)",
          }}
        />

        {/* Animated mesh grid */}
        <svg
          className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="#a78bfa"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 max-w-4xl"
        >
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-8 tracking-widest uppercase"
            style={{
              background: "rgba(124,58,237,0.15)",
              border: "1px solid rgba(124,58,237,0.4)",
              color: "#c4b5fd",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            Now in open beta · No credit card required
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-5xl md:text-7xl font-black leading-none tracking-tight mb-6"
            style={{ letterSpacing: "-0.03em" }}
          >
            Invoicing that{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg,#a78bfa 0%,#60a5fa 50%,#f472b6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              pays off.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Billflow turns billing chaos into clarity — create, send, and track
            invoices in seconds, so you can focus on the work that actually
            matters.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/login">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 40px rgba(124,58,237,0.6)",
                }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 rounded-2xl text-base font-bold text-white"
                style={{
                  background: "linear-gradient(135deg,#7c3aed,#3b82f6,#ec4899)",
                  boxShadow: "0 0 24px rgba(124,58,237,0.45)",
                }}
              >
                Get Started Free
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 rounded-2xl text-base font-semibold"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "#e0d9ff",
              }}
            >
              Watch Demo ▶
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Floating invoice card */}
        <motion.div
          initial={{ opacity: 0, y: 60, rotateX: 12 }}
          animate={{ opacity: 1, y: 0, rotateX: 4 }}
          transition={{ duration: 1, delay: 0.6, ease: EASE }}
          style={{ perspective: 1000 }}
          className="relative z-10 mt-16 w-full max-w-lg mx-auto"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-2xl p-6"
            style={{
              background: "rgba(18,15,30,0.9)",
              border: "1px solid rgba(124,58,237,0.3)",
              boxShadow:
                "0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(124,58,237,0.1), inset 0 1px 0 rgba(255,255,255,0.08)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-widest">
                  Invoice
                </p>
                <p className="font-bold text-white text-lg">#INV-2025-041</p>
              </div>
              <span
                className="text-xs font-semibold px-3 py-1 rounded-full"
                style={{
                  background: "rgba(52,211,153,0.15)",
                  color: "#6ee7b7",
                }}
              >
                PAID ✓
              </span>
            </div>
            <div
              className="h-px my-4"
              style={{ background: "rgba(255,255,255,0.07)" }}
            />
            {[
              { label: "Brand Identity Design", qty: "1×", amount: "$2,400" },
              { label: "Motion Graphics Pack", qty: "3×", amount: "$1,800" },
              { label: "Brand Guidelines Doc", qty: "1×", amount: "$600" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="flex justify-between items-center py-2"
              >
                <div>
                  <p className="text-sm text-zinc-200">{item.label}</p>
                  <p className="text-xs text-zinc-500">{item.qty}</p>
                </div>
                <p className="text-sm font-semibold text-white">
                  {item.amount}
                </p>
              </motion.div>
            ))}
            <div
              className="h-px my-4"
              style={{ background: "rgba(255,255,255,0.07)" }}
            />
            <div className="flex justify-between items-center">
              <p className="text-sm text-zinc-400">Total</p>
              <p
                className="text-2xl font-black"
                style={{
                  background: "linear-gradient(135deg,#a78bfa,#60a5fa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                $4,800.00
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="relative px-6 py-28">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(59,130,246,0.12) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-16"
          >
            <p
              className="text-xs uppercase tracking-widest font-semibold mb-3"
              style={{ color: "#818cf8" }}
            >
              Everything you need
            </p>
            <h2
              className="text-4xl md:text-5xl font-black tracking-tight"
              style={{ letterSpacing: "-0.03em" }}
            >
              Built for creators,{" "}
              <span
                style={{
                  background: "linear-gradient(135deg,#60a5fa,#a78bfa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                loved by clients.
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={i * 0.5}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="p-6 rounded-2xl cursor-default"
                style={{
                  background: "rgba(18,15,30,0.7)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div
                  className="text-3xl mb-4 w-12 h-12 flex items-center justify-center rounded-xl"
                  style={{ background: "rgba(124,58,237,0.15)" }}
                >
                  {f.icon}
                </div>
                <h3 className="font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section id="testimonials" className="px-6 py-28">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-16"
          >
            <p
              className="text-xs uppercase tracking-widest font-semibold mb-3"
              style={{ color: "#f472b6" }}
            >
              Real people, real results
            </p>
            <h2
              className="text-4xl md:text-5xl font-black tracking-tight"
              style={{ letterSpacing: "-0.03em" }}
            >
              Our clients{" "}
              <span
                style={{
                  background: "linear-gradient(135deg,#f472b6,#a78bfa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                love us.
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={i * 0.4}
                className="p-7 rounded-2xl flex flex-col gap-5"
                style={{
                  background: "rgba(18,15,30,0.7)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <p className="text-zinc-300 leading-relaxed text-sm">
                  &quot;{t.quote}&quot;
                </p>
                <div className="flex items-center gap-3 mt-auto">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      background: "linear-gradient(135deg,#7c3aed,#3b82f6)",
                      color: "#fff",
                    }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-zinc-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing CTA ── */}
      <section id="pricing" className="px-6 py-28">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-2xl mx-auto text-center rounded-3xl p-12 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(59,130,246,0.25), rgba(236,72,153,0.2))",
            border: "1px solid rgba(124,58,237,0.35)",
            boxShadow: "0 0 60px rgba(124,58,237,0.2)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              background:
                "radial-gradient(ellipse 70% 70% at 50% 0%, rgba(167,139,250,0.5) 0%, transparent 70%)",
            }}
          />
          <p
            className="text-xs uppercase tracking-widest font-semibold mb-4 relative"
            style={{ color: "#c4b5fd" }}
          >
            Start today
          </p>
          <h2
            className="text-4xl md:text-5xl font-black tracking-tight mb-5 relative"
            style={{ letterSpacing: "-0.03em" }}
          >
            Free forever.{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#a78bfa,#f472b6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Upgrade when ready.
            </span>
          </h2>
          <p className="text-zinc-400 mb-10 relative text-base leading-relaxed">
            No hidden fees. No expiring trials. Start sending invoices today and
            unlock powerful features as you grow.
          </p>
          <Link href="/login">
            <motion.button
              whileHover={{
                scale: 1.06,
                boxShadow: "0 0 50px rgba(124,58,237,0.7)",
              }}
              whileTap={{ scale: 0.97 }}
              className="relative px-10 py-4 rounded-2xl text-base font-bold text-white"
              style={{
                background: "linear-gradient(135deg,#7c3aed,#3b82f6,#ec4899)",
                boxShadow: "0 0 30px rgba(124,58,237,0.5)",
              }}
            >
              Create Your Free Account →
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer
        className="px-8 py-8 text-center text-xs text-zinc-600"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        © 2025 Billflow, Inc. · All rights reserved.
      </footer>
    </main>
  );
}
