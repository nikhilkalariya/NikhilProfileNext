import { NextResponse } from 'next/server'
import { query } from '@/lib/db'
import type { Certification } from '@/types'

export async function GET() {
  try {
    const certifications = await query<Certification>(
      'SELECT * FROM certifications ORDER BY issue_date DESC'
    )
    return NextResponse.json(certifications)
  } catch (error) {
    console.error('Certifications API error:', error)
    return NextResponse.json({ error: 'Failed to fetch certifications' }, { status: 500 })
  }
}
