"use client";

import { useState } from "react";
import { createClient } from "../../../../utils/supabase/client";
import {
  Save,
  Building,
  FileText,
  Eye,
  Target,
  HeartHandshake,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { AboutSettings } from "../settings/page";

export const AboutSettingSection = ({
  initialData,
}: {
  initialData: AboutSettings;
}) => {
  const supabase = createClient();
  const router = useRouter();

  const [formData, setFormData] = useState<AboutSettings>(initialData);
  const [updating, setUpdating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    setShowSuccess(false);

    try {
      const payload = {
        company_name: formData.company_name ?? "",
        about_description: formData.about_description ?? "",
        vision: formData.vision ?? "",
        mission_1: formData.mission_1 ?? "",
        mission_2: formData.mission_2 ?? "",
        mission_3: formData.mission_3 ?? "",
        mission_4: formData.mission_4 ?? "",
        mission_5: formData.mission_5 ?? "",
        commitment_text: formData.commitment_text ?? "",
      };

      if (formData.id) {
        // JIKA DATA SUDAH ADA -> UPDATE
        const { error } = await supabase
          .from("about_settings")
          .update(payload)
          .eq("id", formData.id);

        if (error) throw error;
      } else {
        // JIKA TABEL MASIH KOSONG -> INSERT
        const { data, error } = await supabase
          .from("about_settings")
          .insert([payload])
          .select()
          .single();

        if (error) throw error;
        if (data) {
          setFormData((prev) => ({ ...prev, id: data.id }));
        }
      }

      setShowSuccess(true);
      router.refresh();

      // auto hide success message
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (error: any) {
      alert(`Gagal menyimpan pengaturan: ${error.message}`);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 relative">
      {/* SECTION 1: PROFIL PERUSAHAAN */}
      <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-8 sm:p-10">
        <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Building className="text-indigo-500" size={20} />
          Profil Perusahaan
        </h2>

        <div className="space-y-6">
          <div className="space-y-2.5">
            <label className="text-sm font-bold text-slate-700 block">
              Nama Perusahaan / Brand
            </label>
            <input
              type="text"
              required
              value={formData.company_name}
              onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
              className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-800"
              placeholder="Contoh: PT PosKo Teknologi"
            />
          </div>

          <div className="space-y-2.5">
            <label className="text-sm font-bold text-slate-700 block">
              Deskripsi Singkat (Tentang Kami)
            </label>
            <textarea
              rows={4}
              value={formData.about_description}
              onChange={(e) => setFormData({ ...formData, about_description: e.target.value })}
              className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-800 resize-none"
              placeholder="Ceritakan secara singkat tentang bisnis Anda..."
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: VISI & MISI */}
      <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-8 sm:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* VISI */}
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Eye className="text-blue-500" size={20} />
              Visi
            </h2>
            <div className="space-y-2.5">
              <textarea
                rows={4}
                value={formData.vision}
                onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800 resize-none"
                placeholder="Tuliskan visi perusahaan di sini..."
              />
            </div>
          </div>

          {/* MISI */}
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Target className="text-rose-500" size={20} />
              Misi
            </h2>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((num) => {
                const key = `mission_${num}` as keyof AboutSettings;
                return (
                  <div key={num} className="flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-sm shrink-0 mt-1.5">
                      {num}
                    </div>
                    <input
                      type="text"
                      value={(formData[key] as string) || ""}
                      onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all text-sm font-medium text-slate-800"
                      placeholder={`Misi ${num}...`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: KOMITMEN */}
      <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-8 sm:p-10">
        <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
          <HeartHandshake className="text-emerald-500" size={20} />
          Komitmen (Opsional)
        </h2>
        <textarea
          rows={3}
          value={formData.commitment_text}
          onChange={(e) => setFormData({ ...formData, commitment_text: e.target.value })}
          className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium text-slate-800 resize-none"
          placeholder="Tuliskan janji atau komitmen layanan Anda kepada pelanggan..."
        />
      </div>

      {/* FOOTER ACTIONS */}
      <div className="sticky bottom-8 mt-10 p-6 bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 z-10">
        <div className="flex-1 w-full">
          {showSuccess && (
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm bg-emerald-50 px-4 py-3 rounded-xl w-fit">
              <CheckCircle2 size={18} />
              <span>Pengaturan Tentang Kami berhasil diperbarui!</span>
            </div>
          )}
        </div>

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
    </form>
  );
};