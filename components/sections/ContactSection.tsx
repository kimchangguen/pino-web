'use client'

import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

const fadeUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay, ease: EASE_OUT },
  },
})

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="contact"
      ref={ref}
      className="py-32 md:py-44 relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #131210 0%, #1c1a16 100%)' }}
    >
      {/* Grain */}
      <div className="absolute inset-0 pointer-events-none grain" aria-hidden="true" />

      {/* Accent glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 80%, rgba(200,168,118,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.p
          variants={fadeUp(0)}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="text-[#c8a876] text-xs tracking-[0.4em] uppercase mb-6"
        >
          Contact
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Heading + info */}
          <div>
            <motion.h2
              variants={fadeUp(0.1)}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              className="text-white leading-tight mb-10"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                fontWeight: 400,
              }}
            >
              촬영을 예약하고<br />
              <em>특별한 순간</em>을 만드세요
            </motion.h2>

            <motion.div
              variants={fadeUp(0.2)}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              className="space-y-6"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              {[
                {
                  label: 'Instagram',
                  value: '@pinostudio',
                  href: 'https://instagram.com',
                },
                {
                  label: 'Kakao',
                  value: '카카오 채널 문의',
                  href: 'https://pf.kakao.com',
                },
                {
                  label: 'Email',
                  value: 'hello@pinostudio.kr',
                  href: 'mailto:hello@pinostudio.kr',
                },
                {
                  label: 'Location',
                  value: '서울특별시 마포구',
                  href: null,
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-5">
                  <span className="text-[#c8a876] text-[10px] tracking-[0.3em] uppercase w-20 pt-0.5 shrink-0">
                    {item.label}
                  </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 text-sm hover:text-[#c8a876] transition-colors duration-300"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-white/70 text-sm">{item.value}</span>
                  )}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Inquiry form */}
          <motion.div
            variants={fadeUp(0.25)}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
          >
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault()
                alert('문의가 접수되었습니다. 빠른 시일 내 연락드리겠습니다.')
              }}
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#8c8c86] text-[10px] tracking-[0.25em] uppercase mb-2">
                    이름
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="홍길동"
                    className="w-full bg-white/5 border border-white/10 text-white/80 text-sm px-4 py-3 placeholder:text-white/25 focus:outline-none focus:border-[#c8a876]/60 transition-colors duration-300"
                  />
                </div>
                <div>
                  <label className="block text-[#8c8c86] text-[10px] tracking-[0.25em] uppercase mb-2">
                    연락처
                  </label>
                  <input
                    type="tel"
                    placeholder="010-0000-0000"
                    className="w-full bg-white/5 border border-white/10 text-white/80 text-sm px-4 py-3 placeholder:text-white/25 focus:outline-none focus:border-[#c8a876]/60 transition-colors duration-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#8c8c86] text-[10px] tracking-[0.25em] uppercase mb-2">
                  촬영 종류
                </label>
                <select className="w-full bg-white/5 border border-white/10 text-white/70 text-sm px-4 py-3 focus:outline-none focus:border-[#c8a876]/60 transition-colors duration-300 appearance-none">
                  <option value="" className="bg-[#1a1917]">선택해 주세요</option>
                  <option value="profile" className="bg-[#1a1917]">프로필 촬영</option>
                  <option value="family" className="bg-[#1a1917]">가족 촬영</option>
                  <option value="wedding" className="bg-[#1a1917]">웨딩 촬영</option>
                  <option value="snap" className="bg-[#1a1917]">스냅 촬영</option>
                  <option value="other" className="bg-[#1a1917]">기타</option>
                </select>
              </div>

              <div>
                <label className="block text-[#8c8c86] text-[10px] tracking-[0.25em] uppercase mb-2">
                  문의 내용
                </label>
                <textarea
                  rows={4}
                  placeholder="희망 날짜, 장소, 특별 요청 사항 등을 적어주세요."
                  className="w-full bg-white/5 border border-white/10 text-white/80 text-sm px-4 py-3 placeholder:text-white/25 focus:outline-none focus:border-[#c8a876]/60 transition-colors duration-300 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#c8a876] text-[#111110] text-xs tracking-[0.3em] uppercase font-medium hover:bg-[#e0c99a] transition-colors duration-300"
              >
                예약 문의하기
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
