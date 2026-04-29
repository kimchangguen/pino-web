'use client'

import { motion, useScroll, useTransform } from 'framer-motion'

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

const HERO_IMAGE = '/images/main/hero-bg.jpg'

export default function HeroSection() {
  const { scrollY } = useScroll()
  const backgroundY = useTransform(scrollY, [0, 900], [0, 90])

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden border-b border-[#1a1a18]/10 bg-[#faf7f0] px-5 py-28"
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 -top-24 h-[calc(100%+12rem)] bg-cover bg-center opacity-[0.34]"
        style={{
          y: backgroundY,
          backgroundImage: `url("${HERO_IMAGE}")`,
        }}
      />
      <div className="absolute inset-0 bg-[#faf7f0]/68" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#faf7f0]/82 via-[#faf7f0]/42 to-[#faf7f0]/92" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.32),transparent_62%)]" />
      <div className="absolute inset-8 border border-[#1a1a18]/10" />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: EASE_OUT }}
        className="relative z-10 mx-auto max-w-5xl text-center"
      >
        <p className="mb-8 text-[11px] font-medium uppercase tracking-[0.34em] text-[#6f6a61]">
          PINO STUDIO
        </p>
        <h1 className="mx-auto max-w-5xl text-[clamp(44px,7.6vw,104px)] font-medium leading-[0.95] text-[#111110]">
          당신의 결을 살리는
          <br />
          정교한 한 장.
        </h1>
        <p className="mx-auto mt-8 max-w-xl text-[15px] leading-8 text-[#4b4740]">
          부드러운 빛과 정적이 흐르는 공간에서, 가장 자신감 있는 순간을 차분하고
          선명하게 기록합니다.
        </p>

        <div className="mt-11 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#works"
            className="inline-flex h-11 min-w-36 items-center justify-center bg-[#111110] px-6 text-[11px] font-medium uppercase tracking-[0.22em] text-white transition hover:bg-[#2a2824]"
          >
            작업 보기
          </a>
          <a
            href="#contact"
            className="inline-flex h-11 min-w-36 items-center justify-center border border-[#111110]/24 bg-white/28 px-6 text-[11px] font-medium uppercase tracking-[0.22em] text-[#111110] transition hover:border-[#111110]/54 hover:bg-white/54"
          >
            문의하기
          </a>
        </div>
      </motion.div>

      <div className="absolute bottom-10 left-1/2 h-10 w-px -translate-x-1/2 bg-gradient-to-b from-[#111110]/42 to-transparent" />
    </section>
  )
}
