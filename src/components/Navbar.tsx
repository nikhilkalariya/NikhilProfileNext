'use client'
import { useState, useEffect } from 'react'

const links = [
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#education', label: 'Education' },
  { href: '#certifications', label: 'Certifications' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#f5f3ee]/90 backdrop-blur-md border-b border-[rgba(10,10,15,0.1)] py-3'
          : 'bg-transparent py-6'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a
          href="#"
          className="font-display text-xl font-semibold tracking-wide text-[#0a0a0f]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Portfolio<span className="text-[#c8a96e]">.</span>
        </a>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-mono text-xs tracking-widest uppercase text-[#8a8880] hover:text-[#c8a96e] transition-colors duration-200"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="mailto:hello@example.com"
              className="px-5 py-2 border border-[#c8a96e] text-[#c8a96e] text-xs font-mono tracking-widest uppercase hover:bg-[#c8a96e] hover:text-[#f5f3ee] transition-all duration-200"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Hire Me
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span className={`block w-5 h-px bg-[#0a0a0f] transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-px bg-[#0a0a0f] transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-px bg-[#0a0a0f] transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#f5f3ee]/95 backdrop-blur-md border-t border-[rgba(10,10,15,0.1)] px-6 py-6">
          <ul className="flex flex-col gap-4">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-mono text-xs tracking-widest uppercase text-[#8a8880] hover:text-[#c8a96e] transition-colors"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
