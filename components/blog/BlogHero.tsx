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
    <section className="overflow-hidden border border-[#1a1a18]/10 bg-[#fffaf3]">
      <div className="relative h-[300px] overflow-hidden bg-[#eee6da] sm:h-[390px] lg:h-[430px]">
        {activePost ? (
          <Link href={`/blog/${activePost.id}`} className="group block h-full">
            {image ? (
              <img
                src={image}
                alt={stripHtml(activePost.title.rendered)}
                className="absolute inset-0 h-full w-full object-cover brightness-[0.92] transition duration-700 group-hover:scale-[1.025] group-hover:brightness-105"
              />
            ) : (
              <div className="absolute inset-0 bg-[#eee6da]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/64 via-black/12 to-transparent" />
            <div className="absolute left-5 top-5">
              <span className="inline-block bg-[#fffaf3]/90 px-3 py-1.5 text-xs font-medium text-[#111110] shadow-sm">
                추천 글
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <h2
                className="line-clamp-2 max-w-3xl text-2xl font-medium leading-tight text-white transition-colors sm:text-3xl"
                dangerouslySetInnerHTML={{ __html: activePost.title.rendered }}
              />
              {excerpt && (
                <p className="mt-3 line-clamp-2 max-w-2xl text-sm leading-relaxed text-white/76">
                  {excerpt}
                </p>
              )}
              <p className="mt-3 text-xs text-white/62">{formatDate(activePost.date)}</p>
            </div>
          </Link>
        ) : (
          <div className="flex h-full items-center justify-center text-[#111110]">
            <p className="text-sm font-medium text-[#6f6a61]">
              표시할 글을 준비하고 있습니다.
            </p>
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
              className="absolute left-4 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center bg-[#fffaf3]/82 text-xl text-[#111110] backdrop-blur-sm transition hover:bg-white"
            >
              &lt;
            </button>
            <button
              type="button"
              aria-label="다음 슬라이드"
              onClick={() => setActiveIndex((current) => (current + 1) % slides.length)}
              className="absolute right-4 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center bg-[#fffaf3]/82 text-xl text-[#111110] backdrop-blur-sm transition hover:bg-white"
            >
              &gt;
            </button>
            <div className="absolute bottom-5 right-5 flex gap-2">
              {slides.map((post, index) => (
                <button
                  key={post.id}
                  type="button"
                  aria-label={`${index + 1}번째 슬라이드 보기`}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 rounded-full transition ${
                    activeIndex === index ? 'w-7 bg-white' : 'w-2 bg-white/52'
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
