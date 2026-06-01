import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { isAdmin } from '@/lib/auth'

async function guard() {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  return null
}

export async function POST(req: NextRequest) {
  const deny = await guard(); if (deny) return deny
  const { company, role, employment_type, start_date, end_date, description, tech_stack } = await req.json()
  await query(
    'INSERT INTO experience (company, role, employment_type, start_date, end_date, description, tech_stack) VALUES (?,?,?,?,?,?,?)',
    [company, role, employment_type ?? 'Full-time', start_date, end_date ?? null, description, JSON.stringify(tech_stack ?? [])]
  )
  return NextResponse.json({ ok: true })
}

export async function PUT(req: NextRequest) {
  const deny = await guard(); if (deny) return deny
  const { id, company, role, employment_type, start_date, end_date, description, tech_stack } = await req.json()
  await query(
    'UPDATE experience SET company=?, role=?, employment_type=?, start_date=?, end_date=?, description=?, tech_stack=? WHERE id=?',
    [company, role, employment_type, start_date, end_date ?? null, description, JSON.stringify(tech_stack ?? []), id]
  )
  return NextResponse.json({ ok: true })
}

export async function DELETE(req: NextRequest) {
  const deny = await guard(); if (deny) return deny
  const id = req.nextUrl.searchParams.get('id')
  await query('DELETE FROM experience WHERE id=?', [id])
  return NextResponse.json({ ok: true })
}
