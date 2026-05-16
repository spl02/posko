import { createClient } from "../../../../utils/supabase/client";
import { AboutSettingSection } from "../components/AboutSettingSection";

export const revalidate = 0;

export interface AboutSettings {
  id?: string;
  company_name: string;
  about_description: string;
  vision: string;
  mission_1: string;
  mission_2: string;
  mission_3: string;
  mission_4: string;
  mission_5: string;
  commitment_text: string;
}

export default async function AboutSettingsPage() {
  const supabase = createClient();

  // SAFE FETCH (mengambil 1 baris pertama karena ID menggunakan UUID)
  const { data: settings } = await supabase
    .from("about_settings")
    .select("*")
    .limit(1)
    .maybeSingle();

  // SAFE DEFAULT (tidak overwrite undefined)
  const initialData: AboutSettings = {
    id: settings?.id, // Kirim ID untuk keperluan Update
    company_name: settings?.company_name ?? "",
    about_description: settings?.about_description ?? "",
    vision: settings?.vision ?? "",
    mission_1: settings?.mission_1 ?? "",
    mission_2: settings?.mission_2 ?? "",
    mission_3: settings?.mission_3 ?? "",
    mission_4: settings?.mission_4 ?? "",
    mission_5: settings?.mission_5 ?? "",
    commitment_text: settings?.commitment_text ?? "",
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-5 h-10 bg-indigo-600 rounded-sm"></div>
        <h1 className="text-2xl font-bold">Pengaturan Tentang Kami (About)</h1>
      </div>

      <AboutSettingSection initialData={initialData} />
    </div>
  );
}