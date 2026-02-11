import Layout from "@/components/dashboard/DasboardLayout";
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Users, Plus, Calendar, DollarSign, Crown } from "lucide-react";
import Button from "@/components/ui/Button";
import { superAdminLogo, superAdminMenu } from "@/components/config/Menu";
import { logout, getUser } from "@/lib/auth";
import type { Subscriber } from "@/type/AdminType";
import { searchInObject, filterByField, capitalizeFirst } from "@/lib/utils/AdminUtils";
import {
  PLAN_FILTER_OPTIONS,
  PLAN_STYLES,
  SUBSCRIPTION_STATUS_STYLES,
} from "@/components/entities/constants/AdminConstants";
import StatCard from "@/components/admin/StatsCard";
import SearchAndFilters from "@/components/admin/SearchAndFilters";
import Badge from "@/components/admin/Badge";
import DeleteModal from "@/components/admin/DeleteModal";
import EmptyState from "@/components/admin/EmptyState";
import ActionButtons from "@/components/admin/ActionButtons";

// ==================== DUMMY DATA ====================
const DUMMY_SUBSCRIBERS: Subscriber[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    plan: "Premium",
    status: "active",
    startDate: "2024-01-01",
    endDate: "2025-01-01",
    revenue: "Rp 2.5M",
    barbershop: "Classic Cuts",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    plan: "Pro",
    status: "active",
    startDate: "2024-02-01",
    endDate: "2025-02-01",
    revenue: "Rp 1.5M",
    barbershop: "Barber King",
  },
  {
    id: 3,
    name: "Bob Wilson",
    email: "bob@example.com",
    plan: "Premium",
    status: "trial",
    startDate: "2024-12-01",
    endDate: "2024-12-31",
    revenue: "Rp 0",
    barbershop: "Elite Grooming",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    plan: "Pro",
    status: "expired",
    startDate: "2023-06-01",
    endDate: "2024-06-01",
    revenue: "Rp 1.5M",
    barbershop: "Pro Barber Shop",
  },
  {
    id: 5,
    name: "Charlie Davis",
    email: "charlie@example.com",
    plan: "Free",
    status: "cancelled",
    startDate: "2024-01-15",
    endDate: "2024-07-15",
    revenue: "Rp 0",
    barbershop: "Urban Cuts",
  },
];

// ==================== SUBSCRIPTION STATUS OPTIONS ====================
const SUBSCRIPTION_STATUS_OPTIONS = [
  { label: "All Status", value: "all" },
  { label: "Active", value: "active" },
  { label: "Trial", value: "trial" },
  { label: "Expired", value: "expired" },
  { label: "Cancelled", value: "cancelled" },
];

export default function Subscribers() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPlan, setFilterPlan] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSubscriber, setSelectedSubscriber] =
    useState<Subscriber | null>(null);

  const currentUser = getUser();

  useEffect(() => {
    setSubscribers(DUMMY_SUBSCRIBERS);
  }, []);

  // Calculate stats
  const stats = useMemo(() => {
    const totalRevenue = subscribers.reduce((acc, sub) => {
      const revenue = parseFloat(
        sub.revenue.replace(/[^0-9.]/g, "")
      );
      return acc + (isNaN(revenue) ? 0 : revenue);
    }, 0);

    return {
      total: subscribers.length,
      active: subscribers.filter((s) => s.status === "active").length,
      premium: subscribers.filter((s) => s.plan === "Premium").length,
      revenue: `Rp ${(totalRevenue / 1000000).toFixed(1)}M`,
    };
  }, [subscribers]);

  // Filter subscribers
  const filteredSubscribers = useMemo(() => {
    return subscribers.filter((subscriber) => {
      const matchesSearch = searchInObject(subscriber, searchQuery, [
        "name",
        "email",
        "barbershop",
      ]);
      const matchesPlan = filterByField(subscriber, "plan", filterPlan);
      const matchesStatus = filterByField(subscriber, "status", filterStatus);

      return matchesSearch && matchesPlan && matchesStatus;
    });
  }, [subscribers, searchQuery, filterPlan, filterStatus]);

  const handleDeleteClick = (subscriber: Subscriber) => {
    setSelectedSubscriber(subscriber);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedSubscriber) {
      setSubscribers((prev) =>
        prev.filter((sub) => sub.id !== selectedSubscriber.id)
      );
      setShowDeleteModal(false);
      setSelectedSubscriber(null);
    }
  };

  return (
    <Layout
      title="Subscribers Management"
      subtitle="Manage all active subscriptions"
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
            <h1 className="text-3xl font-bold text-white">Subscribers</h1>
            <p className="text-neutral-400 text-sm mt-1">
              Manage all active subscriptions
            </p>
          </div>

          <Link to="/admin/subscribers/add">
            <Button variant="gold" className="shadow-lg shadow-amber-500/25">
              <Plus className="w-4 h-4 mr-2" />
              Add Subscriber
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Subscribers"
            value={stats.total}
            icon={Users}
            iconBgColor="bg-blue-500/10"
            iconColor="text-blue-400"
          />
          <StatCard
            title="Active"
            value={stats.active}
            icon={Users}
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
            title="Total Revenue"
            value={stats.revenue}
            icon={DollarSign}
            iconBgColor="bg-amber-500/10"
            iconColor="text-amber-400"
          />
        </div>

        {/* Filters */}
        <SearchAndFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchPlaceholder="Search subscribers by name, email, or barbershop..."
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
              options: SUBSCRIPTION_STATUS_OPTIONS,
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
                    Subscriber
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-400">
                    Barbershop
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-400">
                    Plan
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-400">
                    Period
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
                {filteredSubscribers.length === 0 ? (
                  <EmptyState
                    icon={Users}
                    title="No subscribers found"
                    description="Try adjusting your search or filters"
                  />
                ) : (
                  filteredSubscribers.map((subscriber) => (
                    <tr
                      key={subscriber.id}
                      className="border-b border-neutral-800 hover:bg-neutral-800/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold">
                            {subscriber.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-white">
                              {subscriber.name}
                            </p>
                            <p className="text-sm text-neutral-400">
                              {subscriber.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-neutral-300">
                          {subscriber.barbershop}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <Badge
                          text={subscriber.plan}
                          variant={PLAN_STYLES[subscriber.plan]}
                          showCrown={subscriber.plan === "Premium"}
                        />
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-neutral-300 text-sm">
                          <Calendar className="w-3 h-3" />
                          <span>
                            {new Date(subscriber.startDate).toLocaleDateString(
                              "id-ID",
                              { month: "short", year: "numeric" }
                            )}
                            {" - "}
                            {new Date(subscriber.endDate).toLocaleDateString(
                              "id-ID",
                              { month: "short", year: "numeric" }
                            )}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-neutral-300 font-semibold">
                          {subscriber.revenue}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <Badge
                          text={capitalizeFirst(subscriber.status)}
                          variant={
                            SUBSCRIPTION_STATUS_STYLES[subscriber.status]
                          }
                        />
                      </td>

                      <td className="px-6 py-4">
                        <ActionButtons
                          actions={[
                            {
                              type: "view",
                              href: `/admin/subscribers/${subscriber.id}`,
                            },
                            {
                              type: "edit",
                              href: `/admin/subscribers/edit/${subscriber.id}`,
                            },
                            {
                              type: "delete",
                              onClick: () => handleDeleteClick(subscriber),
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
        title="Delete Subscriber"
        itemName={selectedSubscriber?.name || ""}
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </Layout>
  );
}