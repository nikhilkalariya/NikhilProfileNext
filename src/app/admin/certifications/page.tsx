import { requireAdmin } from '@/lib/auth'
import { query } from '@/lib/db'
import type { Certification } from '@/types'
import CertificationsManager from './CertificationsManager'

export default async function AdminCertificationsPage() {
  await requireAdmin()
  const certifications = await query<Certification>('SELECT * FROM certifications ORDER BY issue_date DESC')
  return <CertificationsManager initialCertifications={certifications} />
}
