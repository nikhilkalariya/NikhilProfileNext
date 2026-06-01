import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
    const rows = await query<Record<string, unknown>>(
      'SELECT * FROM experience ORDER BY start_date DESC'
    )
    // Parse JSON tech_stack field
    const experience = rows.map((row) => ({
      ...row,
      tech_stack:
        typeof row.tech_stack === 'string'
          ? JSON.parse(row.tech_stack)
          : row.tech_stack ?? [],
    }))
    return NextResponse.json(experience)
  } catch (error) {
    console.error('Experience API error:', error)
    return NextResponse.json({ error: 'Failed to fetch experience' }, { status: 500 })
  }
}
