'use client'

import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: EASE_OUT },
  },
}

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={ref} className="py-32 md:py-44 bg-[#fafaf6]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section label */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="text-[#c8a876] text-xs tracking-[0.4em] uppercase mb-6"
        >
          About
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Text side */}
          <div>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              className="text-[#1a1a18] leading-tight mb-10"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.2rem, 5vw, 4rem)',
                fontWeight: 400,
              }}
            >
              순간의 아름다움을<br />
              <em>영원히</em> 담습니다
            </motion.h2>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              className="space-y-5 text-[#6b6b65] leading-[1.9] text-[0.9375rem]"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              <p>
                피노스튜디오는 빛과 그림자가 만나는 순간을 포착합니다.
                단순한 사진을 넘어, 당신의 이야기를 담아내는 진정한 기록을 만들어 드립니다.
              </p>
              <p>
                인물 고유의 감성과 분위기를 살려, 자연스럽고 아름다운 모습을
                카메라에 담는 것이 저희의 철학입니다. 모든 촬영은 충분한 대화와
                교감을 통해 시작됩니다.
              </p>
              <p>
                프로필 · 가족 · 웨딩 · 스냅 촬영 전문으로,
                소중한 순간이 기억이 되도록 정성껏 촬영합니다.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              className="mt-10 flex flex-wrap gap-x-8 gap-y-4"
            >
              {[
                { num: '500+', label: '촬영 완료' },
                { num: '5년+', label: '스튜디오 운영' },
                { num: '98%', label: '고객 만족도' },
              ].map((item) => (
                <div key={item.label}>
                  <p
                    className="text-[#c8a876]"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '2rem',
                      fontWeight: 500,
                    }}
                  >
                    {item.num}
                  </p>
                  <p
                    className="text-[#8c8c86] text-xs tracking-widest uppercase mt-0.5"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {item.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 1.1, delay: 0.25, ease: EASE_OUT }}
            className="relative"
          >
            <div
              className="w-full aspect-[4/5] relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #1a1917 0%, #2c2a25 100%)' }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                <p
                  className="text-[#c8a876]/60 text-xs tracking-[0.3em] uppercase mb-3"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  Studio Photo
                </p>
                <p
                  className="text-white/20 text-sm"
                  style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
                >
                  작가 사진을 업로드해 주세요
                </p>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 w-32 h-32 border border-[#c8a876]/30 pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
