import { readdir } from 'fs/promises'
import path from 'path'
import type { Metadata } from 'next'
import PortfolioGallery, {
  type PortfolioImage,
} from '@/components/portfolio/PortfolioGallery'

export const metadata: Metadata = {
  title: 'Portfolio | PINO STUDIO',
  description:
    'Browse recent portraits, branding shoots, and selected photography work from PINO STUDIO.',
}

async function getPortfolioImages(): Promise<PortfolioImage[]> {
  const portfolioDir = path.join(process.cwd(), 'public', 'images', 'portfolio')

  try {
    const files = await readdir(portfolioDir)

    return files
      .map((file) => {
        const match = /^portfolio \((\d+)\)\.jpg$/i.exec(file)
        if (!match) return null

        const id = Number(match[1])
        if (id < 1 || id > 100) return null

        return {
          id,
          src: `/images/portfolio/${encodeURIComponent(file)}`,
          alt: `PINO STUDIO portfolio ${id}`,
        }
      })
      .filter((image): image is PortfolioImage => image !== null)
      .sort((a, b) => a.id - b.id)
  } catch {
    return []
  }
}

export default async function PortfolioPage() {
  const images = await getPortfolioImages()

  return (
    <main className="min-h-screen bg-[#f4f1eb] text-[#1a1a18]">
      <section className="px-6 pb-16 pt-32 lg:px-12 lg:pt-40">
        <div className="mx-auto max-w-7xl">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.38em] text-[#c8a876]">
            Portfolio
          </p>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.75fr] lg:items-end">
            <h1 className="max-w-4xl text-[clamp(3rem,8vw,7rem)] font-normal leading-[0.95] tracking-normal text-[#111110]">
              Selected Work
            </h1>
            <p className="max-w-xl text-base font-light leading-8 text-[#6b6b65] lg:justify-self-end">
              Portraits, branding profiles, and quiet records from PINO STUDIO,
              arranged as a visual archive for slower browsing.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-5 border-y border-[#ded8cc] py-7 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.34em] text-[#c8a876]">
                Visual Archive
              </p>
              <h2 className="text-3xl font-normal leading-tight text-[#111110] md:text-5xl">
                A masonry gallery of recent sessions.
              </h2>
            </div>
            <p className="max-w-lg text-sm font-light leading-7 text-[#6b6b65]">
              {images.length} images are loaded from the local portfolio folder
              with optimized lazy loading and full-screen viewing.
            </p>
          </div>

          <PortfolioGallery images={images} />
        </div>
      </section>
    </main>
  )
}
