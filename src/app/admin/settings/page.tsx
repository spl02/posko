import { createClient } from "../../../../utils/supabase/client";
import { SettingSection } from "../components/SettingsSection";
import { Settings2 } from "lucide-react";

export const revalidate = 0;

export default async function SettingsPage() {
  const supabase = await createClient();
  
  const { data: settings } = await supabase
    .from("site_settings")
    .select("*")
    .eq("id", 1)
    .single();

  const initialData = settings || {
    site_name: "",
    contact_email: "",
    whatsapp_number: "",
    address: ""
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <SettingSection initialData={initialData} />
    </div>
  );
}