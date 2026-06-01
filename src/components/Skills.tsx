'use client'
import { useEffect, useRef, useState } from 'react'
import type { Skill } from '@/types'

function SkillBar({ skill, visible }: { skill: Skill; visible: boolean }) {
  console.log('Rendering SkillBar for', skill, 'Visible:', visible)
  return (
    <div className="group">
      <div className="flex justify-between items-center mb-2">
        <span className="text-[#0a0a0f] font-medium text-sm">{skill.name}</span>
        <span
          className="font-mono text-[#8a8880] text-xs"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {skill.proficiency}%
        </span>
        
      </div>
      <div className="h-px bg-[rgba(10,10,15,0.1)] relative overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-[#c8a96e] transition-all duration-1000 ease-out"
          style={{ width: visible ? `${skill.proficiency}%` : '0%' }}
        />
      </div>
    </div>
  )
}

export default function Skills({ skills }: { skills: Skill[] }) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  // Group by category
  const grouped = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = []
    acc[skill.category].push(skill)
    return acc
  }, {})

  return (
    <section id="skills" ref={ref} className="py-28 bg-[#f5f3ee]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <p className="section-label mb-3">What I work with</p>
          <h2 className="section-title">Skills &amp; Technologies</h2>
          <div className="divider" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {Object.entries(grouped).map(([category, catSkills], i) => (
            <div
              key={category}
              className="reveal visible"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <h3
                className="font-mono text-[#c8a96e] text-xs tracking-[0.2em] uppercase mb-6 flex items-center gap-3"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                <span className="w-4 h-px bg-[#c8a96e]" />
                {category}
              </h3>
              <div className="space-y-5">
                {catSkills.map((skill) => (
                  <SkillBar key={skill.id} skill={skill} visible={visible} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
