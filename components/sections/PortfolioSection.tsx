'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

const works = [
  {
    title: 'Concrete Light',
    category: '인물 프로필',
    src: '/images/portfolio/portfolio%20(20).jpg',
    className: 'md:col-span-2',
  },
  {
    title: 'Black Object',
    category: '브랜드 스틸',
    src: '/images/portfolio/portfolio%20(31).jpg',
    className: '',
  },
  {
    title: 'Profile Study',
    category: '개인 기록',
    src: '/images/portfolio/portfolio%20(58).jpg',
    className: '',
  },
  {
    title: 'Evening Room',
    category: '스튜디오 무드',
    src: '/images/facilities/facility%20(14).jpg',
    className: 'md:col-span-2',
  },
]

export default function PortfolioSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-120px' })

  return (
    <section id="works" ref={ref} className="border-b border-[#1a1a18]/10 bg-[#faf7f0] px-5 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col gap-6 border-b border-[#1a1a18]/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.34em] text-[#8a6f48]">
              포트폴리오
            </p>
            <h2 className="text-[clamp(32px,4vw,56px)] font-medium leading-[1.02] text-[#111110]">
              선택된 장면들
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex h-10 items-center justify-center border border-[#111110]/18 px-5 text-[10px] font-medium uppercase tracking-[0.22em] text-[#5d574f] transition hover:border-[#111110]/42 hover:text-[#111110]"
          >
            전체 보기
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {works.map((work, index) => (
            <motion.article
              key={work.title}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: index * 0.08, ease: EASE_OUT }}
              className={work.className}
            >
              <Link href="/portfolio" className="group block">
                <div className="relative aspect-[4/3] overflow-hidden bg-[#eee6da]">
                  <Image
                    src={work.src}
                    alt={work.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 92vw"
                    className="object-cover brightness-[0.96] transition duration-700 group-hover:scale-[1.035] group-hover:brightness-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/18 via-transparent to-transparent" />
                </div>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-[#111110]">{work.title}</h3>
                    <p className="mt-1 text-[11px] text-[#7b746a]">{work.category}</p>
                  </div>
                  <span className="text-[10px] font-medium text-[#9a9185]">
                    0{index + 1}
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
