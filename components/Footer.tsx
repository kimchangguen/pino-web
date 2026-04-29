import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-[#1a1a18]/10 bg-[#faf7f0] py-12 text-[#111110]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-5 md:flex-row">
        <p className="text-xs uppercase tracking-[0.24em] text-[#6f6a61]">
          © {new Date().getFullYear()} PINO STUDIO. 모든 순간을 정성껏 기록합니다.
        </p>
        <nav className="flex flex-wrap items-center justify-center gap-7">
          {[
            ['홈', '/'],
            ['시설', '/facilities'],
            ['포트폴리오', '/portfolio'],
            ['인사이트', '/insights'],
            ['문의', '/#contact'],
          ].map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className="text-xs font-medium uppercase tracking-[0.2em] text-[#6f6a61] transition hover:text-[#111110]"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  )
}
