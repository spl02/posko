import { createClient } from "../../../../utils/supabase/client";
import { SettingSection } from "../components/SettingsSection";
import { Settings2 } from "lucide-react";

export const revalidate = 0;

interface SiteSettings {
  site_name: string;
  contact_email: string;
  whatsapp_number: string;
  address: string;
}

export default async function SettingsPage() {
  const supabase = createClient();

  // SAFE FETCH (tidak crash kalau data tidak ada)
  const { data: settings } = await supabase
    .from("site_settings")
    .select("*")
    .eq("id", 1)
    .maybeSingle();

  // SAFE DEFAULT (tidak overwrite undefined)
  const initialData: SiteSettings = {
    site_name: settings?.site_name ?? "",
    contact_email: settings?.contact_email ?? "",
    whatsapp_number: settings?.whatsapp_number ?? "",
    address: settings?.address ?? "",
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <SettingSection initialData={initialData} />
    </div>
  );
}