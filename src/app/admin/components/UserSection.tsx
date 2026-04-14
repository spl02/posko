'use client'
import { useState, useEffect } from 'react'
import { createClient } from '../../../../utils/supabase/client'
import { Users, ShieldCheck, Mail, X } from 'lucide-react'

export const UserSection = () => {
  const [activeTab, setActiveTab] = useState('list')
  const [admins, setAdmins] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function getAdmins() {
      const { data } = await supabase.from('profiles').select('*').eq('role', 'admin')
      if (data) setAdmins(data)
      setLoading(false)
    }
    getAdmins()
  }, [])

  return (
    <div className="space-y-6">
      {/* SISTEM TAB */}
      <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-200 w-fit">
        <button onClick={() => setActiveTab('list')} className={`px-6 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'list' ? 'bg-indigo-600 text-white' : 'text-gray-500 hover:bg-gray-50'}`}>Daftar Admin</button>
        <button onClick={() => setActiveTab('roles')} className={`px-6 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'roles' ? 'bg-indigo-600 text-white' : 'text-gray-500 hover:bg-gray-50'}`}>Hak Akses</button>
      </div>

      {activeTab === 'list' ? (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left font-bold text-gray-500">Administrator</th>
                <th className="px-6 py-4 text-left font-bold text-gray-500">Role</th>
                <th className="px-6 py-4 text-right font-bold text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr><td colSpan={3} className="p-10 text-center animate-pulse">Memuat data...</td></tr>
              ) : admins.map((admin) => (
                <tr key={admin.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3 font-medium">
                    <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700">{admin.full_name?.charAt(0)}</div>
                    <div><p>{admin.full_name}</p><p className="text-xs text-gray-400">{admin.email}</p></div>
                  </td>
                  <td className="px-6 py-4"><span className="px-2 py-1 rounded-full bg-purple-100 text-purple-700 text-[10px] font-bold uppercase">{admin.role}</span></td>
                  <td className="px-6 py-4 text-right text-green-500 font-bold">Aktif</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-10 bg-white rounded-xl border-2 border-dashed border-gray-200 text-center text-gray-400">Konten Pengaturan Role</div>
      )}
    </div>
  )
}