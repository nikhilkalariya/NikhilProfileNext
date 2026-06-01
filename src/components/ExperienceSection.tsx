import type { Experience } from '@/types'
import { Briefcase, Calendar } from 'lucide-react'

function formatDate(dateStr: string | null) {
  if (!dateStr) return 'Present'
  return new Date(dateStr).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
}

export default function ExperienceSection({ experience }: { experience: Experience[] }) {
  return (
    <section id="experience" className="py-28 bg-[#0a0a0f]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <p className="section-label mb-3 text-[#c8a96e]">Where I&apos;ve worked</p>
          <h2
            className="font-display text-[#f5f3ee] font-light"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}
          >
            Experience
          </h2>
          <div className="w-12 h-px bg-[#c8a96e] mt-4 mb-8" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-[200px] top-0 bottom-0 w-px bg-[rgba(200,169,110,0.15)]" />

          <div className="space-y-16">
            {experience.map((job, i) => (
              <div
                key={job.id}
                className="relative flex flex-col md:flex-row gap-6 md:gap-12 pl-8 md:pl-0"
              >
                {/* Dot */}
                <div className="absolute left-0 md:left-[200px] top-2 w-3 h-3 rounded-full border-2 border-[#c8a96e] bg-[#0a0a0f] -translate-x-1/2 md:translate-x-[-6px]" />

                {/* Date column */}
                <div className="md:w-[200px] md:text-right md:pr-12 shrink-0">
                  <div
                    className="font-mono text-[#c8a96e] text-xs tracking-wider"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {formatDate(job.start_date)} — {formatDate(job.end_date)}
                  </div>
                  <div
                    className="font-mono text-[#8a8880] text-[10px] tracking-widest uppercase mt-1"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {job.employment_type}
                  </div>
                </div>

                {/* Content */}
                <div className="md:pl-12 flex-1">
                  <h3
                    className="font-display text-[#f5f3ee] text-2xl font-normal mb-1"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {job.role}
                  </h3>
                  <p className="text-[#c8a96e] font-medium text-sm mb-4 flex items-center gap-2">
                    <Briefcase size={13} />
                    {job.company}
                  </p>
                  <p className="text-[#8a8880] leading-relaxed text-sm mb-5">{job.description}</p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2">
                    {job.tech_stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 border border-[rgba(200,169,110,0.25)] text-[#c8a96e] font-mono text-[10px] tracking-wider uppercase"
                        style={{ fontFamily: 'var(--font-mono)' }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
