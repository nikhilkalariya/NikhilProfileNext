import { query, initTables } from '@/lib/db'
import type { Skill, Education, Experience, Certification } from '@/types'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Skills from '@/components/Skills'
import ExperienceSection from '@/components/ExperienceSection'
import EducationSection from '@/components/EducationSection'
import CertificationsSection from '@/components/CertificationsSection'
import Footer from '@/components/Footer'

// Revalidate every 60 seconds (ISR)
export const revalidate = 60

async function getData() {
  await initTables()
  const [skills, education, experienceRaw, certifications] = await Promise.all([
    query<Skill>('SELECT * FROM skills ORDER BY category, proficiency DESC'),
    query<Education>('SELECT * FROM education ORDER BY start_year DESC'),
    query<Record<string, unknown>>('SELECT * FROM experience ORDER BY start_date DESC'),
    query<Certification>('SELECT * FROM certifications ORDER BY issue_date DESC'),
  ])

  const experience: Experience[] = experienceRaw.map((row) => ({
    ...(row as unknown as Experience),
    tech_stack:
      typeof row.tech_stack === 'string'
        ? JSON.parse(row.tech_stack)
        : (row.tech_stack as string[]) ?? [],
  }))

  return { skills, education, experience, certifications }
}

export default async function Home() {
  let data = {
    skills: [] as Skill[],
    education: [] as Education[],
    experience: [] as Experience[],
    certifications: [] as Certification[],
  }

  try {
    data = await getData()
  } catch (err) {
    console.error('DB error – using empty data. Did you run npm run db:seed?', err)
  }

  return (
    <main>
      <Navbar />
      <Hero />
      <Skills skills={data.skills} />
      <ExperienceSection experience={data.experience} />
      <EducationSection education={data.education} />
      <CertificationsSection certifications={data.certifications} />
      <Footer />
    </main>
  )
}
