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
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
      <div className="relative overflow-hidden bg-white px-6 py-8 sm:px-8 sm:py-10">
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-60" aria-hidden="true">
          <svg viewBox="0 0 420 320" className="h-full w-full" preserveAspectRatio="xMaxYMid slice">
            <ellipse cx="340" cy="155" rx="240" ry="210" fill="#f1f5f9" />
            <ellipse cx="300" cy="45" rx="130" ry="90" fill="#ead8b9" />
            <path
              d="M-20 230 Q120 174 245 230 T480 230"
              stroke="#020617"
              strokeWidth="1.2"
              fill="none"
              opacity="0.08"
            />
            <path
              d="M-20 270 Q120 214 245 270 T480 270"
              stroke="#020617"
              strokeWidth="1.2"
              fill="none"
              opacity="0.08"
            />
          </svg>
        </div>

        <div className="relative">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#b89662]">
            PINO STUDIO BLOG
          </p>
          <h1
            className="text-3xl font-medium leading-[1.12] tracking-normal text-slate-950 sm:text-5xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            시선을 머물게 하는 첫인상,
            <br />
            <span className="italic">PINO STUDIO</span>
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-7 text-slate-500">
            배우, 강사, 비즈니스 프로필부터 개인 화보까지. 당신의 가치를 증명하는
            단 한 장의 사진을 만듭니다.
          </p>
        </div>
      </div>

      <div className="relative h-[300px] overflow-hidden bg-slate-900 sm:h-[390px] lg:h-[430px]">
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
            <div className="absolute left-5 top-5">
              <span className="inline-block rounded-full border border-white/20 bg-black/50 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                Featured Portfolio
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <h2
                className="line-clamp-2 max-w-3xl text-2xl font-medium leading-tight text-white transition-colors group-hover:text-[#e8d3ad] sm:text-3xl"
                style={{ fontFamily: 'var(--font-display)' }}
                dangerouslySetInnerHTML={{ __html: activePost.title.rendered }}
              />
              {excerpt && (
                <p className="mt-3 line-clamp-2 max-w-2xl text-sm leading-relaxed text-white/65">
                  {excerpt}
                </p>
              )}
              <p className="mt-3 text-xs text-white/40">{formatDate(activePost.date)}</p>
            </div>
          </Link>
        ) : (
          <div className="flex h-full items-center justify-center text-white">
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
              className="absolute left-4 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-xl text-white backdrop-blur-sm transition hover:bg-white/25"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="다음 슬라이드"
              onClick={() => setActiveIndex((current) => (current + 1) % slides.length)}
              className="absolute right-4 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-xl text-white backdrop-blur-sm transition hover:bg-white/25"
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
    </section>
  )
}
