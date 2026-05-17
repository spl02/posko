'use client'

import React, { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  Package,
  Settings,
  ListOrdered,
} from 'lucide-react'

import { Sidebar } from './components/Sidebar'
import { Header } from './components/Header'

const menuItems = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/admin/dashboard',
  },
  {
    id: 'users',
    title: 'User Admin',
    icon: Users,
    href: '/admin/users',
  },
  {
    id: 'products',
    title: 'Produk',
    icon: Package,
    href: '/admin/products',
  },
  {
    id: 'settings',
    title: 'Pengaturan',
    icon: Settings,
    href: '/admin/settings',
  },
  {
    id: 'orders',
    title: 'Orderan',
    icon: ListOrdered,
    href: '/admin/orders',
  },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const pathname = usePathname()
  const router = useRouter()

  const activeTab =
    menuItems.find((item) => item.href === pathname) || menuItems[0]

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 font-sans">
      {/* SIDEBAR */}
      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        menuItems={menuItems}
        activeTabId={activeTab.id}
        onTabClick={(item: any) => router.push(item.href)}
      />

      {/* CONTENT */}
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        {/* HEADER */}
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* PAGE */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6 lg:p-10">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}