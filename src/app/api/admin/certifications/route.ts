import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { isAdmin } from '@/lib/auth'

async function guard() {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  return null
}

export async function POST(req: NextRequest) {
  const deny = await guard(); if (deny) return deny
  const { title, issuer, issue_date, expiry_date, credential_id, credential_url } = await req.json()
  await query(
    'INSERT INTO certifications (title, issuer, issue_date, expiry_date, credential_id, credential_url) VALUES (?,?,?,?,?,?)',
    [title, issuer, issue_date, expiry_date ?? null, credential_id ?? null, credential_url ?? null]
  )
  return NextResponse.json({ ok: true })
}

export async function PUT(req: NextRequest) {
  const deny = await guard(); if (deny) return deny
  const { id, title, issuer, issue_date, expiry_date, credential_id, credential_url } = await req.json()
  await query(
    'UPDATE certifications SET title=?, issuer=?, issue_date=?, expiry_date=?, credential_id=?, credential_url=? WHERE id=?',
    [title, issuer, issue_date, expiry_date ?? null, credential_id ?? null, credential_url ?? null, id]
  )
  return NextResponse.json({ ok: true })
}

export async function DELETE(req: NextRequest) {
  const deny = await guard(); if (deny) return deny
  const id = req.nextUrl.searchParams.get('id')
  await query('DELETE FROM certifications WHERE id=?', [id])
  return NextResponse.json({ ok: true })
}
