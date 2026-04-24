const WP_URL = process.env.WP_URL || 'https://wordpress-1580849-6373725.cloudwaysapps.com'

export interface WPPost {
  id: number
  date: string
  slug: string
  link: string
  title: { rendered: string }
  excerpt: { rendered: string }
  content: { rendered: string }
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string
      alt_text: string
    }>
  }
}

export interface WPCategory {
  id: number
  name: string
  slug: string
  count: number
}

// 카테고리 표시 순서 및 한글 이름 정의
export const CATEGORY_ORDER = [
  { slug: 'notice',    label: '공지 및 이벤트' },
  { slug: 'review',    label: '리얼-후기' },
  { slug: 'behind',    label: '비하인드' },
  { slug: 'guide',     label: '촬영 가이드' },
  { slug: 'branding',  label: '퍼스널 브랜딩' },
  { slug: 'portfolio', label: '포트폴리오' },
] as const

export type CategorySlug = (typeof CATEGORY_ORDER)[number]['slug']

export async function getCategories(): Promise<WPCategory[]> {
  const slugs = CATEGORY_ORDER.map((c) => c.slug).join(',')
  try {
    const res = await fetch(
      `${WP_URL}/wp-json/wp/v2/categories?slug=${slugs}&per_page=20`,
      { next: { revalidate: 3600 } }
    )
    if (!res.ok) return []
    const raw: WPCategory[] = await res.json()
    // CATEGORY_ORDER 순서대로 정렬
    return CATEGORY_ORDER.flatMap((def) => {
      const found = raw.find((c) => c.slug === def.slug)
      return found ? [found] : []
    })
  } catch {
    return []
  }
}

export async function getPosts(perPage = 12): Promise<WPPost[]> {
  try {
    const res = await fetch(
      `${WP_URL}/wp-json/wp/v2/posts?_embed&per_page=${perPage}`,
      { next: { revalidate: 3600 } }
    )
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

export async function getPostsByCategory(
  categoryId?: number,
  perPage = 20
): Promise<WPPost[]> {
  const params = new URLSearchParams({ _embed: '1', per_page: String(perPage) })
  if (categoryId) params.set('categories', String(categoryId))
  try {
    const res = await fetch(
      `${WP_URL}/wp-json/wp/v2/posts?${params}`,
      { next: { revalidate: 3600 } }
    )
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}

export async function getPost(id: string): Promise<WPPost | null> {
  try {
    const res = await fetch(
      `${WP_URL}/wp-json/wp/v2/posts/${id}?_embed`,
      { next: { revalidate: 3600 } }
    )
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export function getFeaturedImage(post: WPPost): string | null {
  return post._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? null
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim()
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
