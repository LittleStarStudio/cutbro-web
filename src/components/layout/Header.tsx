import { Menu, Bell, ChevronDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  icon?: LucideIcon;
}

interface HeaderProps {
  onToggleSidebar?: () => void;
  title?: string;
  subtitle?: string;
  user?: UserProfile;
  showNotification?: boolean;
  notificationCount?: number;
  showSidebarToggle?: boolean;
}

export default function Header({
  onToggleSidebar,
  title = "Dashboard",
  subtitle,
  user,
  showNotification = true,
  notificationCount = 0,
  showSidebarToggle = true,
}: HeaderProps) {
  return (
    <header className="bg-zinc-900/95 border-b border-zinc-800/50 sticky top-0 z-40 backdrop-blur-xl">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-5">
          {showSidebarToggle && onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="p-2.5 text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-xl transition-all duration-300 group"
            >
              <Menu className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
            </button>
          )}
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight font-inter">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm text-zinc-400 mt-0.5 tracking-wide">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {showNotification && (
            <button className="relative p-2.5 text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-xl transition-all duration-300 group">
              <Bell className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
              {notificationCount > 0 && (
                <>
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full shadow-lg shadow-amber-500/50"></span>
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-400 rounded-full animate-ping"></span>
                </>
              )}
            </button>
          )}
          
          {user && (
            <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-zinc-800/50 transition-all duration-300 cursor-pointer group">
              {user.avatar ? (
                <div className="relative">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-xl object-cover ring-2 ring-zinc-800 group-hover:ring-amber-500/50 transition-all duration-300"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              ) : user.icon ? (
                <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-yellow-700 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-all duration-300 group-hover:scale-105">
                  <user.icon className="w-5 h-5 text-white" />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              ) : (
                <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center shadow-lg group-hover:from-amber-500 group-hover:to-amber-600 transition-all duration-300 group-hover:scale-105">
                  <span className="text-sm font-bold text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-white tracking-wide">
                  {user.name}
                </p>
                <p className="text-xs text-zinc-400 tracking-wider">
                  {user.email}
                </p>
              </div>
              <ChevronDown className="w-4 h-4 text-zinc-400 group-hover:text-amber-400 transition-all duration-300 group-hover:translate-y-0.5" />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}