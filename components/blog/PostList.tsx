'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import type { WPPost } from '@/lib/wordpress'
import { CATEGORY_ORDER, formatDate, getFeaturedImage, stripHtml } from '@/lib/wordpress'

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

interface PostListProps {
  posts: WPPost[]
  activeSlug?: string
}

export default function PostList({ posts, activeSlug }: PostListProps) {
  const categoryLabel = CATEGORY_ORDER.find((c) => c.slug === activeSlug)?.label

  if (posts.length === 0) {
    return (
      <div className="rounded-[5px] border border-blog-border bg-white py-20 text-center">
        <p className="text-sm font-semibold text-blog-muted">
          {categoryLabel
            ? `'${categoryLabel}' 카테고리에 아직 글이 없습니다.`
            : '게시된 글이 없습니다.'}
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, i) => {
        const image = getFeaturedImage(post)
        const excerpt = stripHtml(post.excerpt.rendered)

        return (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.035, ease: EASE_OUT }}
          >
            <Link
              href={`/blog/${post.id}`}
              className="group block h-full overflow-hidden rounded-[5px] border border-blog-border bg-white shadow-[0_2px_8px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:border-blog-blue/35 hover:shadow-[0_8px_20px_rgba(15,23,42,0.11)]"
            >
              <div className="aspect-[1.42/1] overflow-hidden bg-blog-wash">
                {image ? (
                  <img
                    src={image}
                    alt={stripHtml(post.title.rendered)}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,#102764,#1f6fd2)] text-white">
                    <span className="text-sm font-black">ADGRIT BLOG</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <p className="mb-2 text-[10px] font-bold text-blog-orange">
                  {formatDate(post.date)}
                </p>
                <h2
                  className="line-clamp-2 text-[15px] font-extrabold leading-snug tracking-normal text-blog-ink transition group-hover:text-blog-blue"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
                {excerpt && (
                  <p className="mt-2 line-clamp-2 text-[12px] leading-5 text-blog-muted">
                    {excerpt}
                  </p>
                )}
              </div>
            </Link>
          </motion.article>
        )
      })}
    </div>
  )
}
