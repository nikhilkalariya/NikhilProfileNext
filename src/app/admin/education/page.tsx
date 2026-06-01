import { requireAdmin } from '@/lib/auth'
import { query } from '@/lib/db'
import type { Education } from '@/types'
import EducationManager from './EducationManager'

export default async function AdminEducationPage() {
  await requireAdmin()
  const education = await query<Education>('SELECT * FROM education ORDER BY start_year DESC')
  return <EducationManager initialEducation={education} />
}
