'use client'
import { useState } from 'react'
import { Pencil, Trash2, Plus, X, Check, AlertTriangle } from 'lucide-react'

/* ── Shared field input ──────────────────────────────── */
export function Field({
  label, name, value, onChange, type = 'text', placeholder, required, textarea,
}: {
  label: string; name: string; value: string | number; onChange: (v: string) => void
  type?: string; placeholder?: string; required?: boolean; textarea?: boolean
}) {
  return (
    <div>
      <label className="font-mono text-[#8a8880] text-[10px] tracking-widest uppercase block mb-1.5"
        style={{ fontFamily: 'var(--font-mono)' }}>
        {label}{required && <span className="text-[#c8a96e] ml-1">*</span>}
      </label>
      {textarea ? (
        <textarea name={name} value={value} onChange={e => onChange(e.target.value)} rows={3}
          placeholder={placeholder}
          className="w-full border border-[rgba(10,10,15,0.12)] bg-[#f9f7f2] text-[#0a0a0f] px-3 py-2 text-sm outline-none focus:border-[#c8a96e] transition-colors resize-none" />
      ) : (
        <input type={type} name={name} value={value} onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full border border-[rgba(10,10,15,0.12)] bg-[#f9f7f2] text-[#0a0a0f] px-3 py-2 text-sm outline-none focus:border-[#c8a96e] transition-colors" />
      )}
    </div>
  )
}

/* ── Delete confirmation dialog ──────────────────────── */
export function DeleteDialog({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white border border-[rgba(10,10,15,0.1)] p-6 max-w-sm w-full">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle size={18} className="text-red-400" />
          <h3 className="font-mono text-sm font-medium" style={{ fontFamily: 'var(--font-mono)' }}>Confirm Delete</h3>
        </div>
        <p className="text-[#8a8880] text-sm mb-6">This action cannot be undone.</p>
        <div className="flex gap-3">
          <button onClick={onConfirm}
            className="flex-1 py-2 bg-red-500 text-white font-mono text-xs tracking-widest uppercase hover:bg-red-600 transition-colors"
            style={{ fontFamily: 'var(--font-mono)' }}>
            Delete
          </button>
          <button onClick={onCancel}
            className="flex-1 py-2 border border-[rgba(10,10,15,0.15)] text-[#8a8880] font-mono text-xs tracking-widest uppercase hover:border-[#0a0a0f] transition-colors"
            style={{ fontFamily: 'var(--font-mono)' }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── Page header ─────────────────────────────────────── */
export function AdminPageHeader({
  title, subtitle, onAdd,
}: { title: string; subtitle: string; onAdd: () => void }) {
  return (
    <div className="flex items-start justify-between mb-8">
      <div>
        <h1 className="font-display text-[#0a0a0f] text-3xl font-light" style={{ fontFamily: 'var(--font-display)' }}>
          {title}
        </h1>
        <p className="font-mono text-[#8a8880] text-xs tracking-wider mt-1" style={{ fontFamily: 'var(--font-mono)' }}>
          {subtitle}
        </p>
      </div>
      <button onClick={onAdd}
        className="flex items-center gap-2 px-5 py-2.5 bg-[#c8a96e] text-[#0a0a0f] font-mono text-xs tracking-widest uppercase hover:bg-[#d4b87c] transition-colors"
        style={{ fontFamily: 'var(--font-mono)' }}>
        <Plus size={13} /> Add New
      </button>
    </div>
  )
}

/* ── Action buttons ──────────────────────────────────── */
export function RowActions({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) {
  return (
    <div className="flex items-center gap-2">
      <button onClick={onEdit}
        className="p-1.5 text-[#8a8880] hover:text-[#c8a96e] hover:bg-[rgba(200,169,110,0.1)] transition-colors">
        <Pencil size={13} />
      </button>
      <button onClick={onDelete}
        className="p-1.5 text-[#8a8880] hover:text-red-400 hover:bg-red-50 transition-colors">
        <Trash2 size={13} />
      </button>
    </div>
  )
}

/* ── Modal wrapper ───────────────────────────────────── */
export function Modal({ title, onClose, onSave, saving, children }: {
  title: string; onClose: () => void; onSave: () => void; saving: boolean; children: React.ReactNode
}) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-[rgba(10,10,15,0.1)] w-full max-w-lg my-4">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(10,10,15,0.08)]">
          <h2 className="font-mono text-sm font-medium tracking-wider" style={{ fontFamily: 'var(--font-mono)' }}>
            {title}
          </h2>
          <button onClick={onClose} className="text-[#8a8880] hover:text-[#0a0a0f] transition-colors">
            <X size={16} />
          </button>
        </div>
        {/* Body */}
        <div className="px-6 py-5 space-y-4">{children}</div>
        {/* Footer */}
        <div className="px-6 py-4 border-t border-[rgba(10,10,15,0.08)] flex gap-3 justify-end">
          <button onClick={onClose}
            className="px-5 py-2 border border-[rgba(10,10,15,0.15)] text-[#8a8880] font-mono text-xs tracking-widest uppercase hover:border-[#0a0a0f] transition-colors"
            style={{ fontFamily: 'var(--font-mono)' }}>
            Cancel
          </button>
          <button onClick={onSave} disabled={saving}
            className="flex items-center gap-2 px-5 py-2 bg-[#c8a96e] text-[#0a0a0f] font-mono text-xs tracking-widest uppercase hover:bg-[#d4b87c] transition-colors disabled:opacity-50"
            style={{ fontFamily: 'var(--font-mono)' }}>
            {saving ? 'Saving...' : <><Check size={12} /> Save</>}
          </button>
        </div>
      </div>
    </div>
  )
}
