'use client'
import { useEffect, useState } from 'react'
import { createClient } from '../../../../utils/supabase/client'
import { Save, Globe, Mail, Phone, MapPin, Loader2 } from 'lucide-react'

export const SettingSection = () => {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [formData, setFormData] = useState({
    site_name: '',
    contact_email: '',
    whatsapp_number: '',
    address: ''
  })

  // Load data saat pertama kali buka
  useEffect(() => {
    async function getSettings() {
      const { data } = await supabase.from('site_settings').select('*').single()
      if (data) setFormData(data)
      setLoading(false)
    }
    getSettings()
  }, [])

  // Fungsi simpan perubahan
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setUpdating(true)
    
    const { error } = await supabase
      .from('site_settings')
      .update(formData)
      .eq('id', 1)

    if (error) alert('Gagal mengupdate pengaturan')
    else alert('Pengaturan berhasil disimpan!')
    
    setUpdating(false)
  }

  if (loading) return <div className="p-10 text-center animate-pulse">Memuat Pengaturan...</div>

  return (
    <div className="max-w-4xl">
      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Nama Website */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <Globe size={16} /> Nama Website
              </label>
              <input 
                type="text"
                value={formData.site_name}
                onChange={(e) => setFormData({...formData, site_name: e.target.value})}
                className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                placeholder="Contoh: Toko Online Saya"
              />
            </div>

            {/* Email Kontak */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <Mail size={16} /> Email Kontak
              </label>
              <input 
                type="email"
                value={formData.contact_email}
                onChange={(e) => setFormData({...formData, contact_email: e.target.value})}
                className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                placeholder="admin@website.com"
              />
            </div>

            {/* WhatsApp */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <Phone size={16} /> No. WhatsApp
              </label>
              <input 
                type="text"
                value={formData.whatsapp_number}
                onChange={(e) => setFormData({...formData, whatsapp_number: e.target.value})}
                className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                placeholder="62812xxx"
              />
            </div>

            {/* Alamat (Full Width) */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <MapPin size={16} /> Alamat Kantor
              </label>
              <textarea 
                rows={3}
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                placeholder="Masukkan alamat lengkap"
              />
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
            <button 
              disabled={updating}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all disabled:opacity-50 shadow-lg shadow-indigo-100"
            >
              {updating ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
              Simpan Perubahan
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}