'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import type { WPPost } from '@/lib/wordpress'
import { getFeaturedImage, formatDate, stripHtml } from '@/lib/wordpress'

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

interface PortfolioSectionProps {
  posts: WPPost[]
}

export default function PortfolioSection({ posts }: PortfolioSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="portfolio"
      ref={ref}
      className="py-32 md:py-44 bg-[#f4f1eb]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-[#c8a876] text-xs tracking-[0.4em] uppercase mb-4"
            >
              Portfolio
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.1, ease: EASE_OUT }}
              className="text-[#1a1a18] leading-tight"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                fontWeight: 400,
              }}
            >
              최근 작업물
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#8c8c86] hover:text-[#c8a876] transition-colors duration-300"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              전체 보기 →
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#8c8c86] text-sm" style={{ fontFamily: 'var(--font-sans)' }}>
              블로그 포스트를 불러오는 중입니다...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {posts.map((post, i) => {
              const image = getFeaturedImage(post)
              const excerpt = stripHtml(post.excerpt.rendered)
              return (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.9,
                    delay: 0.1 + i * 0.08,
                    ease: EASE_OUT,
                  }}
                >
                  <Link href={`/blog/${post.id}`} className="group block">
                    {/* Image */}
                    <div className="aspect-[4/3] overflow-hidden relative mb-5">
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
                              'linear-gradient(135deg, #1c1c1a 0%, #2e2b26 100%)',
                          }}
                        >
                          <span
                            className="text-[#c8a876]/40"
                            style={{
                              fontFamily: 'var(--font-display)',
                              fontSize: '3rem',
                              fontStyle: 'italic',
                            }}
                          >
                            {post.title.rendered.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-[#111110]/0 group-hover:bg-[#111110]/20 transition-colors duration-500" />
                    </div>

                    {/* Meta */}
                    <p
                      className="text-[#c8a876] text-[10px] tracking-[0.3em] uppercase mb-2"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      {formatDate(post.date)}
                    </p>
                    <h3
                      className="text-[#1a1a18] text-lg leading-snug mb-3 group-hover:text-[#c8a876] transition-colors duration-300"
                      style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
                      dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />
                    {excerpt && (
                      <p
                        className="text-[#8c8c86] text-sm leading-relaxed line-clamp-2"
                        style={{ fontFamily: 'var(--font-sans)' }}
                      >
                        {excerpt}
                      </p>
                    )}
                  </Link>
                </motion.article>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
