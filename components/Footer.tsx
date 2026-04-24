import Link from 'next/link'

export default function Footer() {
  return (
    <footer
      className="py-12 border-t border-[#e5e2da]"
      style={{ background: '#fafaf6', fontFamily: 'var(--font-sans)' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[#8c8c86] text-xs tracking-[0.25em] uppercase">
          © {new Date().getFullYear()} Pino Studio. All rights reserved.
        </p>
        <nav className="flex items-center gap-8">
          <Link
            href="/"
            className="text-[#8c8c86] text-xs tracking-[0.2em] uppercase hover:text-[#c8a876] transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            href="/blog"
            className="text-[#8c8c86] text-xs tracking-[0.2em] uppercase hover:text-[#c8a876] transition-colors duration-300"
          >
            Blog
          </Link>
          <a
            href="#contact"
            className="text-[#8c8c86] text-xs tracking-[0.2em] uppercase hover:text-[#c8a876] transition-colors duration-300"
          >
            Contact
          </a>
        </nav>
      </div>
    </footer>
  )
}
