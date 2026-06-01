'use client'
import { useEffect, useRef } from 'react'
import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const { clientX, clientY, currentTarget } = e
      const { left, top, width, height } = (currentTarget as HTMLElement).getBoundingClientRect()
      const x = ((clientX - left) / width - 0.5) * 20
      const y = ((clientY - top) / height - 0.5) * 20
      el.style.setProperty('--rx', `${y}deg`)
      el.style.setProperty('--ry', `${x}deg`)
    }
    el.addEventListener('mousemove', onMove)
    return () => el.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0f]"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #c8a96e 0%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-48 -left-48 w-[700px] h-[700px] rounded-full opacity-8"
          style={{ background: 'radial-gradient(circle, #6e9dc8 0%, transparent 70%)' }}
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(#c8a96e 1px, transparent 1px), linear-gradient(90deg, #c8a96e 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-24 pb-20">
        <div className="grid md:grid-cols-[1fr_auto] gap-12 items-center">
          {/* Text */}
          <div>
            <p
              className="font-mono text-[#c8a96e] text-xs tracking-[0.3em] uppercase mb-6 animate-fade-in opacity-0"
              style={{ fontFamily: 'var(--font-mono)', animationDelay: '0.1s', animationFillMode: 'forwards' }}
            >
              Available for opportunities
            </p>
            <h1
              className="font-display text-[#f5f3ee] font-light leading-[1.05] mb-6 animate-fade-up opacity-0"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                animationDelay: '0.2s',
                animationFillMode: 'forwards',
              }}
            >
              Full Stack
              <br />
              <span className="italic text-[#c8a96e]">Developer</span>
              <span className="text-[#c8a96e]">.</span>
            </h1>
            <p
              className="text-[#8a8880] text-lg font-light max-w-md leading-relaxed mb-10 animate-fade-up opacity-0"
              style={{ animationDelay: '0.35s', animationFillMode: 'forwards' }}
            >
              Crafting performant web applications with clean code and thoughtful UX.
              Specialising in{' '}
              <span className="text-[#f5f3ee]">Next.js</span>,{' '}
              <span className="text-[#f5f3ee]">TypeScript</span>, and{' '}
              <span className="text-[#f5f3ee]">MySQL</span>.
            </p>

            {/* CTA */}
            <div
              className="flex flex-wrap gap-4 mb-12 animate-fade-up opacity-0"
              style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
            >
              <a
                href="#experience"
                className="px-7 py-3 bg-[#c8a96e] text-[#0a0a0f] text-sm font-mono tracking-widest uppercase hover:bg-[#d4b87c] transition-colors duration-200"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                View Work
              </a>
              <a
                href="mailto:nikhilkalariya1000@gmail.com"
                className="px-7 py-3 border border-[rgba(245,243,238,0.2)] text-[#f5f3ee] text-sm font-mono tracking-widest uppercase hover:border-[#c8a96e] hover:text-[#c8a96e] transition-all duration-200"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                Get in Touch
              </a>
            </div>

            {/* Social links */}
            <div
              className="flex items-center gap-5 animate-fade-in opacity-0"
              style={{ animationDelay: '0.65s', animationFillMode: 'forwards' }}
            >
              <a href="https://github.com/nikhilkalariya" target="_blank" rel="noreferrer" className="text-[#8a8880] hover:text-[#c8a96e] transition-colors">
                <Github size={18} />
              </a>
              <a href="https://linkedin.com/in/nikhilkalariya" target="_blank" rel="noreferrer" className="text-[#8a8880] hover:text-[#c8a96e] transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="mailto:
              nikhilkalariya1000@gmail.com" className="text-[#8a8880] hover:text-[#c8a96e] transition-colors">
                <Mail size={18} />
              </a>
              <span className="w-12 h-px bg-[rgba(245,243,238,0.15)]" />
              <span
                className="font-mono text-[#8a8880] text-xs tracking-widest"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
               Gandhinagar, Gujarat
              </span>
            </div>
          </div>

          {/* Stats card */}
          <div
            className="hidden md:block animate-fade-in opacity-0"
            style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}
          >
            <div className="border border-[rgba(200,169,110,0.2)] bg-[rgba(245,243,238,0.03)] p-8 space-y-8 backdrop-blur-sm">
              {[
                { number: '2.5+', label: 'Years Experience' },
                { number: '5+', label: 'Projects Delivered' },
                { number: '5', label: 'Certifications' },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div
                    className="font-display text-4xl font-semibold text-[#c8a96e] leading-none"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {s.number}
                  </div>
                  <div
                    className="font-mono text-[#8a8880] text-xs tracking-widest uppercase mt-1"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#skills"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#8a8880] hover:text-[#c8a96e] transition-colors animate-bounce"
      >
        <span className="font-mono text-[10px] tracking-widest uppercase" style={{ fontFamily: 'var(--font-mono)' }}>Scroll</span>
        <ArrowDown size={14} />
      </a>
    </section>
  )
}
