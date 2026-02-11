import Layout from "@/components/dashboard/DasboardLayout";
import { customerMenu, customerLogo } from "@/components/config/Menu";
import { MapPin, Search, Star, Clock } from "lucide-react";

export default function CustomerDashboard() {
  return (
    <Layout
      title="Temukan Barbershop"
      subtitle="Booking barbershop favoritmu sekarang"
      showSidebar={false} // Customer tidak punya sidebar
      menuItems={customerMenu}
      logo={customerLogo}
      user={{
        name: "Andi Wijaya",
        email: "andi@email.com",
        avatar: "/path/to/customer-avatar.jpg",
      }}
      showNotification={true}
      notificationCount={1}
    >
      {/* Customer Dashboard Content - Full Width tanpa Sidebar */}
      
      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari barbershop, lokasi, atau layanan..."
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="stat-card">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">24</p>
              <p className="text-sm text-muted-foreground">Barbershop Terdekat</p>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">2</p>
              <p className="text-sm text-muted-foreground">Booking Aktif</p>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <Star className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">5</p>
              <p className="text-sm text-muted-foreground">Favorit Saya</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Barbershops */}
      <div className="card-premium">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Rekomendasi Untukmu
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="border border-border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer">
              <div className="aspect-video bg-muted rounded-lg mb-3" />
              <h3 className="font-semibold text-foreground mb-1">Gentleman's Barbershop</h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                <MapPin className="w-4 h-4" />
                <span>Jakarta Selatan • 2.5 km</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-warning text-warning" />
                <span className="text-sm font-medium">4.8</span>
                <span className="text-sm text-muted-foreground">(248 reviews)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}