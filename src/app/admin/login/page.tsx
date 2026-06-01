'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ username: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')
    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const data = await res.json()
    if (data.ok) {
      router.push('/admin')
      router.refresh()
    } else {
      setError('Invalid username or password')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #c8a96e 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 border border-[rgba(200,169,110,0.3)] mb-5">
            <Lock size={20} className="text-[#c8a96e]" />
          </div>
          <h1 className="font-display text-[#f5f3ee] text-3xl font-light" style={{ fontFamily: 'var(--font-display)' }}>
            Admin Panel
          </h1>
          <p className="font-mono text-[#8a8880] text-xs tracking-widest uppercase mt-2" style={{ fontFamily: 'var(--font-mono)' }}>
            Portfolio Management
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-mono text-[#8a8880] text-[10px] tracking-widest uppercase block mb-2" style={{ fontFamily: 'var(--font-mono)' }}>
              Username
            </label>
            <input
              type="text"
              value={form.username}
              onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
              className="w-full bg-[rgba(245,243,238,0.04)] border border-[rgba(245,243,238,0.1)] text-[#f5f3ee] px-4 py-3 text-sm outline-none focus:border-[#c8a96e] transition-colors"
              placeholder="Enter username"
              required
            />
          </div>

          <div>
            <label className="font-mono text-[#8a8880] text-[10px] tracking-widest uppercase block mb-2" style={{ fontFamily: 'var(--font-mono)' }}>
              Password
            </label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                className="w-full bg-[rgba(245,243,238,0.04)] border border-[rgba(245,243,238,0.1)] text-[#f5f3ee] px-4 py-3 pr-10 text-sm outline-none focus:border-[#c8a96e] transition-colors"
                placeholder="Enter password"
                required
              />
              <button type="button" onClick={() => setShowPw(s => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8a8880] hover:text-[#c8a96e]">
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="font-mono text-red-400 text-xs tracking-wide" style={{ fontFamily: 'var(--font-mono)' }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#c8a96e] text-[#0a0a0f] font-mono text-xs tracking-widest uppercase hover:bg-[#d4b87c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <a href="/" className="font-mono text-[#8a8880] text-xs tracking-wider hover:text-[#c8a96e] transition-colors" style={{ fontFamily: 'var(--font-mono)' }}>
            ← Back to Portfolio
          </a>
        </div>
      </div>
    </div>
  )
}
