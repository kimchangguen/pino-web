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
  const inView = useInView(ref, { once: true, margin: '-60px' })

  if (posts.length === 0) return null

  return (
    <section ref={ref} className="border-t border-slate-200 pt-8">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay: 0.04 * index, ease: EASE_OUT }}
        className="mb-6 flex items-end justify-between gap-5"
      >
        <div>
          <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.28em] text-blog-orange">
            Gallery
          </p>
          <h2
            className="text-[30px] font-medium leading-none tracking-normal text-blog-navy md:text-[38px]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {category.name}
          </h2>
        </div>
        <Link
          href={`/blog?cat=${category.slug}`}
          className="text-[11px] font-medium uppercase tracking-[0.24em] text-slate-500 transition hover:text-blog-orange"
        >
          View All
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {posts.slice(0, 7).map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.62,
              delay: 0.04 * index + 0.04 * i,
              ease: EASE_OUT,
            }}
            className={i === 0 ? 'sm:col-span-2 sm:row-span-2' : undefined}
          >
            <PostCard post={post} featured={i === 0} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
