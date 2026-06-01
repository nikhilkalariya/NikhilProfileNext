import { NextResponse } from 'next/server'
import { query } from '@/lib/db'
import type { Skill } from '@/types'

export async function GET() {
  try {
    const skills = await query<Skill>(
      'SELECT * FROM skills ORDER BY category, proficiency DESC'
    )
    return NextResponse.json(skills)
  } catch (error) {
    console.error('Skills API error:', error)
    return NextResponse.json({ error: 'Failed to fetch skills' }, { status: 500 })
  }
}
