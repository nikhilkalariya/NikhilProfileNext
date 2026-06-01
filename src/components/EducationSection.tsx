import type { Education } from '@/types'
import { GraduationCap } from 'lucide-react'

export default function EducationSection({ education }: { education: Education[] }) {
  return (
    <section id="education" className="py-28 bg-[#f5f3ee]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <p className="section-label mb-3">Academic background</p>
          <h2 className="section-title">Education</h2>
          <div className="divider" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {education.map((edu) => (
            <div
              key={edu.id}
              className="border border-[rgba(10,10,15,0.1)] bg-white/40 p-8 hover:border-[#c8a96e] transition-colors duration-300 group"
            >
              {/* Icon */}
              <div className="w-10 h-10 border border-[rgba(200,169,110,0.3)] flex items-center justify-center mb-6 group-hover:border-[#c8a96e] transition-colors">
                <GraduationCap size={18} className="text-[#c8a96e]" />
              </div>

              {/* Degree */}
              <p
                className="font-mono text-[#c8a96e] text-[10px] tracking-[0.2em] uppercase mb-2"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {edu.degree}
              </p>
              <h3
                className="font-display text-[#0a0a0f] text-2xl font-normal mb-1"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {edu.field}
              </h3>
              <p className="text-[#8a8880] font-medium text-sm mb-4">{edu.institution}</p>

              {/* Meta row */}
              <div className="flex items-center gap-4 mb-4">
                <span
                  className="font-mono text-[#8a8880] text-xs"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {edu.start_year} — {edu.end_year ?? 'Present'}
                </span>
                {edu.grade && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-[#c8a96e]" />
                    <span
                      className="font-mono text-[#c8a96e] text-xs font-medium"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      {edu.grade}
                    </span>
                  </>
                )}
              </div>

              {edu.description && (
                <p className="text-[#8a8880] text-sm leading-relaxed">{edu.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
