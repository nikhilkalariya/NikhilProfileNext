import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const SESSION_COOKIE = 'admin_session'

function getSessionValue() {
  return process.env.NEXTAUTH_SECRET || 'changeme'
}

/** Call at the top of every admin Server Component to guard the route. */
export async function requireAdmin() {
  const cookieStore = cookies()
  const session = cookieStore.get(SESSION_COOKIE)
  if (session?.value !== getSessionValue()) {
    redirect('/admin/login')
  }
}

/** Returns true if the cookie is valid. */
export async function isAdmin(): Promise<boolean> {
  const cookieStore = cookies()
  return cookieStore.get(SESSION_COOKIE)?.value === getSessionValue()
}

export { getSessionValue as SESSION_VALUE }
