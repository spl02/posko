"use client";

import { useState } from "react";
import { supabase } from "../../../../utils/supabase/client";

import {
  Save,
  Loader2,
  CheckCircle2,
  Globe,
  Image as ImageIcon,
  Phone,
  MapPin,
  MessageSquare,
} from "lucide-react";

import { useRouter } from "next/navigation";
import { SiteSettings } from "../settings/page";

export const SiteSettingsSection = ({
  initialData,
}: {
  initialData: SiteSettings;
}) => {
  const router = useRouter();

  const [formData, setFormData] = useState<SiteSettings>(initialData);

  const [updating, setUpdating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    setUpdating(true);
    setShowSuccess(false);

    try {
      const payload = {
        site_name: formData.site_name,
        contact_email: formData.contact_email,
        whatsapp_number: formData.whatsapp_number,
        address: formData.address,

        site_description: formData.site_description,

        hero_title: formData.hero_title,
        hero_subtitle: formData.hero_subtitle,
        hero_image: formData.hero_image,

        cta_title: formData.cta_title,
        cta_description: formData.cta_description,

        google_maps_embed: formData.google_maps_embed,

        instagram_url: formData.instagram_url,
        facebook_url: formData.facebook_url,

        logo_url: formData.logo_url,
        banner_url: formData.banner_url,

        contact_title: formData.contact_title,
        contact_description: formData.contact_description,

        operational_hours: formData.operational_hours,
        whatsapp_message: formData.whatsapp_message,
      };

      if (formData.id) {
        const { error } = await supabase
          .from("site_settings")
          .update(payload)
          .eq("id", formData.id);

        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from("site_settings")
          .insert([
            {
              id: 1,
              ...payload,
            },
          ])
          .select()
          .single();

        if (error) throw error;

        if (data) {
          setFormData((prev) => ({
            ...prev,
            id: data.id,
          }));
        }
      }

      setShowSuccess(true);

      router.refresh();

      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setUpdating(false);
    }
  };

  const Input = ({
    label,
    value,
    onChange,
    placeholder,
    textarea = false,
  }: any) => (
    <div className="space-y-2">
      <label className="text-sm font-bold text-slate-700">{label}</label>

      {textarea ? (
        <textarea
          rows={4}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
        />
      )}
    </div>
  );

  return (
    <form onSubmit={handleSave} className="space-y-8 relative">
      {/* WEBSITE */}
      <div className="bg-white border rounded-3xl shadow-sm p-8">
        <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
          <Globe size={20} />
          Informasi Website
        </h2>

        <div className="space-y-5">
          <Input
            label="Nama Website"
            value={formData.site_name}
            onChange={(e: any) =>
              setFormData({
                ...formData,
                site_name: e.target.value,
              })
            }
          />

          <Input
            label="Deskripsi Website"
            textarea
            value={formData.site_description}
            onChange={(e: any) =>
              setFormData({
                ...formData,
                site_description: e.target.value,
              })
            }
          />

          <Input
            label="Logo URL"
            value={formData.logo_url}
            onChange={(e: any) =>
              setFormData({
                ...formData,
                logo_url: e.target.value,
              })
            }
          />

          <Input
            label="Banner URL"
            value={formData.banner_url}
            onChange={(e: any) =>
              setFormData({
                ...formData,
                banner_url: e.target.value,
              })
            }
          />
        </div>
      </div>

      {/* HERO */}
      <div className="bg-white border rounded-3xl shadow-sm p-8">
        <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
          <ImageIcon size={20} />
          Hero Section
        </h2>

        <div className="space-y-5">
          <Input
            label="Hero Title"
            value={formData.hero_title}
            onChange={(e: any) =>
              setFormData({
                ...formData,
                hero_title: e.target.value,
              })
            }
          />

          <Input
            label="Hero Subtitle"
            textarea
            value={formData.hero_subtitle}
            onChange={(e: any) =>
              setFormData({
                ...formData,
                hero_subtitle: e.target.value,
              })
            }
          />

          <Input
            label="Hero Image URL"
            value={formData.hero_image}
            onChange={(e: any) =>
              setFormData({
                ...formData,
                hero_image: e.target.value,
              })
            }
          />
        </div>
      </div>

      {/* CTA */}
      <div className="bg-white border rounded-3xl shadow-sm p-8">
        <h2 className="text-lg font-bold mb-6">CTA Section</h2>

        <div className="space-y-5">
          <Input
            label="CTA Title"
            value={formData.cta_title}
            onChange={(e: any) =>
              setFormData({
                ...formData,
                cta_title: e.target.value,
              })
            }
          />

          <Input
            label="CTA Description"
            textarea
            value={formData.cta_description}
            onChange={(e: any) =>
              setFormData({
                ...formData,
                cta_description: e.target.value,
              })
            }
          />
        </div>
      </div>

      {/* CONTACT */}
      <div className="bg-white border rounded-3xl shadow-sm p-8">
        <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
          <Phone size={20} />
          Kontak
        </h2>

        <div className="space-y-5">
          <Input
            label="Email"
            value={formData.contact_email}
            onChange={(e: any) =>
              setFormData({
                ...formData,
                contact_email: e.target.value,
              })
            }
          />

          <Input
            label="Whatsapp"
            value={formData.whatsapp_number}
            onChange={(e: any) =>
              setFormData({
                ...formData,
                whatsapp_number: e.target.value,
              })
            }
          />

          <Input
            label="Jam Operasional"
            value={formData.operational_hours}
            onChange={(e: any) =>
              setFormData({
                ...formData,
                operational_hours: e.target.value,
              })
            }
          />

          <Input
            label="Whatsapp Message"
            textarea
            value={formData.whatsapp_message}
            onChange={(e: any) =>
              setFormData({
                ...formData,
                whatsapp_message: e.target.value,
              })
            }
          />
        </div>
      </div>

      {/* ADDRESS */}
      <div className="bg-white border rounded-3xl shadow-sm p-8">
        <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
          <MapPin size={20} />
          Alamat & Maps
        </h2>

        <div className="space-y-5">
          <Input
            label="Alamat"
            textarea
            value={formData.address}
            onChange={(e: any) =>
              setFormData({
                ...formData,
                address: e.target.value,
              })
            }
          />

          <Input
            label="Google Maps Embed"
            textarea
            value={formData.google_maps_embed}
            onChange={(e: any) =>
              setFormData({
                ...formData,
                google_maps_embed: e.target.value,
              })
            }
          />
        </div>
      </div>

      {/* SOCIAL */}
      <div className="bg-white border rounded-3xl shadow-sm p-8">
        <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
          <MessageSquare size={20} />
          Social Media
        </h2>

        <div className="space-y-5">
          <Input
            label="Instagram URL"
            value={formData.instagram_url}
            onChange={(e: any) =>
              setFormData({
                ...formData,
                instagram_url: e.target.value,
              })
            }
          />

          <Input
            label="Facebook URL"
            value={formData.facebook_url}
            onChange={(e: any) =>
              setFormData({
                ...formData,
                facebook_url: e.target.value,
              })
            }
          />
        </div>
      </div>

      {/* CONTACT SECTION */}
      <div className="bg-white border rounded-3xl shadow-sm p-8">
        <h2 className="text-lg font-bold mb-6">Contact Section</h2>

        <div className="space-y-5">
          <Input
            label="Contact Title"
            value={formData.contact_title}
            onChange={(e: any) =>
              setFormData({
                ...formData,
                contact_title: e.target.value,
              })
            }
          />

          <Input
            label="Contact Description"
            textarea
            value={formData.contact_description}
            onChange={(e: any) =>
              setFormData({
                ...formData,
                contact_description: e.target.value,
              })
            }
          />
        </div>
      </div>

      {/* SAVE */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3">
        {showSuccess && (
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm bg-white px-4 py-3 rounded-2xl shadow-xl border">
            <CheckCircle2 size={18} />
            Berhasil disimpan
          </div>
        )}

        <button
          type="submit"
          disabled={updating}
          className="bg-slate-900 hover:bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all duration-300 active:scale-95 disabled:opacity-70 shadow-2xl"
        >
          {updating ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Menyimpan...
            </>
          ) : (
            <>
              <Save size={20} />
              Simpan
            </>
          )}
        </button>
      </div>
    </form>
  );
};
