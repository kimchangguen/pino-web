'use client'

import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'

export interface PortfolioImage {
  id: number
  src: string
  alt: string
}

const aspectRatios = [
  'aspect-[4/5]',
  'aspect-[3/4]',
  'aspect-[5/4]',
  'aspect-[4/3]',
  'aspect-[2/3]',
  'aspect-[1/1]',
  'aspect-[7/9]',
]

export default function PortfolioGallery({ images }: { images: PortfolioImage[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const activeImage = activeIndex === null ? null : images[activeIndex]

  const columns = useMemo(() => {
    return [
      images.filter((_, index) => index % 4 === 0),
      images.filter((_, index) => index % 4 === 1),
      images.filter((_, index) => index % 4 === 2),
      images.filter((_, index) => index % 4 === 3),
    ]
  }, [images])

  useEffect(() => {
    if (activeIndex === null) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveIndex(null)
      if (event.key === 'ArrowLeft') {
        setActiveIndex((current) =>
          current === null ? current : (current - 1 + images.length) % images.length
        )
      }
      if (event.key === 'ArrowRight') {
        setActiveIndex((current) =>
          current === null ? current : (current + 1) % images.length
        )
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [activeIndex, images.length])

  if (images.length === 0) {
    return (
      <div className="border border-[#ded8cc] bg-[#fafaf6] px-8 py-16 text-center">
        <p className="text-sm font-light uppercase tracking-[0.22em] text-[#8c8c86]">
          Portfolio images are being prepared.
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-5">
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="space-y-4 lg:space-y-5">
            {column.map((image, imageIndex) => {
              const originalIndex = images.findIndex((item) => item.id === image.id)
              const ratio = aspectRatios[(image.id + columnIndex + imageIndex) % aspectRatios.length]

              return (
                <button
                  key={image.id}
                  type="button"
                  onClick={() => setActiveIndex(originalIndex)}
                  className="group block w-full overflow-hidden rounded-[2px] bg-[#171614] text-left shadow-[0_16px_38px_rgba(17,17,16,0.1)]"
                  aria-label={`${image.alt} 크게 보기`}
                >
                  <span className={`relative block ${ratio}`}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      loading="lazy"
                      sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 30vw, (min-width: 640px) 44vw, 92vw"
                      className="object-cover brightness-[0.94] transition duration-700 group-hover:scale-[1.035] group-hover:brightness-105"
                    />
                    <span className="absolute inset-0 bg-[#111110]/0 transition duration-500 group-hover:bg-[#111110]/10" />
                    <span className="absolute bottom-3 left-3 rounded-full bg-white/88 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#111110] opacity-0 shadow-sm transition duration-300 group-hover:opacity-100">
                      View
                    </span>
                  </span>
                </button>
              )
            })}
          </div>
        ))}
      </div>

      {activeImage && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[#070706]/94 px-4 py-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="포트폴리오 사진 크게 보기"
          onClick={() => setActiveIndex(null)}
        >
          <button
            type="button"
            aria-label="닫기"
            onClick={() => setActiveIndex(null)}
            className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10 text-lg font-semibold text-white transition hover:bg-white hover:text-[#111110]"
          >
            X
          </button>

          <button
            type="button"
            aria-label="이전 이미지"
            onClick={(event) => {
              event.stopPropagation()
              setActiveIndex((current) =>
                current === null ? current : (current - 1 + images.length) % images.length
              )
            }}
            className="absolute left-4 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-white/10 text-xl font-semibold text-white transition hover:bg-white hover:text-[#111110]"
          >
            &lt;
          </button>

          <div
            className="relative h-full max-h-[86vh] w-full max-w-6xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              fill
              sizes="94vw"
              className="object-contain"
              priority
            />
          </div>

          <button
            type="button"
            aria-label="다음 이미지"
            onClick={(event) => {
              event.stopPropagation()
              setActiveIndex((current) =>
                current === null ? current : (current + 1) % images.length
              )
            }}
            className="absolute right-4 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-white/10 text-xl font-semibold text-white transition hover:bg-white hover:text-[#111110]"
          >
            &gt;
          </button>

          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
            {(activeIndex ?? 0) + 1} / {images.length}
          </p>
        </div>
      )}
    </>
  )
}
