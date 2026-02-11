import Layout from "@/components/dashboard/DasboardLayout";
import { barberMenu, barberLogo } from "@/components/config/Menu";
import { Calendar, Clock, DollarSign, Star } from "lucide-react";

export default function BarberDashboard() {
  const handleLogout = () => {
    console.log("Barber Logout");
    // Add your logout logic here
  };

  return (
    <Layout
      title="Barber Dashboard"
      subtitle="Welcome back!"
      showSidebar={true}
      menuItems={barberMenu}
      logo={barberLogo}
      onLogout={handleLogout}
      user={{
        name: "Budi Santoso",
        email: "budi@urbancuts.com",
        avatar: "/path/to/barber-avatar.jpg",
      }}
      showNotification={true}
      notificationCount={2}
    >
      {/* Barber Dashboard Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="stat-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-primary" />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">12</p>
          <p className="text-sm text-muted-foreground">Today's Bookings</p>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
              <Clock className="w-6 h-6 text-success" />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">3</p>
          <p className="text-sm text-muted-foreground">Waiting</p>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-warning" />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">Rp 2.5M</p>
          <p className="text-sm text-muted-foreground">Revenue This Month</p>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Star className="w-6 h-6 text-primary" />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">4.8</p>
          <p className="text-sm text-muted-foreground">Rating</p>
        </div>
      </div>

      {/* Next Appointment */}
      <div className="card-premium">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Next Appointment
        </h2>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-lg font-bold text-primary">JS</span>
          </div>
          <div>
            <p className="font-medium text-foreground">John Smith</p>
            <p className="text-sm text-muted-foreground">Haircut + Beard Trim</p>
            <p className="text-xs text-muted-foreground">14:00 - 14:45</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
