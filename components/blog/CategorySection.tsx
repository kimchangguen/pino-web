'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import type { WPCategory, WPPost } from '@/lib/wordpress'
import { formatDate, getFeaturedImage, stripHtml } from '@/lib/wordpress'

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

interface CategorySectionProps {
  category: WPCategory
  posts: WPPost[]
  index: number
}

export default function CategorySection({ category, posts, index }: CategorySectionProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const visiblePosts = posts.slice(0, 6)

  return (
    <section ref={ref} className="min-w-0 border border-[#1a1a18]/10 bg-[#fffaf3] p-4">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay: 0.04 * index, ease: EASE_OUT }}
        className="mb-4 flex items-center justify-between border-b border-[#1a1a18]/10 pb-3"
      >
        <div className="flex min-w-0 items-center gap-2">
          <span className="h-1.5 w-1.5 shrink-0 bg-[#8a6f48]" />
          <h2 className="truncate text-[15px] font-medium leading-none text-[#111110]">
            {category.name}
          </h2>
        </div>
        <Link
          href={`/blog?cat=${category.slug}`}
          className="shrink-0 border border-[#1a1a18]/10 px-3 py-1.5 text-[11px] font-medium text-[#6f6a61] transition hover:border-[#111110]/42 hover:text-[#111110]"
        >
          더보기
        </Link>
      </motion.div>

      {visiblePosts.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
          {visiblePosts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.04 * index + 0.03 * i,
                ease: EASE_OUT,
              }}
            >
              <CompactPostCard post={post} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="border border-dashed border-[#1a1a18]/10 bg-[#faf7f0] px-5 py-10 text-center">
          <p className="text-sm font-medium text-[#6f6a61]">
            이 카테고리의 글을 준비하고 있습니다.
          </p>
        </div>
      )}
    </section>
  )
}

function CompactPostCard({ post }: { post: WPPost }) {
  const image = getFeaturedImage(post)
  const categoryName = post.categories?.[0]?.name

  return (
    <article className="group border border-[#1a1a18]/10 bg-[#faf7f0] p-2.5 transition hover:-translate-y-0.5 hover:border-[#111110]/22">
      <Link href={`/blog/${post.id}`} className="flex gap-3">
        <div className="relative h-16 w-20 shrink-0 overflow-hidden bg-[#eee6da]">
          {image ? (
            <img
              src={image}
              alt={stripHtml(post.title.rendered)}
              className="h-full w-full object-cover brightness-[0.96] transition duration-500 group-hover:scale-105 group-hover:brightness-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[#eee6da]">
              <span className="text-xl font-medium text-[#8f887d]">P</span>
            </div>
          )}
          {categoryName && (
            <span className="absolute left-1.5 top-1.5 max-w-[68px] truncate bg-[#fffaf3]/90 px-1.5 py-0.5 text-[8px] font-bold text-[#111110] shadow-sm">
              {categoryName}
            </span>
          )}
        </div>

        <div className="min-w-0 py-0.5">
          <p className="mb-1 text-[10px] font-medium text-[#8a6f48]">
            {formatDate(post.date)}
          </p>
          <h3
            className="line-clamp-2 text-sm font-medium leading-snug text-[#111110] transition group-hover:text-[#8a6f48]"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
        </div>
      </Link>
    </article>
  )
}
