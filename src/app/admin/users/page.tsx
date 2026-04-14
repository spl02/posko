import { UserSection } from "../components/UserSection"

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Manajemen Admin</h1>
          <p className="text-slate-500 text-sm">Kelola siapa saja yang bisa mengakses dashboard ini.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-md transition-all active:scale-95 text-sm">
          + Tambah Admin
        </button>
      </div>

      <UserSection />
    </div>
  )
}