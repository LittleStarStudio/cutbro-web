import Layout from "@/components/dashboard/DasboardLayout";
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Store, Plus, MapPin, Crown, User } from "lucide-react";
import Button from "@/components/ui/Button";
import { superAdminLogo, superAdminMenu } from "@/components/config/Menu";
import { logout, getUser } from "@/lib/auth";
import type { Barbershop } from "@/type/AdminType";
import { searchInObject, filterByField, capitalizeFirst } from "@/lib/utils/AdminUtils";
import {
  PLAN_FILTER_OPTIONS,
  STATUS_FILTER_OPTIONS,
  PLAN_STYLES,
  STATUS_STYLES,
  STATUS_DOT_COLORS,
} from "@/components/entities/constants/AdminConstants";
import StatCard from "@/components/admin/StatsCard";
import SearchAndFilters from "@/components/admin/SearchAndFilters";
import Badge from "@/components/admin/Badge";
import DeleteModal from "@/components/admin/DeleteModal";
import EmptyState from "@/components/admin/EmptyState";
import ActionButtons from "@/components/admin/ActionButtons";

// ==================== DUMMY DATA ====================
const DUMMY_BARBERSHOPS: Barbershop[] = [
  {
    id: 1,
    name: "Classic Cuts",
    owner: "John Doe",
    location: "Jakarta Selatan",
    plan: "Premium",
    barbers: 8,
    status: "active",
    revenue: "Rp 12.5M",
  },
  {
    id: 2,
    name: "Barber King",
    owner: "Jane Smith",
    location: "Bandung",
    plan: "Pro",
    barbers: 5,
    status: "active",
    revenue: "Rp 8.2M",
  },
  {
    id: 3,
    name: "Pro Barber Shop",
    owner: "Alice Brown",
    location: "Surabaya",
    plan: "Free",
    barbers: 1,
    status: "inactive",
    revenue: "Rp 1.5M",
  },
  {
    id: 4,
    name: "Elite Grooming",
    owner: "Bob Wilson",
    location: "Jakarta Pusat",
    plan: "Premium",
    barbers: 12,
    status: "active",
    revenue: "Rp 18.3M",
  },
  {
    id: 5,
    name: "Urban Cuts",
    owner: "Charlie Davis",
    location: "Yogyakarta",
    plan: "Pro",
    barbers: 4,
    status: "active",
    revenue: "Rp 6.1M",
  },
];

