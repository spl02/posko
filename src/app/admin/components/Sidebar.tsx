"use client";
import { ElementType } from "react";
import { X, LogOut, ChevronRight } from "lucide-react";
import { logout } from "@/app/auth/actions";

interface MenuItem {
  id: string;
  title: string;
  icon: ElementType;
}

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  menuItems: MenuItem[];
  activeTabId: string;
  onTabClick: (item: any) => void;
}

export const Sidebar = ({
  isOpen,
  setIsOpen,
  menuItems,
  activeTabId,
  onTabClick,
}: SidebarProps) => {
  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 transition-all duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:relative lg:translate-x-0 ${!isOpen ? "lg:ml-[-256px]" : "lg:ml-0"}
      `}
    >
      <div className="flex items-center justify-between h-16 px-6 bg-slate-950 border-b border-slate-800 shrink-0">
        <span className="text-xl font-bold text-white tracking-tight text-nowrap">
          ADMIN<span className="text-indigo-400">CORE</span>
        </span>
        <button className="lg:hidden" onClick={() => setIsOpen(false)}>
          <X size={20} />
        </button>
      </div>

      <nav className="mt-4 px-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabClick(item)}
            className={`flex items-center w-full px-4 py-3 text-sm font-medium transition-all rounded-xl group ${activeTabId === item.id ? "bg-indigo-600 text-white" : "hover:bg-slate-800 hover:text-white"}`}
          >
            <item.icon
              size={20}
              className={
                activeTabId === item.id ? "text-white" : "text-slate-500"
              }
            />
            <span className="ml-3 text-nowrap">{item.title}</span>
            {activeTabId === item.id && (
              <ChevronRight size={14} className="ml-auto" />
            )}
          </button>
        ))}
        <form action={logout}>
          <button className="flex items-center w-full px-4 py-3 mt-10 text-sm text-red-400 hover:bg-red-500/10 rounded-xl">
            <LogOut size={20} />
            <span className="ml-3 font-bold">Sign Out</span>
          </button>
        </form>
      </nav>
    </aside>
  );
};
