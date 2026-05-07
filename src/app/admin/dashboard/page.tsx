import { createClient } from "../../../../utils/supabase/client";
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  PackageOpen,
  ShieldCheck,
  Activity
} from "lucide-react";

export const revalidate = 0;

export default async function DashboardPage() {
  const supabase = await createClient();

  // 1. Fetch Real Data dari Supabase secara Paralel
  const [
    { count: totalProducts },
    { count: totalAdmins }
  ] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "admin")
  ]);

  return (
    <div className="space-y-8 max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Produk" 
          value={totalProducts?.toString() || "0"} 
          icon={<PackageOpen className="text-indigo-600" size={24} />} 
          trend="Aktif di Katalog" 
          isUp={true}
          bgColor="bg-indigo-50" 
        />
        <StatCard 
          title="Total Admin" 
          value={totalAdmins?.toString() || "0"} 
          icon={<ShieldCheck className="text-emerald-600" size={24} />} 
          trend="Pengelola Sistem" 
          isUp={true} 
          bgColor="bg-emerald-50"
        />
        <StatCard 
          title="Total Pendapatan" 
          value="Rp 45.2M" 
          icon={<DollarSign className="text-amber-600" size={24} />} 
          trend="+12.5% vs Bulan lalu" 
          isUp={true} 
          bgColor="bg-amber-50"
        />
        <StatCard 
          title="Tingkat Konversi" 
          value="4.8%" 
          icon={<TrendingUp className="text-rose-600" size={24} />} 
          trend="-0.6% vs Bulan lalu" 
          isUp={false} 
          bgColor="bg-rose-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 3. Placeholder Grafik (2/3 Lebar) */}
        <div className="lg:col-span-2 bg-white/50 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-800">Grafik Penjualan</h3>
            <select className="text-sm border border-slate-200/60 bg-white/80 rounded-xl px-4 py-2 outline-none font-medium text-slate-600 focus:ring-2 focus:ring-indigo-500/20 transition-all cursor-pointer">
              <option>7 Hari Terakhir</option>
              <option>30 Hari Terakhir</option>
              <option>Tahun Ini</option>
            </select>
          </div>
          <div className="flex-1 w-full bg-gradient-to-br from-slate-100/50 to-slate-50/50 border-2 border-dashed border-slate-200/60 rounded-[1.5rem] flex flex-col items-center justify-center text-slate-400 min-h-[300px]">
             <TrendingUp size={64} className="mb-4 text-slate-300" strokeWidth={1} />
             <p className="font-bold text-slate-500">Visualisasi Data Belum Tersedia</p>
             <p className="text-sm mt-1">Integrasikan Chart.js atau Recharts di sini.</p>
          </div>
        </div>

        {/* 4. Aktivitas Terbaru (1/3 Lebar) */}
        <div className="bg-white/50 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col">
          <h3 className="text-xl font-bold text-slate-800 mb-8">Log Sistem</h3>
          <div className="space-y-6 flex-1">
            <ActivityItem 
              user="Sistem" 
              action="Memperbarui pengaturan website." 
              time="Baru saja" 
              color="bg-emerald-500"
            />
            <ActivityItem 
              user="Admin Rehan" 
              action="Menambahkan produk 'Kopi Susu'." 
              time="15 menit yang lalu" 
              color="bg-indigo-500"
            />
            <ActivityItem 
              user="Budi Santoso" 
              action="Mendaftar sebagai pengguna baru." 
              time="1 jam yang lalu" 
              color="bg-amber-500"
            />
            <ActivityItem 
              user="Sistem Auth" 
              action="Pembersihan token sesi berhasil." 
              time="3 jam yang lalu" 
              color="bg-slate-400"
            />
          </div>
          <button className="w-full mt-8 py-3.5 text-sm font-bold text-indigo-600 bg-indigo-50/50 hover:bg-indigo-100 rounded-2xl transition-colors active:scale-95">
            Lihat Semua Aktivitas
          </button>
        </div>

      </div>
    </div>
  );
}

// --- Komponen Ekstra (Bisa Dipisah ke folder components jika mau) ---

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  isUp: boolean;
  bgColor: string;
}

function StatCard({ title, value, icon, trend, isUp, bgColor }: StatCardProps) {
  return (
    <div className="group bg-white/60 backdrop-blur-xl p-6 rounded-[2rem] border border-white/80 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 flex flex-col justify-between min-h-[160px]">
      <div className="flex justify-between items-start">
        <div className={`p-3.5 ${bgColor} rounded-2xl shadow-inner`}>
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg ${isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
          {isUp ? <ArrowUpRight size={14} strokeWidth={3} /> : <ArrowDownRight size={14} strokeWidth={3} />}
          {isUp ? "Positif" : "Negatif"}
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{value}</h2>
        <div className="flex items-center justify-between mt-1">
          <p className="text-sm font-bold text-slate-500">{title}</p>
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{trend}</p>
        </div>
      </div>
    </div>
  );
}

interface ActivityItemProps {
  user: string;
  action: string;
  time: string;
  color: string;
}

function ActivityItem({ user, action, time, color }: ActivityItemProps) {
  return (
    <div className="flex gap-4 group">
      <div className="relative flex flex-col items-center">
        <div className={`h-3 w-3 ${color} rounded-full mt-1.5 relative z-10 shadow-sm ring-4 ring-white`}></div>
        <div className="absolute top-5 bottom-[-24px] w-[2px] bg-slate-100 group-last:hidden"></div>
      </div>
      <div className="pb-2">
        <p className="text-sm text-slate-700 leading-snug">
          <span className="font-bold text-slate-900">{user}</span> {action}
        </p>
        <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1.5 font-medium">
          <Clock size={12} /> {time}
        </div>
      </div>
    </div>
  );
}