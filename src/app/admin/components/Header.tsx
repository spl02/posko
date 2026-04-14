'use client'
import { Menu, Search, Bell } from 'lucide-react'

interface HeaderProps {
  toggleSidebar: () => void
}

export const Header = ({ toggleSidebar }: HeaderProps) => {
  return (
    <header className="h-16 flex items-center justify-between px-6 bg-white border-b border-gray-200 shrink-0 z-30 shadow-sm">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar} 
          className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors border border-gray-200"
        >
          <Menu size={22} />
        </button>
        <div className="hidden sm:flex items-center bg-gray-100 px-3 py-1.5 rounded-lg border border-transparent focus-within:border-indigo-300">
          <Search size={16} className="text-gray-400" />
          <input className="bg-transparent border-none focus:ring-0 text-xs ml-2 w-48 outline-none" placeholder="Search..." />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="p-2 text-gray-400 hover:text-indigo-600 relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <div className="flex items-center gap-3 ml-4 border-l pl-4">
          <div className="text-right hidden md:block leading-tight">
            <p className="text-xs font-bold text-gray-800">Administrator</p>
            <p className="text-[10px] text-green-500 font-bold uppercase">Online</p>
          </div>
          <div className="h-9 w-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
            AD
          </div>
        </div>
      </div>
    </header>
  )
}