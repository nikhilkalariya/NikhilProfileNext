'use client'
import { useState } from 'react'
import type { Certification } from '@/types'
import { AdminPageHeader, Modal, Field, DeleteDialog, RowActions } from '@/components/admin/AdminUI'

const empty = (): Partial<Certification> => ({
  title: '', issuer: '', issue_date: '', expiry_date: '', credential_id: '', credential_url: '',
})

function fmtDate(d: string) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
}

export default function CertificationsManager({ initialCertifications }: { initialCertifications: Certification[] }) {
  const [list, setList] = useState(initialCertifications)
  const [modal, setModal] = useState<{ open: boolean; data: Partial<Certification> }>({ open: false, data: empty() })
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(''), 2500) }
  function openAdd() { setModal({ open: true, data: empty() }) }
  function openEdit(c: Certification) { setModal({ open: true, data: { ...c } }) }
  function closeModal() { setModal({ open: false, data: empty() }) }
  function set(k: keyof Certification) { return (v: string) => setModal(m => ({ ...m, data: { ...m.data, [k]: v } })) }

  async function save() {
    setSaving(true)
    const payload = { ...modal.data, expiry_date: modal.data.expiry_date || null }
    const isEdit = !!modal.data.id
    await fetch('/api/admin/certifications', {
      method: isEdit ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const res = await fetch('/api/certifications')
    setList(await res.json())
    setSaving(false); closeModal(); showToast(isEdit ? 'Updated!' : 'Added!')
  }

  async function confirmDelete() {
    if (!deleteId) return
    await fetch(`/api/admin/certifications?id=${deleteId}`, { method: 'DELETE' })
    setList(l => l.filter(x => x.id !== deleteId))
    setDeleteId(null); showToast('Deleted.')
  }

  return (
    <div>
      <AdminPageHeader title="Certifications" subtitle={`${list.length} certifications`} onAdd={openAdd} />

      <div className="bg-white border border-[rgba(10,10,15,0.08)] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[rgba(10,10,15,0.06)] bg-[#f9f7f2]">
              {['Title', 'Issuer', 'Issued', 'Expires', 'Credential ID', ''].map(h => (
                <th key={h} className="text-left font-mono text-[#8a8880] text-[10px] tracking-widest uppercase px-4 py-3"
                  style={{ fontFamily: 'var(--font-mono)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {list.map(cert => (
              <tr key={cert.id} className="border-b border-[rgba(10,10,15,0.04)] hover:bg-[#faf8f4] transition-colors">
                <td className="px-4 py-3 font-medium text-[#0a0a0f] max-w-[220px]">{cert.title}</td>
                <td className="px-4 py-3 text-[#8a8880]">{cert.issuer}</td>
                <td className="px-4 py-3 font-mono text-xs text-[#8a8880]" style={{ fontFamily: 'var(--font-mono)' }}>{fmtDate(cert.issue_date)}</td>
                <td className="px-4 py-3 font-mono text-xs text-[#8a8880]" style={{ fontFamily: 'var(--font-mono)' }}>
                  {cert.expiry_date ? fmtDate(cert.expiry_date) : <span className="text-[#9dc86e]">No Expiry</span>}
                </td>
                <td className="px-4 py-3 font-mono text-xs text-[#8a8880]" style={{ fontFamily: 'var(--font-mono)' }}>{cert.credential_id || '—'}</td>
                <td className="px-4 py-3 text-right">
                  <RowActions onEdit={() => openEdit(cert)} onDelete={() => setDeleteId(cert.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {list.length === 0 && <p className="text-center py-12 text-[#8a8880] font-mono text-sm" style={{ fontFamily: 'var(--font-mono)' }}>No certifications yet.</p>}
      </div>

      {modal.open && (
        <Modal title={modal.data.id ? 'Edit Certification' : 'Add Certification'} onClose={closeModal} onSave={save} saving={saving}>
          <Field label="Title" name="title" value={modal.data.title ?? ''} onChange={set('title')} required placeholder="e.g. AWS Certified Developer" />
          <Field label="Issuer" name="issuer" value={modal.data.issuer ?? ''} onChange={set('issuer')} required placeholder="e.g. Amazon Web Services" />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Issue Date" name="issue_date" type="date" value={modal.data.issue_date ?? ''} onChange={set('issue_date')} required />
            <Field label="Expiry Date (optional)" name="expiry_date" type="date" value={modal.data.expiry_date ?? ''} onChange={set('expiry_date')} />
          </div>
          <Field label="Credential ID (optional)" name="credential_id" value={modal.data.credential_id ?? ''} onChange={set('credential_id')} />
          <Field label="Credential URL (optional)" name="credential_url" value={modal.data.credential_url ?? ''} onChange={set('credential_url')} placeholder="https://..." />
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
