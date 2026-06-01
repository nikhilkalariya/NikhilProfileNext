import { NextRequest, NextResponse } from 'next/server'
import { SESSION_COOKIE } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const { username, password } = await req.json()

  const validUser = username === process.env.ADMIN_USERNAME
  const validPass = password === process.env.ADMIN_PASSWORD

  if (validUser && validPass) {
    const sessionValue = process.env.NEXTAUTH_SECRET || 'changeme'
    const res = NextResponse.json({ ok: true })
    res.cookies.set(SESSION_COOKIE, sessionValue, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })
    return res
  }

  return NextResponse.json({ ok: false, error: 'Invalid credentials' }, { status: 401 })
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true })
  res.cookies.set(SESSION_COOKIE, '', { maxAge: 0, path: '/' })
  return res
}
