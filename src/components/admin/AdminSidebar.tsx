'use client'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Zap, Briefcase, GraduationCap, Award, LogOut, ExternalLink } from 'lucide-react'

const nav = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/skills', label: 'Skills', icon: Zap },
  { href: '/admin/experience', label: 'Experience', icon: Briefcase },
  { href: '/admin/education', label: 'Education', icon: GraduationCap },
  { href: '/admin/certifications', label: 'Certifications', icon: Award },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function logout() {
    await fetch('/api/admin/auth', { method: 'DELETE' })
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#0a0a0f] flex flex-col z-40">
      {/* Brand */}
      <div className="px-6 py-7 border-b border-[rgba(200,169,110,0.1)]">
        <p className="font-display text-[#f5f3ee] text-xl" style={{ fontFamily: 'var(--font-display)' }}>
          Portfolio<span className="text-[#c8a96e]">.</span>
        </p>
        <p className="font-mono text-[#8a8880] text-[10px] tracking-widest uppercase mt-0.5" style={{ fontFamily: 'var(--font-mono)' }}>
          Admin Panel
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <a
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 text-sm transition-all duration-150 group ${
                active
                  ? 'bg-[rgba(200,169,110,0.12)] text-[#c8a96e] border-l-2 border-[#c8a96e] pl-[10px]'
                  : 'text-[#8a8880] hover:text-[#f5f3ee] hover:bg-[rgba(245,243,238,0.04)] border-l-2 border-transparent'
              }`}
            >
              <Icon size={15} />
              <span className="font-mono text-xs tracking-wider" style={{ fontFamily: 'var(--font-mono)' }}>
                {label}
              </span>
            </a>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 pb-4 space-y-1 border-t border-[rgba(200,169,110,0.1)] pt-4">
        <a
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 text-[#8a8880] hover:text-[#f5f3ee] transition-colors"
        >
          <ExternalLink size={15} />
          <span className="font-mono text-xs tracking-wider" style={{ fontFamily: 'var(--font-mono)' }}>View Site</span>
        </a>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-[#8a8880] hover:text-red-400 transition-colors"
        >
          <LogOut size={15} />
          <span className="font-mono text-xs tracking-wider" style={{ fontFamily: 'var(--font-mono)' }}>Logout</span>
        </button>
      </div>
    </aside>
  )
}
