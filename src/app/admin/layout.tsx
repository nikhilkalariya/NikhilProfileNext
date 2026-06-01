// Auth is checked per-page (not here) so /admin/login remains accessible.
import AdminSidebar from '@/components/admin/AdminSidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f0ede8] flex">
      <AdminSidebar />
      <main className="flex-1 ml-64 p-8 min-h-screen">{children}</main>
    </div>
  )
}
