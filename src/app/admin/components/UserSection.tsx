"use client";

import { useState } from "react";
import { supabase } from "../../../../utils/supabase/client";
import { Trash2, UserPlus, X, KeySquare } from "lucide-react";
import { useRouter } from "next/navigation";

interface AdminProfile {
  id: string;
  full_name: string;
  email: string;
  role: string;
}

export const UserSection = ({
  initialAdmins,
}: {
  initialAdmins: AdminProfile[];
}) => {
  const [activeTab, setActiveTab] = useState("list");
  const [admins, setAdmins] = useState<AdminProfile[]>(initialAdmins);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");

  const router = useRouter();

  // FUNGSI HAPUS ADMIN
  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin mencabut akses admin ini?")) return;

    setIsDeleting(id);
    const { error } = await supabase
      .from("profiles")
      .update({ role: "user" })
      .eq("id", id);

    if (!error) {
      setAdmins((prev) => prev.filter((admin) => admin.id !== id));
      router.refresh();
    } else {
      alert("Gagal menghapus admin.");
    }
    setIsDeleting(null);
  };

  const handleAddAdmin = async () => {
    if (!email) {
      alert("Email wajib diisi");
      return;
    }

    // Cari user berdasarkan email
    const { data: user, error: findError } = await supabase
      .from("profiles")
      .select("*")
      .eq("email", email)
      .single();

    if (findError || !user) {
      alert("User dengan email tersebut tidak ditemukan");
      return;
    }

    // Cek apakah sudah admin
    if (user.role === "admin") {
      alert("User sudah menjadi admin");
      return;
    }

    // Update role jadi admin
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ role: "admin" })
      .eq("id", user.id);

    if (updateError) {
      alert("Gagal menambahkan admin");
      return;
    }

    // Update state local
    setAdmins((prev) => [
      {
        ...user,
        role: "admin",
      },
      ...prev,
    ]);

    setEmail("");
    setIsModalOpen(false);

    router.refresh();

    alert("Admin berhasil ditambahkan");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex p-1.5 bg-slate-200/50 backdrop-blur-md rounded-2xl w-fit border border-white/20">
          <button
            onClick={() => setActiveTab("list")}
            className={`px-6 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 ${
              activeTab === "list"
                ? "bg-white text-indigo-600 shadow-sm"
                : "text-slate-500 hover:text-slate-700 hover:bg-white/40"
            }`}
          >
            Daftar Admin
          </button>
          <button
            onClick={() => setActiveTab("roles")}
            className={`px-6 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 ${
              activeTab === "roles"
                ? "bg-white text-indigo-600 shadow-sm"
                : "text-slate-500 hover:text-slate-700 hover:bg-white/40"
            }`}
          >
            Hak Akses
          </button>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="group flex items-center gap-2 bg-slate-900 hover:bg-indigo-600 text-white px-6 py-3.5 rounded-2xl font-bold shadow-lg shadow-slate-900/10 hover:shadow-indigo-500/20 transition-all duration-300 active:scale-95 text-sm"
        >
          <UserPlus
            size={18}
            className="transition-transform group-hover:scale-110"
          />
          Tambah Admin
        </button>
      </div>

      <div className="bg-white/40 backdrop-blur-2xl rounded-[2.5rem] border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden min-h-[400px]">
        {activeTab === "list" ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50/50 border-b border-slate-200/50">
                <tr>
                  <th className="px-8 py-5 font-bold text-xs uppercase tracking-widest text-slate-400">
                    Pengguna
                  </th>
                  <th className="px-8 py-5 font-bold text-xs uppercase tracking-widest text-slate-400">
                    Role
                  </th>
                  <th className="px-8 py-5 font-bold text-xs uppercase tracking-widest text-slate-400 text-right">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/80">
                {admins.length === 0 ? (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-8 py-16 text-center text-slate-400 font-medium"
                    >
                      Belum ada administrator yang terdaftar.
                    </td>
                  </tr>
                ) : (
                  admins.map((admin) => (
                    <tr
                      key={admin.id}
                      className="transition-colors hover:bg-white/60 group"
                    >
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-[1rem] bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-inner">
                            {admin.full_name?.charAt(0).toUpperCase() || "?"}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 text-base">
                              {admin.full_name || "Tanpa Nama"}
                            </p>
                            <p className="text-sm text-slate-500 mt-0.5">
                              {admin.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className="px-4 py-1.5 rounded-xl bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider border border-indigo-100/50">
                          {admin.role}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button
                          onClick={() => handleDelete(admin.id)}
                          disabled={isDeleting === admin.id}
                          className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer active:scale-90 disabled:opacity-50"
                          title="Cabut Akses"
                        >
                          <Trash2 size={20} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[400px] text-slate-400">
            <div className="p-4 bg-slate-100/50 rounded-3xl mb-4">
              <KeySquare
                size={48}
                className="text-slate-300"
                strokeWidth={1.5}
              />
            </div>
            <p className="font-bold text-slate-700 text-lg">
              Pengaturan Hak Akses
            </p>
            <p className="text-sm mt-1 max-w-sm text-center">
              Tentukan modul dasbor mana saja yang dapat diakses oleh peran
              tertentu (Sedang dalam pengembangan).
            </p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white rounded-[2.5rem] p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Undang Admin
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-bold text-slate-700 mb-1.5 block">
                  Email Pengguna
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contoh@posko.com"
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
              </div>
              <button
                onClick={handleAddAdmin}
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-colors mt-4"
              >
                Kirim Undangan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
