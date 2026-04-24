'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import type { WPPost } from '@/lib/wordpress'
import { getFeaturedImage, formatDate, stripHtml } from '@/lib/wordpress'

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

interface BlogGridProps {
  posts: WPPost[]
}

export default function BlogGrid({ posts }: BlogGridProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="text-[#8c8c86] text-sm" style={{ fontFamily: 'var(--font-sans)' }}>
          아직 게시된 글이 없습니다.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14">
      {posts.map((post, i) => {
        const image = getFeaturedImage(post)
        const excerpt = stripHtml(post.excerpt.rendered)
        return (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: i * 0.06,
              ease: EASE_OUT,
            }}
          >
            <Link href={`/blog/${post.id}`} className="group block">
              {/* Image */}
              <div className="aspect-[3/2] overflow-hidden mb-5 relative">
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
                        'linear-gradient(135deg, #1c1c1a 0%, #2e2b26 60%, #1c1c1a 100%)',
                    }}
                  >
                    <span
                      className="text-[#c8a876]/40 text-5xl"
                      style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}
                    >
                      {post.title.rendered.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              {/* Date */}
              <p
                className="text-[#c8a876] text-[10px] tracking-[0.3em] uppercase mb-2"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {formatDate(post.date)}
              </p>

              {/* Title */}
              <h2
                className="text-[#1a1a18] text-xl leading-snug mb-3 group-hover:text-[#c8a876] transition-colors duration-300"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />

              {/* Excerpt */}
              {excerpt && (
                <p
                  className="text-[#8c8c86] text-sm leading-relaxed line-clamp-2"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {excerpt}
                </p>
              )}

              {/* Read more */}
              <p
                className="mt-4 text-[#c8a876] text-xs tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                자세히 보기 →
              </p>
            </Link>
          </motion.article>
        )
      })}
    </div>
  )
}
