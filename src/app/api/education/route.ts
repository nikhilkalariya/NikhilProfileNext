import { NextResponse } from 'next/server'
import { query } from '@/lib/db'
import type { Education } from '@/types'

export async function GET() {
  try {
    const education = await query<Education>(
      'SELECT * FROM education ORDER BY start_year DESC'
    )
    return NextResponse.json(education)
  } catch (error) {
    console.error('Education API error:', error)
    return NextResponse.json({ error: 'Failed to fetch education' }, { status: 500 })
  }
}
