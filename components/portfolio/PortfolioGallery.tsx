'use client'

import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import type { PortfolioImage } from '@/lib/portfolio'

const DEFAULT_PORTRAIT_RATIO = '2 / 3'

function isPortraitFriendly(image: PortfolioImage) {
  if (!image.width || !image.height) {
    return true
  }

  return image.height > image.width
}

function getAspectRatio(image: PortfolioImage) {
  if (!image.width || !image.height || image.width >= image.height) {
    return DEFAULT_PORTRAIT_RATIO
  }

  return `${image.width} / ${image.height}`
}

export default function PortfolioGallery({ images }: { images: PortfolioImage[] }) {
  const galleryImages = useMemo(
    () => images.filter(isPortraitFriendly),
    [images]
  )
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const activeImage = activeIndex === null ? null : galleryImages[activeIndex]

  useEffect(() => {
    if (activeIndex === null) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveIndex(null)
      if (event.key === 'ArrowLeft') {
        setActiveIndex((current) =>
          current === null
            ? current
            : (current - 1 + galleryImages.length) % galleryImages.length
        )
      }
      if (event.key === 'ArrowRight') {
        setActiveIndex((current) =>
          current === null ? current : (current + 1) % galleryImages.length
        )
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [activeIndex, galleryImages.length])

  if (galleryImages.length === 0) {
    return (
      <div className="border border-[#1a1a18]/10 bg-[#fffaf3] px-8 py-16 text-center">
        <p className="text-sm leading-7 text-[#5d574f]">
          포트폴리오 이미지를 준비하고 있습니다.
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="columns-2 [column-gap:6px] sm:columns-3 sm:[column-gap:8px] lg:columns-4 xl:columns-5 2xl:columns-6">
        {galleryImages.map((image, index) => (
          <button
            key={image.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group mb-[6px] block w-full break-inside-avoid overflow-hidden bg-[#eee6da] text-left shadow-[0_10px_24px_rgba(90,70,42,0.1)] sm:mb-2"
            aria-label={`${image.alt} 크게 보기`}
          >
            <span
              className="relative block w-full"
              style={{ aspectRatio: getAspectRatio(image) }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                loading="lazy"
                sizes="(min-width: 1536px) 16vw, (min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover object-top brightness-[0.98] transition duration-700 group-hover:scale-[1.025] group-hover:brightness-105"
              />
              <span className="absolute inset-0 bg-[#111110]/0 transition duration-500 group-hover:bg-[#111110]/8" />
              <span className="absolute bottom-2 left-2 bg-[#fffaf3]/92 px-2.5 py-1 text-[10px] font-medium tracking-[0.16em] text-[#111110] opacity-0 shadow-sm transition duration-300 group-hover:opacity-100">
                크게 보기
              </span>
            </span>
          </button>
        ))}
      </div>

      {activeImage && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/88 px-4 py-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="포트폴리오 사진 크게 보기"
          onClick={() => setActiveIndex(null)}
        >
          <button
            type="button"
            aria-label="닫기"
            onClick={() => setActiveIndex(null)}
            className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center border border-white/20 bg-white/10 text-lg font-semibold text-white transition hover:bg-white hover:text-black"
          >
            X
          </button>

          <button
            type="button"
            aria-label="이전 이미지"
            onClick={(event) => {
              event.stopPropagation()
              setActiveIndex((current) =>
                current === null
                  ? current
                  : (current - 1 + galleryImages.length) % galleryImages.length
              )
            }}
            className="absolute left-4 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center border border-white/20 bg-white/10 text-xl font-semibold text-white transition hover:bg-white hover:text-black"
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
                current === null ? current : (current + 1) % galleryImages.length
              )
            }}
            className="absolute right-4 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center border border-white/20 bg-white/10 text-xl font-semibold text-white transition hover:bg-white hover:text-black"
          >
            &gt;
          </button>

          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
            {(activeIndex ?? 0) + 1} / {galleryImages.length}
          </p>
        </div>
      )}
    </>
  )
}
