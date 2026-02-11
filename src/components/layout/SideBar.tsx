import { Link, useLocation } from "react-router-dom";
import { X, LogOut } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MenuItem {
  icon: LucideIcon;
  label: string;
  href: string;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
  logo?: {
    icon: LucideIcon;
    text: string;
    highlight?: string;
  };
  onLogout?: () => void;
}

export default function Sidebar({
  isOpen,
  onClose,
  menuItems,
  logo,
  onLogout,
}: SidebarProps) {
  const location = useLocation();

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-64",
        "bg-zinc-900/95 backdrop-blur-xl", // sama seperti Header
        "border-r border-zinc-800/50",
        "shadow-2xl shadow-black/40",
        "transition-transform duration-300 ease-in-out",
        isOpen
          ? "translate-x-0"
          : "-translate-x-full lg:translate-x-0 lg:w-20"
      )}
    >
      <div
        className={cn(
          "flex flex-col h-full",
          !isOpen && "lg:items-center"
        )}
      >
        {/* ================= Logo Section ================= */}
        <div className="px-6 py-8 flex items-center justify-between border-b border-zinc-800/50">
          <Link to="/" className="flex items-center gap-3 group">
            {logo && (
              <>
                {/* Logo Icon */}
                <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-yellow-700 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-all duration-300 group-hover:scale-105">
                  <logo.icon className="w-6 h-6 text-white" />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                {/* Logo Text */}
                {isOpen && (
                  <div className="flex flex-col">
                    <span className="text-xl font-bold text-white tracking-tight">
                      {logo.text}
                      {logo.highlight && (
                        <span className="bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent ml-1">
                          {logo.highlight}
                        </span>
                      )}
                    </span>

                    <span className="text-[10px] text-zinc-500 tracking-wider uppercase">
                      Management System
                    </span>
                  </div>
                )}
              </>
            )}
          </Link>

          {/* Close mobile */}
          <button
            onClick={onClose}
            className="lg:hidden text-zinc-400 hover:text-white transition-colors p-2 hover:bg-zinc-800/50 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ================= Navigation ================= */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.href;

            return (
              <Link
                key={item.label}
                to={item.href}
                className={cn(
                  "flex items-center gap-4 px-4 py-3.5 rounded-xl font-medium relative overflow-hidden group",
                  "transition-all duration-300",
                  isActive
                    ? "bg-gradient-to-r from-amber-500/10 via-amber-600/5 to-transparent text-amber-400 shadow-lg shadow-amber-500/5"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/50",
                  !isOpen && "lg:justify-center lg:px-3"
                )}
              >
                {/* Active Indicator */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-amber-400 to-yellow-600 rounded-r-full shadow-lg shadow-amber-500/50" />
                )}

                {/* Icon */}
                <div
                  className={cn(
                    "relative z-10 transition-transform duration-300",
                    isActive ? "scale-110" : "group-hover:scale-110"
                  )}
                >
                  <item.icon
                    className={cn(
                      "w-5 h-5 flex-shrink-0",
                      isActive &&
                        "drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]"
                    )}
                  />
                </div>

                {/* Label */}
                {isOpen && (
                  <span className="font-inter text-[15px] tracking-wide relative z-10">
                    {item.label}
                  </span>
                )}

                {/* Hover overlay */}
                {!isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-zinc-800/0 via-zinc-800/40 to-zinc-800/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* ================= Logout ================= */}
        {onLogout && (
          <div className="p-4 border-t border-zinc-800/50 bg-zinc-900/80 backdrop-blur-xl">
            <button
              onClick={onLogout}
              className={cn(
                "flex items-center gap-4 px-4 py-3.5 rounded-xl w-full relative overflow-hidden group",
                "transition-all duration-300",
                "text-zinc-400 hover:text-red-400 hover:bg-red-500/10",
                !isOpen && "lg:justify-center lg:px-3"
              )}
            >
              <LogOut className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />

              {isOpen && (
                <span className="font-inter text-[15px] tracking-wide font-medium">
                  Logout
                </span>
              )}

              <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/5 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
