import Layout from "@/components/dashboard/DasboardLayout";
import { ownerMenu, ownerLogo } from "@/components/config/Menu";
import StatCard from "@/components/dashboard/StatsSection";

import {
  Building2,
  DollarSign,
  Check,
  Ban,
} from "lucide-react";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

export default function OwnerDashboard() {
  const handleLogout = () => {
    console.log("Owner Logout");
  };

  return (
    <Layout
      title="Owner Dashboard"
      subtitle="Manage your barbershop"
      showSidebar
      menuItems={ownerMenu}
      logo={ownerLogo}
      onLogout={handleLogout}
      user={{
        name: "Ahmad Fadli",
        email: "ahmad@gentlemans.com",
      }}
      showNotification
      notificationCount={3}
    >
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<Building2 className="w-6 h-6" />}
          title="Total Barbershops"
          value={512}
          growth="+24"
        />

        <StatCard
          icon={<DollarSign className="w-6 h-6" />}
          title="Total Revenue"
          value={formatCurrency(1250000000)}
          growth="+15%"
        />

        <StatCard
          icon={<Check className="w-6 h-6" />}
          title="Active"
          value={458}
          color="success"
        />

        <StatCard
          icon={<Ban className="w-6 h-6" />}
          title="Pending Approval"
          value={12}
          color="warning"
        />
      </div>

      {/* Booking */}
      <div className="card-premium">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Today's Bookings
        </h2>
        <p className="text-muted-foreground">
          15 bookings scheduled for today
        </p>
      </div>
    </Layout>
  );
}
