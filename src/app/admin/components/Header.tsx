'use client'

import { useEffect, useState } from 'react'
import { Menu, Search, Bell } from 'lucide-react'
import { supabase } from '../../../../utils/supabase/client'

interface HeaderProps {
  toggleSidebar: () => void
}

export const Header = ({ toggleSidebar }: HeaderProps) => {
  const [email, setEmail] = useState('')

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await (await supabase).auth.getUser()

      if (user) {
        setEmail(user.email || '')
      }
    }

    getUser()
  }, [supabase])

  const initials = email
    ? email.substring(0, 2).toUpperCase()
    : 'AD'

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
          <input
            className="bg-transparent border-none focus:ring-0 text-xs ml-2 w-48 outline-none"
            placeholder="Search..."
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative p-2 text-gray-400 hover:text-indigo-600">
          <Bell size={20} />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full border-2 border-white bg-red-500"></span>
        </button>

        <div className="ml-4 flex items-center gap-3 border-l pl-4">
          <div className="hidden text-right leading-tight md:block">
            <p className="text-xs font-bold text-gray-800">
              {email || 'Administrator'}
            </p>

            <p className="text-[10px] font-bold uppercase text-green-500">
              Online
            </p>
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white shadow-md">
            {initials}
          </div>
        </div>
      </div>
    </header>
  )
}