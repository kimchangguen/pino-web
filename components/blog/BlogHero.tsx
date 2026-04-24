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
    <section className="blog-rings bg-blog-surface pt-28 md:pt-32">
      <div className="mx-auto max-w-[1080px] px-5 sm:px-8">
        <div className="max-w-[520px] pb-7">
          <p className="mb-2 text-[11px] font-extrabold tracking-tight text-blog-orange">
            ADGRIT BLOG
          </p>
          <h1 className="text-[34px] font-black leading-[1.04] tracking-normal text-blog-navy sm:text-[42px]">
            마케팅의 모든 것,
            <br />
            애드그릿 블로그
          </h1>
          <p className="mt-4 max-w-[360px] text-[13px] leading-6 text-blog-muted">
            실전 광고 운영 노하우와 콘텐츠 제작 팁, 브랜드 성장에 필요한 인사이트를 한곳에서 만나보세요.
          </p>
          <div className="mt-6 flex gap-2.5">
            <Link
              href="/#contact"
              className="rounded-full bg-blog-blue px-5 py-2.5 text-[12px] font-bold text-white shadow-[0_8px_18px_rgba(23,56,168,0.18)] transition hover:bg-blog-navy"
            >
              광고문의
            </Link>
            <Link
              href="/#portfolio"
              className="rounded-full border border-blog-border bg-white px-5 py-2.5 text-[12px] font-bold text-blog-blue transition hover:border-blog-blue"
            >
              포트폴리오
            </Link>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[5px] bg-[#101827] shadow-[0_16px_42px_rgba(8,36,107,0.16)]">
          {activePost ? (
            <Link href={`/blog/${activePost.id}`} className="group block">
              <div className="relative aspect-[2.55/1] min-h-[210px] overflow-hidden sm:min-h-[250px]">
                {image ? (
                  <img
                    src={image}
                    alt={stripHtml(activePost.title.rendered)}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="h-full w-full bg-[linear-gradient(135deg,#0f1f45_0%,#2764a8_48%,#101827_100%)]" />
                )}
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,17,38,0.76),rgba(7,17,38,0.24)_48%,rgba(7,17,38,0.12))]" />
                <div className="absolute bottom-0 left-0 max-w-[720px] p-5 text-white sm:p-7">
                  <p className="mb-2 text-[11px] font-bold text-white/80">
                    {formatDate(activePost.date)}
                  </p>
                  <h2
                    className="line-clamp-2 text-[20px] font-extrabold leading-tight sm:text-[28px]"
                    dangerouslySetInnerHTML={{ __html: activePost.title.rendered }}
                  />
                  {excerpt && (
                    <p className="mt-2 line-clamp-2 text-[12px] leading-5 text-white/78 sm:text-[13px]">
                      {excerpt}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ) : (
            <div className="flex aspect-[2.55/1] min-h-[210px] items-center justify-center bg-[linear-gradient(135deg,#0f1f45_0%,#2764a8_48%,#101827_100%)] p-8 text-center text-white">
              <p className="text-sm font-semibold">표시할 최신 글을 불러오는 중입니다.</p>
            </div>
          )}

          {slides.length > 1 && (
            <>
              <button
                type="button"
                aria-label="이전 글"
                onClick={() =>
                  setActiveIndex((current) => (current - 1 + slides.length) % slides.length)
                }
                className="absolute left-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-blog-blue shadow transition hover:bg-white"
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="다음 글"
                onClick={() => setActiveIndex((current) => (current + 1) % slides.length)}
                className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-blog-blue shadow transition hover:bg-white"
              >
                ›
              </button>
              <div className="absolute bottom-3 right-4 flex gap-1.5">
                {slides.map((post, index) => (
                  <button
                    key={post.id}
                    type="button"
                    aria-label={`${index + 1}번째 글 보기`}
                    onClick={() => setActiveIndex(index)}
                    className={`h-1.5 rounded-full transition ${
                      activeIndex === index ? 'w-5 bg-white' : 'w-1.5 bg-white/45'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
