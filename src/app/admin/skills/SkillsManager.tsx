'use client'
import { useState } from 'react'
import type { Skill } from '@/types'
import { AdminPageHeader, Modal, Field, DeleteDialog, RowActions } from '@/components/admin/AdminUI'

const empty = (): Omit<Skill, 'id'> => ({ name: '', category: '', proficiency: 80, icon: '' })

export default function SkillsManager({ initialSkills }: { initialSkills: Skill[] }) {
  const [skills, setSkills] = useState(initialSkills)
  const [modal, setModal] = useState<{ open: boolean; data: Partial<Skill> }>({ open: false, data: empty() })
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 2500)
  }

  function openAdd() { setModal({ open: true, data: empty() }) }
  function openEdit(s: Skill) { setModal({ open: true, data: { ...s } }) }
  function closeModal() { setModal({ open: false, data: empty() }) }
  function set(k: keyof Skill) { return (v: string) => setModal(m => ({ ...m, data: { ...m.data, [k]: k === 'proficiency' ? Number(v) : v } })) }

  async function save() {
    setSaving(true)
    const isEdit = !!modal.data.id
    await fetch('/api/admin/skills', {
      method: isEdit ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(modal.data),
    })
    // Refresh list
    const res = await fetch('/api/skills')
    setSkills(await res.json())
    setSaving(false); closeModal(); showToast(isEdit ? 'Skill updated!' : 'Skill added!')
  }

  async function confirmDelete() {
    if (!deleteId) return
    await fetch(`/api/admin/skills?id=${deleteId}`, { method: 'DELETE' })
    setSkills(s => s.filter(x => x.id !== deleteId))
    setDeleteId(null); showToast('Skill deleted.')
  }

  // Group by category
  const grouped = skills.reduce<Record<string, Skill[]>>((acc, s) => {
    acc[s.category] = acc[s.category] ?? []
    acc[s.category].push(s)
    return acc
  }, {})

  return (
    <div>
      <AdminPageHeader title="Skills" subtitle={`${skills.length} skills across ${Object.keys(grouped).length} categories`} onAdd={openAdd} />

      {Object.entries(grouped).map(([cat, catSkills]) => (
        <div key={cat} className="mb-8">
          <h3 className="font-mono text-[#c8a96e] text-[10px] tracking-[0.2em] uppercase mb-3 flex items-center gap-2"
            style={{ fontFamily: 'var(--font-mono)' }}>
            <span className="w-3 h-px bg-[#c8a96e]" />{cat}
          </h3>
          <div className="bg-white border border-[rgba(10,10,15,0.08)] overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[rgba(10,10,15,0.06)] bg-[#f9f7f2]">
                  {['Name', 'Proficiency', 'Icon', ''].map(h => (
                    <th key={h} className="text-left font-mono text-[#8a8880] text-[10px] tracking-widest uppercase px-4 py-3"
                      style={{ fontFamily: 'var(--font-mono)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {catSkills.map(skill => (
                  <tr key={skill.id} className="border-b border-[rgba(10,10,15,0.04)] hover:bg-[#faf8f4] transition-colors">
                    <td className="px-4 py-3 font-medium text-[#0a0a0f]">{skill.name}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 max-w-[120px] h-px bg-[rgba(10,10,15,0.1)] relative">
                          <div className="absolute top-0 left-0 h-full bg-[#c8a96e]" style={{ width: `${skill.proficiency}%` }} />
                        </div>
                        <span className="font-mono text-[#8a8880] text-xs" style={{ fontFamily: 'var(--font-mono)' }}>{skill.proficiency}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-[#8a8880] text-xs" style={{ fontFamily: 'var(--font-mono)' }}>{skill.icon || '—'}</td>
                    <td className="px-4 py-3 text-right">
                      <RowActions onEdit={() => openEdit(skill)} onDelete={() => setDeleteId(skill.id)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {skills.length === 0 && (
        <div className="text-center py-16 text-[#8a8880] font-mono text-sm" style={{ fontFamily: 'var(--font-mono)' }}>
          No skills yet. Add your first skill!
        </div>
      )}

      {/* Modal */}
      {modal.open && (
        <Modal title={modal.data.id ? 'Edit Skill' : 'Add Skill'} onClose={closeModal} onSave={save} saving={saving}>
          <Field label="Name" name="name" value={modal.data.name ?? ''} onChange={set('name')} required placeholder="e.g. React" />
          <Field label="Category" name="category" value={modal.data.category ?? ''} onChange={set('category')} required placeholder="e.g. Frontend" />
          <div>
            <label className="font-mono text-[#8a8880] text-[10px] tracking-widest uppercase block mb-1.5" style={{ fontFamily: 'var(--font-mono)' }}>
              Proficiency: <span className="text-[#c8a96e]">{modal.data.proficiency}%</span>
            </label>
            <input type="range" min={0} max={100} value={modal.data.proficiency ?? 80}
              onChange={e => set('proficiency')(e.target.value)}
              className="w-full accent-[#c8a96e]" />
          </div>
          <Field label="Icon key (optional)" name="icon" value={modal.data.icon ?? ''} onChange={set('icon')} placeholder="e.g. react" />
        </Modal>
      )}

      {/* Delete confirm */}
      {deleteId !== null && <DeleteDialog onConfirm={confirmDelete} onCancel={() => setDeleteId(null)} />}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-[#0a0a0f] text-[#f5f3ee] font-mono text-xs px-5 py-3 tracking-wider animate-fade-in"
          style={{ fontFamily: 'var(--font-mono)' }}>
          {toast}
        </div>
      )}
    </div>
  )
}
