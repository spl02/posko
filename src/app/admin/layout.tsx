'use client'
import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, Users, Package, Settings, Menu, X, Bell, Search, ChevronRight, LogOut } from 'lucide-react'

const menuItems = [
  { id: 'dashboard', title: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
  { id: 'users', title: 'User Admin', icon: Users, href: '/admin/users' },
  { id: 'products', title: 'Produk', icon: Package, href: '/admin/products' },
  { id: 'settings', title: 'Pengaturan', icon: Settings, href: '/admin/settings' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const pathname = usePathname()

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden font-sans">
      {/* SIDEBAR */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 transition-all duration-300 lg:relative lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:ml-[-256px]'}`}>
        <div className="flex items-center justify-between h-16 px-6 bg-slate-950 border-b border-slate-800">
          <span className="text-xl font-bold text-white">ADMIN<span className="text-indigo-400">CORE</span></span>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}><X size={20} /></button>
        </div>
        <nav className="mt-4 px-3 space-y-1">
          {menuItems.map((item) => (
            <Link key={item.id} href={item.href} className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all ${pathname === item.href ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'hover:bg-slate-800 hover:text-white'}`}>
              <item.icon size={20} className={pathname === item.href ? 'text-white' : 'text-slate-500'} />
              <span className="ml-3">{item.title}</span>
              {pathname === item.href && <ChevronRight size={14} className="ml-auto" />}
            </Link>
          ))}
          <button className="flex items-center w-full px-4 py-3 mt-10 text-sm text-red-400 hover:bg-red-500/10 rounded-xl transition-colors">
            <LogOut size={20} /> <span className="ml-3 font-bold">Keluar</span>
          </button>
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* HEADER */}
        <header className="h-16 flex items-center justify-between px-6 bg-white border-b border-gray-200 z-30 shadow-sm">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 border border-gray-200">
            <Menu size={22} />
          </button>
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="text-xs font-bold text-gray-800">Administrator</p>
              <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest">Online</p>
            </div>
            <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-md">AD</div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6 lg:p-10">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}