import { Github, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0f] border-t border-[rgba(200,169,110,0.1)] py-4">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <p
          className="font-display text-[#f5f3ee] text-lg"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Portfolio<span className="text-[#c8a96e]">.</span>
        </p>

        <p
          className="font-mono text-[#8a8880] text-xs tracking-wide text-center"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          Built with Next.js, TypeScript &amp; MySQL
        </p>

        <div className="flex items-center gap-5">
          <a href="https://github.com/nikhilkalariya" target="_blank" rel="noreferrer" className="text-[#8a8880] hover:text-[#c8a96e] transition-colors">
            <Github size={16} />
          </a>
          <a href="https://linkedin.com/in/nikhilkalariya" target="_blank" rel="noreferrer" className="text-[#8a8880] hover:text-[#c8a96e] transition-colors">
            <Linkedin size={16} />
          </a>
          <a href="mailto:nikhilkalariya1000@gmail.com" className="text-[#8a8880] hover:text-[#c8a96e] transition-colors">
            <Mail size={16} />
          </a>
        </div>
      </div>
    </footer>
  )
}
