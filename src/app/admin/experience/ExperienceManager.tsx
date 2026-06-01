'use client'
import { useState } from 'react'
import type { Experience } from '@/types'
import { AdminPageHeader, Modal, Field, DeleteDialog, RowActions } from '@/components/admin/AdminUI'

const empty = (): Partial<Experience> => ({
  company: '', role: '', employment_type: 'Full-time',
  start_date: '', end_date: '', description: '', tech_stack: [],
})

function formatDate(d: string | null) {
  if (!d) return 'Present'
  return new Date(d).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
}

export default function ExperienceManager({ initialExperience }: { initialExperience: Experience[] }) {
  const [list, setList] = useState(initialExperience)
  const [modal, setModal] = useState<{ open: boolean; data: Partial<Experience> }>({ open: false, data: empty() })
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')
  const [techInput, setTechInput] = useState('')

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(''), 2500) }
  function openAdd() { setModal({ open: true, data: empty() }); setTechInput('') }
  function openEdit(e: Experience) {
    setModal({ open: true, data: { ...e } })
    setTechInput(e.tech_stack.join(', '))
  }
  function closeModal() { setModal({ open: false, data: empty() }) }
  function set(k: keyof Experience) { return (v: string) => setModal(m => ({ ...m, data: { ...m.data, [k]: v } })) }

  async function save() {
    setSaving(true)
    const payload = {
      ...modal.data,
      tech_stack: techInput.split(',').map(t => t.trim()).filter(Boolean),
      end_date: modal.data.end_date || null,
    }
    const isEdit = !!modal.data.id
    await fetch('/api/admin/experience', {
      method: isEdit ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const res = await fetch('/api/experience')
    setList(await res.json())
    setSaving(false); closeModal(); showToast(isEdit ? 'Updated!' : 'Added!')
  }

  async function confirmDelete() {
    if (!deleteId) return
    await fetch(`/api/admin/experience?id=${deleteId}`, { method: 'DELETE' })
    setList(l => l.filter(x => x.id !== deleteId))
    setDeleteId(null); showToast('Deleted.')
  }

  return (
    <div>
      <AdminPageHeader title="Experience" subtitle={`${list.length} positions`} onAdd={openAdd} />

      <div className="bg-white border border-[rgba(10,10,15,0.08)] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[rgba(10,10,15,0.06)] bg-[#f9f7f2]">
              {['Role', 'Company', 'Type', 'Period', ''].map(h => (
                <th key={h} className="text-left font-mono text-[#8a8880] text-[10px] tracking-widest uppercase px-4 py-3"
                  style={{ fontFamily: 'var(--font-mono)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {list.map(job => (
              <tr key={job.id} className="border-b border-[rgba(10,10,15,0.04)] hover:bg-[#faf8f4] transition-colors">
                <td className="px-4 py-3 font-medium text-[#0a0a0f]">{job.role}</td>
                <td className="px-4 py-3 text-[#8a8880]">{job.company}</td>
                <td className="px-4 py-3">
                  <span className="font-mono text-[10px] tracking-wider px-2 py-1 bg-[rgba(200,169,110,0.1)] text-[#c8a96e]"
                    style={{ fontFamily: 'var(--font-mono)' }}>{job.employment_type}</span>
                </td>
                <td className="px-4 py-3 font-mono text-[#8a8880] text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
                  {formatDate(job.start_date)} — {formatDate(job.end_date)}
                </td>
                <td className="px-4 py-3 text-right">
                  <RowActions onEdit={() => openEdit(job)} onDelete={() => setDeleteId(job.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {list.length === 0 && <p className="text-center py-12 text-[#8a8880] font-mono text-sm" style={{ fontFamily: 'var(--font-mono)' }}>No experience entries yet.</p>}
      </div>

      {modal.open && (
        <Modal title={modal.data.id ? 'Edit Experience' : 'Add Experience'} onClose={closeModal} onSave={save} saving={saving}>
          <Field label="Company" name="company" value={modal.data.company ?? ''} onChange={set('company')} required />
          <Field label="Role / Title" name="role" value={modal.data.role ?? ''} onChange={set('role')} required />
          <div>
            <label className="font-mono text-[#8a8880] text-[10px] tracking-widest uppercase block mb-1.5" style={{ fontFamily: 'var(--font-mono)' }}>
              Employment Type
            </label>
            <select value={modal.data.employment_type} onChange={e => set('employment_type')(e.target.value)}
              className="w-full border border-[rgba(10,10,15,0.12)] bg-[#f9f7f2] text-[#0a0a0f] px-3 py-2 text-sm outline-none focus:border-[#c8a96e]">
              {['Full-time', 'Part-time', 'Freelance', 'Internship', 'Contract'].map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Start Date" name="start_date" type="date" value={modal.data.start_date ?? ''} onChange={set('start_date')} required />
            <Field label="End Date (blank = current)" name="end_date" type="date" value={modal.data.end_date ?? ''} onChange={set('end_date')} />
          </div>
          <Field label="Description" name="description" value={modal.data.description ?? ''} onChange={set('description')} required textarea />
          <div>
            <label className="font-mono text-[#8a8880] text-[10px] tracking-widest uppercase block mb-1.5" style={{ fontFamily: 'var(--font-mono)' }}>
              Tech Stack (comma separated)
            </label>
            <input value={techInput} onChange={e => setTechInput(e.target.value)}
              placeholder="React, Node.js, MySQL"
              className="w-full border border-[rgba(10,10,15,0.12)] bg-[#f9f7f2] text-[#0a0a0f] px-3 py-2 text-sm outline-none focus:border-[#c8a96e] transition-colors" />
          </div>
        </Modal>
      )}

      {deleteId !== null && <DeleteDialog onConfirm={confirmDelete} onCancel={() => setDeleteId(null)} />}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-[#0a0a0f] text-[#f5f3ee] font-mono text-xs px-5 py-3 tracking-wider animate-fade-in"
          style={{ fontFamily: 'var(--font-mono)' }}>{toast}</div>
      )}
    </div>
  )
}
