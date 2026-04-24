'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import type { WPPost, WPCategory } from '@/lib/wordpress'
import PostCard from './PostCard'

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

interface CategorySectionProps {
  category: WPCategory
  posts: WPPost[]
  index: number
}

export default function CategorySection({ category, posts, index }: CategorySectionProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  if (posts.length === 0) return null

  return (
    <section ref={ref} className="min-w-0">
      {/* 섹션 헤더 */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.04 * index, ease: EASE_OUT }}
        className="flex items-center justify-between mb-5 pb-3 border-b border-[#e5e2da]"
      >
        <div className="flex items-center gap-2.5">
          <h2
            className="text-[#1a1a18]"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.0625rem, 2vw, 1.25rem)',
              fontWeight: 400,
            }}
          >
            {category.name}
          </h2>
          {category.count > 0 && (
            <span
              className="text-[#c0bdb5] text-[10px] tabular-nums"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              {category.count}
            </span>
          )}
        </div>

        <Link
          href={`/blog?cat=${category.slug}`}
          className="flex items-center gap-1.5 text-[#8c8c86] text-[10px] tracking-[0.2em] uppercase hover:text-[#c8a876] transition-colors duration-300 shrink-0"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          더보기
          <svg width="11" height="9" viewBox="0 0 12 10" fill="none" aria-hidden="true">
            <path
              d="M7 1L11 5M11 5L7 9M11 5H1"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </motion.div>

      {/* 3×3 포스트 카드 그리드 */}
      <div className="grid grid-cols-3 gap-3 md:gap-4">
        {posts.slice(0, 9).map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.65,
              delay: 0.04 * index + 0.05 * i,
              ease: EASE_OUT,
            }}
          >
            <PostCard post={post} compact />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
