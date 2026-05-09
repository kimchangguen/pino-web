import { open, readdir } from 'fs/promises'
import path from 'path'

export interface PortfolioImage {
  id: number
  src: string
  alt: string
  width?: number
  height?: number
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

function getJpegDimensions(buffer: Buffer) {
  if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) {
    return null
  }

  let offset = 2

  while (offset < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1
      continue
    }

    while (buffer[offset] === 0xff) {
      offset += 1
    }

    const marker = buffer[offset]
    offset += 1

    if (marker === 0xda || marker === 0xd9) {
      break
    }

    if (offset + 2 > buffer.length) {
      return null
    }

    const segmentLength = buffer.readUInt16BE(offset)
    const segmentStart = offset + 2
    const isStartOfFrame =
      marker >= 0xc0 &&
      marker <= 0xcf &&
      ![0xc4, 0xc8, 0xcc].includes(marker)

    if (isStartOfFrame && segmentStart + 5 <= buffer.length) {
      return {
        height: buffer.readUInt16BE(segmentStart + 1),
        width: buffer.readUInt16BE(segmentStart + 3),
      }
    }

    if (segmentLength < 2) {
      return null
    }

    offset += segmentLength
  }

  return null
}

function getPngDimensions(buffer: Buffer) {
  const hasPngSignature =
    buffer.length >= 24 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47

  if (!hasPngSignature) {
    return null
  }

  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  }
}

async function readImageDimensions(filePath: string) {
  let fileHandle: Awaited<ReturnType<typeof open>> | null = null

  try {
    fileHandle = await open(filePath, 'r')
    const buffer = Buffer.alloc(256 * 1024)
    const { bytesRead } = await fileHandle.read(buffer, 0, buffer.length, 0)
    const imageBuffer = buffer.subarray(0, bytesRead)

    return getPngDimensions(imageBuffer) ?? getJpegDimensions(imageBuffer)
  } catch {
    return null
  } finally {
    await fileHandle?.close()
  }
}

function isPortraitImage(dimensions: { width: number; height: number } | null) {
  if (!dimensions) {
    return true
  }

  return dimensions.height > dimensions.width
}

export async function getPortfolioImages(): Promise<PortfolioImage[]> {
  const portfolioDir = path.join(process.cwd(), 'public', 'images', 'portfolio')

  try {
    const files = await readdir(portfolioDir)
    const imageFiles = files
      .filter(isPortfolioImage)
      .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))

    const images = await Promise.all(
      imageFiles.map(async (file) => {
        const filePath = path.join(portfolioDir, file)
        const dimensions = await readImageDimensions(filePath)

        return {
          file,
          dimensions,
        }
      })
    )

    return images
      .filter(({ dimensions }) => isPortraitImage(dimensions))
      .map(({ file, dimensions }, index) => ({
        id: index + 1,
        src: `/images/portfolio/${encodeURIComponent(file)}`,
        alt: `PINO STUDIO 포트폴리오 ${index + 1}`,
        width: dimensions?.width,
        height: dimensions?.height,
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
