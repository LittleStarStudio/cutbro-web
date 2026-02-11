import DashboardLayout from "@/components/dashboard/DasboardLayout";

import StatCard from "@/components/dashboard/StatsSection";
import StatisticsCard from "@/components/admin/StatisticsCard";
import BarbershopFilters from "@/components/admin/BarbershopFilters";
import BarbershopTable from "@/components/admin/BarbershopTable";

import { useBarbershopFilters } from "@/hooks/useBarbershopFilters";
import { useDashboardStats } from "@/hooks/useDashboardStats";

import { mockBarbershops } from "@/components/data/mockBabershops";
import { formatCurrency } from "@/lib/utils";

import { superAdminLogo, superAdminMenu } from "@/components/config/Menu";
import { logout } from "@/lib/auth";

import {
  Building2,
  DollarSign,
  Users,
  TrendingUp,
  Check,
  AlertCircle,
  Ban,
} from "lucide-react";

export default function AdminDashboard() {
  const stats = useDashboardStats(mockBarbershops);

  const {
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus,
    filteredShops,
  } = useBarbershopFilters(mockBarbershops);

  const handleViewDetail = (id: number) => {
    console.log("View detail:", id);
  };

  const handleToggleSuspend = (id: number, currentStatus: string) => {
    const action =
      currentStatus === "suspended" ? "reactivate" : "suspend";

    if (confirm(`Are you sure you want to ${action} this barbershop?`)) {
      console.log(`${action} barbershop:`, id);
    }
  };

  return (
    <DashboardLayout
      title="Admin Dashboard"
      subtitle="Manage All CutBro Partners"
      showSidebar
      menuItems={superAdminMenu}
      logo={superAdminLogo}
      user={{
        name: "Super Admin",
        email: "admin@cutbro.com",
      }}
      showNotification
      notificationCount={stats.pendingShops}
      onLogout={logout}
    >
      {/* ===== GLOBAL STATS ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
        <StatCard
          icon={<Building2 className="w-5 h-5 sm:w-6 sm:h-6" />}
          title="Total Barbershops"
          value={stats.totalShops}
          growth={`+${stats.pendingShops} pending`}
        />

        <StatCard
          icon={<DollarSign className="w-5 h-5 sm:w-6 sm:h-6" />}
          title="Total Revenue"
          value={formatCurrency(stats.totalRevenue)}
          growth="+15% this month"
        />

        <StatCard
          icon={<Users className="w-5 h-5 sm:w-6 sm:h-6" />}
          title="Total Bookings"
          value={stats.totalBookings}
          color="success"
        />

        <StatCard
          icon={<TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />}
          title="Average Rating"
          value={stats.averageRating}
          growth="⭐ Excellent"
        />
      </div>

      {/* ===== QUICK STATS ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
        <StatisticsCard
          icon={<Check className="w-5 h-5 sm:w-6 sm:h-6" />}
          title="Active Barbershops"
          value={stats.activeShops}
          color="success"
        />

        <StatisticsCard
          icon={<AlertCircle className="w-5 h-5 sm:w-6 sm:h-6" />}
          title="Pending Approval"
          value={stats.pendingShops}
          color="warning"
        />

        <StatisticsCard
          icon={<Ban className="w-5 h-5 sm:w-6 sm:h-6" />}
          title="Suspended"
          value={stats.suspendedShops}
          color="danger"
        />
      </div>

      {/* ===== BARBERSHOP TABLE ===== */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-border p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-foreground">
              All Barbershops
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Manage and monitor all barbershop partners
            </p>
          </div>

          <BarbershopFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filterStatus={filterStatus}
            onFilterChange={setFilterStatus}
          />
        </div>

        <BarbershopTable
          barbershops={filteredShops}
          onViewDetail={handleViewDetail}
          onToggleSuspend={handleToggleSuspend}
          variant="default"
        />
      </div>
    </DashboardLayout>
  );
}
