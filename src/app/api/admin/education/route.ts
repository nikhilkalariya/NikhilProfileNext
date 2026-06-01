import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { isAdmin } from '@/lib/auth'

async function guard() {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  return null
}

export async function POST(req: NextRequest) {
  const deny = await guard(); if (deny) return deny
  const { institution, degree, field, start_year, end_year, grade, description } = await req.json()
  await query(
    'INSERT INTO education (institution, degree, field, start_year, end_year, grade, description) VALUES (?,?,?,?,?,?,?)',
    [institution, degree, field, start_year, end_year ?? null, grade ?? null, description ?? null]
  )
  return NextResponse.json({ ok: true })
}

export async function PUT(req: NextRequest) {
  const deny = await guard(); if (deny) return deny
  const { id, institution, degree, field, start_year, end_year, grade, description } = await req.json()
  await query(
    'UPDATE education SET institution=?, degree=?, field=?, start_year=?, end_year=?, grade=?, description=? WHERE id=?',
    [institution, degree, field, start_year, end_year ?? null, grade ?? null, description ?? null, id]
  )
  return NextResponse.json({ ok: true })
}

export async function DELETE(req: NextRequest) {
  const deny = await guard(); if (deny) return deny
  const id = req.nextUrl.searchParams.get('id')
  await query('DELETE FROM education WHERE id=?', [id])
  return NextResponse.json({ ok: true })
}
