'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navBg = scrolled || !isHome
    ? 'bg-[#fafaf6]/95 backdrop-blur-sm border-b border-[#e5e2da]'
    : 'bg-transparent'

  const textColor = scrolled || !isHome
    ? 'text-[#1a1a18]'
    : 'text-white'

  const logoStyle = scrolled || !isHome
    ? 'text-[#1a1a18]'
    : 'text-white'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className={`font-[family-name:var(--font-sans)] text-sm font-light tracking-[0.25em] uppercase transition-colors duration-300 ${logoStyle}`}
        >
          PINO STUDIO
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          <Link
            href="/"
            className={`text-xs font-light tracking-[0.2em] uppercase transition-colors duration-300 hover:opacity-60 ${textColor}`}
          >
            Home
          </Link>
          <Link
            href="/blog"
            className={`text-xs font-light tracking-[0.2em] uppercase transition-colors duration-300 hover:opacity-60 ${textColor}`}
          >
            Blog
          </Link>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className={`md:hidden flex flex-col gap-1.5 p-1 transition-colors duration-300 ${textColor}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="메뉴"
        >
          <span
            className={`block w-5 h-px bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
          />
          <span
            className={`block w-5 h-px bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block w-5 h-px bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#fafaf6] border-t border-[#e5e2da] py-6 px-6">
          <nav className="flex flex-col gap-5">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="text-xs font-light tracking-[0.2em] uppercase text-[#1a1a18] hover:text-[#c8a876] transition-colors"
            >
              Home
            </Link>
            <Link
              href="/blog"
              onClick={() => setMenuOpen(false)}
              className="text-xs font-light tracking-[0.2em] uppercase text-[#1a1a18] hover:text-[#c8a876] transition-colors"
            >
              Blog
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
