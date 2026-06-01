import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { isAdmin } from '@/lib/auth'

async function guard() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return null
}

// POST /api/admin/skills — create
export async function POST(req: NextRequest) {
  const deny = await guard(); if (deny) return deny
  const { name, category, proficiency, icon } = await req.json()
  if (!name || !category) return NextResponse.json({ error: 'name and category required' }, { status: 400 })
  const result = await query(
    'INSERT INTO skills (name, category, proficiency, icon) VALUES (?, ?, ?, ?)',
    [name, category, proficiency ?? 80, icon ?? null]
  )
  return NextResponse.json({ ok: true, result })
}

// PUT /api/admin/skills — update
export async function PUT(req: NextRequest) {
  const deny = await guard(); if (deny) return deny
  const { id, name, category, proficiency, icon } = await req.json()
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
  await query(
    'UPDATE skills SET name=?, category=?, proficiency=?, icon=? WHERE id=?',
    [name, category, proficiency, icon ?? null, id]
  )
  return NextResponse.json({ ok: true })
}

// DELETE /api/admin/skills?id=X
export async function DELETE(req: NextRequest) {
  const deny = await guard(); if (deny) return deny
  const id = req.nextUrl.searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
  await query('DELETE FROM skills WHERE id=?', [id])
  return NextResponse.json({ ok: true })
}
