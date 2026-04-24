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
  const inView = useInView(ref, { once: true, margin: '-60px' })

  if (posts.length === 0) return null

  return (
    <section ref={ref} className="py-14 md:py-16 border-b border-[#e5e2da] last:border-0">
      {/* 섹션 헤더 */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.05 * index, ease: EASE_OUT }}
        className="flex items-baseline justify-between mb-8 md:mb-10"
      >
        <div className="flex items-baseline gap-4">
          <h2
            className="text-[#1a1a18]"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
              fontWeight: 400,
            }}
          >
            {category.name}
          </h2>
          <span
            className="text-[#c0bdb5] text-xs tabular-nums"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {category.count}
          </span>
        </div>

        <Link
          href={`/blog?cat=${category.slug}`}
          className="flex items-center gap-1.5 text-[#8c8c86] text-xs tracking-[0.2em] uppercase hover:text-[#c8a876] transition-colors duration-300"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          View All
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none" aria-hidden="true">
            <path d="M7 1L11 5M11 5L7 9M11 5H1" stroke="currentColor" strokeWidth="1.2"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </motion.div>

      {/* 포스트 카드 그리드 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8">
        {posts.slice(0, 4).map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.75,
              delay: 0.08 * index + 0.07 * i,
              ease: EASE_OUT,
            }}
          >
            <PostCard post={post} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
