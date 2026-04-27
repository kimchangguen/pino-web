'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import type { WPCategory, WPPost } from '@/lib/wordpress'
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

  return (
    <section ref={ref} className="min-w-0">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay: 0.04 * index, ease: EASE_OUT }}
        className="mb-5 flex items-end justify-between border-b-2 border-slate-950 pb-2"
      >
        <div className="flex min-w-0 items-center gap-2">
          <span className="h-2 w-2 shrink-0 bg-blog-orange" />
          <h2 className="truncate text-[15px] font-extrabold leading-none text-slate-950">
            {category.name}
          </h2>
        </div>
        <Link
          href={`/blog?cat=${category.slug}`}
          className="shrink-0 rounded-full border border-slate-200 px-3 py-1.5 text-[11px] font-bold text-slate-500 transition hover:border-blog-orange hover:text-blog-orange"
        >
          더보기
        </Link>
      </motion.div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {posts.slice(0, 4).map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.58,
                delay: 0.04 * index + 0.04 * i,
                ease: EASE_OUT,
              }}
            >
              <PostCard post={post} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-5 py-12 text-center">
          <p className="text-sm font-medium text-slate-500">
            이 카테고리의 글을 준비하고 있습니다.
          </p>
        </div>
      )}
    </section>
  )
}
