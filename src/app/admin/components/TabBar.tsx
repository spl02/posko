'use client'
import { X } from 'lucide-react'
import { ElementType } from 'react'

interface Tab {
  id: string
  title: string
  icon: ElementType
}

interface TabBarProps {
  openTabs: Tab[]
  activeTabId: string
  onTabClick: (id: string) => void
  onTabClose: (e: React.MouseEvent, id: string) => void
}

export const TabBar = ({ openTabs, activeTabId, onTabClick, onTabClose }: TabBarProps) => {
  return (
    <div className="flex bg-white px-4 pt-2 gap-1 border-b border-gray-200 overflow-x-auto no-scrollbar shrink-0">
      {openTabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabClick(tab.id)}
          className={`
            group flex items-center px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all min-w-[140px] border-b-2
            ${activeTabId === tab.id 
              ? 'bg-indigo-50 text-indigo-600 border-indigo-600 shadow-sm' 
              : 'bg-transparent text-gray-400 border-transparent hover:text-gray-600 hover:bg-gray-50'}
          `}
        >
          <tab.icon size={14} className="mr-2" />
          <span className="truncate flex-1 text-left">{tab.title}</span>
          {openTabs.length > 1 && (
            <X 
              size={12} 
              className="ml-2 hover:text-red-500 transition-colors" 
              onClick={(e) => onTabClose(e, tab.id)}
            />
          )}
        </button>
      ))}
    </div>
  )
}