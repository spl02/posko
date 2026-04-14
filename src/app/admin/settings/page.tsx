import { SettingSection } from "../components/SettingsSection"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Pengaturan Website</h1>
        <p className="text-slate-500 text-sm">Sesuaikan informasi identitas dan kontak website Anda.</p>
      </div>

      <SettingSection />
    </div>
  )
}