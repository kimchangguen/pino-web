'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import type { WPPost } from '@/lib/wordpress'
import { getFeaturedImage, formatDate, stripHtml, CATEGORY_ORDER } from '@/lib/wordpress'

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

interface PostListProps {
  posts: WPPost[]
  activeSlug?: string
}

export default function PostList({ posts, activeSlug }: PostListProps) {
  const categoryLabel = CATEGORY_ORDER.find((c) => c.slug === activeSlug)?.label

  if (posts.length === 0) {
    return (
      <div className="py-24 text-center">
        <p
          className="text-[#8c8c86] text-sm"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          {categoryLabel ? `'${categoryLabel}' 카테고리에 아직 글이 없습니다.` : '게시된 글이 없습니다.'}
        </p>
      </div>
    )
  }

  return (
    <ul className="divide-y divide-[#e5e2da]">
      {posts.map((post, i) => {
        const image = getFeaturedImage(post)
        const excerpt = stripHtml(post.excerpt.rendered)

        return (
          <motion.li
            key={post.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: i * 0.055, ease: EASE_OUT }}
          >
            <Link href={`/blog/${post.id}`} className="group block py-8 md:py-10">
              <div className="flex flex-col sm:flex-row gap-6 md:gap-10">
                {/* ── 썸네일 ── */}
                <div className="w-full sm:w-56 md:w-72 lg:w-80 shrink-0">
                  <div className="aspect-[4/3] overflow-hidden">
                    {image ? (
                      <img
                        src={image}
                        alt={post.title.rendered}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center"
                        style={{
                          background:
                            'linear-gradient(135deg, #1c1c1a 0%, #302e28 100%)',
                        }}
                      >
                        <span
                          className="text-[#c8a876]/30 text-4xl"
                          style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
                        >
                          {post.title.rendered.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* ── 텍스트 ── */}
                <div className="flex flex-col justify-center min-w-0 flex-1">
                  {/* 날짜 */}
                  <p
                    className="text-[#c8a876] text-[10px] tracking-[0.3em] uppercase mb-3"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {formatDate(post.date)}
                  </p>

                  {/* 제목 */}
                  <h2
                    className="text-[#1a1a18] leading-snug mb-3 transition-colors duration-300 group-hover:text-[#c8a876]"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.1875rem, 2.5vw, 1.5rem)',
                      fontWeight: 400,
                    }}
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />

                  {/* 요약문 */}
                  {excerpt && (
                    <p
                      className="text-[#6b6b65] text-sm leading-[1.8] line-clamp-2 mb-5"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      {excerpt}
                    </p>
                  )}

                  {/* 읽기 링크 */}
                  <span
                    className="inline-flex items-center gap-1.5 text-[#c8a876] text-xs tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-auto"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    자세히 읽기
                    <svg width="12" height="10" viewBox="0 0 12 10" fill="none" aria-hidden="true">
                      <path d="M7 1L11 5M11 5L7 9M11 5H1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          </motion.li>
        )
      })}
    </ul>
  )
}
