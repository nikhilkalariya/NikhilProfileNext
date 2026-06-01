import { requireAdmin } from '@/lib/auth'
import { query } from '@/lib/db'
import type { Skill } from '@/types'
import SkillsManager from './SkillsManager'


export default async function AdminSkillsPage() {
  await requireAdmin()
  const skills = await query<Skill>('SELECT * FROM skills ORDER BY category, name')
  return <SkillsManager initialSkills={skills} />
}
