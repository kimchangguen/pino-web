'use client'

import { motion } from 'framer-motion'
import type { WPPost } from '@/lib/wordpress'
import { CATEGORY_ORDER } from '@/lib/wordpress'
import PostCard from './PostCard'

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

interface PostListProps {
  posts: WPPost[]
  activeSlug?: string
}

export default function PostList({ posts, activeSlug }: PostListProps) {
  const categoryLabel = CATEGORY_ORDER.find((c) => c.slug === activeSlug)?.label

  if (posts.length === 0) {
    return (
      <div className="border border-slate-200 bg-white py-20 text-center">
        <p className="text-sm font-medium text-blog-muted">
          {categoryLabel
            ? `'${categoryLabel}' 카테고리에 아직 사진이 없습니다.`
            : '게시된 사진이 없습니다.'}
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {posts.map((post, i) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.58, delay: i * 0.035, ease: EASE_OUT }}
          className={i % 9 === 0 ? 'sm:col-span-2 sm:row-span-2' : undefined}
        >
          <PostCard post={post} featured={i % 9 === 0} />
        </motion.div>
      ))}
    </div>
  )
}
