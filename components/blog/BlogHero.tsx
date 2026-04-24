'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import type { WPPost } from '@/lib/wordpress'
import { formatDate, getFeaturedImage, stripHtml } from '@/lib/wordpress'

interface BlogHeroProps {
  posts: WPPost[]
}

export default function BlogHero({ posts }: BlogHeroProps) {
  const slides = useMemo(() => posts.slice(0, 5), [posts])
  const [activeIndex, setActiveIndex] = useState(0)
  const activePost = slides[activeIndex]
  const image = activePost ? getFeaturedImage(activePost) : null
  const excerpt = activePost ? stripHtml(activePost.excerpt.rendered) : ''

  return (
    <>
      <section className="relative overflow-hidden bg-white pb-12 pt-24 sm:pb-16 sm:pt-32">
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[55%]" aria-hidden="true">
          <svg
            viewBox="0 0 600 440"
            className="absolute right-0 top-0 h-full w-full opacity-[0.05]"
            preserveAspectRatio="xMaxYMid slice"
          >
            <ellipse cx="490" cy="210" rx="360" ry="290" fill="#020617" />
            <ellipse cx="410" cy="70" rx="200" ry="155" fill="#b89662" />
            <ellipse cx="550" cy="370" rx="170" ry="130" fill="#020617" />
          </svg>
          <svg
            viewBox="0 0 600 440"
            className="absolute right-0 top-0 h-full w-full opacity-[0.06]"
            preserveAspectRatio="xMaxYMid slice"
          >
            {[210, 254, 298, 342, 386, 430].map((y) => (
              <path
                key={y}
                d={`M -60 ${y} Q 150 ${y - 75} 310 ${y} T 660 ${y}`}
                stroke="#020617"
                strokeWidth="1.5"
                fill="none"
              />
            ))}
          </svg>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-blog-orange">
            PINO STUDIO BLOG
          </p>
          <h1
            className="text-3xl font-medium leading-[1.15] tracking-normal text-blog-navy sm:text-4xl lg:text-[3.35rem]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            시선을 머물게 하는 첫인상,
            <br />
            <span className="italic text-slate-900">PINO STUDIO</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-[1.75] text-slate-500 sm:text-[1.0625rem]">
            배우, 강사, 비즈니스 프로필부터 개인 화보까지.
            <br className="hidden sm:block" />
            당신의 가치를 증명하는 단 한 장의 사진을 만듭니다.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href="#categories"
              className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-slate-950/20 transition-colors hover:bg-slate-800"
            >
              포트폴리오 보기
            </a>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 transition-colors hover:border-slate-950 hover:text-slate-950"
            >
              촬영 문의
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white pb-12 sm:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative h-[320px] w-full select-none overflow-hidden rounded-2xl bg-slate-800 sm:h-[420px] lg:h-[480px]">
            {activePost ? (
              <Link href={`/blog/${activePost.id}`} className="group block h-full">
                {image ? (
                  <img
                    src={image}
                    alt={stripHtml(activePost.title.rendered)}
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-950 to-slate-700" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
                <div className="absolute left-5 top-5 sm:left-7 sm:top-7">
                  <span className="inline-block rounded-full border border-white/20 bg-black/50 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                    PINO Portfolio
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10">
                  <h2
                    className="line-clamp-2 max-w-3xl text-xl font-medium leading-tight text-white transition-colors group-hover:text-[#e8d3ad] sm:text-2xl lg:text-3xl"
                    style={{ fontFamily: 'var(--font-display)' }}
                    dangerouslySetInnerHTML={{ __html: activePost.title.rendered }}
                  />
                  {excerpt && (
                    <p className="mt-2 line-clamp-2 max-w-2xl text-sm leading-relaxed text-white/65 sm:mt-3">
                      {excerpt}
                    </p>
                  )}
                  <p className="mt-3 text-xs text-white/40">{formatDate(activePost.date)}</p>
                </div>
              </Link>
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-950 to-slate-700 text-white">
                <p className="text-sm font-semibold">표시할 포트폴리오를 불러오는 중입니다.</p>
              </div>
            )}

            {slides.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="이전 슬라이드"
                  onClick={() =>
                    setActiveIndex((current) => (current - 1 + slides.length) % slides.length)
                  }
                  className="absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-xl text-white backdrop-blur-sm transition hover:bg-white/25 sm:left-5 sm:h-11 sm:w-11"
                >
                  ‹
                </button>
                <button
                  type="button"
                  aria-label="다음 슬라이드"
                  onClick={() => setActiveIndex((current) => (current + 1) % slides.length)}
                  className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-xl text-white backdrop-blur-sm transition hover:bg-white/25 sm:right-5 sm:h-11 sm:w-11"
                >
                  ›
                </button>
                <div className="absolute bottom-5 right-5 flex gap-2">
                  {slides.map((post, index) => (
                    <button
                      key={post.id}
                      type="button"
                      aria-label={`${index + 1}번째 슬라이드 보기`}
                      onClick={() => setActiveIndex(index)}
                      className={`h-2 rounded-full transition ${
                        activeIndex === index ? 'w-7 bg-white' : 'w-2 bg-white/45'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
