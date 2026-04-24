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
