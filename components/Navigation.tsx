'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigationItems = [
  { label: 'HOME', href: '/' },
  { label: 'FACILITIES', href: '/facilities' },
  { label: 'PORTFOLIO', href: '/portfolio' },
  {
    label: 'INSTAGRAM',
    href: 'https://www.instagram.com/pinostudio_official',
    external: true,
  },
  { label: 'INSIGHTS', href: '/insights' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const getNavClass = (href: string) => {
    const isActive =
      pathname === href ||
      (href === '/insights' && pathname.startsWith('/blog')) ||
      (href === '/' && pathname === '/')

    return [
      'text-[11px] font-medium tracking-[0.22em] transition-colors duration-300',
      isActive ? 'text-[#111110]' : 'text-[#1a1a18]/68 hover:text-[#111110]',
    ].join(' ')
  }

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 border-b border-[#1a1a18]/10 backdrop-blur-2xl transition-all duration-500 ${
        scrolled ? 'bg-[#faf7f0]/88 shadow-[0_10px_30px_rgba(17,17,16,0.07)]' : 'bg-[#faf7f0]/64'
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 lg:px-12">
        <Link
          href="/"
          className="text-[13px] font-medium uppercase tracking-[0.26em] text-[#111110] transition-opacity duration-300 hover:opacity-60"
          onClick={() => setMenuOpen(false)}
        >
          PINO STUDIO
        </Link>

        <nav className="hidden items-center gap-8 md:flex lg:gap-11">
          {navigationItems.map((item) =>
            item.external ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-medium tracking-[0.22em] text-[#1a1a18]/68 transition-colors duration-300 hover:text-[#111110]"
              >
                {item.label}
              </a>
            ) : (
              <Link key={item.label} href={item.href} className={getNavClass(item.href)}>
                {item.label}
              </Link>
            )
          )}
        </nav>

        <button
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 text-[#111110] transition-opacity duration-300 hover:opacity-60 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-controls="mobile-navigation"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          <span
            className={`block h-px w-5 bg-current transition-all duration-300 ${
              menuOpen ? 'translate-y-2 rotate-45' : ''
            }`}
          />
          <span
            className={`block h-px w-5 bg-current transition-all duration-300 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block h-px w-5 bg-current transition-all duration-300 ${
              menuOpen ? '-translate-y-2 -rotate-45' : ''
            }`}
          />
        </button>
      </div>

      {menuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-[#1a1a18]/10 bg-[#faf7f0]/96 px-6 py-7 backdrop-blur-2xl md:hidden"
        >
          <nav className="mx-auto flex max-w-7xl flex-col gap-6">
            {navigationItems.map((item) =>
              item.external ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="text-xs font-medium tracking-[0.24em] text-[#111110] transition-colors hover:text-[#8a6f48]"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-xs font-medium tracking-[0.24em] text-[#111110] transition-colors hover:text-[#8a6f48]"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
