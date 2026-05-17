import { createClient } from "../../../../utils/supabase/server";
import {
  TrendingUp,
  DollarSign,
  ShieldCheck,
  PackageOpen,
  Clock,
} from "lucide-react";
import DashboardChart from "../components/DashboardSection";

export const revalidate = 0;

export default async function DashboardPage() {
  const supabase = await createClient();

  const [
    { data: products, count: totalProducts },
    { count: totalAdmins },
  ] = await Promise.all([
    supabase
      .from("products")
      .select("created_at", { count: "exact" }),
    supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .eq("role", "admin"),
  ]);

  // =========================
  // GROUP DATA BY DAY (REAL DB)
  // =========================
  const groupByDate = (items: any[]) => {
    const map: Record<string, number> = {};

    items?.forEach((item) => {
      const date = new Date(item.created_at)
        .toISOString()
        .split("T")[0];

      map[date] = (map[date] || 0) + 1;
    });

    return Object.entries(map).map(([date, value]) => ({
      name: date.slice(5), // MM-DD
      value,
    }));
  };

  const chartData = groupByDate(products || []);

  return (
    <div className="space-y-8 max-w-7xl">

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Produk"
          value={String(totalProducts ?? 0)}
          icon={<PackageOpen className="text-indigo-600" />}
          trend="Semua produk"
          isUp={true}
          bgColor="bg-indigo-50"
        />

        <StatCard
          title="Total Admin"
          value={String(totalAdmins ?? 0)}
          icon={<ShieldCheck className="text-emerald-600" />}
          trend="Pengelola"
          isUp={true}
          bgColor="bg-emerald-50"
        />

        <StatCard
          title="Pendapatan"
          value="Rp 0"
          icon={<DollarSign className="text-amber-600" />}
          trend="Belum ada transaksi"
          isUp={true}
          bgColor="bg-amber-50"
        />

        <StatCard
          title="Growth Produk"
          value={`${chartData.length}`}
          icon={<TrendingUp className="text-rose-600" />}
          trend="Hari aktif"
          isUp={true}
          bgColor="bg-rose-50"
        />
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* CHART REAL DB */}
        <div className="lg:col-span-2 bg-white/50 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/80 shadow-sm">
          <h3 className="text-xl font-bold text-slate-800 mb-6">
            Aktivitas Penambahan Produk
          </h3>

          <DashboardChart data={chartData} />
        </div>

        {/* LOG */}
        <div className="bg-white/50 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/80 shadow-sm">
          <h3 className="text-xl font-bold text-slate-800 mb-8">
            Log Sistem
          </h3>

          <div className="space-y-6">
            <ActivityItem user="Sistem" action="Update settings" time="Baru saja" color="bg-emerald-500" />
            <ActivityItem user="Admin" action="Tambah produk" time="15 menit lalu" color="bg-indigo-500" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= COMPONENT ================= */

function StatCard({ title, value, icon, trend, isUp, bgColor }: any) {
  return (
    <div className="bg-white/60 p-6 rounded-[2rem] border shadow-sm">
      <div className="flex justify-between">
        <div className={`p-3 ${bgColor} rounded-xl`}>
          {icon}
        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-3xl font-bold">{value}</h2>
        <p className="text-sm text-slate-500">{title}</p>
        <p className="text-xs text-slate-400">{trend}</p>
      </div>
    </div>
  );
}

function ActivityItem({ user, action, time, color }: any) {
  return (
    <div className="flex gap-4">
      <div className={`h-3 w-3 ${color} rounded-full mt-1`} />
      <div>
        <p className="text-sm">
          <b>{user}</b> {action}
        </p>
        <p className="text-xs text-slate-400 flex items-center gap-1">
          <Clock size={12} /> {time}
        </p>
      </div>
    </div>
  );
}