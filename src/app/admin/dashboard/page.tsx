'use client'
import React from 'react'
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock
} from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* 1. Header & Welcome Message */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Selamat Datang, Admin!</h1>
        <p className="text-slate-500 text-sm">Berikut adalah ringkasan performa sistem hari ini.</p>
      </div>

      {/* 2. Stats Cards (4 Kolom) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Pendapatan" 
          value="Rp 45.230.000" 
          icon={<DollarSign className="text-emerald-600" />} 
          trend="+12.5%" 
          isUp={true} 
        />
        <StatCard 
          title="User Terdaftar" 
          value="2,543" 
          icon={<Users className="text-blue-600" />} 
          trend="+3.2%" 
          isUp={true} 
        />
        <StatCard 
          title="Pesanan Baru" 
          value="142" 
          icon={<ShoppingBag className="text-orange-600" />} 
          trend="-2.4%" 
          isUp={false} 
        />
        <StatCard 
          title="Tingkat Konversi" 
          value="4.8%" 
          icon={<TrendingUp className="text-indigo-600" />} 
          trend="+0.6%" 
          isUp={true} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 3. Placeholder Grafik (2/3 Lebar) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800">Grafik Penjualan Mingguan</h3>
            <select className="text-xs border rounded-md p-1 outline-none">
              <option>7 Hari Terakhir</option>
              <option>30 Hari Terakhir</option>
            </select>
          </div>
          <div className="h-72 w-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-400">
             <TrendingUp size={48} className="mb-2 opacity-20" />
             <p className="text-sm font-medium">Visualisasi Data (Chart.js / Recharts)</p>
          </div>
        </div>

        {/* 4. Aktivitas Terbaru (1/3 Lebar) */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6">Aktivitas Terbaru</h3>
          <div className="space-y-6">
            <ActivityItem 
              user="Budi Santoso" 
              action="Membeli Produk Sepatu" 
              time="2 menit yang lalu" 
            />
            <ActivityItem 
              user="Siti Aminah" 
              action="Mendaftar akun baru" 
              time="15 menit yang lalu" 
            />
            <ActivityItem 
              user="Sistem" 
              action="Backup database berhasil" 
              time="1 jam yang lalu" 
            />
            <ActivityItem 
              user="Admin Rehan" 
              action="Mengubah harga produk" 
              time="3 jam yang lalu" 
            />
          </div>
          <button className="w-full mt-8 py-2 text-sm font-bold text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
            Lihat Semua Log
          </button>
        </div>
      </div>
    </div>
  )
}

// --- Komponen Kecil agar Reusable ---

function StatCard({ title, value, icon, trend, isUp }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-slate-50 rounded-xl">{icon}</div>
        <div className={`flex items-center text-xs font-bold ${isUp ? 'text-emerald-500' : 'text-red-500'}`}>
          {isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {trend}
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <h2 className="text-2xl font-bold text-slate-800 mt-1">{value}</h2>
      </div>
    </div>
  )
}

function ActivityItem({ user, action, time }: any) {
  return (
    <div className="flex gap-4">
      <div className="relative">
        <div className="h-2 w-2 bg-indigo-500 rounded-full mt-2 relative z-10"></div>
        <div className="absolute top-4 left-[3px] bottom-[-24px] w-[1px] bg-slate-200 last:hidden"></div>
      </div>
      <div>
        <p className="text-sm text-slate-700">
          <span className="font-bold">{user}</span> {action}
        </p>
        <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-wider">
          <Clock size={10} /> {time}
        </div>
      </div>
    </div>
  )
}