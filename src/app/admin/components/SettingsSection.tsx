"use client";

import { useState } from "react";
import { createClient } from "../../../../utils/supabase/client";
import { Save, Globe, Mail, Phone, MapPin, Loader2, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface SiteSettings {
  site_name: string;
  contact_email: string;
  whatsapp_number: string;
  address: string;
}

export const SettingSection = ({ initialData }: { initialData: SiteSettings }) => {
  const supabase = createClient();
  const router = useRouter();
  
  // State langsung terisi oleh data dari server
  const [formData, setFormData] = useState<SiteSettings>(initialData);
  const [updating, setUpdating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    setShowSuccess(false);
    
    // Melakukan update pada baris data dengan id = 1
    const { error } = await supabase
      .from("site_settings")
      .update(formData)
      .eq("id", 1);

    setUpdating(false);

    if (error) {
      alert(`Gagal menyimpan pengaturan: ${error.message}`);
    } else {
      setShowSuccess(true);
      router.refresh(); // Segarkan data di server
      
      // Sembunyikan notifikasi sukses setelah 3 detik
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 relative">
      <div className="bg-white/50 backdrop-blur-2xl rounded-[2.5rem] border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 sm:p-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Nama Website */}
          <div className="space-y-2.5">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2.5">
              <div className="p-1.5 bg-indigo-50 text-indigo-500 rounded-lg"><Globe size={16} /></div>
              Nama Website
            </label>
            <input 
              type="text"
              required
              value={formData.site_name}
              onChange={(e) => setFormData({...formData, site_name: e.target.value})}
              className="w-full px-5 py-4 rounded-2xl bg-white/60 border border-white focus:bg-white shadow-inner outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-800"
              placeholder="Contoh: Toko PosKo"
            />
          </div>

          {/* Email Kontak */}
          <div className="space-y-2.5">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2.5">
              <div className="p-1.5 bg-rose-50 text-rose-500 rounded-lg"><Mail size={16} /></div>
              Email Kontak
            </label>
            <input 
              type="email"
              required
              value={formData.contact_email}
              onChange={(e) => setFormData({...formData, contact_email: e.target.value})}
              className="w-full px-5 py-4 rounded-2xl bg-white/60 border border-white focus:bg-white shadow-inner outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-800"
              placeholder="admin@posko.com"
            />
          </div>

          {/* WhatsApp */}
          <div className="space-y-2.5">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2.5">
              <div className="p-1.5 bg-emerald-50 text-emerald-500 rounded-lg"><Phone size={16} /></div>
              No. WhatsApp
            </label>
            <input 
              type="text"
              required
              value={formData.whatsapp_number}
              onChange={(e) => setFormData({...formData, whatsapp_number: e.target.value})}
              className="w-full px-5 py-4 rounded-2xl bg-white/60 border border-white focus:bg-white shadow-inner outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-800"
              placeholder="62812xxx"
            />
          </div>

          {/* Alamat (Full Width) */}
          <div className="space-y-2.5 md:col-span-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2.5">
              <div className="p-1.5 bg-amber-50 text-amber-500 rounded-lg"><MapPin size={16} /></div>
              Alamat Lengkap
            </label>
            <textarea 
              rows={4}
              required
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              className="w-full px-5 py-4 rounded-2xl bg-white/60 border border-white focus:bg-white shadow-inner outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-800 resize-none"
              placeholder="Masukkan alamat lengkap kantor atau toko..."
            />
          </div>
        </div>

        {/* Footer Form & Aksi */}
        <div className="mt-10 pt-8 border-t border-slate-200/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Pesan Sukses (Inline) */}
          <div className="flex-1">
            {showSuccess && (
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm bg-emerald-50 px-4 py-2 rounded-xl w-fit animate-in fade-in slide-in-from-left-4">
                <CheckCircle2 size={18} />
                <span>Pengaturan berhasil diperbarui!</span>
              </div>
            )}
          </div>

          {/* Tombol Simpan */}
          <button 
            type="submit"
            disabled={updating}
            className="w-full sm:w-auto bg-slate-900 hover:bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all duration-300 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed shadow-xl shadow-slate-900/10 hover:shadow-indigo-500/20"
          >
            {updating ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <span>Menyimpan...</span>
              </>
            ) : (
              <>
                <Save size={20} />
                <span>Simpan Perubahan</span>
              </>
            )}
          </button>
        </div>

      </div>
    </form>
  );
};