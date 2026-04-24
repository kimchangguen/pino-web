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

  if (posts.length === 0) return null

  return (
    <section ref={ref} className="min-w-0">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.45, delay: 0.04 * index, ease: EASE_OUT }}
        className="mb-4 flex items-end justify-between border-b-2 border-blog-blue pb-1.5"
      >
        <div className="flex min-w-0 items-center gap-1.5">
          <span className="h-2 w-2 shrink-0 bg-blog-orange" />
          <h2 className="truncate text-[15px] font-extrabold leading-none tracking-normal text-blog-navy">
            {category.name}
          </h2>
        </div>
        <Link
          href={`/blog?cat=${category.slug}`}
          className="shrink-0 text-[10px] font-bold uppercase tracking-normal text-blog-blue transition hover:text-blog-orange"
        >
          MORE +
        </Link>
      </motion.div>

      <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
        {posts.slice(0, 6).map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.48,
              delay: 0.04 * index + 0.035 * i,
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