export default function Barbershops() {
  const [barbershops, setBarbershops] = useState<Barbershop[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPlan, setFilterPlan] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedShop, setSelectedShop] = useState<Barbershop | null>(null);

  const currentUser = getUser();

  useEffect(() => {
    setBarbershops(DUMMY_BARBERSHOPS);
  }, []);

  // Calculate stats
  const stats = useMemo(() => {
    return {
      total: barbershops.length,
      active: barbershops.filter((s) => s.status === "active").length,
      premium: barbershops.filter((s) => s.plan === "Premium").length,
      totalBarbers: barbershops.reduce((acc, shop) => acc + shop.barbers, 0),
    };
  }, [barbershops]);

  // Filter barbershops
  const filteredBarbershops = useMemo(() => {
    return barbershops.filter((shop) => {
      const matchesSearch = searchInObject(shop, searchQuery, [
        "name",
        "owner",
        "location",
      ]);
      const matchesPlan = filterByField(shop, "plan", filterPlan);
      const matchesStatus = filterByField(shop, "status", filterStatus);

      return matchesSearch && matchesPlan && matchesStatus;
    });
  }, [barbershops, searchQuery, filterPlan, filterStatus]);

  const handleDeleteClick = (shop: Barbershop) => {
    setSelectedShop(shop);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedShop) {
      setBarbershops((prev) =>
        prev.filter((shop) => shop.id !== selectedShop.id)
      );
      setShowDeleteModal(false);
      setSelectedShop(null);
    }
  };

  return (
    <Layout
      title="Barbershops Management"
      subtitle="Manage all registered barbershops and their plans"
      menuItems={superAdminMenu}
      logo={superAdminLogo}
      onLogout={logout}
      user={
        currentUser
          ? {
              name: currentUser.name,
              email: currentUser.email,
              avatar: currentUser.name.charAt(0).toUpperCase(),
            }
          : undefined
      }
      showNotification={true}
      notificationCount={3}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Barbershops</h1>
            <p className="text-neutral-400 text-sm mt-1">
              Manage all registered barbershops
            </p>
          </div>

          <Link to="/admin/barbershops/add">
            <Button variant="gold" className="shadow-lg shadow-amber-500/25">
              <Plus className="w-4 h-4 mr-2" />
              Add Barbershop
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Shops"
            value={stats.total}
            icon={Store}
            iconBgColor="bg-blue-500/10"
            iconColor="text-blue-400"
          />
          <StatCard
            title="Active"
            value={stats.active}
            icon={Store}
            iconBgColor="bg-emerald-500/10"
            iconColor="text-emerald-400"
          />
          <StatCard
            title="Premium"
            value={stats.premium}
            icon={Crown}
            iconBgColor="bg-purple-500/10"
            iconColor="text-purple-400"
          />
          <StatCard
            title="Total Barbers"
            value={stats.totalBarbers}
            icon={User}
            iconBgColor="bg-amber-500/10"
            iconColor="text-amber-400"
          />
        </div>

        {/* Filters */}
        <SearchAndFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchPlaceholder="Search barbershops, owners, or locations..."
          filters={[
            {
              label: "Plan",
              value: filterPlan,
              onChange: setFilterPlan,
              options: PLAN_FILTER_OPTIONS,
            },
            {
              label: "Status",
              value: filterStatus,
              onChange: setFilterStatus,
              options: STATUS_FILTER_OPTIONS,
            },
          ]}
        />

        {/* Table */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-800">
                  <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-400">
                    Barbershop
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-400">
                    Owner
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-400">
                    Plan
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-400">
                    Barbers
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-400">
                    Revenue
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-400">
                    Status
                  </th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-neutral-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredBarbershops.length === 0 ? (
                  <EmptyState
                    icon={Store}
                    title="No barbershops found"
                    description="Try adjusting your search or filters"
                  />
                ) : (
                  filteredBarbershops.map((shop) => (
                    <tr
                      key={shop.id}
                      className="border-b border-neutral-800 hover:bg-neutral-800/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-white">
                            {shop.name}
                          </p>
                          <div className="flex items-center gap-1 text-sm text-neutral-400 mt-1">
                            <MapPin className="w-3 h-3" />
                            {shop.location}
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white text-sm font-bold">
                            {shop.owner.charAt(0)}
                          </div>
                          <span className="text-neutral-300">
                            {shop.owner}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <Badge
                          text={shop.plan}
                          variant={PLAN_STYLES[shop.plan]}
                          showCrown={shop.plan === "Premium"}
                        />
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-neutral-300">
                          {shop.barbers}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-neutral-300 font-semibold">
                          {shop.revenue}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <Badge
                          text={capitalizeFirst(shop.status)}
                          variant={STATUS_STYLES[shop.status]}
                          showDot
                          dotColor={STATUS_DOT_COLORS[shop.status]}
                        />
                      </td>

                      <td className="px-6 py-4">
                        <ActionButtons
                          actions={[
                            {
                              type: "view",
                              href: `/admin/barbershops/${shop.id}`,
                            },
                            {
                              type: "edit",
                              href: `/admin/barbershops/edit/${shop.id}`,
                            },
                            {
                              type: "delete",
                              onClick: () => handleDeleteClick(shop),
                            },
                          ]}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={showDeleteModal}
        title="Delete Barbershop"
        itemName={selectedShop?.name || ""}
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </Layout>
  );
}