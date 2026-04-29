'use client'

import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-120px' })

  return (
    <section id="about" ref={ref} className="border-b border-[#1a1a18]/10 bg-[#faf7f0] px-5 py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: EASE_OUT }}
        >
          <p className="mb-8 text-[11px] font-medium uppercase tracking-[0.34em] text-[#8a6f48]">
            스튜디오 소개
          </p>
          <h2 className="max-w-xl text-[clamp(32px,4vw,56px)] font-medium leading-[1.02] text-[#111110]">
            빛과 공기, 그리고 표정을 세심하게 다루는 공간.
          </h2>
          <div className="mt-9 max-w-xl space-y-5 text-[15px] leading-8 text-[#5d574f]">
            <p>
              PINO STUDIO는 과장된 연출보다 인물의 본래 분위기와 신뢰감을 먼저
              바라봅니다. 촬영 전 상담부터 조명, 배경, 시선의 방향까지 차분하게
              설계해 한 장의 사진에 필요한 밀도를 만듭니다.
            </p>
            <p>
              프로필, 브랜드 이미지, 개인 기록 모두 목적은 다르지만 기준은 같습니다.
              사진을 보는 사람이 오래 머물 수 있도록, 불필요한 요소를 덜어내고 가장
              선명한 인상을 남깁니다.
            </p>
          </div>

          <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-[#1a1a18]/10 pt-7">
            {[
              ['500+', '촬영 경험'],
              ['30', '공간 기록'],
              ['1:1', '맞춤 디렉팅'],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="text-2xl font-medium text-[#111110]">{value}</dt>
                <dd className="mt-2 text-[10px] font-medium uppercase tracking-[0.22em] text-[#7b746a]">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 34 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.12, ease: EASE_OUT }}
          className="relative min-h-[420px] overflow-hidden bg-[#eee6da]"
        >
          <Image
            src="/images/facilities/facility%20(1).jpg"
            alt="Inside PINO STUDIO"
            fill
            sizes="(min-width: 1024px) 46vw, 92vw"
            className="object-cover opacity-82"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#faf7f0]/34 via-transparent to-[#faf7f0]/18" />
        </motion.div>
      </div>
    </section>
  )
}
