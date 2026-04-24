'use client'

import { motion, type Variants } from 'framer-motion'

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, delay, ease: EASE_OUT },
  }),
}

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center grain overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #131210 0%, #1e1c18 40%, #0e0d0b 100%)' }}
    >
      {/* Subtle radial highlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(200,168,118,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Eyebrow */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.2}
          className="text-[#c8a876] text-xs tracking-[0.4em] uppercase mb-8"
        >
          Photography Studio
        </motion.p>

        {/* Main Title */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.45}
          className="text-white leading-none mb-6"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3.5rem, 10vw, 9rem)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
          }}
        >
          Pino Studio
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.7, ease: EASE_OUT }}
          className="w-16 h-px bg-[#c8a876] mx-auto mb-8 origin-left"
        />

        {/* Tagline */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.9}
          className="text-white/60 text-base md:text-lg font-light tracking-wider leading-relaxed"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          빛과 순간을 담는 사진 스튜디오
        </motion.p>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1.1}
          className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#portfolio"
            className="group inline-flex items-center gap-3 px-8 py-3.5 border border-[#c8a876] text-[#c8a876] text-xs tracking-[0.25em] uppercase transition-all duration-300 hover:bg-[#c8a876] hover:text-[#111110]"
          >
            작업물 보기
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-3.5 text-white/50 text-xs tracking-[0.25em] uppercase transition-colors duration-300 hover:text-white"
          >
            예약 문의 →
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent"
        />
      </motion.div>
    </section>
  )
}
