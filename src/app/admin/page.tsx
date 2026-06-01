import { requireAdmin } from '@/lib/auth'
import { query, initTables } from '@/lib/db'
import { Zap, Briefcase, GraduationCap, Award } from 'lucide-react'

async function getCounts() {
  await initTables()
  const [skills, experience, education, certifications] = await Promise.all([
    query<{ c: string | number }>('SELECT COUNT(*) as c FROM skills'),
    query<{ c: string | number }>('SELECT COUNT(*) as c FROM experience'),
    query<{ c: string | number }>('SELECT COUNT(*) as c FROM education'),
    query<{ c: string | number }>('SELECT COUNT(*) as c FROM certifications'),
  ])
  return {
    skills: Number(skills[0].c),
    experience: Number(experience[0].c),
    education: Number(education[0].c),
    certifications: Number(certifications[0].c),
  }
}

export default async function AdminDashboard() {
  await requireAdmin()
  const counts = await getCounts()

  const cards = [
    { label: 'Skills', count: counts.skills, icon: Zap, href: '/admin/skills', color: '#c8a96e' },
    { label: 'Experience', count: counts.experience, icon: Briefcase, href: '/admin/experience', color: '#6e9dc8' },
    { label: 'Education', count: counts.education, icon: GraduationCap, href: '/admin/education', color: '#9dc86e' },
    { label: 'Certifications', count: counts.certifications, icon: Award, href: '/admin/certifications', color: '#c86e9d' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-[#0a0a0f] text-3xl font-light" style={{ fontFamily: 'var(--font-display)' }}>
          Dashboard
        </h1>
        <p className="font-mono text-[#8a8880] text-xs tracking-wider mt-1" style={{ fontFamily: 'var(--font-mono)' }}>
          Manage your portfolio content
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {cards.map(({ label, count, icon: Icon, href, color }) => (
          <a key={label} href={href}
            className="bg-white border border-[rgba(10,10,15,0.08)] p-6 hover:border-[#c8a96e] transition-colors group">
            <div className="flex items-start justify-between mb-4">
              <div className="w-9 h-9 border flex items-center justify-center" style={{ borderColor: `${color}40` }}>
                <Icon size={16} style={{ color }} />
              </div>
            </div>
            <div className="font-display text-3xl font-semibold text-[#0a0a0f]" style={{ fontFamily: 'var(--font-display)' }}>
              {count}
            </div>
            <div className="font-mono text-[#8a8880] text-[10px] tracking-widest uppercase mt-1" style={{ fontFamily: 'var(--font-mono)' }}>
              {label}
            </div>
          </a>
        ))}
      </div>

      <div className="bg-white border border-[rgba(10,10,15,0.08)] p-6">
        <h2 className="font-mono text-[#8a8880] text-[10px] tracking-widest uppercase mb-4" style={{ fontFamily: 'var(--font-mono)' }}>
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          {cards.map(({ label, href, color }) => (
            <a key={label} href={href}
              className="px-4 py-2 border text-xs font-mono tracking-wider uppercase transition-all hover:text-white"
              style={{
                borderColor: `${color}50`,
                color,
                fontFamily: 'var(--font-mono)',
              }}
              
            >
              + Add {label.slice(0, -1)}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
