import { readdir } from 'fs/promises'
import path from 'path'

export interface PortfolioImage {
  id: number
  src: string
  alt: string
}

const PORTFOLIO_IMAGE_EXTENSIONS = new Set([
  '.avif',
  '.jpeg',
  '.jpg',
  '.png',
  '.webp',
])

function isPortfolioImage(file: string) {
  return PORTFOLIO_IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase())
}

export async function getPortfolioImages(): Promise<PortfolioImage[]> {
  const portfolioDir = path.join(process.cwd(), 'public', 'images', 'portfolio')

  try {
    const files = await readdir(portfolioDir)

    return files
      .filter(isPortfolioImage)
      .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
      .map((file, index) => ({
        id: index + 1,
        src: `/images/portfolio/${encodeURIComponent(file)}`,
        alt: `PINO STUDIO 포트폴리오 ${index + 1}`,
      }))
  } catch {
    return []
  }
}

export function getPortfolioPreviewImages(
  images: PortfolioImage[],
  count = 4
) {
  return images.slice(-count).reverse()
}
