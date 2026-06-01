import { requireAdmin } from '@/lib/auth'
import { query } from '@/lib/db'
import type { Experience } from '@/types'
import ExperienceManager from './ExperienceManager'

export default async function AdminExperiencePage() {
  await requireAdmin()
  const rows = await query<Record<string, unknown>>('SELECT * FROM experience ORDER BY start_date DESC')
  const experience: Experience[] = rows.map(r => ({
    ...(r as unknown as Experience),
    tech_stack: typeof r.tech_stack === 'string' ? JSON.parse(r.tech_stack) : r.tech_stack ?? [],
  }))
  return <ExperienceManager initialExperience={experience} />
}
