import { useState } from "react";
import type { ReactNode } from "react";

import Sidebar from "@/components/layout/SideBar";
import type { MenuItem } from "@/components/layout/SideBar";

import Header from "@/components/layout/Header";
import type { UserProfile } from "@/components/layout/Header";

import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children?: ReactNode; // <- penting
  title?: string;
  subtitle?: string;

  showSidebar?: boolean;
  menuItems?: MenuItem[];

  logo?: {
    icon: LucideIcon;
    text: string;
    highlight?: string;
  };

  onLogout?: () => void;

  user?: UserProfile;
  showNotification?: boolean;
  notificationCount?: number;
}

export default function Layout({
  children,
  title,
  subtitle,
  showSidebar = true,
  menuItems = [],
  logo,
  onLogout,
  user,
  showNotification = true,
  notificationCount = 0,
}: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">
      {/* Sidebar */}
      {showSidebar && (
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          menuItems={menuItems}
          logo={logo}
          onLogout={onLogout}
        />
      )}

      {/* Main */}
      <div
        className={cn(
          "flex-1 flex flex-col transition-all",
          showSidebar && (sidebarOpen ? "lg:ml-64" : "lg:ml-20")
        )}
      >
        {/* Header */}
        <Header
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          title={title}
          subtitle={subtitle}
          user={user}
          showNotification={showNotification}
          notificationCount={notificationCount}
          showSidebarToggle={showSidebar}
        />

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
