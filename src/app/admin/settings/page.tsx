import { supabase } from "../../../../utils/supabase/client";
import { SiteSettingsSection } from "../components/SiteSettingSection";

export const revalidate = 0;

export interface SiteSettings {
  id?: number;

  site_name: string;
  contact_email: string;
  whatsapp_number: string;
  address: string;

  site_description: string;

  hero_title: string;
  hero_subtitle: string;
  hero_image: string;

  cta_title: string;
  cta_description: string;

  google_maps_embed: string;

  instagram_url: string;
  facebook_url: string;

  logo_url: string;
  banner_url: string;

  contact_title: string;
  contact_description: string;

  operational_hours: string;
  whatsapp_message: string;
}

export default async function SiteSettingsPage() {
  const { data: settings } = await supabase
    .from("site_settings")
    .select("*")
    .limit(1)
    .maybeSingle();

  const initialData: SiteSettings = {
    id: settings?.id,

    site_name: settings?.site_name ?? "",
    contact_email: settings?.contact_email ?? "",
    whatsapp_number: settings?.whatsapp_number ?? "",
    address: settings?.address ?? "",

    site_description: settings?.site_description ?? "",

    hero_title: settings?.hero_title ?? "",
    hero_subtitle: settings?.hero_subtitle ?? "",
    hero_image: settings?.hero_image ?? "",

    cta_title: settings?.cta_title ?? "",
    cta_description: settings?.cta_description ?? "",

    google_maps_embed: settings?.google_maps_embed ?? "",

    instagram_url: settings?.instagram_url ?? "",
    facebook_url: settings?.facebook_url ?? "",

    logo_url: settings?.logo_url ?? "",
    banner_url: settings?.banner_url ?? "",

    contact_title: settings?.contact_title ?? "",
    contact_description: settings?.contact_description ?? "",

    operational_hours: settings?.operational_hours ?? "",
    whatsapp_message: settings?.whatsapp_message ?? "",
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-5 h-10 bg-indigo-600 rounded-sm"></div>
        <h1 className="text-2xl font-bold">
          Pengaturan Website
        </h1>
      </div>

      <SiteSettingsSection initialData={initialData} />
    </div>
  );
}