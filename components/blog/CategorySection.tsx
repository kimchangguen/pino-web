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
    <section
      ref={ref}
      className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_10px_24px_rgba(15,23,42,0.05)]"
    >
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay: 0.04 * index, ease: EASE_OUT }}
        className="mb-4 flex items-center justify-between border-b-2 border-slate-950 pb-2"
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
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-5 py-10 text-center">
          <p className="text-sm font-medium text-slate-500">
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
    <article className="group rounded-xl border border-slate-200 bg-white p-2.5 shadow-[0_8px_18px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(15,23,42,0.08)]">
      <Link href={`/blog/${post.id}`} className="flex gap-3">
        <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-slate-900">
          {image ? (
            <img
              src={image}
              alt={stripHtml(post.title.rendered)}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-950 to-slate-700">
              <span
                className="text-xl italic text-white/45"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                P
              </span>
            </div>
          )}
          {categoryName && (
            <span className="absolute left-1.5 top-1.5 max-w-[68px] truncate rounded-full bg-white/90 px-1.5 py-0.5 text-[8px] font-bold text-slate-900 shadow-sm">
              {categoryName}
            </span>
          )}
        </div>

        <div className="min-w-0 py-0.5">
          <p className="mb-1 text-[10px] font-semibold text-[#b89662]">
            {formatDate(post.date)}
          </p>
          <h3
            className="line-clamp-2 text-sm font-semibold leading-snug text-slate-950 transition group-hover:text-[#b89662]"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
        </div>
      </Link>
    </article>
  )
}
