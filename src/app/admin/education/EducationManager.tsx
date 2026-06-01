'use client'
import { useState } from 'react'
import type { Education } from '@/types'
import { AdminPageHeader, Modal, Field, DeleteDialog, RowActions } from '@/components/admin/AdminUI'

const empty = (): Partial<Education> => ({
  institution: '', degree: '', field: '', start_year: new Date().getFullYear(),
  end_year: undefined, grade: '', description: '',
})

export default function EducationManager({ initialEducation }: { initialEducation: Education[] }) {
  const [list, setList] = useState(initialEducation)
  const [modal, setModal] = useState<{ open: boolean; data: Partial<Education> }>({ open: false, data: empty() })
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(''), 2500) }
  function openAdd() { setModal({ open: true, data: empty() }) }
  function openEdit(e: Education) { setModal({ open: true, data: { ...e } }) }
  function closeModal() { setModal({ open: false, data: empty() }) }
  function set(k: keyof Education) {
    return (v: string) => setModal(m => ({
      ...m, data: { ...m.data, [k]: (k === 'start_year' || k === 'end_year') ? (v ? Number(v) : undefined) : v }
    }))
  }

  async function save() {
    setSaving(true)
    const isEdit = !!modal.data.id
    await fetch('/api/admin/education', {
      method: isEdit ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(modal.data),
    })
    const res = await fetch('/api/education')
    setList(await res.json())
    setSaving(false); closeModal(); showToast(isEdit ? 'Updated!' : 'Added!')
  }

  async function confirmDelete() {
    if (!deleteId) return
    await fetch(`/api/admin/education?id=${deleteId}`, { method: 'DELETE' })
    setList(l => l.filter(x => x.id !== deleteId))
    setDeleteId(null); showToast('Deleted.')
  }

  return (
    <div>
      <AdminPageHeader title="Education" subtitle={`${list.length} entries`} onAdd={openAdd} />

      <div className="bg-white border border-[rgba(10,10,15,0.08)] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[rgba(10,10,15,0.06)] bg-[#f9f7f2]">
              {['Degree', 'Field', 'Institution', 'Period', 'Grade', ''].map(h => (
                <th key={h} className="text-left font-mono text-[#8a8880] text-[10px] tracking-widest uppercase px-4 py-3"
                  style={{ fontFamily: 'var(--font-mono)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {list.map(edu => (
              <tr key={edu.id} className="border-b border-[rgba(10,10,15,0.04)] hover:bg-[#faf8f4] transition-colors">
                <td className="px-4 py-3 font-medium text-[#0a0a0f]">{edu.degree}</td>
                <td className="px-4 py-3 text-[#0a0a0f]">{edu.field}</td>
                <td className="px-4 py-3 text-[#8a8880]">{edu.institution}</td>
                <td className="px-4 py-3 font-mono text-[#8a8880] text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
                  {edu.start_year} — {edu.end_year ?? 'Present'}
                </td>
                <td className="px-4 py-3 font-mono text-[#c8a96e] text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
                  {edu.grade || '—'}
                </td>
                <td className="px-4 py-3 text-right">
                  <RowActions onEdit={() => openEdit(edu)} onDelete={() => setDeleteId(edu.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {list.length === 0 && <p className="text-center py-12 text-[#8a8880] font-mono text-sm" style={{ fontFamily: 'var(--font-mono)' }}>No education entries yet.</p>}
      </div>

      {modal.open && (
        <Modal title={modal.data.id ? 'Edit Education' : 'Add Education'} onClose={closeModal} onSave={save} saving={saving}>
          <Field label="Institution" name="institution" value={modal.data.institution ?? ''} onChange={set('institution')} required />
          <Field label="Degree" name="degree" value={modal.data.degree ?? ''} onChange={set('degree')} required placeholder="e.g. Bachelor of Engineering" />
          <Field label="Field of Study" name="field" value={modal.data.field ?? ''} onChange={set('field')} required placeholder="e.g. Computer Engineering" />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Start Year" name="start_year" type="number" value={String(modal.data.start_year ?? '')} onChange={set('start_year')} required />
            <Field label="End Year (blank = current)" name="end_year" type="number" value={String(modal.data.end_year ?? '')} onChange={set('end_year')} />
          </div>
          <Field label="Grade / CGPA (optional)" name="grade" value={modal.data.grade ?? ''} onChange={set('grade')} placeholder="e.g. 8.4 CGPA" />
          <Field label="Description (optional)" name="description" value={modal.data.description ?? ''} onChange={set('description')} textarea />
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
